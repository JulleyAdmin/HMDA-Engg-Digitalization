// Comprehensive validation script for GO integration
import * as fs from 'fs';
import * as path from 'path';
import { validateGOFormat, validateGODate, determineApprovalAuthority } from './go-integration';
import { parseISO, format } from 'date-fns';

// Read project data with GO
const projectsFile = path.join(__dirname, 'hmda-projects-150-with-go.json');
console.log('Reading projects with GO from:', projectsFile);

try {
  const rawData = fs.readFileSync(projectsFile, 'utf8');
  const data = JSON.parse(rawData);
  
  console.log(`\nValidating GO integration for ${data.projects.length} projects...`);
  
  // Validation results
  const validationResults = {
    totalProjects: data.projects.length,
    goFormat: {
      valid: 0,
      invalid: 0,
      issues: [] as string[]
    },
    goDates: {
      valid: 0,
      invalid: 0,
      issues: [] as string[]
    },
    approvalAuthority: {
      correct: 0,
      incorrect: 0,
      issues: [] as string[]
    },
    goUniqueness: {
      totalGOs: 0,
      uniqueGOs: new Set<string>(),
      duplicates: [] as string[]
    },
    sanctionAmount: {
      appropriate: 0,
      tooLow: 0,
      tooHigh: 0,
      issues: [] as string[]
    },
    fileNumbers: {
      valid: 0,
      invalid: 0,
      uniqueFiles: new Set<string>()
    }
  };
  
  // Track GO numbers for uniqueness
  const goNumberCount = new Map<string, number>();
  
  // Validate each project
  data.projects.forEach((project: any) => {
    const go = project.governmentApproval;
    
    if (!go) {
      validationResults.goFormat.issues.push(`${project.projectId}: Missing GO details`);
      return;
    }
    
    // 1. Validate GO format
    if (go.goNumber) {
      if (validateGOFormat(go.goNumber)) {
        validationResults.goFormat.valid++;
      } else {
        validationResults.goFormat.invalid++;
        validationResults.goFormat.issues.push(`${project.projectId}: Invalid GO format - ${go.goNumber}`);
      }
      
      // Track uniqueness
      goNumberCount.set(go.goNumber, (goNumberCount.get(go.goNumber) || 0) + 1);
      validationResults.goUniqueness.totalGOs++;
      validationResults.goUniqueness.uniqueGOs.add(go.goNumber);
    }
    
    // 2. Validate GO dates
    if (go.goDate && project.timeline?.plannedStart) {
      const dateValidation = validateGODate(go.goDate, project.timeline.plannedStart);
      if (dateValidation.isValid) {
        validationResults.goDates.valid++;
      } else {
        validationResults.goDates.invalid++;
        validationResults.goDates.issues.push(
          `${project.projectId}: ${dateValidation.issues.join(', ')}`
        );
      }
    }
    
    // 3. Validate approval authority
    const budgetInCrores = project.totalBudget / 10000000;
    const expectedAuthority = determineApprovalAuthority(budgetInCrores);
    
    if (go.approvalAuthority === expectedAuthority) {
      validationResults.approvalAuthority.correct++;
    } else {
      validationResults.approvalAuthority.incorrect++;
      validationResults.approvalAuthority.issues.push(
        `${project.projectId}: Expected ${expectedAuthority} for ₹${budgetInCrores.toFixed(2)} Cr, got ${go.approvalAuthority}`
      );
    }
    
    // 4. Validate sanction amount
    if (go.sanctionedAmount && budgetInCrores) {
      const variance = ((go.sanctionedAmount - budgetInCrores) / budgetInCrores) * 100;
      
      if (variance >= 0 && variance <= 15) {
        validationResults.sanctionAmount.appropriate++;
      } else if (variance < 0) {
        validationResults.sanctionAmount.tooLow++;
        validationResults.sanctionAmount.issues.push(
          `${project.projectId}: Sanction ₹${go.sanctionedAmount} Cr less than budget ₹${budgetInCrores.toFixed(2)} Cr`
        );
      } else {
        validationResults.sanctionAmount.tooHigh++;
        validationResults.sanctionAmount.issues.push(
          `${project.projectId}: Sanction ₹${go.sanctionedAmount} Cr exceeds budget by ${variance.toFixed(1)}%`
        );
      }
    }
    
    // 5. Validate file numbers
    if (go.fileNumber) {
      validationResults.fileNumbers.valid++;
      validationResults.fileNumbers.uniqueFiles.add(go.fileNumber);
    } else {
      validationResults.fileNumbers.invalid++;
    }
  });
  
  // Check for duplicate GO numbers
  goNumberCount.forEach((count, goNumber) => {
    if (count > 1) {
      validationResults.goUniqueness.duplicates.push(`${goNumber} used ${count} times`);
    }
  });
  
  // Generate validation report
  console.log('\n=== GO INTEGRATION VALIDATION REPORT ===\n');
  
  // GO Format Validation
  console.log('1. GO Format Validation:');
  const formatScore = (validationResults.goFormat.valid / data.projects.length) * 100;
  console.log(`   ✅ Valid formats: ${validationResults.goFormat.valid}/${data.projects.length} (${formatScore.toFixed(1)}%)`);
  if (validationResults.goFormat.invalid > 0) {
    console.log(`   ❌ Invalid formats: ${validationResults.goFormat.invalid}`);
    validationResults.goFormat.issues.slice(0, 5).forEach(issue => 
      console.log(`      - ${issue}`)
    );
  }
  
  // GO Date Validation
  console.log('\n2. GO Date Validation:');
  const dateScore = (validationResults.goDates.valid / data.projects.length) * 100;
  console.log(`   ✅ Valid dates: ${validationResults.goDates.valid}/${data.projects.length} (${dateScore.toFixed(1)}%)`);
  if (validationResults.goDates.invalid > 0) {
    console.log(`   ❌ Invalid dates: ${validationResults.goDates.invalid}`);
    validationResults.goDates.issues.slice(0, 5).forEach(issue => 
      console.log(`      - ${issue}`)
    );
  }
  
  // Approval Authority Validation
  console.log('\n3. Approval Authority Validation:');
  const authorityScore = (validationResults.approvalAuthority.correct / data.projects.length) * 100;
  console.log(`   ✅ Correct authorities: ${validationResults.approvalAuthority.correct}/${data.projects.length} (${authorityScore.toFixed(1)}%)`);
  if (validationResults.approvalAuthority.incorrect > 0) {
    console.log(`   ❌ Incorrect authorities: ${validationResults.approvalAuthority.incorrect}`);
    validationResults.approvalAuthority.issues.slice(0, 5).forEach(issue => 
      console.log(`      - ${issue}`)
    );
  }
  
  // GO Uniqueness
  console.log('\n4. GO Number Uniqueness:');
  console.log(`   Total GOs: ${validationResults.goUniqueness.totalGOs}`);
  console.log(`   Unique GOs: ${validationResults.goUniqueness.uniqueGOs.size}`);
  const uniquenessScore = (validationResults.goUniqueness.uniqueGOs.size / validationResults.goUniqueness.totalGOs) * 100;
  console.log(`   ✅ Uniqueness: ${uniquenessScore.toFixed(1)}%`);
  if (validationResults.goUniqueness.duplicates.length > 0) {
    console.log(`   ❌ Duplicates found:`);
    validationResults.goUniqueness.duplicates.forEach(dup => 
      console.log(`      - ${dup}`)
    );
  }
  
  // Sanction Amount Validation
  console.log('\n5. Sanction Amount Validation:');
  console.log(`   ✅ Appropriate (0-15% variance): ${validationResults.sanctionAmount.appropriate}`);
  console.log(`   ⚠️ Too low: ${validationResults.sanctionAmount.tooLow}`);
  console.log(`   ⚠️ Too high: ${validationResults.sanctionAmount.tooHigh}`);
  if (validationResults.sanctionAmount.issues.length > 0) {
    console.log(`   Issues:`);
    validationResults.sanctionAmount.issues.slice(0, 5).forEach(issue => 
      console.log(`      - ${issue}`)
    );
  }
  
  // File Numbers
  console.log('\n6. File Number Validation:');
  console.log(`   ✅ Projects with file numbers: ${validationResults.fileNumbers.valid}`);
  console.log(`   ✅ Unique file numbers: ${validationResults.fileNumbers.uniqueFiles.size}`);
  
  // Additional Analysis
  console.log('\n=== ADDITIONAL GO ANALYSIS ===\n');
  
  // GO pattern distribution
  const goPatterns = new Map<string, number>();
  data.projects.forEach((project: any) => {
    if (project.governmentApproval?.goNumber) {
      const pattern = project.governmentApproval.goNumber.split('.No.')[0];
      goPatterns.set(pattern, (goPatterns.get(pattern) || 0) + 1);
    }
  });
  
  console.log('GO Pattern Distribution:');
  Array.from(goPatterns.entries())
    .sort(([,a], [,b]) => b - a)
    .forEach(([pattern, count]) => {
      console.log(`   ${pattern}: ${count} (${((count / data.projects.length) * 100).toFixed(1)}%)`);
    });
  
  // Financial year analysis
  const fyDistribution = new Map<string, number>();
  data.projects.forEach((project: any) => {
    if (project.governmentApproval?.financialYear) {
      const fy = project.governmentApproval.financialYear;
      fyDistribution.set(fy, (fyDistribution.get(fy) || 0) + 1);
    }
  });
  
  console.log('\nFinancial Year Distribution:');
  Array.from(fyDistribution.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .forEach(([fy, count]) => {
      console.log(`   FY ${fy}: ${count} projects`);
    });
  
  // Authority distribution
  const authorityDistribution = new Map<string, number>();
  data.projects.forEach((project: any) => {
    if (project.governmentApproval?.approvalAuthority) {
      const auth = project.governmentApproval.approvalAuthority;
      authorityDistribution.set(auth, (authorityDistribution.get(auth) || 0) + 1);
    }
  });
  
  console.log('\nApproval Authority Distribution:');
  Array.from(authorityDistribution.entries())
    .sort(([,a], [,b]) => b - a)
    .forEach(([auth, count]) => {
      console.log(`   ${auth}: ${count} projects (${((count / data.projects.length) * 100).toFixed(1)}%)`);
    });
  
  // Calculate overall validation score
  const overallScore = (
    formatScore * 0.25 +
    dateScore * 0.25 +
    authorityScore * 0.25 +
    uniquenessScore * 0.25
  );
  
  console.log('\n=== FINAL VALIDATION RESULT ===');
  console.log(`\nOverall Validation Score: ${overallScore.toFixed(1)}%`);
  
  if (overallScore >= 95) {
    console.log('\n✅ GO INTEGRATION VALIDATION PASSED!');
    console.log('All projects have valid GO references with proper format, dates, and authorities.');
  } else {
    console.log('\n⚠️ GO INTEGRATION NEEDS ATTENTION');
    console.log(`Current score: ${overallScore.toFixed(1)}% (Target: 95%+)`);
  }
  
  // Save validation report
  const reportFile = path.join(__dirname, 'go-validation-report.json');
  fs.writeFileSync(reportFile, JSON.stringify(validationResults, null, 2));
  console.log(`\n📄 Detailed validation report saved to: ${reportFile}`);
  
  // Show sample valid GOs
  console.log('\n📋 Sample Valid GO Integrations:');
  data.projects.slice(0, 5).forEach((project: any, index: number) => {
    const go = project.governmentApproval;
    console.log(`\n${index + 1}. ${project.projectId} - ${project.projectName}`);
    console.log(`   GO: ${go.goNumber} dated ${go.goDate}`);
    console.log(`   Authority: ${go.approvalAuthority} (Budget: ₹${(project.totalBudget / 10000000).toFixed(2)} Cr)`);
    console.log(`   File: ${go.fileNumber}`);
  });
  
} catch (error) {
  console.error('Error validating GO integration:', error);
  process.exit(1);
}