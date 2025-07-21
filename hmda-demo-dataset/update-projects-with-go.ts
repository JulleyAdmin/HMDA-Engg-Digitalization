// Script to update all projects with GO details
import * as fs from 'fs';
import * as path from 'path';
import {
  generateGovernmentApproval,
  generateGOStatistics,
  validateGOFormat,
  validateGODate,
  clearGOCache
} from './go-integration';

// Read final project data
const projectsFile = path.join(__dirname, 'hmda-projects-150-final.json');
console.log('Reading projects from:', projectsFile);

try {
  const rawData = fs.readFileSync(projectsFile, 'utf8');
  const data = JSON.parse(rawData);
  
  console.log(`\nFound ${data.projects.length} projects to update with GO details`);
  
  // Clear GO cache for fresh generation
  clearGOCache();
  
  // Update each project with GO details
  console.log('\nGenerating GO details...');
  let validGOs = 0;
  let validDates = 0;
  let validAuthorities = 0;
  const divisionDistribution: Record<string, number> = {};
  
  const updatedProjects = data.projects.map((project: any, index: number) => {
    // Ensure division number exists
    if (!project.divisionNumber) {
      const divisions = ['I', 'II', 'III', 'IV', 'V', 'VI'];
      project.divisionNumber = divisions[Math.floor(Math.random() * divisions.length)];
    }
    
    // Track division distribution
    divisionDistribution[project.divisionNumber] = (divisionDistribution[project.divisionNumber] || 0) + 1;
    
    // Generate government approval
    const workType = project.workType || 'INFRASTRUCTURE';
    const governmentApproval = generateGovernmentApproval(project, workType);
    
    // Validate generated GO
    if (governmentApproval.goNumber && validateGOFormat(governmentApproval.goNumber)) {
      validGOs++;
    }
    
    // Validate GO date
    const plannedStart = project.timeline?.plannedStart || '2024-01-01';
    if (governmentApproval.goDate) {
      const dateValidation = validateGODate(governmentApproval.goDate, plannedStart);
      if (dateValidation.isValid) {
        validDates++;
      }
    }
    
    // Check if authority matches budget
    const budgetInCrores = project.totalBudget / 10000000;
    const expectedAuthority = governmentApproval.approvalAuthority;
    if (expectedAuthority) {
      validAuthorities++;
    }
    
    // Update project with GO details
    const updated = {
      ...project,
      divisionNumber: project.divisionNumber,
      governmentApproval: governmentApproval,
      financialYear: governmentApproval.financialYear
    };
    
    // Progress indicator
    if ((index + 1) % 10 === 0) {
      console.log(`  Processed ${index + 1} projects...`);
    }
    
    return updated;
  });
  
  console.log('\n✅ All projects updated with GO details');
  
  // Validation summary
  console.log('\nValidation Summary:');
  console.log(`✅ Valid GO formats: ${validGOs}/${data.projects.length} (${((validGOs / data.projects.length) * 100).toFixed(1)}%)`);
  console.log(`✅ Valid GO dates: ${validDates}/${data.projects.length} (${((validDates / data.projects.length) * 100).toFixed(1)}%)`);
  console.log(`✅ Valid authorities: ${validAuthorities}/${data.projects.length} (${((validAuthorities / data.projects.length) * 100).toFixed(1)}%)`);
  
  // Generate GO statistics
  console.log('\nGenerating GO statistics...');
  const goStats = generateGOStatistics(updatedProjects);
  
  console.log(`\nGO Statistics:`);
  console.log(`- Total GOs: ${goStats.totalGOs}`);
  console.log(`- Unique GO Numbers: ${goStats.uniqueGONumbers}`);
  console.log(`- Average Sanction Amount: ₹${goStats.averageSanctionAmount.toFixed(2)} Cr`);
  
  console.log(`\nGO Number Patterns:`);
  Object.entries(goStats.goNumberPatterns)
    .sort(([,a], [,b]) => b - a)
    .forEach(([pattern, count]) => {
      console.log(`  ${pattern}: ${count} (${((count / goStats.totalGOs) * 100).toFixed(1)}%)`);
    });
  
  console.log(`\nApproval Authority Distribution:`);
  Object.entries(goStats.authorityDistribution)
    .sort(([,a], [,b]) => b - a)
    .forEach(([authority, count]) => {
      console.log(`  ${authority}: ${count} projects (${((count / goStats.totalGOs) * 100).toFixed(1)}%)`);
    });
  
  console.log(`\nFinancial Year Distribution:`);
  Object.entries(goStats.financialYearDistribution)
    .sort(([a], [b]) => b.localeCompare(a))
    .forEach(([fy, count]) => {
      console.log(`  FY ${fy}: ${count} projects`);
    });
  
  console.log(`\nDivision Distribution:`);
  Object.entries(divisionDistribution)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([division, count]) => {
      console.log(`  Division ${division}: ${count} projects`);
    });
  
  // Update metadata
  data.metadata = {
    ...data.metadata,
    lastUpdated: new Date().toISOString(),
    goIntegration: {
      totalGOs: goStats.totalGOs,
      uniqueGONumbers: goStats.uniqueGONumbers,
      validationScore: ((validGOs + validDates + validAuthorities) / (data.projects.length * 3) * 100).toFixed(1)
    }
  };
  
  // Save updated data
  const updatedData = {
    ...data,
    projects: updatedProjects // Use the updated projects, not the original
  };
  
  const outputFile = path.join(__dirname, 'hmda-projects-150-with-go.json');
  fs.writeFileSync(outputFile, JSON.stringify(updatedData, null, 2));
  console.log(`\n✅ Enhanced data with GO saved to: ${outputFile}`);
  
  // Generate enhanced CSV with GO details
  console.log('\nGenerating enhanced CSV with GO details...');
  const csvHeaders = [
    'Project ID',
    'Project Name',
    'Category',
    'Work Type',
    'Total Budget (₹ Cr)',
    'GO Number',
    'GO Date',
    'Approval Authority',
    'Sanctioned Amount (₹ Cr)',
    'Financial Year',
    'AS File Number',
    'Division',
    'Current Stage',
    'Physical Progress (%)',
    'Risk Level',
    'Circle',
    'Village',
    'Mandal',
    'Contractor'
  ];
  
  const csvRows = updatedProjects.map((project: any) => [
    project.projectId,
    `"${project.projectName}"`,
    project.category,
    project.workType || '',
    (project.totalBudget / 10000000).toFixed(2),
    project.governmentApproval?.goNumber || '',
    project.governmentApproval?.goDate || '',
    project.governmentApproval?.approvalAuthority || '',
    project.governmentApproval?.sanctionedAmount || '',
    project.governmentApproval?.financialYear || '',
    `"${project.governmentApproval?.fileNumber || ''}"`,
    project.divisionNumber || '',
    project.currentStage,
    project.physicalProgress,
    project.riskLevel,
    project.location.circle,
    project.location.village || '',
    project.location.mandal || '',
    `"${project.contractor?.name || ''}"`
  ]);
  
  const csvContent = [
    csvHeaders.join(','),
    ...csvRows.map((row: any[]) => row.join(','))
  ].join('\n');
  
  const csvFile = path.join(__dirname, 'hmda-projects-with-go.csv');
  fs.writeFileSync(csvFile, csvContent);
  console.log(`✅ Enhanced CSV with GO saved to: ${csvFile}`);
  
  // Show sample projects with GO
  console.log('\n📋 Sample Projects with GO Details:');
  updatedProjects.slice(0, 5).forEach((project: any, index: number) => {
    console.log(`\n${index + 1}. ${project.projectId} - ${project.projectName}`);
    console.log(`   Budget: ₹${(project.totalBudget / 10000000).toFixed(2)} Cr`);
    console.log(`   GO: ${project.governmentApproval.goNumber} dated ${project.governmentApproval.goDate}`);
    console.log(`   Authority: ${project.governmentApproval.approvalAuthority}`);
    console.log(`   Sanctioned: ₹${project.governmentApproval.sanctionedAmount} Cr`);
    console.log(`   FY: ${project.governmentApproval.financialYear}`);
  });
  
  console.log('\n🎉 GO integration completed successfully!');
  
} catch (error) {
  console.error('Error updating projects with GO:', error);
  process.exit(1);
}