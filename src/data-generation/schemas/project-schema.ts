/**
 * HMDA Project Data Schema
 * Complete TypeScript interfaces for project entities and stage-specific data models
 */

// Enums for standardized values
export enum ProjectCategory {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  MEGA = 'MEGA',
  SPECIAL = 'SPECIAL'
}

export enum ProjectType {
  BUILDING_PERMISSION = 'BUILDING_PERMISSION',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  ROAD_DEVELOPMENT = 'ROAD_DEVELOPMENT',
  WATER_SUPPLY = 'WATER_SUPPLY',
  SEWERAGE = 'SEWERAGE',
  PARKS_RECREATION = 'PARKS_RECREATION',
  COMMERCIAL_COMPLEX = 'COMMERCIAL_COMPLEX',
  RESIDENTIAL_LAYOUT = 'RESIDENTIAL_LAYOUT',
  INDUSTRIAL_DEVELOPMENT = 'INDUSTRIAL_DEVELOPMENT',
  SMART_CITY = 'SMART_CITY'
}

export enum ProjectStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  CANCELLED = 'CANCELLED'
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CONDITIONAL = 'CONDITIONAL',
  REVERTED = 'REVERTED'
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

// Core interfaces
export interface Location {
  zone: string;
  circle: string;
  ward: string;
  locality: string;
  latitude: number;
  longitude: number;
  address: string;
  landParcelNumbers: string[];
  nearbyLandmarks: string[];
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  responsibilityLevel: 'PRIMARY' | 'SECONDARY' | 'SUPPORT';
}

export interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadDate: Date;
  size: number;
  version: number;
  status: 'DRAFT' | 'SUBMITTED' | 'VERIFIED' | 'APPROVED';
  uploadedBy: string;
  checksum: string;
  remarks?: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  plannedDate: Date;
  actualDate?: Date;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED';
  dependencies: string[];
  criticalPath: boolean;
  delayDays?: number;
  completionPercentage: number;
}

export interface FinancialDetail {
  estimatedCost: number;
  sanctionedAmount: number;
  releasedAmount: number;
  utilizedAmount: number;
  pendingBills: number;
  retentionAmount: number;
  performanceGuarantee: number;
  lastUpdated: Date;
}

// Stage-specific interfaces
export interface Stage1ProjectInitiation {
  stageId: 'STAGE_1';
  stageName: 'Project Initiation';
  status: ApprovalStatus;
  startDate: Date;
  completionDate?: Date;
  data: {
    projectProposal: {
      proposalNumber: string;
      submissionDate: Date;
      proposedBy: string;
      department: string;
      justification: string;
      beneficiaries: number;
      preliminaryBudget: number;
    };
    feasibilityStudy: {
      technicalFeasibility: boolean;
      financialFeasibility: boolean;
      environmentalImpact: 'LOW' | 'MEDIUM' | 'HIGH';
      socialImpact: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
      recommendedActions: string[];
    };
    initialApprovals: {
      departmentApproval: ApprovalStatus;
      budgetaryApproval: ApprovalStatus;
      technicalCommitteeReview: ApprovalStatus;
      approvalDate?: Date;
      approvedBy?: string;
      remarks?: string;
    };
    documents: Document[];
    risks: Array<{
      type: string;
      description: string;
      probability: 'LOW' | 'MEDIUM' | 'HIGH';
      impact: 'LOW' | 'MEDIUM' | 'HIGH';
      mitigationPlan: string;
    }>;
  };
}

export interface Stage2SurveyInvestigation {
  stageId: 'STAGE_2';
  stageName: 'Survey & Investigation';
  status: ApprovalStatus;
  startDate: Date;
  completionDate?: Date;
  data: {
    landSurvey: {
      surveyNumber: string;
      surveyDate: Date;
      totalArea: number;
      encumbrances: string[];
      ownership: 'GOVERNMENT' | 'PRIVATE' | 'MIXED';
      landUse: string;
      topography: string;
    };
    soilInvestigation: {
      reportNumber: string;
      investigationDate: Date;
      soilType: string;
      bearingCapacity: number;
      waterTable: number;
      recommendations: string[];
    };
    environmentalAssessment: {
      assessmentDate: Date;
      airQualityIndex: number;
      noiseLevel: number;
      greenCoverPercentage: number;
      waterBodies: string[];
      protectedAreas: boolean;
      clearanceRequired: boolean;
    };
    utilityMapping: {
      existingUtilities: Array<{
        type: string;
        provider: string;
        location: string;
        relocationRequired: boolean;
      }>;
      proposedConnections: string[];
    };
    documents: Document[];
  };
}

export interface Stage3DesignDevelopment {
  stageId: 'STAGE_3';
  stageName: 'Design & Development';
  status: ApprovalStatus;
  startDate: Date;
  completionDate?: Date;
  data: {
    conceptDesign: {
      designNumber: string;
      version: number;
      submittedDate: Date;
      architect: string;
      consultant: string;
      designFeatures: string[];
    };
    detailedDesign: {
      drawings: Array<{
        drawingNumber: string;
        type: string;
        revision: number;
        approvalStatus: ApprovalStatus;
      }>;
      specifications: string[];
      materials: Array<{
        name: string;
        specification: string;
        quantity: number;
        unit: string;
      }>;
    };
    structuralDesign: {
      designCode: string;
      loadCalculations: boolean;
      seismicZone: string;
      foundationType: string;
      structuralSystem: string;
    };
    costEstimate: {
      estimateNumber: string;
      baseYear: number;
      totalCost: number;
      breakdown: Array<{
        component: string;
        amount: number;
        percentage: number;
      }>;
      contingency: number;
      escalation: number;
    };
    approvals: {
      technicalSanction: ApprovalStatus;
      designApproval: ApprovalStatus;
      heritageCommittee?: ApprovalStatus;
      fireNOC?: ApprovalStatus;
      aviationClearance?: ApprovalStatus;
    };
    documents: Document[];
  };
}

export interface Stage4TenderingProcurement {
  stageId: 'STAGE_4';
  stageName: 'Tendering & Procurement';
  status: ApprovalStatus;
  startDate: Date;
  completionDate?: Date;
  data: {
    tenderDetails: {
      tenderNumber: string;
      tenderType: 'OPEN' | 'LIMITED' | 'SINGLE' | 'EPC';
      publishDate: Date;
      prebidDate?: Date;
      submissionDeadline: Date;
      estimatedValue: number;
      earnestMoney: number;
    };
    bidders: Array<{
      bidderId: string;
      name: string;
      registrationNumber: string;
      experience: number;
      technicalScore: number;
      financialBid: number;
      ranking: number;
      status: 'QUALIFIED' | 'DISQUALIFIED' | 'SELECTED';
    }>;
    evaluation: {
      technicalEvaluationDate: Date;
      financialOpeningDate: Date;
      lowestBidder: string;
      recommendedBidder: string;
      negotiatedAmount?: number;
      savingsPercentage: number;
    };
    awardDetails: {
      contractorName: string;
      contractAmount: number;
      contractDate: Date;
      completionPeriod: number;
      performanceGuarantee: number;
      defectLiabilityPeriod: number;
    };
    documents: Document[];
  };
}

export interface Stage5PermissionsApprovals {
  stageId: 'STAGE_5';
  stageName: 'Permissions & Approvals';
  status: ApprovalStatus;
  startDate: Date;
  completionDate?: Date;
  data: {
    buildingPermission: {
      applicationNumber: string;
      submissionDate: Date;
      bpassNumber?: string;
      approvalDate?: Date;
      validity: number;
      conditions: string[];
    };
    environmentalClearance: {
      required: boolean;
      applicationNumber?: string;
      category: 'A' | 'B1' | 'B2' | 'NA';
      status: ApprovalStatus;
      validityPeriod?: number;
      monitoringRequirements?: string[];
    };
    specialPermissions: Array<{
      type: string;
      authority: string;
      applicationDate: Date;
      status: ApprovalStatus;
      referenceNumber?: string;
      conditions?: string[];
    }>;
    utilities: {
      waterConnection: {
        status: ApprovalStatus;
        sanctionedLoad: number;
        connectionCharges: number;
      };
      powerConnection: {
        status: ApprovalStatus;
        sanctionedLoad: number;
        transformerCapacity: number;
      };
      sewerageConnection: {
        status: ApprovalStatus;
        treatmentRequired: boolean;
      };
    };
    documents: Document[];
  };
}

export interface Stage6ProjectExecution {
  stageId: 'STAGE_6';
  stageName: 'Project Execution';
  status: ApprovalStatus;
  startDate: Date;
  completionDate?: Date;
  data: {
    executionPlan: {
      mobilizationDate: Date;
      phases: Array<{
        phaseName: string;
        startDate: Date;
        endDate: Date;
        activities: string[];
        progress: number;
      }>;
      resourcePlan: {
        manpower: number;
        machinery: string[];
        materials: string[];
      };
    };
    progress: {
      overallProgress: number;
      physicalProgress: number;
      financialProgress: number;
      lastUpdated: Date;
      criticalActivities: string[];
      delays: Array<{
        reason: string;
        impact: number;
        recoveryPlan: string;
      }>;
    };
    qualityControl: {
      tests: Array<{
        testName: string;
        date: Date;
        result: 'PASS' | 'FAIL';
        remarks: string;
      }>;
      inspections: Array<{
        type: string;
        date: Date;
        inspector: string;
        findings: string[];
        compliance: boolean;
      }>;
      nonConformances: Array<{
        id: string;
        description: string;
        severity: 'MINOR' | 'MAJOR' | 'CRITICAL';
        status: 'OPEN' | 'CLOSED';
        correctiveAction: string;
      }>;
    };
    safetyRecords: {
      incidents: number;
      lostTimeInjuries: number;
      safetyMeetings: number;
      trainingSessions: number;
      complianceScore: number;
    };
    bills: Array<{
      billNumber: string;
      date: Date;
      amount: number;
      workDone: string;
      status: 'SUBMITTED' | 'VERIFIED' | 'APPROVED' | 'PAID';
      deductions: number;
    }>;
    documents: Document[];
  };
}

export interface Stage7QualityInspection {
  stageId: 'STAGE_7';
  stageName: 'Quality Control & Inspection';
  status: ApprovalStatus;
  startDate: Date;
  completionDate?: Date;
  data: {
    qualityPlan: {
      version: number;
      approvedDate: Date;
      standards: string[];
      checkpoints: Array<{
        stage: string;
        parameters: string[];
        frequency: string;
        responsibility: string;
      }>;
    };
    materialTesting: Array<{
      material: string;
      testType: string;
      standard: string;
      samples: number;
      results: Array<{
        parameter: string;
        required: string;
        achieved: string;
        status: 'PASS' | 'FAIL';
      }>;
      labName: string;
      certificateNumber: string;
    }>;
    workmanshipInspection: Array<{
      area: string;
      date: Date;
      inspector: string;
      checklist: Array<{
        item: string;
        compliance: boolean;
        remarks: string;
      }>;
      overallRating: 'EXCELLENT' | 'GOOD' | 'SATISFACTORY' | 'POOR';
      correctiveActions: string[];
    }>;
    thirdPartyInspection: {
      agency: string;
      inspections: Array<{
        date: Date;
        scope: string;
        findings: string[];
        recommendations: string[];
        complianceStatus: boolean;
      }>;
    };
    defects: Array<{
      id: string;
      location: string;
      description: string;
      severity: 'MINOR' | 'MAJOR' | 'CRITICAL';
      identifiedDate: Date;
      rectifiedDate?: Date;
      status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
      photos: string[];
    }>;
    documents: Document[];
  };
}

export interface Stage8ProjectHandover {
  stageId: 'STAGE_8';
  stageName: 'Project Handover';
  status: ApprovalStatus;
  startDate: Date;
  completionDate?: Date;
  data: {
    completionCertificate: {
      certificateNumber: string;
      issueDate: Date;
      issuedBy: string;
      scope: string;
      defectsLiability: {
        startDate: Date;
        endDate: Date;
        retentionAmount: number;
      };
    };
    asBuiltDocuments: {
      drawings: Document[];
      specifications: Document[];
      manuals: Document[];
      warranties: Array<{
        item: string;
        vendor: string;
        warrantyPeriod: number;
        startDate: Date;
        endDate: Date;
      }>;
    };
    handoverProcess: {
      preliminaryInspection: {
        date: Date;
        team: string[];
        snaggingList: string[];
        clearanceStatus: boolean;
      };
      finalInspection: {
        date: Date;
        attendees: Stakeholder[];
        observations: string[];
        accepted: boolean;
      };
      trainingProvided: Array<{
        topic: string;
        date: Date;
        participants: number;
        trainer: string;
      }>;
    };
    performanceTests: Array<{
      system: string;
      testDate: Date;
      parameters: Array<{
        name: string;
        expected: string;
        actual: string;
        result: 'PASS' | 'FAIL';
      }>;
      witnessed: string[];
      certified: boolean;
    }>;
    financialClosure: {
      finalBillAmount: number;
      totalPayments: number;
      retentionHeld: number;
      penaltiesDeducted: number;
      bonusAwarded: number;
      finalSettlement: number;
      closureDate?: Date;
    };
    documents: Document[];
  };
}

export interface Stage9PostConstruction {
  stageId: 'STAGE_9';
  stageName: 'Post-Construction Monitoring';
  status: ApprovalStatus;
  startDate: Date;
  completionDate?: Date;
  data: {
    maintenanceContract: {
      contractNumber: string;
      contractor: string;
      startDate: Date;
      duration: number;
      annualCost: number;
      scope: string[];
      performanceMetrics: Array<{
        parameter: string;
        target: string;
        achieved: string;
      }>;
    };
    defectRectification: Array<{
      reportDate: Date;
      defectDescription: string;
      reportedBy: string;
      severity: 'LOW' | 'MEDIUM' | 'HIGH';
      rectificationDate?: Date;
      cost: number;
      status: 'REPORTED' | 'IN_PROGRESS' | 'COMPLETED';
    }>;
    performanceMonitoring: {
      utilizationRate: number;
      userSatisfaction: number;
      operationalCosts: number;
      maintenanceFrequency: string;
      breakdownHours: number;
      complianceAudits: Array<{
        date: Date;
        auditor: string;
        score: number;
        findings: string[];
      }>;
    };
    benefitRealization: {
      plannedBenefits: string[];
      actualBenefits: Array<{
        benefit: string;
        metric: string;
        target: number;
        achieved: number;
        variance: number;
      }>;
      impactAssessment: {
        economic: string;
        social: string;
        environmental: string;
      };
    };
    documents: Document[];
  };
}

// Main Project Entity
export interface HMDAProject {
  // Basic Information
  projectId: string;
  projectCode: string;
  projectName: string;
  projectDescription: string;
  category: ProjectCategory;
  type: ProjectType;
  status: ProjectStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  
  // Administrative Details
  department: string;
  executingAgency: string;
  implementingDivision: string;
  projectManager: Stakeholder;
  stakeholders: Stakeholder[];
  
  // Location Information
  location: Location;
  
  // Timeline
  plannedStartDate: Date;
  actualStartDate?: Date;
  plannedCompletionDate: Date;
  revisedCompletionDate?: Date;
  actualCompletionDate?: Date;
  duration: number; // in months
  
  // Financial Information
  estimatedCost: number;
  approvedBudget: number;
  revisedBudget?: number;
  actualCost?: number;
  fundingSource: string[];
  financialDetails: FinancialDetail;
  
  // Technical Specifications
  technicalSpecs: {
    area?: number;
    length?: number;
    capacity?: string;
    floors?: number;
    units?: number;
    specifications: Record<string, any>;
  };
  
  // Milestones & Progress
  milestones: Milestone[];
  overallProgress: number;
  currentStage: string;
  
  // Risk Management
  risks: Array<{
    id: string;
    category: string;
    description: string;
    probability: RiskLevel;
    impact: RiskLevel;
    mitigationStrategy: string;
    owner: string;
    status: 'ACTIVE' | 'MITIGATED' | 'CLOSED';
  }>;
  
  // Stage Data
  stages: {
    stage1?: Stage1ProjectInitiation;
    stage2?: Stage2SurveyInvestigation;
    stage3?: Stage3DesignDevelopment;
    stage4?: Stage4TenderingProcurement;
    stage5?: Stage5PermissionsApprovals;
    stage6?: Stage6ProjectExecution;
    stage7?: Stage7QualityInspection;
    stage8?: Stage8ProjectHandover;
    stage9?: Stage9PostConstruction;
  };
  
  // Metadata
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
  version: number;
  tags: string[];
  
  // Audit Trail
  auditLog: Array<{
    timestamp: Date;
    action: string;
    user: string;
    changes: Record<string, any>;
    ipAddress: string;
  }>;
}

// Validation Rules Interface
export interface ValidationRule {
  field: string;
  rules: Array<{
    type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
    value?: any;
    message: string;
    validator?: (value: any, project: HMDAProject) => boolean;
  }>;
}

// Data Generation Parameters
export interface ProjectGenerationParams {
  category: ProjectCategory;
  type: ProjectType;
  location?: Partial<Location>;
  budgetRange?: {
    min: number;
    max: number;
  };
  durationRange?: {
    min: number;
    max: number;
  };
  currentStage?: string;
  completionPercentage?: number;
}