// Script to update all projects with HMDA document numbers
import * as fs from 'fs';
import * as path from 'path';
import { 
  generateDocumentNumber,
  generateTenderDocuments,
  generateAgreementDocuments,
  generateTechnicalSanctionDocument,
  generateAdministrativeApprovalDocument,
  generateProgressReportDocument,
  generateQualityDocuments,
  generateBillDocument,
  generateCompletionCertificate,
  resetDocumentSerials,
  DEPARTMENT_CODES,
  DocumentType
} from './document-numbering';
import { format, addDays, subDays } from 'date-fns';

// Read project data with GO
const projectsFile = path.join(__dirname, 'hmda-projects-150-with-go.json');
console.log('Reading projects from:', projectsFile);

try {
  const rawData = fs.readFileSync(projectsFile, 'utf8');
  const data = JSON.parse(rawData);
  
  console.log(`\nFound ${data.projects.length} projects to update with document numbers`);
  
  // Reset document serials for fresh generation
  resetDocumentSerials();
  
  // Statistics tracking
  let totalDocuments = 0;
  const documentTypeCount: Record<string, number> = {};
  const divisionDocumentCount: Record<string, number> = {};
  
  // Update each project with document numbers
  console.log('\nGenerating document numbers...');
  
  const updatedProjects = data.projects.map((project: any, index: number) => {
    const division = project.divisionNumber || 'I';
    const startDate = new Date(project.timeline?.plannedStart || '2024-01-01');
    
    // Initialize documents object
    const documents: any = {
      administrativeApproval: null,
      technicalSanction: null,
      tender: {},
      agreement: {},
      progress: [],
      quality: [],
      financial: []
    };
    
    // Track division
    divisionDocumentCount[division] = (divisionDocumentCount[division] || 0) + 1;
    
    // 1. Administrative Approval (before project start)
    const aaDate = subDays(startDate, 30);
    documents.administrativeApproval = generateAdministrativeApprovalDocument(division, aaDate);
    totalDocuments++;
    documentTypeCount['AA'] = (documentTypeCount['AA'] || 0) + 1;
    
    // 2. Technical Sanction (after AA, before tender)
    const tsDate = subDays(startDate, 15);
    documents.technicalSanction = generateTechnicalSanctionDocument(division, tsDate);
    totalDocuments++;
    documentTypeCount['TS'] = (documentTypeCount['TS'] || 0) + 1;
    
    // 3. Tender Documents (for projects in tender stage or beyond)
    if (['Pre-construction', 'Tender', 'Agreement', 'Construction', 'Completion'].includes(project.currentStage)) {
      const tenderDate = addDays(startDate, 30);
      const tenderDocs = generateTenderDocuments(division, tenderDate);
      documents.tender = {
        ...tenderDocs,
        tenderDate: format(tenderDate, 'yyyy-MM-dd'),
        prebidDate: format(addDays(tenderDate, 7), 'yyyy-MM-dd'),
        bidOpeningDate: format(addDays(tenderDate, 21), 'yyyy-MM-dd')
      };
      
      totalDocuments += Object.keys(tenderDocs).length;
      Object.keys(tenderDocs).forEach(key => {
        const docType = tenderDocs[key as keyof typeof tenderDocs].documentType;
        documentTypeCount[docType] = (documentTypeCount[docType] || 0) + 1;
      });
    }
    
    // 4. Agreement Documents (for projects in agreement stage or beyond)
    if (['Agreement', 'Construction', 'Completion'].includes(project.currentStage)) {
      const agreementDate = addDays(startDate, 60);
      const agreementDocs = generateAgreementDocuments(division, agreementDate);
      documents.agreement = {
        ...agreementDocs,
        agreementDate: format(agreementDate, 'yyyy-MM-dd'),
        workOrderDate: format(addDays(agreementDate, 7), 'yyyy-MM-dd')
      };
      
      totalDocuments += Object.keys(agreementDocs).length;
      Object.keys(agreementDocs).forEach(key => {
        const docType = agreementDocs[key as keyof typeof agreementDocs].documentType;
        documentTypeCount[docType] = (documentTypeCount[docType] || 0) + 1;
      });
    }
    
    // 5. Progress Reports (for projects in construction)
    if (['Construction', 'Completion'].includes(project.currentStage)) {
      const progressCount = Math.floor(project.physicalProgress / 25);
      for (let i = 0; i < progressCount; i++) {
        const reportDate = addDays(startDate, 90 + (i * 90));
        const progressReport = generateProgressReportDocument(division, reportDate);
        documents.progress.push({
          ...progressReport,
          reportDate: format(reportDate, 'yyyy-MM-dd'),
          progressPercentage: (i + 1) * 25
        });
        totalDocuments++;
        documentTypeCount['PR'] = (documentTypeCount['PR'] || 0) + 1;
      }
    }
    
    // 6. Quality Documents (for projects with >50% progress)
    if (project.physicalProgress >= 50) {
      const qualityDate = addDays(startDate, 180);
      const qualityDocs = generateQualityDocuments(division, qualityDate);
      documents.quality = Object.entries(qualityDocs).map(([key, doc]) => ({
        ...doc,
        inspectionDate: format(qualityDate, 'yyyy-MM-dd'),
        type: key
      }));
      
      totalDocuments += Object.keys(qualityDocs).length;
      Object.keys(qualityDocs).forEach(key => {
        const docType = qualityDocs[key as keyof typeof qualityDocs].documentType;
        documentTypeCount[docType] = (documentTypeCount[docType] || 0) + 1;
      });
    }
    
    // 7. Financial Documents (bills based on progress)
    if (project.physicalProgress > 0) {
      const billCount = Math.floor(project.physicalProgress / 20);
      for (let i = 0; i < billCount; i++) {
        const billDate = addDays(startDate, 120 + (i * 60));
        const bill = generateBillDocument(division, billDate, false);
        documents.financial.push({
          ...bill,
          billDate: format(billDate, 'yyyy-MM-dd'),
          billType: 'Running Account',
          billNumber: i + 1
        });
        totalDocuments++;
        documentTypeCount['BILL'] = (documentTypeCount['BILL'] || 0) + 1;
      }
    }
    
    // 8. Completion Certificate (for completed projects)
    if (project.currentStage === 'Completion' && project.physicalProgress >= 95) {
      const completionDate = project.timeline?.actualEnd || addDays(startDate, 365);
      documents.completionCertificate = generateCompletionCertificate(division, completionDate);
      totalDocuments++;
      documentTypeCount['CC'] = (documentTypeCount['CC'] || 0) + 1;
    }
    
    // Update project with documents
    const updated = {
      ...project,
      documents: documents,
      documentCount: totalDocuments
    };
    
    // Progress indicator
    if ((index + 1) % 10 === 0) {
      console.log(`  Processed ${index + 1} projects...`);
    }
    
    return updated;
  });
  
  console.log('\n✅ All projects updated with document numbers');
  
  // Statistics
  console.log('\nDocument Generation Statistics:');
  console.log(`Total documents generated: ${totalDocuments}`);
  console.log(`Average documents per project: ${(totalDocuments / data.projects.length).toFixed(1)}`);
  
  console.log('\nDocument Type Distribution:');
  Object.entries(documentTypeCount)
    .sort(([,a], [,b]) => b - a)
    .forEach(([type, count]) => {
      console.log(`  ${type}: ${count} documents`);
    });
  
  console.log('\nDivision-wise Document Count:');
  Object.entries(divisionDocumentCount)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([division, count]) => {
      console.log(`  Division ${division}: ${count} projects`);
    });
  
  // Update metadata
  data.metadata = {
    ...data.metadata,
    lastUpdated: new Date().toISOString(),
    documentNumbering: {
      totalDocuments: totalDocuments,
      averagePerProject: (totalDocuments / data.projects.length).toFixed(1),
      documentTypes: Object.keys(documentTypeCount).length
    }
  };
  
  // Save updated data
  const outputFile = path.join(__dirname, 'hmda-projects-150-with-documents.json');
  fs.writeFileSync(outputFile, JSON.stringify({...data, projects: updatedProjects}, null, 2));
  console.log(`\n✅ Enhanced data with document numbers saved to: ${outputFile}`);
  
  // Generate document summary CSV
  console.log('\nGenerating document summary CSV...');
  const csvHeaders = [
    'Project ID',
    'Project Name',
    'Division',
    'AA Number',
    'TS Number',
    'NIT Number',
    'LOA Number',
    'Agreement Number',
    'Progress Reports',
    'Quality Reports',
    'Bills Generated',
    'Completion Certificate',
    'Total Documents'
  ];
  
  const csvRows = updatedProjects.map((project: any) => {
    const docs = project.documents;
    return [
      project.projectId,
      `"${project.projectName}"`,
      project.divisionNumber || '',
      docs.administrativeApproval?.formatted || '',
      docs.technicalSanction?.formatted || '',
      docs.tender?.nit?.formatted || '',
      docs.agreement?.loa?.formatted || '',
      docs.agreement?.agreement?.formatted || '',
      docs.progress?.length || 0,
      docs.quality?.length || 0,
      docs.financial?.length || 0,
      docs.completionCertificate?.formatted || '',
      project.documentCount || 0
    ];
  });
  
  const csvContent = [
    csvHeaders.join(','),
    ...csvRows.map((row: any[]) => row.join(','))
  ].join('\n');
  
  const csvFile = path.join(__dirname, 'hmda-projects-document-summary.csv');
  fs.writeFileSync(csvFile, csvContent);
  console.log(`✅ Document summary CSV saved to: ${csvFile}`);
  
  // Show sample projects with documents
  console.log('\n📋 Sample Projects with Document Numbers:');
  updatedProjects.slice(0, 3).forEach((project: any, index: number) => {
    console.log(`\n${index + 1}. ${project.projectId} - ${project.projectName}`);
    console.log(`   Division: ${project.divisionNumber}`);
    console.log(`   AA: ${project.documents.administrativeApproval?.formatted}`);
    console.log(`   TS: ${project.documents.technicalSanction?.formatted}`);
    if (project.documents.tender?.nit) {
      console.log(`   NIT: ${project.documents.tender.nit.formatted}`);
    }
    if (project.documents.agreement?.agreement) {
      console.log(`   Agreement: ${project.documents.agreement.agreement.formatted}`);
    }
    console.log(`   Total Documents: ${project.documentCount}`);
  });
  
  console.log('\n🎉 Document numbering implementation completed successfully!');
  
} catch (error) {
  console.error('Error updating projects with document numbers:', error);
  process.exit(1);
}