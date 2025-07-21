// Script to fix duplicate project names in the enhanced dataset
import * as fs from 'fs';
import * as path from 'path';
import { generateSurveyNumbers } from './hmda-locations-database';

// Read enhanced project data
const projectsFile = path.join(__dirname, 'hmda-projects-150-enhanced.json');
console.log('Reading enhanced projects from:', projectsFile);

try {
  const rawData = fs.readFileSync(projectsFile, 'utf8');
  const data = JSON.parse(rawData);
  
  console.log(`\nFound ${data.projects.length} projects`);
  
  // Track names and fix duplicates
  const nameCount = new Map<string, number>();
  const projectsByName = new Map<string, any[]>();
  
  // First pass: count occurrences
  data.projects.forEach((project: any) => {
    const name = project.projectName;
    const count = nameCount.get(name) || 0;
    nameCount.set(name, count + 1);
    
    if (!projectsByName.has(name)) {
      projectsByName.set(name, []);
    }
    projectsByName.get(name)!.push(project);
  });
  
  // Find duplicates
  const duplicates = Array.from(nameCount.entries())
    .filter(([_, count]) => count > 1)
    .map(([name, count]) => ({ name, count }));
  
  console.log(`\nFound ${duplicates.length} duplicate names to fix`);
  
  // Fix duplicates by adding unique identifiers
  let fixedCount = 0;
  duplicates.forEach(({ name }) => {
    const projects = projectsByName.get(name)!;
    console.log(`\nFixing "${name}" (${projects.length} occurrences)`);
    
    projects.forEach((project, index) => {
      if (index === 0) {
        // Keep the first one as is
        return;
      }
      
      // Add unique identifiers based on project type
      let newName = name;
      
      if (project.workType === 'INFRASTRUCTURE') {
        // For infrastructure projects, add specific infrastructure type
        const infraTypes = [
          'Zone A', 'Zone B', 'Zone C',
          'Sector 1', 'Sector 2', 'Sector 3',
          'North', 'South', 'East', 'West',
          'Phase I', 'Phase II', 'Phase III'
        ];
        const modifier = infraTypes[index % infraTypes.length];
        newName = `${name} - ${modifier}`;
      } else if (project.workType === 'LAYOUTS') {
        // For layouts, add block/phase
        const blocks = ['Block A', 'Block B', 'Block C', 'Phase 1', 'Phase 2', 'Extension'];
        newName = `${name} - ${blocks[index % blocks.length]}`;
      } else if (project.workType === 'ROADS') {
        // For roads, add stretch details
        const stretches = ['Stretch 1', 'Stretch 2', 'Main Stretch', 'Service Road', 'Bypass'];
        newName = `${name} - ${stretches[index % stretches.length]}`;
      } else {
        // Generic differentiation
        newName = `${name} - Part ${index + 1}`;
      }
      
      // Update project name
      project.projectName = newName;
      
      // Also update work description to be more specific
      if (project.nameOfWork) {
        project.nameOfWork = project.nameOfWork.replace(name, newName);
      }
      
      // Add different survey numbers
      project.workLocation = project.workLocation || {};
      project.workLocation.surveyNumbers = generateSurveyNumbers(Math.floor(Math.random() * 2) + 1);
      
      fixedCount++;
      console.log(`  → "${newName}"`);
    });
  });
  
  console.log(`\n✅ Fixed ${fixedCount} duplicate names`);
  
  // Validate again
  const finalNameCount = new Map<string, number>();
  data.projects.forEach((project: any) => {
    const name = project.projectName;
    finalNameCount.set(name, (finalNameCount.get(name) || 0) + 1);
  });
  
  const remainingDuplicates = Array.from(finalNameCount.entries())
    .filter(([_, count]) => count > 1);
  
  if (remainingDuplicates.length === 0) {
    console.log('✅ All project names are now unique!');
  } else {
    console.log('⚠️ Still have duplicates:', remainingDuplicates);
  }
  
  // Generate final statistics
  const uniqueNames = new Set(data.projects.map((p: any) => p.projectName));
  console.log(`\nFinal Statistics:`);
  console.log(`- Total Projects: ${data.projects.length}`);
  console.log(`- Unique Names: ${uniqueNames.size}`);
  console.log(`- Uniqueness Rate: ${((uniqueNames.size / data.projects.length) * 100).toFixed(1)}%`);
  
  // Update metadata
  data.metadata = {
    ...data.metadata,
    lastUpdated: new Date().toISOString(),
    duplicatesFixed: fixedCount,
    totalUniqueNames: uniqueNames.size
  };
  
  // Save fixed data
  const outputFile = path.join(__dirname, 'hmda-projects-150-final.json');
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`\n✅ Final data saved to: ${outputFile}`);
  
  // Generate final CSV
  console.log('\nGenerating final CSV...');
  const csvHeaders = [
    'Project ID',
    'Project Name',
    'Work Description',
    'Category',
    'Sub Category',
    'Work Type',
    'Current Stage',
    'Total Budget (₹)',
    'Physical Progress (%)',
    'Financial Progress (%)',
    'Risk Level',
    'Circle',
    'Village',
    'Mandal',
    'District',
    'Survey Numbers',
    'Contractor',
    'Contractor Grade',
    'Priority'
  ];
  
  const csvRows = data.projects.map((project: any) => [
    project.projectId,
    `"${project.projectName}"`,
    `"${project.nameOfWork || ''}"`,
    project.category,
    project.subCategory,
    project.workType || '',
    project.currentStage,
    project.totalBudget,
    project.physicalProgress,
    project.financialProgress,
    project.riskLevel,
    project.location.circle,
    project.location.village || project.workLocation?.village || '',
    project.location.mandal || project.workLocation?.mandal || '',
    project.workLocation?.district || '',
    `"${project.workLocation?.surveyNumbers?.join(', ') || ''}"`,
    `"${project.contractor?.name || ''}"`,
    project.contractor?.grade || '',
    project.priority
  ]);
  
  const csvContent = [
    csvHeaders.join(','),
    ...csvRows.map((row: any[]) => row.join(','))
  ].join('\n');
  
  const csvFile = path.join(__dirname, 'hmda-projects-final.csv');
  fs.writeFileSync(csvFile, csvContent);
  console.log(`✅ Final CSV saved to: ${csvFile}`);
  
  // Show sample of unique infrastructure projects
  console.log('\n📋 Sample Fixed Infrastructure Projects:');
  const infraProjects = data.projects
    .filter((p: any) => p.workType === 'INFRASTRUCTURE')
    .slice(0, 10);
  
  infraProjects.forEach((project: any, index: number) => {
    console.log(`${index + 1}. ${project.projectName} (${project.location.village})`);
  });
  
  console.log('\n🎉 Duplicate name fixing completed successfully!');
  
} catch (error) {
  console.error('Error fixing duplicates:', error);
  process.exit(1);
}