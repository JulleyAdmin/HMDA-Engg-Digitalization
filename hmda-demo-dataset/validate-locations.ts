// Comprehensive validation script for location references
import * as fs from 'fs';
import * as path from 'path';
import { isValidHMDALocation, HMDALocationsDatabase } from './hmda-locations-database';

// Read final project data
const projectsFile = path.join(__dirname, 'hmda-projects-150-final.json');
console.log('Reading final projects from:', projectsFile);

try {
  const rawData = fs.readFileSync(projectsFile, 'utf8');
  const data = JSON.parse(rawData);
  
  console.log(`\nValidating locations for ${data.projects.length} projects...`);
  
  // Validation results
  const validationResults = {
    totalProjects: data.projects.length,
    validLocations: 0,
    invalidLocations: 0,
    locationIssues: [] as string[],
    missingData: [] as string[],
    circleValidation: {
      C1: { expected: 0, actual: 0 },
      C2: { expected: 0, actual: 0 },
      C3: { expected: 0, actual: 0 },
      C4: { expected: 0, actual: 0 },
      C5: { expected: 0, actual: 0 }
    }
  };
  
  // Validate each project
  data.projects.forEach((project: any) => {
    const village = project.location?.village || project.workLocation?.village;
    const mandal = project.location?.mandal || project.workLocation?.mandal;
    const circle = project.location?.circle;
    
    // Check for missing location data
    if (!village) {
      validationResults.missingData.push(`${project.projectId}: Missing village`);
      validationResults.invalidLocations++;
      return;
    }
    
    if (!mandal) {
      validationResults.missingData.push(`${project.projectId}: Missing mandal`);
    }
    
    if (!circle) {
      validationResults.missingData.push(`${project.projectId}: Missing circle`);
      validationResults.invalidLocations++;
      return;
    }
    
    // Validate location exists in database
    if (isValidHMDALocation(village, mandal)) {
      validationResults.validLocations++;
      
      // Verify circle assignment
      const dbLocation = HMDALocationsDatabase.find(loc => 
        loc.village === village && (!mandal || loc.mandal === mandal)
      );
      
      if (dbLocation && dbLocation.circle !== circle) {
        validationResults.locationIssues.push(
          `${project.projectId}: Circle mismatch - Expected ${dbLocation.circle}, Found ${circle}`
        );
      }
    } else {
      validationResults.invalidLocations++;
      validationResults.locationIssues.push(
        `${project.projectId}: Invalid location - ${village}, ${mandal}`
      );
    }
    
    // Count circle distribution
    if (circle && validationResults.circleValidation[circle as keyof typeof validationResults.circleValidation]) {
      validationResults.circleValidation[circle as keyof typeof validationResults.circleValidation].actual++;
    }
  });
  
  // Calculate expected circle distribution
  const totalProjects = data.projects.length;
  validationResults.circleValidation.C1.expected = Math.floor(totalProjects * 0.20); // 20%
  validationResults.circleValidation.C2.expected = Math.floor(totalProjects * 0.20); // 20%
  validationResults.circleValidation.C3.expected = Math.floor(totalProjects * 0.25); // 25%
  validationResults.circleValidation.C4.expected = Math.floor(totalProjects * 0.15); // 15%
  validationResults.circleValidation.C5.expected = Math.floor(totalProjects * 0.20); // 20%
  
  // Generate validation report
  console.log('\n=== LOCATION VALIDATION REPORT ===\n');
  
  console.log('Overall Results:');
  console.log(`✅ Valid Locations: ${validationResults.validLocations} (${((validationResults.validLocations / totalProjects) * 100).toFixed(1)}%)`);
  console.log(`❌ Invalid Locations: ${validationResults.invalidLocations} (${((validationResults.invalidLocations / totalProjects) * 100).toFixed(1)}%)`);
  
  if (validationResults.missingData.length > 0) {
    console.log(`\n⚠️ Missing Data (${validationResults.missingData.length} issues):`);
    validationResults.missingData.slice(0, 10).forEach(issue => console.log(`  - ${issue}`));
    if (validationResults.missingData.length > 10) {
      console.log(`  ... and ${validationResults.missingData.length - 10} more`);
    }
  }
  
  if (validationResults.locationIssues.length > 0) {
    console.log(`\n❌ Location Issues (${validationResults.locationIssues.length} issues):`);
    validationResults.locationIssues.slice(0, 10).forEach(issue => console.log(`  - ${issue}`));
    if (validationResults.locationIssues.length > 10) {
      console.log(`  ... and ${validationResults.locationIssues.length - 10} more`);
    }
  }
  
  console.log('\nCircle Distribution:');
  Object.entries(validationResults.circleValidation).forEach(([circle, stats]) => {
    const variance = ((stats.actual - stats.expected) / stats.expected * 100).toFixed(1);
    const status = Math.abs(parseFloat(variance)) <= 20 ? '✅' : '⚠️';
    console.log(`${status} ${circle}: ${stats.actual} projects (Expected: ~${stats.expected}, Variance: ${variance}%)`);
  });
  
  // Additional validations
  console.log('\n=== ADDITIONAL VALIDATIONS ===\n');
  
  // Check survey numbers
  let projectsWithSurveyNumbers = 0;
  let totalSurveyNumbers = 0;
  
  data.projects.forEach((project: any) => {
    const surveyNumbers = project.workLocation?.surveyNumbers;
    if (surveyNumbers && surveyNumbers.length > 0) {
      projectsWithSurveyNumbers++;
      totalSurveyNumbers += surveyNumbers.length;
    }
  });
  
  console.log('Survey Numbers:');
  console.log(`✅ Projects with survey numbers: ${projectsWithSurveyNumbers} (${((projectsWithSurveyNumbers / totalProjects) * 100).toFixed(1)}%)`);
  console.log(`✅ Average survey numbers per project: ${(totalSurveyNumbers / projectsWithSurveyNumbers).toFixed(1)}`);
  
  // Check work descriptions
  let projectsWithWorkDesc = 0;
  let avgWorkDescLength = 0;
  
  data.projects.forEach((project: any) => {
    if (project.nameOfWork && project.nameOfWork.length > 0) {
      projectsWithWorkDesc++;
      avgWorkDescLength += project.nameOfWork.length;
    }
  });
  
  avgWorkDescLength = avgWorkDescLength / projectsWithWorkDesc;
  
  console.log('\nWork Descriptions:');
  console.log(`✅ Projects with work descriptions: ${projectsWithWorkDesc} (${((projectsWithWorkDesc / totalProjects) * 100).toFixed(1)}%)`);
  console.log(`✅ Average description length: ${avgWorkDescLength.toFixed(0)} characters`);
  
  // Location diversity
  const uniqueVillages = new Set(data.projects.map((p: any) => p.location?.village || p.workLocation?.village));
  const uniqueMandals = new Set(data.projects.map((p: any) => p.location?.mandal || p.workLocation?.mandal));
  
  console.log('\nLocation Diversity:');
  console.log(`✅ Unique villages: ${uniqueVillages.size}`);
  console.log(`✅ Unique mandals: ${uniqueMandals.size}`);
  console.log(`✅ Projects per village: ${(totalProjects / uniqueVillages.size).toFixed(1)} average`);
  
  // Name pattern analysis
  const namePatterns = {
    withPhase: 0,
    withZone: 0,
    withSector: 0,
    withStretch: 0,
    withBlock: 0,
    withPart: 0
  };
  
  data.projects.forEach((project: any) => {
    const name = project.projectName;
    if (name.includes('Phase')) namePatterns.withPhase++;
    if (name.includes('Zone')) namePatterns.withZone++;
    if (name.includes('Sector')) namePatterns.withSector++;
    if (name.includes('Stretch')) namePatterns.withStretch++;
    if (name.includes('Block')) namePatterns.withBlock++;
    if (name.includes('Part')) namePatterns.withPart++;
  });
  
  console.log('\nName Pattern Usage:');
  Object.entries(namePatterns).forEach(([pattern, count]) => {
    if (count > 0) {
      console.log(`  ${pattern}: ${count} projects (${((count / totalProjects) * 100).toFixed(1)}%)`);
    }
  });
  
  // Final verdict
  console.log('\n=== FINAL VALIDATION RESULT ===');
  
  const validationScore = (validationResults.validLocations / totalProjects) * 100;
  const hasAllWorkDesc = projectsWithWorkDesc === totalProjects;
  const hasSufficientDiversity = uniqueVillages.size >= 20 && uniqueMandals.size >= 10;
  
  if (validationScore >= 95 && hasAllWorkDesc && hasSufficientDiversity) {
    console.log('\n✅ VALIDATION PASSED!');
    console.log('All projects have realistic HMDA locations with proper village/mandal references.');
  } else {
    console.log('\n⚠️ VALIDATION NEEDS ATTENTION');
    if (validationScore < 95) {
      console.log(`- Location validation score: ${validationScore.toFixed(1)}% (Target: 95%+)`);
    }
    if (!hasAllWorkDesc) {
      console.log('- Some projects missing work descriptions');
    }
    if (!hasSufficientDiversity) {
      console.log('- Insufficient location diversity');
    }
  }
  
  // Save validation report
  const reportFile = path.join(__dirname, 'location-validation-report.json');
  fs.writeFileSync(reportFile, JSON.stringify(validationResults, null, 2));
  console.log(`\n📄 Detailed validation report saved to: ${reportFile}`);
  
} catch (error) {
  console.error('Error validating locations:', error);
  process.exit(1);
}