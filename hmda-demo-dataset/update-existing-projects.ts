// Script to update existing 150 projects with realistic names
import * as fs from 'fs';
import * as path from 'path';
import { 
  updateProjectWithRealisticName, 
  validateProjectNames,
  generateNameStatistics,
  clearUsedNamesCache
} from './project-name-generator';
import { ProjectCategory, ProjectSubCategory } from './enhanced-project-schema';

// Read existing project data
const projectsFile = path.join(__dirname, 'hmda-projects-150.json');
console.log('Reading existing projects from:', projectsFile);

try {
  const rawData = fs.readFileSync(projectsFile, 'utf8');
  const data = JSON.parse(rawData);
  
  console.log(`\nFound ${data.projects.length} projects to update`);
  
  // Clear name cache to ensure fresh generation
  clearUsedNamesCache();
  
  // Update each project with realistic names
  console.log('\nUpdating project names...');
  const updatedProjects = data.projects.map((project: any, index: number) => {
    // Extract category and subcategory
    const category = project.category as ProjectCategory;
    const subCategory = project.subCategory as ProjectSubCategory;
    
    // Update project with realistic name
    const updated = updateProjectWithRealisticName(project, category, subCategory);
    
    // Progress indicator
    if ((index + 1) % 10 === 0) {
      console.log(`  Updated ${index + 1} projects...`);
    }
    
    return updated;
  });
  
  console.log('\n✅ All projects updated with realistic names');
  
  // Validate for duplicates
  console.log('\nValidating project names...');
  const validation = validateProjectNames(updatedProjects);
  
  if (validation.isValid) {
    console.log('✅ Validation passed - No duplicate names found');
  } else {
    console.log('❌ Validation failed');
    if (validation.duplicates.length > 0) {
      console.log('Duplicates found:', validation.duplicates);
    }
    if (validation.issues.length > 0) {
      console.log('Issues found:', validation.issues);
    }
  }
  
  // Generate statistics
  console.log('\nGenerating statistics...');
  const stats = generateNameStatistics(updatedProjects);
  
  console.log(`\nProject Name Statistics:`);
  console.log(`- Total Projects: ${stats.totalProjects}`);
  console.log(`- Unique Names: ${stats.uniqueNames}`);
  console.log(`- Uniqueness Rate: ${((stats.uniqueNames / stats.totalProjects) * 100).toFixed(1)}%`);
  
  console.log(`\nTop 10 Villages by Project Count:`);
  Object.entries(stats.villageDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([village, count], index) => {
      console.log(`  ${index + 1}. ${village}: ${count} projects`);
    });
  
  console.log(`\nTop 10 Mandals by Project Count:`);
  Object.entries(stats.mandalDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([mandal, count], index) => {
      console.log(`  ${index + 1}. ${mandal}: ${count} projects`);
    });
  
  console.log(`\nWork Type Distribution:`);
  Object.entries(stats.workTypeDistribution)
    .sort(([,a], [,b]) => b - a)
    .forEach(([workType, count]) => {
      console.log(`  ${workType}: ${count} projects (${((count / stats.totalProjects) * 100).toFixed(1)}%)`);
    });
  
  // Save updated data
  const updatedData = {
    ...data,
    projects: updatedProjects,
    metadata: {
      ...data.metadata,
      lastUpdated: new Date().toISOString(),
      version: '2.0',
      enhancements: [
        'Realistic project names based on HMDA locations',
        'Village and mandal references added',
        'Survey numbers included',
        'Work descriptions matching HMDA patterns'
      ]
    }
  };
  
  // Write updated JSON file
  const outputFile = path.join(__dirname, 'hmda-projects-150-enhanced.json');
  fs.writeFileSync(outputFile, JSON.stringify(updatedData, null, 2));
  console.log(`\n✅ Enhanced data saved to: ${outputFile}`);
  
  // Also create a CSV with enhanced data
  console.log('\nGenerating enhanced CSV...');
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
  
  const csvRows = updatedProjects.map((project: any) => [
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
  
  const csvFile = path.join(__dirname, 'hmda-projects-enhanced.csv');
  fs.writeFileSync(csvFile, csvContent);
  console.log(`✅ Enhanced CSV saved to: ${csvFile}`);
  
  // Show sample of updated projects
  console.log('\n📋 Sample Updated Projects:');
  updatedProjects.slice(0, 5).forEach((project: any, index: number) => {
    console.log(`\n${index + 1}. ${project.projectId}`);
    console.log(`   Name: ${project.projectName}`);
    console.log(`   Work: ${project.nameOfWork?.substring(0, 80)}...`);
    console.log(`   Location: ${project.location.village}, ${project.location.mandal}`);
    console.log(`   Survey Nos: ${project.workLocation?.surveyNumbers?.join(', ') || 'N/A'}`);
  });
  
  console.log('\n🎉 Project name enhancement completed successfully!');
  
} catch (error) {
  console.error('Error updating projects:', error);
  process.exit(1);
}