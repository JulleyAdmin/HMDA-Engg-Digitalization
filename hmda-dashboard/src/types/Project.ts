// HMDA Project Type Definitions
export enum ProjectCategory {
  INFRASTRUCTURE = 'INFRA',
  URBAN_DEVELOPMENT = 'URBAN', 
  ENVIRONMENTAL = 'ENV',
  SMART_CITY = 'SMART'
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
  CIRCLE_1 = 'C1',
  CIRCLE_2 = 'C2',
  CIRCLE_3 = 'C3',
  CIRCLE_4 = 'C4',
  CIRCLE_5 = 'C5'
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
  grade: string;
  performanceRating: number;
  currentLoad: number;
  safetyRecord: number;
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
  monsoonBuffer: number;
  daysInCurrentStage: number;
  elapsedDays?: number;
  totalDays?: number;
  remainingDays?: number;
  percentageElapsed?: number;
}

export interface Financial {
  contractValue: number;
  originalEstimate: number;
  paidTillDate: number;
  pendingBills: number;
  lastPaymentDate: string;
  mobilizationAdvance: number;
  retentionAmount: number;
  variations: any[];
  costOverrun: number;
  budgetUtilization: number;
}

export interface Quality {
  overallScore: number;
  testsCompleted: number;
  testsPassed: number;
  testsPassRate: number;
  ncrsOpen: number;
  ncrsClosed: number;
  lastAuditScore: number | null;
  lastAuditDate: string;
  thirdPartyAudit: boolean;
  materialTestingLab: string;
}

export interface Stakeholders {
  politicalInterest: string;
  publicSentiment: string;
  mediaAttention: string;
  complaintsThisMonth: number;
  appreciationLetters: number;
  rtiQueries: number;
  socialMediaMentions: number;
}

export interface RealWorldFactors {
  monsoonImpact: string;
  landIssues: string;
  utilityShifting: string;
  environmentalClearance: string;
  heritageImpact: boolean;
  trafficImpact: string;
}

export interface Milestone {
  id: string;
  name: string;
  plannedDate: string;
  actualDate?: string;
  status: string;
  importance: string;
  dependencies: string[];
}

export interface HMDAProject {
  projectId: string;
  projectName: string;
  category: ProjectCategory;
  subCategory: string;
  currentStage: ProjectStage;
  stageStartDate: string;
  totalBudget: number;
  physicalProgress: number;
  financialProgress: number;
  plannedProgress?: number;
  ceScore: number | null;
  riskLevel: RiskLevel;
  location: Location;
  contractor?: Contractor;
  consultant?: string;
  timeline: Timeline;
  financial: Financial;
  quality: Quality;
  stakeholders: Stakeholders;
  realWorldFactors: RealWorldFactors;
  milestones: Milestone[];
  createdDate: string;
  lastUpdated: string;
  createdBy: string;
  tags: string[];
  priority: string;
}

export interface ProjectDataset {
  metadata: {
    generatedAt: string;
    totalProjects: number;
    version: string;
    description: string;
    generationTime: string;
  };
  statistics: {
    overview: {
      totalProjects: number;
      totalBudget: number;
      avgBudget: number;
      avgProgress: number;
      avgScore: number | null;
    };
    distribution: {
      byStage: Record<string, number>;
      byCategory: Record<string, number>;
      byRisk: Record<string, number>;
      byCircle: Record<string, number>;
    };
  };
  projects: HMDAProject[];
}

// Filter interfaces for enhanced table
export interface ProjectFilters {
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
  searchText?: string;
}

// Table column definitions
export interface ColumnGroup {
  id: string;
  label: string;
  columns: string[];
  applicableStages?: ProjectStage[];
}

// Chart data interfaces
export interface ChartData {
  label: string;
  value: number;
  color?: string;
}