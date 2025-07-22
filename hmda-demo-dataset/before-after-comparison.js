const fs = require('fs');

// Load both datasets
const originalData = JSON.parse(fs.readFileSync('./hmda-projects-150-with-documents.json', 'utf8'));
const alignedData = JSON.parse(fs.readFileSync('./hmda-projects-150-master-aligned.json', 'utf8'));

console.log('HMDA Master Data Alignment - Before & After Comparison');
console.log('=====================================================\n');

// Pick a sample project (first one)
const originalProject = originalData.projects[0];
const alignedProject = alignedData.projects[0];

console.log('BEFORE ALIGNMENT (Original Format):');
console.log('----------------------------------');
console.log(`Project ID: ${originalProject.projectId}`);
console.log(`Project Name: ${originalProject.projectName}`);
console.log(`Category: ${originalProject.category}`);
console.log(`Location: ${originalProject.location.locality}, ${originalProject.location.ward}`);
console.log(`Budget: ₹${originalProject.totalBudget.toLocaleString('en-IN')}`);
console.log(`Contractor: ${originalProject.contractor?.name}`);
console.log(`GO Number: ${originalProject.goNumber}`);
console.log(`AS File No: ${originalProject.asFileNo}`);

console.log('\n\nAFTER ALIGNMENT (HMDA Master Data Format):');
console.log('-----------------------------------------');
console.log(`S. No: ${alignedProject.serialNumber}`);
console.log(`Division No: ${alignedProject.divisionNumber}`);
console.log(`Name of the Project: ${alignedProject.nameOfProject}`);
console.log(`Type of Work: ${alignedProject.typeOfWork}`);
console.log(`Name of the Work: ${alignedProject.nameOfWork}`);
console.log(`AS Financial Year: ${alignedProject.asFinancialYear}`);
console.log(`AS File No: ${alignedProject.asFileNumber}`);
console.log(`AS to MC or Govt: ${alignedProject.asApprovalAuthority}`);
console.log(`Estimate Amount (Rs. in Crs): ₹${alignedProject.estimateAmountCrores} Cr`);
console.log(`ECV (Rs. in Crs): ₹${alignedProject.ecvCrores} Cr`);
console.log(`Name of the Agency: ${alignedProject.contractor?.nameOfAgency}`);
console.log(`Tender Notice Details: ${alignedProject.tenderNoticeDetails.number} dt. ${alignedProject.tenderNoticeDetails.date}`);
console.log(`LOA No & Date: ${alignedProject.loaDetails.number} dt. ${alignedProject.loaDetails.date}`);
console.log(`Agreement No: ${alignedProject.agreementNumber}`);
console.log(`Agreement Date: ${alignedProject.agreementDate}`);
console.log(`Period of Completion: ${alignedProject.periodOfCompletion}`);
console.log(`Status of the Work: ${alignedProject.statusOfWork}`);
console.log(`Expenditure Incurred (incl taxes): ₹${alignedProject.expenditureIncurredWithTax} Cr`);
console.log(`Expenditure Incurred (excl taxes): ₹${alignedProject.expenditureIncurredWithoutTax} Cr`);

console.log('\n\nKEY TRANSFORMATIONS:');
console.log('-------------------');
console.log('✅ Generic name → Authentic HMDA project name');
console.log('✅ Raw budget amount → Crores format with decimals');
console.log('✅ Simple contractor name → M/s prefix added');
console.log('✅ Basic file number → HMDA standard format');
console.log('✅ Missing tender details → Complete tender information');
console.log('✅ No LOA/Agreement info → Full contract documentation');
console.log('✅ Simple status → HMDA standard status terminology');
console.log('✅ Added 18 new HMDA-specific fields');

// Show side-by-side JSON comparison for a subset of fields
console.log('\n\nJSON STRUCTURE COMPARISON:');
console.log('-------------------------');
console.log('\nOriginal Structure (snippet):');
console.log(JSON.stringify({
  projectName: originalProject.projectName,
  category: originalProject.category,
  totalBudget: originalProject.totalBudget,
  contractor: originalProject.contractor?.name
}, null, 2));

console.log('\nAligned Structure (HMDA fields):');
console.log(JSON.stringify({
  nameOfProject: alignedProject.nameOfProject,
  typeOfWork: alignedProject.typeOfWork,
  estimateAmountCrores: alignedProject.estimateAmountCrores,
  nameOfAgency: alignedProject.contractor?.nameOfAgency,
  asFileNumber: alignedProject.asFileNumber,
  tenderNoticeDetails: alignedProject.tenderNoticeDetails,
  statusOfWork: alignedProject.statusOfWork
}, null, 2));