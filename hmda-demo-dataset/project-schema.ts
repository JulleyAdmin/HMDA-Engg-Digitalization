// HMDA Project Data Schema - TypeScript Interfaces
// Based on comprehensive research of actual HMDA projects and processes

export enum ProjectCategory {
  INFRASTRUCTURE = 'INFRA',
  URBAN_DEVELOPMENT = 'URBAN', 
  ENVIRONMENTAL = 'ENV',
  SMART_CITY = 'SMART'
}

export enum ProjectSubCategory {
  // Infrastructure
  ROADS_TRANSPORT = 'RT',
  WATER_SEWERAGE = 'WS', 
  POWER_UTILITIES = 'PU',
  
  // Urban Development
  TOWNSHIP_DEVELOPMENT = 'TD',
  AREA_DEVELOPMENT = 'AD',
  PUBLIC_AMENITIES = 'PA',
  
  // Environmental
  GREEN_INFRASTRUCTURE = 'GI',
  POLLUTION_CONTROL = 'PC',
  
  // Smart City
  DIGITAL_INFRASTRUCTURE = 'DI',
  INTELLIGENT_SYSTEMS = 'IS'
}

export enum ProjectStage {
  CONCEPTUALIZATION = 1,
  DPR_APPROVALS = 2,
  TENDERING = 3,
  CONTRACT_AWARD = 4,
  CONSTRUCTION = 5,
  QUALITY_CONTROL = 6,
  TESTING_COMMISSIONING = 7,
  HANDOVER = 8,
  DLP_OM = 9
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM', 
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum Circle {
  CIRCLE_1 = 'C1', // Hyderabad Core
  CIRCLE_2 = 'C2', // Rangareddy
  CIRCLE_3 = 'C3', // Medchal-Malkajgiri
  CIRCLE_4 = 'C4', // Sangareddy
  CIRCLE_5 = 'C5'  // Vikarabad
}

export enum ContractorGrade {
  AAA = 'AAA',
  AA = 'AA',
  A = 'A',
  B = 'B',
  C = 'C'
}

export enum PoliticalInterest {
  CM = 'CM',
  MINISTER = 'MINISTER',
  MLA = 'MLA',
  MP = 'MP',
  PUBLIC = 'PUBLIC',
  ROUTINE = 'ROUTINE'
}

export enum PublicSentiment {
  VERY_POSITIVE = 'VERY_POSITIVE',
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE',
  VERY_NEGATIVE = 'VERY_NEGATIVE'
}

export enum MonsoonImpact {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  NONE = 'NONE'
}

export enum LandIssueStatus {
  CLEAR = 'CLEAR',
  MINOR_ISSUES = 'MINOR_ISSUES',
  COURT_CASE = 'COURT_CASE',
  ACQUISITION_PENDING = 'ACQUISITION_PENDING',
  MAJOR_DISPUTE = 'MAJOR_DISPUTE'
}

export interface Location {
  circle: Circle;
  ward: string;
  mandal: string;
  locality: string;
  pincode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Contractor {
  name: string;
  grade: ContractorGrade;
  performanceRating: number; // 1-5 scale
  currentLoad: number; // % of capacity
  safetyRecord: number; // accident-free days
  completedProjects: number;
  ongoingProjects: number;
  blacklisted: boolean;
  specialization: string[];
}

export interface Timeline {
  plannedStart: string;
  actualStart: string;
  plannedCompletion: string;
  projectedCompletion: string;
  delayDays: number;
  monsoonBuffer: number; // days
  daysInCurrentStage: number;
}

export interface Financial {
  contractValue: number;
  originalEstimate: number;
  paidTillDate: number;
  pendingBills: number;
  lastPaymentDate: string;
  mobilizationAdvance: number;
  retentionAmount: number;
  variations: VariationOrder[];
  costOverrun: number; // %
  budgetUtilization: number; // %
}

export interface VariationOrder {
  voNumber: string;
  amount: number;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  date: string;
}

export interface Quality {
  overallScore: number; // 0-100
  testsCompleted: number;
  testsPassed: number;
  testsPassRate: number;
  ncrsOpen: number;
  ncrsClosed: number;
  lastAuditScore: number; // 1-5
  lastAuditDate: string;
  thirdPartyAudit: boolean;
  materialTestingLab: string;
}

export interface Stakeholders {
  politicalInterest: PoliticalInterest;
  publicSentiment: PublicSentiment;
  mediaAttention: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
  complaintsThisMonth: number;
  appreciationLetters: number;
  rtiQueries: number;
  socialMediaMentions: number;
}

export interface RealWorldFactors {
  monsoonImpact: MonsoonImpact;
  landIssues: LandIssueStatus;
  utilityShifting: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'NOT_REQUIRED';
  environmentalClearance: 'OBTAINED' | 'PENDING' | 'NOT_REQUIRED';
  heritageImpact: boolean;
  trafficImpact: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Milestone {
  id: string;
  name: string;
  plannedDate: string;
  actualDate?: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'DELAYED';
  importance: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  dependencies: string[];
}

// Stage-specific interfaces
export interface Stage1Data {
  feasibilityStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  needAnalysis: string;
  landRequired: number; // acres
  estimatedCost: number;
  publicSupport: number; // signatures/support
  mlaEndorsement: boolean;
  assemblyQuestion?: string;
  approvalPending: 'EE' | 'DCE' | 'CE' | 'SECRETARY' | 'COMMISSIONER' | 'BOARD';
  targetApproval: string;
}

export interface Stage2Data {
  dprStatus: 'NOT_STARTED' | 'CONSULTANT_APPOINTED' | 'SURVEY_DONE' | 'DESIGN_READY' | 'TS_OBTAINED';
  consultantName?: string;
  surveyCompletion: number; // %
  designCompletion: number; // %
  clearancesObtained: string[];
  clearancesPending: string[];
  tsAmount: number;
  tsAuthority: string;
  tsDate?: string;
}

export interface Stage3Data {
  tenderStatus: 'DRAFT' | 'PUBLISHED' | 'PREBID_DONE' | 'UNDER_EVALUATION' | 'AWARDED';
  publishDate?: string;
  bidSubmissionDate?: string;
  biddersCount: number;
  qualifiedBidders: number;
  l1Amount?: number;
  priceVariance?: number; // % from estimate
  tenderType: 'OPEN' | 'LIMITED' | 'SINGLE' | 'TWO_STAGE' | 'EPC';
}

export interface Stage4Data {
  loaDate?: string;
  agreementStatus: 'LOA_ISSUED' | 'AGREEMENT_SIGNED' | 'ADVANCE_RELEASED' | 'SITE_HANDED';
  mobilizationPercent: number;
  advanceStatus: 'PENDING' | 'PARTIAL' | 'COMPLETE';
  performanceSecurity: boolean;
  keyPersonnelDeployed: number;
  equipmentMobilized: number;
}

export interface Stage5Data {
  todayProgress: number; // % of daily target
  activeLocations: number;
  workforce: {
    current: number;
    target: number;
    efficiency: number;
  };
  equipmentUtilization: number;
  safetyDays: number;
  materialDeliveryStatus: 'ON_TIME' | 'DELAYED' | 'CRITICAL';
  weatherImpact: boolean;
}

export interface Stage6Data {
  testsPending: number;
  testsCompletedToday: number;
  qualityTrend: 'IMPROVING' | 'STABLE' | 'DECLINING';
  auditDue: string;
  labCapacity: number; // %
  ncrTrendThisMonth: 'UP' | 'DOWN' | 'STABLE';
}

export interface Stage7Data {
  testsCompleted: number;
  testsTotal: number;
  snagsOpen: number;
  snagsResolved: number;
  commissioningDate?: string;
  handoverReady: boolean;
  systemsOperational: number; // %
  performanceTestsPassed: boolean;
}

export interface Stage8Data {
  completionCertDate?: string;
  finalBillStatus: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'PAID';
  assetValue: number;
  dlpStartDate?: string;
  handoverDocuments: number; // count
  omManualStatus: 'PENDING' | 'DRAFT' | 'APPROVED';
  trainingCompleted: boolean;
}

export interface Stage9Data {
  dlpRemaining: number; // days
  defectsReported: number;
  defectsResolved: number;
  maintenanceDue: string;
  assetCondition: number; // % score
  warrantyClaimsThisMonth: number;
  omCostThisMonth: number;
  securityReleaseEligible: boolean;
}

// Main Project Interface
export interface HMDAProject {
  // Basic Information
  projectId: string;
  projectName: string;
  category: ProjectCategory;
  subCategory: ProjectSubCategory;
  currentStage: ProjectStage;
  stageStartDate: string;
  
  // Core Metrics
  totalBudget: number;
  physicalProgress: number; // %
  financialProgress: number; // %
  ceScore: number; // 0-100
  riskLevel: RiskLevel;
  
  // Location & Administrative
  location: Location;
  contractor?: Contractor;
  consultant?: string;
  
  // Detailed Information
  timeline: Timeline;
  financial: Financial;
  quality: Quality;
  stakeholders: Stakeholders;
  realWorldFactors: RealWorldFactors;
  milestones: Milestone[];
  
  // Stage-specific data
  stage1Data?: Stage1Data;
  stage2Data?: Stage2Data;
  stage3Data?: Stage3Data;
  stage4Data?: Stage4Data;
  stage5Data?: Stage5Data;
  stage6Data?: Stage6Data;
  stage7Data?: Stage7Data;
  stage8Data?: Stage8Data;
  stage9Data?: Stage9Data;
  
  // Metadata
  createdDate: string;
  lastUpdated: string;
  createdBy: string;
  tags: string[];
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

// Additional utility types
export interface ProjectFilter {
  category?: ProjectCategory[];
  stage?: ProjectStage[];
  riskLevel?: RiskLevel[];
  circle?: Circle[];
  budgetRange?: {
    min: number;
    max: number;
  };
  progressRange?: {
    min: number;
    max: number;
  };
  contractor?: string[];
  politicalInterest?: PoliticalInterest[];
  monsoonImpact?: MonsoonImpact[];
  landIssues?: LandIssueStatus[];
}

export interface ProjectSummary {
  totalProjects: number;
  totalBudget: number;
  averageProgress: number;
  onTimeProjects: number;
  delayedProjects: number;
  criticalProjects: number;
  stageDistribution: Record<ProjectStage, number>;
  categoryDistribution: Record<ProjectCategory, number>;
  riskDistribution: Record<RiskLevel, number>;
}