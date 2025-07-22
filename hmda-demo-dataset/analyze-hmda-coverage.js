const fs = require('fs');

// Load the aligned dataset
const data = JSON.parse(fs.readFileSync('./hmda-projects-150-master-aligned.json', 'utf8'));

// Define HMDA critical fields to check
const hmdaCriticalFields = [
  'serialNumber',
  'divisionNumber', 
  'nameOfProject',
  'nameOfWork',
  'typeOfWork',
  'asFinancialYear',
  'estimateAmountCrores',
  'ecvCrores',
  'asFileNumber',
  'asApprovalAuthority',
  'tenderNoticeDetails',
  'loaDetails',
  'agreementNumber',
  'agreementDate',
  'statusOfWork',
  'expenditureIncurredWithTax',
  'expenditureIncurredWithoutTax',
  'periodOfCompletion'
];

// Analyze each project for HMDA field coverage
const projectCoverage = data.projects.map((project, index) => {
  const coverage = {
    index,
    projectId: project.projectId,
    nameOfProject: project.nameOfProject,
    category: project.category,
    coverageScore: 0,
    missingFields: [],
    presentFields: []
  };

  // Check each critical field
  hmdaCriticalFields.forEach(field => {
    if (project[field] !== undefined && project[field] !== null) {
      coverage.presentFields.push(field);
      coverage.coverageScore++;
    } else {
      coverage.missingFields.push(field);
    }
  });

  coverage.coveragePercentage = (coverage.coverageScore / hmdaCriticalFields.length * 100).toFixed(1);
  return coverage;
});

// Sort by coverage score
const sortedByCoverage = [...projectCoverage].sort((a, b) => b.coverageScore - a.coverageScore);

// Find projects with 100% coverage
const fullCoverageProjects = sortedByCoverage.filter(p => p.coverageScore === hmdaCriticalFields.length);

console.log('HMDA Master Data Coverage Analysis');
console.log('==================================\n');

console.log(`Total Projects Analyzed: ${data.projects.length}`);
console.log(`Critical HMDA Fields Checked: ${hmdaCriticalFields.length}`);
console.log(`Projects with 100% Coverage: ${fullCoverageProjects.length}\n`);

// Show top 3 projects with best coverage
console.log('Top 3 Projects with Best HMDA Data Coverage:');
console.log('--------------------------------------------');

sortedByCoverage.slice(0, 3).forEach((project, idx) => {
  console.log(`\n${idx + 1}. ${project.nameOfProject} (${project.projectId})`);
  console.log(`   Category: ${project.category}`);
  console.log(`   Coverage: ${project.coverageScore}/${hmdaCriticalFields.length} fields (${project.coveragePercentage}%)`);
  
  if (project.missingFields.length > 0) {
    console.log(`   Missing Fields: ${project.missingFields.join(', ')}`);
  } else {
    console.log(`   ✅ ALL HMDA FIELDS PRESENT`);
  }
});

// Show a complete example
console.log('\n\nComplete HMDA Data Example - First Project with 100% Coverage:');
console.log('=============================================================');

if (fullCoverageProjects.length > 0) {
  const bestProject = data.projects[fullCoverageProjects[0].index];
  
  console.log('\nBasic Information:');
  console.log(`- Serial Number: ${bestProject.serialNumber}`);
  console.log(`- Division Number: ${bestProject.divisionNumber}`);
  console.log(`- Name of Project: ${bestProject.nameOfProject}`);
  console.log(`- Type of Work: ${bestProject.typeOfWork}`);
  console.log(`- Name of Work: ${bestProject.nameOfWork?.substring(0, 80)}...`);
  
  console.log('\nAdministrative Sanction Details:');
  console.log(`- AS Financial Year: ${bestProject.asFinancialYear}`);
  console.log(`- AS File Number: ${bestProject.asFileNumber}`);
  console.log(`- AS Approval Authority: ${bestProject.asApprovalAuthority}`);
  console.log(`- Estimate Amount: ₹${bestProject.estimateAmountCrores} Cr`);
  
  console.log('\nTender & Contract Details:');
  console.log(`- Tender Notice: ${bestProject.tenderNoticeDetails.number} dt. ${bestProject.tenderNoticeDetails.date}`);
  console.log(`- ECV: ₹${bestProject.ecvCrores} Cr`);
  console.log(`- LOA: ${bestProject.loaDetails.number} dt. ${bestProject.loaDetails.date}`);
  console.log(`- Agreement No: ${bestProject.agreementNumber}`);
  console.log(`- Agreement Date: ${bestProject.agreementDate}`);
  console.log(`- Period of Completion: ${bestProject.periodOfCompletion}`);
  
  console.log('\nExecution Status:');
  console.log(`- Status of Work: ${bestProject.statusOfWork}`);
  console.log(`- Physical Progress: ${bestProject.physicalProgress}%`);
  console.log(`- Financial Progress: ${bestProject.financialProgress}%`);
  console.log(`- Expenditure (with tax): ₹${bestProject.expenditureIncurredWithTax} Cr`);
  console.log(`- Expenditure (without tax): ₹${bestProject.expenditureIncurredWithoutTax} Cr`);
  
  console.log('\nContractor Details:');
  console.log(`- Name of Agency: ${bestProject.contractor?.nameOfAgency}`);
  console.log(`- Grade: ${bestProject.contractor?.grade}`);
  console.log(`- Performance Rating: ${bestProject.contractor?.performanceRating?.toFixed(1)}/5`);
  
  // Show full JSON for reference
  console.log('\n\nFull JSON Structure (HMDA Fields Only):');
  console.log('----------------------------------------');
  const hmdaFieldsOnly = {};
  hmdaCriticalFields.forEach(field => {
    if (bestProject[field] !== undefined) {
      hmdaFieldsOnly[field] = bestProject[field];
    }
  });
  console.log(JSON.stringify(hmdaFieldsOnly, null, 2));
} else {
  console.log('No projects found with 100% coverage. Showing best available:');
  const bestProject = data.projects[sortedByCoverage[0].index];
  console.log(`Project: ${bestProject.nameOfProject}`);
  console.log(`Coverage: ${sortedByCoverage[0].coveragePercentage}%`);
}

// Coverage distribution
console.log('\n\nCoverage Distribution:');
console.log('---------------------');
const distribution = {
  '100%': 0,
  '90-99%': 0,
  '80-89%': 0,
  '70-79%': 0,
  'Below 70%': 0
};

projectCoverage.forEach(p => {
  const percentage = parseFloat(p.coveragePercentage);
  if (percentage === 100) distribution['100%']++;
  else if (percentage >= 90) distribution['90-99%']++;
  else if (percentage >= 80) distribution['80-89%']++;
  else if (percentage >= 70) distribution['70-79%']++;
  else distribution['Below 70%']++;
});

Object.entries(distribution).forEach(([range, count]) => {
  console.log(`${range}: ${count} projects (${(count/data.projects.length*100).toFixed(1)}%)`);
});

// Field completeness across all projects
console.log('\n\nField Completeness Analysis:');
console.log('---------------------------');
const fieldCompleteness = {};
hmdaCriticalFields.forEach(field => {
  fieldCompleteness[field] = 0;
});

data.projects.forEach(project => {
  hmdaCriticalFields.forEach(field => {
    if (project[field] !== undefined && project[field] !== null) {
      fieldCompleteness[field]++;
    }
  });
});

console.log('Fields present in all projects:');
hmdaCriticalFields.forEach(field => {
  const percentage = (fieldCompleteness[field] / data.projects.length * 100).toFixed(1);
  console.log(`- ${field}: ${fieldCompleteness[field]}/150 (${percentage}%)`);
});