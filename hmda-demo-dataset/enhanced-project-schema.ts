// HMDA Enhanced Project Data Schema - TypeScript Interfaces
// Version 2.0 - Based on actual HMDA master data analysis

// Import existing types
export * from './project-schema';

// New Enums for Enhanced Schema
export enum ApprovalAuthority {
  GOVT = 'Govt',
  METROPOLITAN_COMMISSIONER = 'MC',
  BOARD = 'Board',
  SECRETARY = 'Secretary',
  CHIEF_ENGINEER = 'CE',
  DEPUTY_CHIEF_ENGINEER = 'DCE',
  EXECUTIVE_ENGINEER = 'EE'
}

export enum WorkType {
  LAYOUTS = 'Layouts',
  ROADS = 'Roads',
  PARKS = 'Parks', 
  LAKES = 'Lakes',
  OM = 'O&M',
  HERITAGE = 'Heritage',
  INFRASTRUCTURE = 'Infrastructure',
  BUILDINGS = 'Buildings'
}

export enum ProjectStatus {
  WORK_COMPLETED = 'Work is completed',
  WORK_IN_PROGRESS = 'Work in progress',
  NOT_STARTED = 'Not started',
  TENDER_STAGE = 'Tender stage',
  DPR_STAGE = 'DPR stage',
  CONCEPTUALIZATION = 'Conceptualization'
}

// Government Approval Details
export interface GovernmentApproval {
  goNumber?: string; // e.g., "G.O.Ms.No.127"
  goDate?: string; // ISO date format
  approvalAuthority: ApprovalAuthority;
  fileNumber?: string; // e.g., "HMDA/DEV/CE/23/2022-23"
  asFileNo?: string; // Administrative Sanction file number
  sanctionedAmount?: number; // in Crores
  financialYear: string; // e.g., "2022-23"
}

// Technical Sanction Details
export interface TechnicalSanction {
  tsAmount: number; // Technical Sanction amount in Crores
  rtsAmount?: number; // Revised TS amount if any
  tsPartA?: number; // Part A of TS
  tsPartB?: number; // Part B of TS
  varianceFromEstimate: number; // Percentage variance from estimate
  tsDate: string; // ISO date format
  tsAuthority: string; // Approving authority
  tsFileNumber?: string; // TS document reference
}

// Tender Documentation
export interface TenderDocumentation {
  tenderNoticeNumber: string; // e.g., "HMDA/DEV/CE/23/2022-23"
  tenderNoticeDate: string;
  ecv: number; // Engineer's Contract Value in Crores
  tenderType: 'OPEN' | 'LIMITED' | 'SINGLE' | 'TWO_STAGE' | 'EPC' | 'TURNKEY';
  bidSubmissionDates: {
    firstDate?: string;
    lastDate: string;
    prebidMeetingDate?: string;
  };
  evaluationDetails?: {
    technicallyQualified: number;
    financiallyEvaluated: number;
    lowestBidder: string;
  };
  quotedTCV: number; // Tender Contract Value in Crores
  tenderPercentage: number; // + or - percentage from ECV
}

// Contract Documents
export interface ContractDocuments {
  loaNumber: string; // e.g., "14572/HMDA/DEV/CE/Inmulnarva/2022-23"
  loaDate: string;
  agreementNumber: string; // e.g., "HMDA/DEV/CE/37/2022-23"
  agreementDate: string;
  workOrderNumber?: string;
  workOrderDate?: string;
  periodOfCompletion: string; // e.g., "8 Months", "18 Months"
  defectLiabilityPeriod?: string; // e.g., "12 Months"
}

// Work Location Specifics
export interface WorkLocationDetails {
  surveyNumbers: string[]; // e.g., ["383/1", "384/2", "385/A"]
  village: string; // e.g., "Thorrur"
  mandal: string; // e.g., "Abdullapurmet"
  district: string; // e.g., "R.R District"
  assemblyConstituency?: string;
  parliamentConstituency?: string;
  latitude?: number;
  longitude?: number;
  landmarks?: string[]; // Nearby landmarks for reference
}

// Deviation Details
export interface DeviationDetails {
  deviationId: string;
  description: string;
  reason: string;
  percentageChange: number; // + or - percentage
  amountChange: number; // in Crores
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  approvalDate?: string;
}

// Extension of Time (EOT) Details
export interface EOTDetails {
  eotNumber: string;
  reason: string;
  originalCompletion: string;
  revisedCompletion: string;
  extensionDays: number;
  approvalDate: string;
  approvedBy: string;
  monsoonDays?: number; // Days lost due to monsoon
  forceMajeureDays?: number; // Days lost due to force majeure
}

// Work Progress Details
export interface WorkProgressDetails {
  workGroundedDate?: string; // Actual work start date
  expectedCompletionDate: string;
  revisedCompletionDate?: string;
  physicalProgressPercentage: number;
  financialProgressPercentage: number;
  criticalMilestonesAchieved: number;
  totalMilestones: number;
  lastUpdatedDate: string;
}

// Financial Tracking
export interface EnhancedFinancial {
  originalEstimate: number; // in Crores
  contractValue: number; // in Crores
  expenditureIncurredWithTax: number; // in Crores
  expenditureIncurredWithoutTax: number; // in Crores
  pendingBills: number; // in Crores
  releasedAmount: number; // in Crores
  retentionMoney: number; // in Crores
  mobilizationAdvance: number; // in Crores
  securityDeposit: number; // in Crores
  performanceGuarantee?: number; // in Crores
  variationOrders: VariationOrderDetails[];
  paymentMilestones: PaymentMilestone[];
}

// Variation Order Details
export interface VariationOrderDetails {
  voNumber: string;
  voDate: string;
  amount: number; // in Crores
  percentage: number; // % of contract value
  reason: string;
  items: string[]; // List of items in VO
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  approvedBy?: string;
  approvalDate?: string;
}

// Payment Milestone
export interface PaymentMilestone {
  milestoneId: string;
  description: string;
  percentage: number; // % of contract value
  amount: number; // in Crores
  dueDate: string;
  actualDate?: string;
  invoiceNumber?: string;
  status: 'PENDING' | 'PROCESSED' | 'PAID' | 'HELD';
}

// Agency/Contractor Details
export interface AgencyDetails {
  name: string;
  registrationNumber?: string;
  grade: string; // AAA, AA, A, B, C
  specialization: WorkType[];
  performanceRating: number; // 1-5
  totalProjectsWithHMDA: number;
  ongoingProjects: number;
  completedProjects: number;
  blacklisted: boolean;
  blacklistingReason?: string;
  prequalificationStatus?: 'VALID' | 'EXPIRED' | 'SUSPENDED';
}

// Clearance and NOC Details
export interface ClearanceDetails {
  clearanceType: string; // e.g., "Environmental", "Traffic", "HMWSSB", "TSSPDCL"
  issuingAuthority: string;
  referenceNumber?: string;
  issueDate?: string;
  validityDate?: string;
  status: 'OBTAINED' | 'PENDING' | 'NOT_REQUIRED' | 'REJECTED';
  conditions?: string[]; // Any conditions imposed
}

// Enhanced Stage 1 Data
export interface EnhancedStage1Data {
  proposalId: string; // e.g., "PROP/2023/CE/042"
  initiatedDate: string;
  proposer: string; // e.g., "DCE Circle-I"
  sourceOfRequirement: 'CITIZEN_DEMAND' | 'GOVT_SCHEME' | 'MASTER_PLAN' | 'COURT_DIRECTION' | 'INFRASTRUCTURE_GAP';
  citizenSignatures?: number;
  mlaEndorsement?: {
    endorsed: boolean;
    referenceNumber?: string;
    mlaName?: string;
  };
  assemblyQuestion?: {
    questionNumber: string;
    date: string;
    raisedBy: string;
  };
  feasibilityComponents: {
    needAnalysis: { status: string; completionDate?: string };
    siteInspection: { status: string; completionDate?: string };
    trafficStudy: { status: string; completionDate?: string };
    landVerification: { status: string; completionDate?: string };
    environmentalStudy: { status: string; completionDate?: string };
    financialAnalysis: { status: string; completionDate?: string };
    socialImpact: { status: string; completionDate?: string };
  };
  preliminaryCostBreakdown: {
    landAcquisition?: number;
    earthWork?: number;
    pavement?: number;
    structures?: number;
    utilitiesShifting?: number;
    consultancy?: number;
    contingency?: number;
    total: number;
  };
}

// Enhanced Stage 2 Data
export interface EnhancedStage2Data {
  dprStatus: 'NOT_STARTED' | 'CONSULTANT_APPOINTED' | 'SURVEY_DONE' | 'DESIGN_READY' | 'TS_OBTAINED' | 'UNDER_REVISION';
  consultantDetails?: {
    name: string;
    appointmentDate: string;
    contractValue: number;
    deliverables: string[];
  };
  surveyDetails?: {
    surveyType: string[];
    completionPercentage: number;
    surveyAgency: string;
  };
  designDetails?: {
    designStage: 'CONCEPTUAL' | 'PRELIMINARY' | 'DETAILED' | 'FINAL';
    completionPercentage: number;
    drawingsSubmitted: number;
    drawingsApproved: number;
  };
  clearances: ClearanceDetails[];
  technicalSanction: TechnicalSanction;
}

// Enhanced Stage 3 Data
export interface EnhancedStage3Data extends TenderDocumentation {
  tenderMethod: 'E_PROCUREMENT' | 'MANUAL' | 'SWISS_CHALLENGE';
  bidSecurity: number; // in Crores
  performanceSecurity: number; // in Crores
  preBidQueries: number;
  corrigendumIssued: number;
  bidders: {
    name: string;
    technicalScore?: number;
    financialQuote: number;
    ranking: number;
    qualified: boolean;
  }[];
  evaluationCommittee?: string[];
  approvalLevels: {
    level: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    date?: string;
  }[];
}

// Enhanced Main Project Interface
export interface EnhancedHMDAProject {
  // Basic Information
  projectId: string; // e.g., "INFRA-RT-2023-042-C1"
  projectName: string;
  nameOfWork: string; // Detailed work description
  workType: WorkType;
  category: string; // From original schema
  subCategory: string; // From original schema
  currentStage: number; // 1-9
  projectStatus: ProjectStatus;
  
  // Administrative Details
  divisionNumber: string; // e.g., "VI"
  financialYear: string; // e.g., "2022-23"
  governmentApproval: GovernmentApproval;
  
  // Location Details
  workLocation: WorkLocationDetails;
  
  // Contract & Tender Details
  tenderDocumentation?: TenderDocumentation;
  contractDocuments?: ContractDocuments;
  agency?: AgencyDetails;
  consultant?: {
    name: string;
    role: string;
    contractValue?: number;
  };
  
  // Technical Details
  technicalSanction?: TechnicalSanction;
  estimateAmount: number; // Original estimate in Crores
  
  // Progress & Timeline
  workProgress: WorkProgressDetails;
  deviations?: DeviationDetails[];
  eotDetails?: EOTDetails[];
  
  // Financial Details
  financialDetails: EnhancedFinancial;
  
  // Quality & Compliance
  qualityMetrics?: {
    overallScore: number;
    testResults: any[];
    ncrs: any[];
    audits: any[];
  };
  clearances?: ClearanceDetails[];
  
  // Stage-specific Enhanced Data
  enhancedStage1Data?: EnhancedStage1Data;
  enhancedStage2Data?: EnhancedStage2Data;
  enhancedStage3Data?: EnhancedStage3Data;
  // ... other enhanced stage data interfaces to be added
  
  // Metadata
  createdDate: string;
  lastUpdated: string;
  updatedBy: string;
  dataSource: 'SYSTEM' | 'MANUAL' | 'IMPORT';
  auditTrail?: {
    action: string;
    user: string;
    timestamp: string;
    changes: any;
  }[];
}

// Helper Types for Data Generation
export interface DocumentNumberFormats {
  tenderNotice: (year: string, projectId: string) => string;
  loa: (projectName: string, year: string) => string;
  agreement: (divisionNo: string, year: string) => string;
  goNumber: () => string;
  voNumber: (projectId: string, sequence: number) => string;
}

// Validation Rules
export interface ValidationRules {
  tsVarianceRange: { min: number; max: number }; // 5-15%
  tenderPercentageRange: { min: number; max: number }; // -5% to +10%
  mobilizationAdvanceLimit: number; // % of contract value
  retentionMoneyPercentage: number; // % of contract value
  defectLiabilityPeriod: number; // months
}

// Data Quality Metrics
export interface DataQualityMetrics {
  completenessScore: number; // 0-100
  accuracyScore: number; // 0-100
  consistencyScore: number; // 0-100
  timelinessScore: number; // 0-100
  overallQuality: number; // 0-100
}

// Export utility function types
export type ProjectValidator = (project: EnhancedHMDAProject) => {
  isValid: boolean;
  errors: string[];
  warnings: string[];
};

export type DataEnhancer = (basicProject: any) => EnhancedHMDAProject;

export type ReportGenerator = (projects: EnhancedHMDAProject[]) => {
  summary: any;
  analytics: any;
  recommendations: any;
};