const fs = require('fs');

// Load realistic HMDA data
const realisticData = JSON.parse(fs.readFileSync('./realistic-hmda-project-names.json', 'utf8'));

// Sample alignment function to demonstrate key changes
function alignProjectWithMasterData(project, index) {
  // Determine project type based on category
  let projectPool;
  let typeOfWork;
  
  switch(project.category) {
    case 'ENV':
      projectPool = realisticData.lakeAndParkProjects;
      typeOfWork = 'parks/lakes';
      break;
    case 'INFRA':
      projectPool = realisticData.roadProjects;
      typeOfWork = 'Roads';
      break;
    case 'URBAN':
      projectPool = realisticData.layoutProjects;
      typeOfWork = 'Layouts';
      break;
    case 'SMART':
      projectPool = realisticData.hudaHeightsProjects;
      typeOfWork = 'others';
      break;
    default:
      projectPool = realisticData.layoutProjects;
      typeOfWork = 'Layouts';
  }
  
  // Select a realistic project
  const realProject = projectPool[index % projectPool.length];
  
  // Align fields with HMDA master data format
  const alignedProject = {
    ...project,
    // Add HMDA-specific fields
    serialNumber: index + 1,
    divisionNumber: realisticData.divisionNumbers[index % 6],
    nameOfProject: realProject.nameOfProject,
    nameOfWork: realProject.nameOfWork,
    typeOfWork: typeOfWork,
    asFinancialYear: project.createdDate ? 
      `${new Date(project.createdDate).getFullYear()}-${(new Date(project.createdDate).getFullYear() + 1).toString().slice(2)}` : 
      '2023-24',
    
    // Update contractor name with M/s prefix
    contractor: project.contractor ? {
      ...project.contractor,
      nameOfAgency: `M/s ${project.contractor.name}`,
      name: `M/s ${project.contractor.name}` // Keep for backward compatibility
    } : undefined,
    
    // Convert financial amounts to Crores
    estimateAmountCrores: (project.totalBudget / 10000000).toFixed(2),
    ecvCrores: project.financial ? (project.financial.contractValue / 10000000).toFixed(2) : null,
    
    // Add HMDA document numbers
    asFileNumber: `HMDA/CE/AS/${100 + index}/${project.createdDate ? new Date(project.createdDate).getFullYear() : 2023}-${project.createdDate ? (new Date(project.createdDate).getFullYear() + 1).toString().slice(2) : 24}`,
    asApprovalAuthority: project.totalBudget > 500000000 ? "Govt" : "Metropolitan Commissioner",
    
    // Add tender details
    tenderNoticeDetails: {
      number: `HMDA/DEV/CE/${index + 1}/${project.createdDate ? new Date(project.createdDate).getFullYear() : 2023}-${project.createdDate ? (new Date(project.createdDate).getFullYear() + 1).toString().slice(2) : 24}`,
      date: project.timeline?.plannedStart || '2023-09-01'
    },
    
    // Add LOA details
    loaDetails: {
      number: `${14000 + index}/HMDA/DEV/CE/${realProject.nameOfProject.split(' ')[0]}/${project.createdDate ? new Date(project.createdDate).getFullYear() : 2023}-${project.createdDate ? (new Date(project.createdDate).getFullYear() + 1).toString().slice(2) : 24}`,
      date: project.timeline?.actualStart || '2023-11-15'
    },
    
    // Add agreement details
    agreementNumber: `HMDA/DEV/CE/${30 + index}/${project.createdDate ? new Date(project.createdDate).getFullYear() : 2023}-${project.createdDate ? (new Date(project.createdDate).getFullYear() + 1).toString().slice(2) : 24}`,
    agreementDate: project.timeline?.actualStart || '2023-12-01',
    
    // Map status
    statusOfWork: project.currentStage === 9 ? "Work is completed" : "Work in progress",
    
    // Add expenditure in Crores
    expenditureIncurredWithTax: project.financial ? (project.financial.paidTillDate / 10000000).toFixed(2) : '0.00',
    expenditureIncurredWithoutTax: project.financial ? ((project.financial.paidTillDate * 0.85) / 10000000).toFixed(2) : '0.00',
    
    // Period of completion
    periodOfCompletion: project.timeline ? 
      `${Math.ceil((new Date(project.timeline.plannedCompletion) - new Date(project.timeline.plannedStart)) / (1000 * 60 * 60 * 24 * 30))} months` : 
      '18 months'
  };
  
  return alignedProject;
}

// Example usage
console.log('HMDA Master Data Alignment Tool');
console.log('================================\n');

// Load current demo data
const currentData = JSON.parse(fs.readFileSync('./hmda-projects-150-with-documents.json', 'utf8'));

// Show example transformation
console.log('Example Transformation:');
console.log('----------------------');
const sampleProject = currentData.projects[0];
console.log('\nBEFORE:');
console.log(`Project Name: ${sampleProject.projectName}`);
console.log(`Category: ${sampleProject.category}`);
console.log(`Contractor: ${sampleProject.contractor?.name}`);
console.log(`Budget: ₹${sampleProject.totalBudget}`);

const alignedSample = alignProjectWithMasterData(sampleProject, 0);
console.log('\nAFTER:');
console.log(`Project Name: ${alignedSample.nameOfProject}`);
console.log(`Work Description: ${alignedSample.nameOfWork}`);
console.log(`Type of Work: ${alignedSample.typeOfWork}`);
console.log(`Contractor: ${alignedSample.contractor?.nameOfAgency}`);
console.log(`Estimate Amount: ₹${alignedSample.estimateAmountCrores} Cr`);
console.log(`AS File No: ${alignedSample.asFileNumber}`);
console.log(`Tender Notice: ${alignedSample.tenderNoticeDetails.number}`);
console.log(`Status: ${alignedSample.statusOfWork}`);

// Process all projects
const alignedProjects = currentData.projects.map((project, index) => 
  alignProjectWithMasterData(project, index)
);

const alignedData = {
  ...currentData,
  metadata: {
    ...currentData.metadata,
    lastAlignedWithMasterData: new Date().toISOString(),
    alignmentVersion: '1.0',
    description: 'HMDA Demo Dataset - Master Data Aligned with authentic HMDA field names and formats'
  },
  projects: alignedProjects
};

fs.writeFileSync('./hmda-projects-150-master-aligned.json', JSON.stringify(alignedData, null, 2));
console.log('\n✅ Created aligned dataset: hmda-projects-150-master-aligned.json');

console.log('\n📌 Key Alignment Changes:');
console.log('- Project names match HMDA patterns (Layout, Road, Lake, etc.)');
console.log('- All amounts converted to Crores');
console.log('- Contractor names prefixed with "M/s"');
console.log('- HMDA document numbering formats applied');
console.log('- Work descriptions added matching HMDA style');
console.log('- Status simplified to HMDA values');
console.log('\nRun with full alignment to create master-aligned dataset.');