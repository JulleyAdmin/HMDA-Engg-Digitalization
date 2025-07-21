// Comprehensive validation script for document numbering
import * as fs from 'fs';
import * as path from 'path';
import { validateDocumentNumber, parseDocumentNumber } from './document-numbering';
import { parseISO, isAfter, isBefore } from 'date-fns';

// Read project data with documents
const projectsFile = path.join(__dirname, 'hmda-projects-150-with-documents.json');
console.log('Reading projects with documents from:', projectsFile);

try {
  const rawData = fs.readFileSync(projectsFile, 'utf8');
  const data = JSON.parse(rawData);
  
  console.log(`\nValidating document numbering for ${data.projects.length} projects...`);
  
  // Validation results
  const validationResults = {
    totalProjects: data.projects.length,
    documentFormat: {
      valid: 0,
      invalid: 0,
      issues: [] as string[]
    },
    documentUniqueness: {
      totalDocuments: 0,
      uniqueDocuments: new Set<string>(),
      duplicates: [] as string[]
    },
    chronology: {
      correct: 0,
      incorrect: 0,
      issues: [] as string[]
    },
    divisionConsistency: {
      consistent: 0,
      inconsistent: 0,
      issues: [] as string[]
    },
    stageAlignment: {
      correct: 0,
      incorrect: 0,
      issues: [] as string[]
    },
    documentCompleteness: {
      complete: 0,
      incomplete: 0,
      issues: [] as string[]
    }
  };
  
  // Track all document numbers
  const allDocumentNumbers = new Set<string>();
  const documentNumberUsage = new Map<string, number>();
  
  // Validate each project
  data.projects.forEach((project: any) => {
    const docs = project.documents;
    if (!docs) {
      validationResults.documentCompleteness.incomplete++;
      validationResults.documentCompleteness.issues.push(`${project.projectId}: No documents found`);
      return;
    }
    
    let projectValid = true;
    let projectDocumentCount = 0;
    const projectIssues: string[] = [];
    
    // Validate Administrative Approval
    if (docs.administrativeApproval) {
      const aa = docs.administrativeApproval;
      projectDocumentCount++;
      
      if (validateDocumentNumber(aa.formatted)) {
        validationResults.documentFormat.valid++;
        
        // Check uniqueness
        if (allDocumentNumbers.has(aa.formatted)) {
          validationResults.documentUniqueness.duplicates.push(aa.formatted);
        }
        allDocumentNumbers.add(aa.formatted);
        
        // Check division consistency
        const parsed = parseDocumentNumber(aa.formatted);
        if (parsed && parsed.division !== project.divisionNumber) {
          validationResults.divisionConsistency.inconsistent++;
          projectIssues.push(`AA division mismatch: ${parsed.division} vs ${project.divisionNumber}`);
        }
      } else {
        validationResults.documentFormat.invalid++;
        projectIssues.push(`Invalid AA format: ${aa.formatted}`);
        projectValid = false;
      }
    }
    
    // Validate Technical Sanction
    if (docs.technicalSanction) {
      const ts = docs.technicalSanction;
      projectDocumentCount++;
      
      if (validateDocumentNumber(ts.formatted)) {
        validationResults.documentFormat.valid++;
        
        // Check uniqueness
        if (allDocumentNumbers.has(ts.formatted)) {
          validationResults.documentUniqueness.duplicates.push(ts.formatted);
        }
        allDocumentNumbers.add(ts.formatted);
        
        // Check chronology - TS should be after AA
        if (docs.administrativeApproval) {
          const aaParsed = parseDocumentNumber(docs.administrativeApproval.formatted);
          const tsParsed = parseDocumentNumber(ts.formatted);
          if (aaParsed && tsParsed && aaParsed.serial > tsParsed.serial) {
            validationResults.chronology.incorrect++;
            projectIssues.push('TS serial number before AA');
          }
        }
      } else {
        validationResults.documentFormat.invalid++;
        projectIssues.push(`Invalid TS format: ${ts.formatted}`);
        projectValid = false;
      }
    }
    
    // Validate Tender Documents
    if (docs.tender && Object.keys(docs.tender).length > 0) {
      ['nit', 'tenderNotice', 'bidDocument'].forEach(key => {
        if (docs.tender[key]) {
          const doc = docs.tender[key];
          projectDocumentCount++;
          
          if (validateDocumentNumber(doc.formatted)) {
            validationResults.documentFormat.valid++;
            
            // Check uniqueness
            if (allDocumentNumbers.has(doc.formatted)) {
              validationResults.documentUniqueness.duplicates.push(doc.formatted);
            }
            allDocumentNumbers.add(doc.formatted);
          } else {
            validationResults.documentFormat.invalid++;
            projectIssues.push(`Invalid ${key} format: ${doc.formatted}`);
            projectValid = false;
          }
        }
      });
      
      // Check stage alignment
      if (project.currentStage === 'Planning' || project.currentStage === 'Approval') {
        validationResults.stageAlignment.incorrect++;
        projectIssues.push(`Tender documents present but stage is ${project.currentStage}`);
      } else {
        validationResults.stageAlignment.correct++;
      }
    }
    
    // Validate Agreement Documents
    if (docs.agreement && Object.keys(docs.agreement).length > 0) {
      ['loa', 'agreement', 'workOrder'].forEach(key => {
        if (docs.agreement[key]) {
          const doc = docs.agreement[key];
          projectDocumentCount++;
          
          if (validateDocumentNumber(doc.formatted)) {
            validationResults.documentFormat.valid++;
            
            // Check uniqueness
            if (allDocumentNumbers.has(doc.formatted)) {
              validationResults.documentUniqueness.duplicates.push(doc.formatted);
            }
            allDocumentNumbers.add(doc.formatted);
          } else {
            validationResults.documentFormat.invalid++;
            projectIssues.push(`Invalid ${key} format: ${doc.formatted}`);
            projectValid = false;
          }
        }
      });
      
      // Check stage alignment
      if (project.currentStage === 'Planning' || project.currentStage === 'Approval' || project.currentStage === 'Pre-construction' || project.currentStage === 'Tender') {
        validationResults.stageAlignment.incorrect++;
        projectIssues.push(`Agreement documents present but stage is ${project.currentStage}`);
      }
    }
    
    // Validate Progress Reports
    if (docs.progress && Array.isArray(docs.progress)) {
      docs.progress.forEach((report: any, index: number) => {
        projectDocumentCount++;
        
        if (validateDocumentNumber(report.formatted)) {
          validationResults.documentFormat.valid++;
          
          // Check uniqueness
          if (allDocumentNumbers.has(report.formatted)) {
            validationResults.documentUniqueness.duplicates.push(report.formatted);
          }
          allDocumentNumbers.add(report.formatted);
        } else {
          validationResults.documentFormat.invalid++;
          projectIssues.push(`Invalid progress report ${index} format: ${report.formatted}`);
          projectValid = false;
        }
      });
    }
    
    // Validate Quality Documents
    if (docs.quality && Array.isArray(docs.quality)) {
      docs.quality.forEach((report: any, index: number) => {
        projectDocumentCount++;
        
        if (validateDocumentNumber(report.formatted)) {
          validationResults.documentFormat.valid++;
          
          // Check uniqueness
          if (allDocumentNumbers.has(report.formatted)) {
            validationResults.documentUniqueness.duplicates.push(report.formatted);
          }
          allDocumentNumbers.add(report.formatted);
        } else {
          validationResults.documentFormat.invalid++;
          projectIssues.push(`Invalid quality report ${index} format: ${report.formatted}`);
          projectValid = false;
        }
      });
    }
    
    // Validate Financial Documents
    if (docs.financial && Array.isArray(docs.financial)) {
      docs.financial.forEach((bill: any, index: number) => {
        projectDocumentCount++;
        
        if (validateDocumentNumber(bill.formatted)) {
          validationResults.documentFormat.valid++;
          
          // Check uniqueness
          if (allDocumentNumbers.has(bill.formatted)) {
            validationResults.documentUniqueness.duplicates.push(bill.formatted);
          }
          allDocumentNumbers.add(bill.formatted);
        } else {
          validationResults.documentFormat.invalid++;
          projectIssues.push(`Invalid bill ${index} format: ${bill.formatted}`);
          projectValid = false;
        }
      });
    }
    
    // Validate Completion Certificate
    if (docs.completionCertificate) {
      const cc = docs.completionCertificate;
      projectDocumentCount++;
      
      if (validateDocumentNumber(cc.formatted)) {
        validationResults.documentFormat.valid++;
        
        // Check uniqueness
        if (allDocumentNumbers.has(cc.formatted)) {
          validationResults.documentUniqueness.duplicates.push(cc.formatted);
        }
        allDocumentNumbers.add(cc.formatted);
        
        // Check stage alignment
        if (project.currentStage !== 'Completion') {
          validationResults.stageAlignment.incorrect++;
          projectIssues.push(`Completion certificate present but stage is ${project.currentStage}`);
        }
      } else {
        validationResults.documentFormat.invalid++;
        projectIssues.push(`Invalid CC format: ${cc.formatted}`);
        projectValid = false;
      }
    }
    
    // Update validation counts
    validationResults.documentUniqueness.totalDocuments += projectDocumentCount;
    
    if (projectValid && projectIssues.length === 0) {
      validationResults.documentCompleteness.complete++;
      validationResults.chronology.correct++;
      validationResults.divisionConsistency.consistent++;
    } else {
      if (projectIssues.length > 0) {
        validationResults.documentCompleteness.issues.push(
          `${project.projectId}: ${projectIssues.join(', ')}`
        );
      }
    }
  });
  
  // Calculate uniqueness
  validationResults.documentUniqueness.uniqueDocuments = allDocumentNumbers;
  
  // Generate validation report
  console.log('\n=== DOCUMENT NUMBERING VALIDATION REPORT ===\n');
  
  // Document Format Validation
  console.log('1. Document Format Validation:');
  const formatScore = (validationResults.documentFormat.valid / 
    (validationResults.documentFormat.valid + validationResults.documentFormat.invalid)) * 100;
  console.log(`   ✅ Valid formats: ${validationResults.documentFormat.valid}`);
  console.log(`   ❌ Invalid formats: ${validationResults.documentFormat.invalid}`);
  console.log(`   Score: ${formatScore.toFixed(1)}%`);
  if (validationResults.documentFormat.issues.length > 0) {
    console.log('   Issues:');
    validationResults.documentFormat.issues.slice(0, 5).forEach(issue => 
      console.log(`      - ${issue}`)
    );
  }
  
  // Document Uniqueness
  console.log('\n2. Document Uniqueness:');
  console.log(`   Total documents: ${validationResults.documentUniqueness.totalDocuments}`);
  console.log(`   Unique documents: ${validationResults.documentUniqueness.uniqueDocuments.size}`);
  const uniquenessScore = (validationResults.documentUniqueness.uniqueDocuments.size / 
    validationResults.documentUniqueness.totalDocuments) * 100;
  console.log(`   ✅ Uniqueness: ${uniquenessScore.toFixed(1)}%`);
  if (validationResults.documentUniqueness.duplicates.length > 0) {
    console.log(`   ❌ Duplicates found: ${validationResults.documentUniqueness.duplicates.length}`);
  }
  
  // Document Completeness
  console.log('\n3. Document Completeness:');
  const completenessScore = (validationResults.documentCompleteness.complete / 
    data.projects.length) * 100;
  console.log(`   ✅ Complete: ${validationResults.documentCompleteness.complete}/${data.projects.length} projects`);
  console.log(`   ❌ Incomplete: ${validationResults.documentCompleteness.incomplete} projects`);
  console.log(`   Score: ${completenessScore.toFixed(1)}%`);
  
  // Stage Alignment
  console.log('\n4. Stage Alignment:');
  const stageScore = ((validationResults.stageAlignment.correct) / 
    data.projects.length) * 100;
  console.log(`   ✅ Correct alignment: ${validationResults.stageAlignment.correct} projects`);
  console.log(`   ❌ Incorrect alignment: ${validationResults.stageAlignment.incorrect} projects`);
  console.log(`   Score: ${stageScore.toFixed(1)}%`);
  
  // Division Consistency
  console.log('\n5. Division Consistency:');
  const divisionScore = ((validationResults.divisionConsistency.consistent) / 
    data.projects.length) * 100;
  console.log(`   ✅ Consistent: ${validationResults.divisionConsistency.consistent} projects`);
  console.log(`   ❌ Inconsistent: ${validationResults.divisionConsistency.inconsistent} projects`);
  console.log(`   Score: ${divisionScore.toFixed(1)}%`);
  
  // Document Type Analysis
  console.log('\n=== DOCUMENT TYPE ANALYSIS ===\n');
  
  const documentTypeCounts = new Map<string, number>();
  data.projects.forEach((project: any) => {
    const docs = project.documents;
    if (!docs) return;
    
    if (docs.administrativeApproval) documentTypeCounts.set('AA', (documentTypeCounts.get('AA') || 0) + 1);
    if (docs.technicalSanction) documentTypeCounts.set('TS', (documentTypeCounts.get('TS') || 0) + 1);
    if (docs.tender?.nit) documentTypeCounts.set('NIT', (documentTypeCounts.get('NIT') || 0) + 1);
    if (docs.agreement?.loa) documentTypeCounts.set('LOA', (documentTypeCounts.get('LOA') || 0) + 1);
    if (docs.agreement?.agreement) documentTypeCounts.set('AGR', (documentTypeCounts.get('AGR') || 0) + 1);
    if (docs.progress?.length > 0) documentTypeCounts.set('PR', (documentTypeCounts.get('PR') || 0) + docs.progress.length);
    if (docs.quality?.length > 0) documentTypeCounts.set('QR', (documentTypeCounts.get('QR') || 0) + docs.quality.length);
    if (docs.financial?.length > 0) documentTypeCounts.set('BILL', (documentTypeCounts.get('BILL') || 0) + docs.financial.length);
    if (docs.completionCertificate) documentTypeCounts.set('CC', (documentTypeCounts.get('CC') || 0) + 1);
  });
  
  console.log('Document Type Distribution:');
  Array.from(documentTypeCounts.entries())
    .sort(([,a], [,b]) => b - a)
    .forEach(([type, count]) => {
      console.log(`   ${type}: ${count} documents`);
    });
  
  // Calculate overall validation score
  const overallScore = (
    formatScore * 0.3 +
    uniquenessScore * 0.3 +
    completenessScore * 0.2 +
    stageScore * 0.1 +
    divisionScore * 0.1
  );
  
  console.log('\n=== FINAL VALIDATION RESULT ===');
  console.log(`\nOverall Validation Score: ${overallScore.toFixed(1)}%`);
  
  if (overallScore >= 95) {
    console.log('\n✅ DOCUMENT NUMBERING VALIDATION PASSED!');
    console.log('All projects have valid document numbers with proper format and relationships.');
  } else {
    console.log('\n⚠️ DOCUMENT NUMBERING NEEDS ATTENTION');
    console.log(`Current score: ${overallScore.toFixed(1)}% (Target: 95%+)`);
  }
  
  // Save validation report
  const reportFile = path.join(__dirname, 'document-validation-report.json');
  fs.writeFileSync(reportFile, JSON.stringify(validationResults, null, 2));
  console.log(`\n📄 Detailed validation report saved to: ${reportFile}`);
  
  // Show sample projects with documents
  console.log('\n📋 Sample Projects with Valid Document Numbers:');
  data.projects.slice(0, 3).forEach((project: any, index: number) => {
    console.log(`\n${index + 1}. ${project.projectId} - ${project.projectName}`);
    console.log(`   Division: ${project.divisionNumber}`);
    if (project.documents) {
      console.log(`   Documents:`);
      if (project.documents.administrativeApproval) {
        console.log(`     - AA: ${project.documents.administrativeApproval.formatted}`);
      }
      if (project.documents.technicalSanction) {
        console.log(`     - TS: ${project.documents.technicalSanction.formatted}`);
      }
      if (project.documents.tender?.nit) {
        console.log(`     - NIT: ${project.documents.tender.nit.formatted}`);
      }
      if (project.documents.agreement?.agreement) {
        console.log(`     - Agreement: ${project.documents.agreement.agreement.formatted}`);
      }
      console.log(`   Total: ${project.documentCount || 0} documents`);
    }
  });
  
} catch (error) {
  console.error('Error validating document numbers:', error);
  process.exit(1);
}