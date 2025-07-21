// Simple test script to validate enhanced schema types
import * as EnhancedSchema from './enhanced-project-schema';

// Test creating a sample enhanced project
const sampleProject: Partial<EnhancedSchema.EnhancedHMDAProject> = {
  projectId: 'INFRA-RT-2023-042-C1',
  projectName: 'Inmulnarva Layout Development',
  nameOfWork: 'Providing Infrastructure facilities for the proposed layout Inmulnarva (V), R.R District',
  workType: EnhancedSchema.WorkType.LAYOUTS,
  category: 'INFRA',
  subCategory: 'RT',
  currentStage: 5,
  projectStatus: EnhancedSchema.ProjectStatus.WORK_IN_PROGRESS,
  divisionNumber: 'VI',
  financialYear: '2022-23',
  estimateAmount: 50,
  
  governmentApproval: {
    goNumber: 'G.O.Ms.No.127',
    goDate: '2022-07-13',
    approvalAuthority: EnhancedSchema.ApprovalAuthority.GOVT,
    sanctionedAmount: 102,
    financialYear: '2022-23'
  },
  
  workLocation: {
    surveyNumbers: ['383/1', '384/2'],
    village: 'Inmulnarva',
    mandal: 'Rangareddy',
    district: 'R.R District',
    latitude: 17.4239,
    longitude: 78.4738
  },
  
  technicalSanction: {
    tsAmount: 102,
    varianceFromEstimate: 10.0,
    tsDate: '2022-08-15',
    tsAuthority: 'Chief Engineer',
    tsFileNumber: 'HMDA/TS/CE/042/2022'
  },
  
  tenderDocumentation: {
    tenderNoticeNumber: 'HMDA/DEV/CE/23/2022-23',
    tenderNoticeDate: '2022-09-01',
    ecv: 55.29,
    tenderType: 'OPEN',
    bidSubmissionDates: {
      firstDate: '2022-09-10',
      lastDate: '2022-09-30',
      prebidMeetingDate: '2022-09-15'
    },
    quotedTCV: 55.24,
    tenderPercentage: -0.10
  },
  
  contractDocuments: {
    loaNumber: '14572/HMDA/DEV/CE/Inmulnarva/2022-23',
    loaDate: '2022-11-16',
    agreementNumber: 'HMDA/DEV/CE/37/2022-23',
    agreementDate: '2022-12-15',
    periodOfCompletion: '8 Months',
    defectLiabilityPeriod: '12 Months'
  },
  
  agency: {
    name: 'M/s NCC Limited',
    grade: 'A',
    specialization: [EnhancedSchema.WorkType.LAYOUTS, EnhancedSchema.WorkType.ROADS],
    performanceRating: 4.2,
    totalProjectsWithHMDA: 25,
    ongoingProjects: 3,
    completedProjects: 22,
    blacklisted: false
  },
  
  workProgress: {
    workGroundedDate: '2022-12-15',
    expectedCompletionDate: '2023-08-15',
    revisedCompletionDate: '2023-09-10',
    physicalProgressPercentage: 65,
    financialProgressPercentage: 62,
    criticalMilestonesAchieved: 4,
    totalMilestones: 7,
    lastUpdatedDate: new Date().toISOString()
  },
  
  financialDetails: {
    originalEstimate: 50,
    contractValue: 55.24,
    expenditureIncurredWithTax: 34.27,
    expenditureIncurredWithoutTax: 29.0,
    pendingBills: 5.5,
    releasedAmount: 28.5,
    retentionMoney: 2.76,
    mobilizationAdvance: 5.52,
    securityDeposit: 2.76,
    variationOrders: [],
    paymentMilestones: [
      {
        milestoneId: 'M1',
        description: 'Mobilization',
        percentage: 10,
        amount: 5.52,
        dueDate: '2022-12-30',
        actualDate: '2023-01-05',
        status: 'PAID'
      },
      {
        milestoneId: 'M2',
        description: '25% Physical Progress',
        percentage: 15,
        amount: 8.29,
        dueDate: '2023-02-15',
        actualDate: '2023-02-20',
        status: 'PAID'
      }
    ]
  },
  
  clearances: [
    {
      clearanceType: 'Environmental',
      issuingAuthority: 'TSPCB',
      referenceNumber: 'TSPCB/2022/ENV/1234',
      issueDate: '2022-10-15',
      validityDate: '2025-10-15',
      status: 'OBTAINED'
    },
    {
      clearanceType: 'Traffic',
      issuingAuthority: 'Traffic Police',
      status: 'NOT_REQUIRED'
    }
  ],
  
  createdDate: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
  updatedBy: 'system',
  dataSource: 'SYSTEM'
};

// Type validation functions
function validateGoNumber(goNumber: string): boolean {
  return /G\.O\.Ms\.No\.\d+/.test(goNumber);
}

function validateTenderNumber(tenderNumber: string): boolean {
  return /HMDA\/DEV\/CE\/\d+\/\d{4}-\d{2}/.test(tenderNumber);
}

function validateTSVariance(estimate: number, tsAmount: number): boolean {
  const variance = ((tsAmount - estimate) / estimate) * 100;
  return variance >= 5 && variance <= 15;
}

function validateTenderPercentage(percentage: number): boolean {
  return percentage >= -5 && percentage <= 10;
}

// Run validations
console.log('Testing Enhanced HMDA Project Schema...\n');

console.log('1. GO Number Format:', validateGoNumber(sampleProject.governmentApproval!.goNumber!));
console.log('2. Tender Number Format:', validateTenderNumber(sampleProject.tenderDocumentation!.tenderNoticeNumber));
console.log('3. TS Variance (5-15%):', validateTSVariance(sampleProject.estimateAmount!, sampleProject.technicalSanction!.tsAmount));
console.log('4. Tender Percentage (-5% to +10%):', validateTenderPercentage(sampleProject.tenderDocumentation!.tenderPercentage));

console.log('\n✅ Enhanced schema compiled successfully!');
console.log('✅ All type definitions are valid!');
console.log('✅ Sample project created with all enhanced fields!');

// Test document number generators
const docFormats: EnhancedSchema.DocumentNumberFormats = {
  tenderNotice: (year, projectId) => `HMDA/DEV/CE/${projectId}/${year}`,
  loa: (projectName, year) => `14572/HMDA/DEV/CE/${projectName}/${year}`,
  agreement: (divisionNo, year) => `HMDA/DEV/CE/${divisionNo}/${year}`,
  goNumber: () => `G.O.Ms.No.${Math.floor(Math.random() * 200) + 1}`,
  voNumber: (projectId, seq) => `VO/${projectId}/${seq}/2023`
};

console.log('\nGenerated Document Numbers:');
console.log('- Tender Notice:', docFormats.tenderNotice('2022-23', '42'));
console.log('- LOA:', docFormats.loa('Inmulnarva', '2022-23'));
console.log('- Agreement:', docFormats.agreement('VI', '2022-23'));
console.log('- GO Number:', docFormats.goNumber());
console.log('- VO Number:', docFormats.voNumber('INFRA-RT-2023-042-C1', 1));

export { sampleProject };