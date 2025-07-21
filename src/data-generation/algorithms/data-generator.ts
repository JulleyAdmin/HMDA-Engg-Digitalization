/**
 * HMDA Project Data Generation Algorithms
 * Realistic data generation based on actual HMDA processes and research
 */

import { faker } from '@faker-js/faker/locale/en_IN';
import {
  HMDAProject,
  ProjectCategory,
  ProjectType,
  ProjectStatus,
  ApprovalStatus,
  RiskLevel,
  Location,
  Stakeholder,
  Document,
  Milestone,
  FinancialDetail,
  ProjectGenerationParams,
  Stage1ProjectInitiation,
  Stage2SurveyInvestigation,
  Stage3DesignDevelopment,
  Stage4TenderingProcurement,
  Stage5PermissionsApprovals,
  Stage6ProjectExecution,
  Stage7QualityInspection,
  Stage8ProjectHandover,
  Stage9PostConstruction
} from '../schemas/project-schema';

// HMDA-specific reference data based on research
const HMDA_ZONES = ['Zone 1 (Secunderabad)', 'Zone 2 (Hyderabad)', 'Zone 3 (Kukatpally)', 'Zone 4 (Charminar)', 'Zone 5 (L.B. Nagar)', 'Zone 6 (Rajendranagar)'];
const HMDA_CIRCLES = ['Circle I', 'Circle II', 'Circle III', 'Circle IV', 'Circle V', 'Circle VI', 'Circle VII', 'Circle VIII'];
const HMDA_DEPARTMENTS = ['Engineering Department', 'Town Planning Department', 'Environment Department', 'Legal Department', 'Finance Department', 'IT Department'];
const HMDA_LOCALITIES = [
  'Gachibowli', 'Madhapur', 'Hitec City', 'Kondapur', 'Jubilee Hills', 'Banjara Hills',
  'Secunderabad', 'Begumpet', 'Ameerpet', 'Kukatpally', 'Miyapur', 'Bachupally',
  'Uppal', 'Kompally', 'Shamshabad', 'Rajendranagar', 'Manikonda', 'Narsingi'
];

const PROJECT_TYPE_CONFIGS = {
  [ProjectCategory.SMALL]: {
    budgetRange: { min: 10_00_000, max: 5_00_00_000 }, // 10L - 5Cr
    durationRange: { min: 6, max: 18 }, // months
    complexityMultiplier: 1
  },
  [ProjectCategory.MEDIUM]: {
    budgetRange: { min: 5_00_00_000, max: 50_00_00_000 }, // 5Cr - 50Cr
    durationRange: { min: 12, max: 36 }, // months
    complexityMultiplier: 1.5
  },
  [ProjectCategory.LARGE]: {
    budgetRange: { min: 50_00_00_000, max: 500_00_00_000 }, // 50Cr - 500Cr
    durationRange: { min: 24, max: 60 }, // months
    complexityMultiplier: 2
  },
  [ProjectCategory.MEGA]: {
    budgetRange: { min: 500_00_00_000, max: 2000_00_00_000 }, // 500Cr - 2000Cr
    durationRange: { min: 36, max: 84 }, // months
    complexityMultiplier: 3
  },
  [ProjectCategory.SPECIAL]: {
    budgetRange: { min: 1_00_00_000, max: 100_00_00_000 }, // 1Cr - 100Cr
    durationRange: { min: 8, max: 30 }, // months
    complexityMultiplier: 1.8
  }
};

export class HMDAProjectGenerator {
  private static instance: HMDAProjectGenerator;
  
  private constructor() {
    // Set faker seed for reproducible results during development
    faker.seed(12345);
  }

  public static getInstance(): HMDAProjectGenerator {
    if (!HMDAProjectGenerator.instance) {
      HMDAProjectGenerator.instance = new HMDAProjectGenerator();
    }
    return HMDAProjectGenerator.instance;
  }

  /**
   * Generate a single HMDA project with realistic data
   */
  generateProject(params: ProjectGenerationParams): HMDAProject {
    const config = PROJECT_TYPE_CONFIGS[params.category];
    const projectId = this.generateProjectId(params.category, params.type);
    
    // Basic project information
    const project: HMDAProject = {
      projectId,
      projectCode: this.generateProjectCode(params.category, params.type),
      projectName: this.generateProjectName(params.type),
      projectDescription: this.generateProjectDescription(params.type),
      category: params.category,
      type: params.type,
      status: this.generateProjectStatus(params.completionPercentage),
      priority: this.generatePriority(params.category),
      
      // Administrative
      department: faker.helpers.arrayElement(HMDA_DEPARTMENTS),
      executingAgency: 'HMDA',
      implementingDivision: this.generateDivision(params.type),
      projectManager: this.generateStakeholder('PROJECT_MANAGER'),
      stakeholders: this.generateStakeholders(config.complexityMultiplier),
      
      // Location
      location: this.generateLocation(params.location),
      
      // Timeline
      plannedStartDate: this.generatePlannedStartDate(),
      actualStartDate: this.generateActualStartDate(),
      plannedCompletionDate: this.generatePlannedCompletionDate(config.durationRange),
      duration: faker.number.int(config.durationRange),
      
      // Financial
      estimatedCost: this.generateBudget(config.budgetRange),
      approvedBudget: 0, // Will be calculated
      fundingSource: this.generateFundingSources(params.category),
      financialDetails: this.generateFinancialDetails(),
      
      // Technical
      technicalSpecs: this.generateTechnicalSpecs(params.type),
      
      // Progress
      milestones: this.generateMilestones(config.durationRange.max),
      overallProgress: params.completionPercentage || faker.number.int({ min: 0, max: 100 }),
      currentStage: params.currentStage || this.generateCurrentStage(),
      
      // Risk
      risks: this.generateRisks(config.complexityMultiplier),
      
      // Stages - will be populated based on current stage
      stages: {},
      
      // Metadata
      createdDate: faker.date.past({ years: 2 }),
      createdBy: faker.person.fullName(),
      lastModifiedDate: faker.date.recent({ days: 30 }),
      lastModifiedBy: faker.person.fullName(),
      version: faker.number.int({ min: 1, max: 5 }),
      tags: this.generateTags(params.type),
      
      // Audit
      auditLog: this.generateAuditLog()
    };

    // Calculate derived fields
    project.approvedBudget = Math.round(project.estimatedCost * faker.number.float({ min: 0.95, max: 1.1 }));
    project.actualCost = project.status === ProjectStatus.COMPLETED 
      ? Math.round(project.approvedBudget * faker.number.float({ min: 0.9, max: 1.15 }))
      : undefined;

    // Generate stage data based on current progress
    this.populateStageData(project);

    return project;
  }

  /**
   * Generate multiple projects with distribution across categories
   */
  generateProjects(count: 150): HMDAProject[] {
    const distribution = {
      [ProjectCategory.SMALL]: 60,    // 40%
      [ProjectCategory.MEDIUM]: 45,   // 30%
      [ProjectCategory.LARGE]: 30,    // 20%
      [ProjectCategory.MEGA]: 10,     // 6.7%
      [ProjectCategory.SPECIAL]: 5    // 3.3%
    };

    const typeDistribution = {
      [ProjectType.BUILDING_PERMISSION]: 30,
      [ProjectType.INFRASTRUCTURE]: 25,
      [ProjectType.ROAD_DEVELOPMENT]: 20,
      [ProjectType.WATER_SUPPLY]: 15,
      [ProjectType.RESIDENTIAL_LAYOUT]: 15,
      [ProjectType.SEWERAGE]: 12,
      [ProjectType.COMMERCIAL_COMPLEX]: 10,
      [ProjectType.PARKS_RECREATION]: 8,
      [ProjectType.INDUSTRIAL_DEVELOPMENT]: 8,
      [ProjectType.SMART_CITY]: 7
    };

    const projects: HMDAProject[] = [];
    
    // Generate projects according to distribution
    for (const [category, count] of Object.entries(distribution)) {
      for (let i = 0; i < count; i++) {
        const type = this.weightedRandomSelect(typeDistribution);
        const completionPercentage = this.generateRealisticProgress();
        
        const project = this.generateProject({
          category: category as ProjectCategory,
          type: type as ProjectType,
          completionPercentage
        });
        
        projects.push(project);
      }
    }

    return this.shuffleArray(projects);
  }

  private generateProjectId(category: ProjectCategory, type: ProjectType): string {
    const year = new Date().getFullYear();
    const categoryCode = category.charAt(0);
    const typeCode = type.substring(0, 2).toUpperCase();
    const sequence = faker.number.int({ min: 1000, max: 9999 });
    return `HMDA-${year}-${categoryCode}${typeCode}-${sequence}`;
  }

  private generateProjectCode(category: ProjectCategory, type: ProjectType): string {
    const zones = ['Z1', 'Z2', 'Z3', 'Z4', 'Z5', 'Z6'];
    const zone = faker.helpers.arrayElement(zones);
    const sequence = faker.number.int({ min: 100, max: 999 });
    return `${zone}/${category.charAt(0)}${type.charAt(0)}/${sequence}`;
  }

  private generateProjectName(type: ProjectType): string {
    const locality = faker.helpers.arrayElement(HMDA_LOCALITIES);
    
    const nameTemplates = {
      [ProjectType.BUILDING_PERMISSION]: [
        `${locality} Residential Complex`,
        `${locality} Commercial Building`,
        `${locality} Mixed-Use Development`,
        `${locality} High-Rise Apartments`
      ],
      [ProjectType.INFRASTRUCTURE]: [
        `${locality} Infrastructure Development`,
        `${locality} Public Facilities Upgrade`,
        `${locality} Utility Infrastructure`,
        `${locality} Smart Infrastructure Project`
      ],
      [ProjectType.ROAD_DEVELOPMENT]: [
        `${locality} Road Widening Project`,
        `${locality} Flyover Construction`,
        `${locality} Ring Road Development`,
        `${locality} Junction Improvement`
      ],
      [ProjectType.WATER_SUPPLY]: [
        `${locality} Water Supply Scheme`,
        `${locality} Pipeline Extension`,
        `${locality} Water Treatment Plant`,
        `${locality} Bore Well Project`
      ],
      [ProjectType.SEWERAGE]: [
        `${locality} Sewerage Treatment Plant`,
        `${locality} Drainage System`,
        `${locality} Sewerage Network Expansion`,
        `${locality} Storm Water Management`
      ],
      [ProjectType.PARKS_RECREATION]: [
        `${locality} Public Park Development`,
        `${locality} Community Center`,
        `${locality} Sports Complex`,
        `${locality} Recreation Facility`
      ],
      [ProjectType.COMMERCIAL_COMPLEX]: [
        `${locality} Shopping Complex`,
        `${locality} Business Park`,
        `${locality} Trade Center`,
        `${locality} Commercial Hub`
      ],
      [ProjectType.RESIDENTIAL_LAYOUT]: [
        `${locality} Residential Layout`,
        `${locality} Housing Project`,
        `${locality} Plotted Development`,
        `${locality} Affordable Housing`
      ],
      [ProjectType.INDUSTRIAL_DEVELOPMENT]: [
        `${locality} Industrial Park`,
        `${locality} Manufacturing Hub`,
        `${locality} IT Park Development`,
        `${locality} Logistics Center`
      ],
      [ProjectType.SMART_CITY]: [
        `${locality} Smart City Initiative`,
        `${locality} Digital Infrastructure`,
        `${locality} IoT Implementation`,
        `${locality} Smart Governance Project`
      ]
    };

    return faker.helpers.arrayElement(nameTemplates[type]);
  }

  private generateProjectDescription(type: ProjectType): string {
    const descriptions = {
      [ProjectType.BUILDING_PERMISSION]: 'Development of modern residential/commercial building with all necessary amenities and compliance with HMDA regulations.',
      [ProjectType.INFRASTRUCTURE]: 'Comprehensive infrastructure development including roads, utilities, and public facilities to support urban growth.',
      [ProjectType.ROAD_DEVELOPMENT]: 'Construction and improvement of road network to enhance connectivity and reduce traffic congestion.',
      [ProjectType.WATER_SUPPLY]: 'Development of water supply infrastructure to provide clean and adequate water to residents.',
      [ProjectType.SEWERAGE]: 'Construction of sewerage treatment facilities and network expansion for environmental protection.',
      [ProjectType.PARKS_RECREATION]: 'Development of public parks and recreational facilities for community well-being.',
      [ProjectType.COMMERCIAL_COMPLEX]: 'Development of commercial spaces to boost economic activity and provide employment opportunities.',
      [ProjectType.RESIDENTIAL_LAYOUT]: 'Planned residential development with proper layout and infrastructure facilities.',
      [ProjectType.INDUSTRIAL_DEVELOPMENT]: 'Development of industrial facilities to promote manufacturing and economic growth.',
      [ProjectType.SMART_CITY]: 'Implementation of smart city technologies for efficient urban management and citizen services.'
    };

    return descriptions[type];
  }

  private generateLocation(partialLocation?: Partial<Location>): Location {
    return {
      zone: partialLocation?.zone || faker.helpers.arrayElement(HMDA_ZONES),
      circle: partialLocation?.circle || faker.helpers.arrayElement(HMDA_CIRCLES),
      ward: partialLocation?.ward || `Ward ${faker.number.int({ min: 1, max: 150 })}`,
      locality: partialLocation?.locality || faker.helpers.arrayElement(HMDA_LOCALITIES),
      latitude: partialLocation?.latitude || faker.location.latitude({ min: 17.2, max: 17.6 }),
      longitude: partialLocation?.longitude || faker.location.longitude({ min: 78.2, max: 78.7 }),
      address: partialLocation?.address || faker.location.streetAddress(),
      landParcelNumbers: this.generateLandParcelNumbers(),
      nearbyLandmarks: this.generateNearbyLandmarks()
    };
  }

  private generateStakeholder(role: string): Stakeholder {
    const designations = {
      'PROJECT_MANAGER': ['Executive Engineer', 'Deputy Executive Engineer', 'Assistant Executive Engineer'],
      'TECHNICAL_HEAD': ['Chief Engineer', 'Deputy Chief Engineer', 'Superintending Engineer'],
      'ADMIN_HEAD': ['Additional Commissioner', 'Joint Commissioner', 'Deputy Commissioner'],
      'FIELD_ENGINEER': ['Assistant Engineer', 'Junior Engineer', 'Technical Assistant']
    };

    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      role,
      designation: faker.helpers.arrayElement(designations[role] || ['Officer']),
      department: faker.helpers.arrayElement(HMDA_DEPARTMENTS),
      email: faker.internet.email(),
      phone: faker.phone.number('##########'),
      responsibilityLevel: faker.helpers.arrayElement(['PRIMARY', 'SECONDARY', 'SUPPORT'])
    };
  }

  private generateStakeholders(complexityMultiplier: number): Stakeholder[] {
    const baseCount = 5;
    const count = Math.round(baseCount * complexityMultiplier);
    
    const stakeholders: Stakeholder[] = [];
    const roles = ['TECHNICAL_HEAD', 'ADMIN_HEAD', 'FIELD_ENGINEER', 'FIELD_ENGINEER', 'FIELD_ENGINEER'];
    
    for (let i = 0; i < count; i++) {
      stakeholders.push(this.generateStakeholder(roles[i % roles.length]));
    }
    
    return stakeholders;
  }

  private generateMilestones(maxDuration: number): Milestone[] {
    const milestoneTemplates = [
      'Project Initiation Approval',
      'Survey and Investigation Complete',
      'Design Approval',
      'Tender Award',
      'Work Commencement',
      '25% Physical Progress',
      '50% Physical Progress',
      '75% Physical Progress',
      'Work Completion',
      'Final Handover'
    ];

    return milestoneTemplates.map((name, index) => ({
      id: faker.string.uuid(),
      name,
      description: `${name} milestone for the project`,
      plannedDate: faker.date.future({ years: maxDuration / 12 }),
      actualDate: faker.datatype.boolean(0.6) ? faker.date.past() : undefined,
      status: this.generateMilestoneStatus(),
      dependencies: index > 0 ? [faker.string.uuid()] : [],
      criticalPath: faker.datatype.boolean(0.4),
      delayDays: faker.datatype.boolean(0.3) ? faker.number.int({ min: 1, max: 30 }) : undefined,
      completionPercentage: faker.number.int({ min: 0, max: 100 })
    }));
  }

  private generateRisks(complexityMultiplier: number): Array<any> {
    const riskTemplates = [
      { category: 'Technical', description: 'Design complexity and technical challenges' },
      { category: 'Financial', description: 'Budget overrun and funding delays' },
      { category: 'Schedule', description: 'Project timeline delays' },
      { category: 'Regulatory', description: 'Approval and compliance delays' },
      { category: 'Environmental', description: 'Environmental impact and clearances' },
      { category: 'Resource', description: 'Skilled manpower and material availability' }
    ];

    const riskCount = Math.min(riskTemplates.length, Math.round(3 * complexityMultiplier));
    
    return faker.helpers.arrayElements(riskTemplates, riskCount).map(template => ({
      id: faker.string.uuid(),
      category: template.category,
      description: template.description,
      probability: faker.helpers.arrayElement(Object.values(RiskLevel)),
      impact: faker.helpers.arrayElement(Object.values(RiskLevel)),
      mitigationStrategy: `Mitigation strategy for ${template.category.toLowerCase()} risk`,
      owner: faker.person.fullName(),
      status: faker.helpers.arrayElement(['ACTIVE', 'MITIGATED', 'CLOSED'])
    }));
  }

  private populateStageData(project: HMDAProject): void {
    const progress = project.overallProgress;
    
    // Always populate Stage 1 for any project
    if (progress >= 0) {
      project.stages.stage1 = this.generateStage1Data(project);
    }
    
    if (progress >= 10) {
      project.stages.stage2 = this.generateStage2Data(project);
    }
    
    if (progress >= 20) {
      project.stages.stage3 = this.generateStage3Data(project);
    }
    
    if (progress >= 30) {
      project.stages.stage4 = this.generateStage4Data(project);
    }
    
    if (progress >= 40) {
      project.stages.stage5 = this.generateStage5Data(project);
    }
    
    if (progress >= 50) {
      project.stages.stage6 = this.generateStage6Data(project);
    }
    
    if (progress >= 80) {
      project.stages.stage7 = this.generateStage7Data(project);
    }
    
    if (progress >= 90) {
      project.stages.stage8 = this.generateStage8Data(project);
    }
    
    if (progress >= 95) {
      project.stages.stage9 = this.generateStage9Data(project);
    }
  }

  private generateStage1Data(project: HMDAProject): Stage1ProjectInitiation {
    return {
      stageId: 'STAGE_1',
      stageName: 'Project Initiation',
      status: ApprovalStatus.APPROVED,
      startDate: project.plannedStartDate,
      completionDate: faker.date.between({ from: project.plannedStartDate, to: new Date() }),
      data: {
        projectProposal: {
          proposalNumber: `PROP-${faker.number.int({ min: 1000, max: 9999 })}`,
          submissionDate: project.plannedStartDate,
          proposedBy: project.projectManager.name,
          department: project.department,
          justification: `Strategic development initiative for ${project.location.locality} area`,
          beneficiaries: faker.number.int({ min: 1000, max: 50000 }),
          preliminaryBudget: project.estimatedCost
        },
        feasibilityStudy: {
          technicalFeasibility: true,
          financialFeasibility: true,
          environmentalImpact: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
          socialImpact: faker.helpers.arrayElement(['POSITIVE', 'NEUTRAL', 'NEGATIVE']),
          recommendedActions: [
            'Proceed with detailed survey',
            'Obtain necessary clearances',
            'Prepare detailed project report'
          ]
        },
        initialApprovals: {
          departmentApproval: ApprovalStatus.APPROVED,
          budgetaryApproval: ApprovalStatus.APPROVED,
          technicalCommitteeReview: ApprovalStatus.APPROVED,
          approvalDate: faker.date.past(),
          approvedBy: 'Chief Engineer',
          remarks: 'Approved for implementation'
        },
        documents: this.generateDocuments(['Proposal', 'Feasibility Study', 'Budget Estimate']),
        risks: [
          {
            type: 'Technical',
            description: 'Complex technical requirements',
            probability: 'MEDIUM',
            impact: 'MEDIUM',
            mitigationPlan: 'Engage specialized consultants'
          }
        ]
      }
    };
  }

  private generateStage2Data(project: HMDAProject): Stage2SurveyInvestigation {
    return {
      stageId: 'STAGE_2',
      stageName: 'Survey & Investigation',
      status: ApprovalStatus.APPROVED,
      startDate: faker.date.past(),
      completionDate: faker.date.past(),
      data: {
        landSurvey: {
          surveyNumber: `SY-${faker.number.int({ min: 100, max: 999 })}`,
          surveyDate: faker.date.past(),
          totalArea: faker.number.int({ min: 1000, max: 100000 }),
          encumbrances: ['Power lines', 'Water pipeline'],
          ownership: faker.helpers.arrayElement(['GOVERNMENT', 'PRIVATE', 'MIXED']),
          landUse: faker.helpers.arrayElement(['Residential', 'Commercial', 'Industrial', 'Mixed']),
          topography: faker.helpers.arrayElement(['Plain', 'Undulating', 'Hilly'])
        },
        soilInvestigation: {
          reportNumber: `SI-${faker.number.int({ min: 100, max: 999 })}`,
          investigationDate: faker.date.past(),
          soilType: faker.helpers.arrayElement(['Black Cotton', 'Red Sandy', 'Alluvial']),
          bearingCapacity: faker.number.int({ min: 100, max: 500 }),
          waterTable: faker.number.int({ min: 2, max: 15 }),
          recommendations: ['Foundation design as per soil conditions', 'Adequate drainage provision']
        },
        environmentalAssessment: {
          assessmentDate: faker.date.past(),
          airQualityIndex: faker.number.int({ min: 50, max: 200 }),
          noiseLevel: faker.number.int({ min: 40, max: 80 }),
          greenCoverPercentage: faker.number.int({ min: 10, max: 40 }),
          waterBodies: ['Hussain Sagar Lake', 'Musi River'],
          protectedAreas: faker.datatype.boolean(),
          clearanceRequired: faker.datatype.boolean()
        },
        utilityMapping: {
          existingUtilities: [
            {
              type: 'Electricity',
              provider: 'TSSPDCL',
              location: 'Road side',
              relocationRequired: false
            },
            {
              type: 'Water',
              provider: 'HMWSSB',
              location: 'Underground',
              relocationRequired: true
            }
          ],
          proposedConnections: ['Electrical', 'Water', 'Sewerage', 'Telecom']
        },
        documents: this.generateDocuments(['Survey Report', 'Soil Investigation', 'Environmental Assessment'])
      }
    };
  }

  private generateStage3Data(project: HMDAProject): Stage3DesignDevelopment {
    return {
      stageId: 'STAGE_3',
      stageName: 'Design & Development',
      status: ApprovalStatus.APPROVED,
      startDate: faker.date.past(),
      completionDate: faker.date.past(),
      data: {
        conceptDesign: {
          designNumber: `CD-${faker.number.int({ min: 100, max: 999 })}`,
          version: faker.number.int({ min: 1, max: 3 }),
          submittedDate: faker.date.past(),
          architect: faker.person.fullName(),
          consultant: faker.company.name(),
          designFeatures: ['Modern architecture', 'Sustainable design', 'Universal accessibility']
        },
        detailedDesign: {
          drawings: [
            {
              drawingNumber: 'DD-001',
              type: 'Site Plan',
              revision: 2,
              approvalStatus: ApprovalStatus.APPROVED
            },
            {
              drawingNumber: 'DD-002',
              type: 'Floor Plans',
              revision: 1,
              approvalStatus: ApprovalStatus.APPROVED
            }
          ],
          specifications: ['IS Code compliance', 'Quality standards', 'Safety norms'],
          materials: [
            {
              name: 'Cement',
              specification: 'OPC 53 Grade',
              quantity: 1000,
              unit: 'MT'
            },
            {
              name: 'Steel',
              specification: 'Fe 500',
              quantity: 500,
              unit: 'MT'
            }
          ]
        },
        structuralDesign: {
          designCode: 'IS 456:2000',
          loadCalculations: true,
          seismicZone: 'Zone II',
          foundationType: 'Raft Foundation',
          structuralSystem: 'RCC Frame'
        },
        costEstimate: {
          estimateNumber: `EST-${faker.number.int({ min: 1000, max: 9999 })}`,
          baseYear: new Date().getFullYear(),
          totalCost: project.estimatedCost,
          breakdown: [
            { component: 'Civil Works', amount: project.estimatedCost * 0.6, percentage: 60 },
            { component: 'Electrical', amount: project.estimatedCost * 0.15, percentage: 15 },
            { component: 'Mechanical', amount: project.estimatedCost * 0.10, percentage: 10 },
            { component: 'Others', amount: project.estimatedCost * 0.15, percentage: 15 }
          ],
          contingency: project.estimatedCost * 0.05,
          escalation: project.estimatedCost * 0.03
        },
        approvals: {
          technicalSanction: ApprovalStatus.APPROVED,
          designApproval: ApprovalStatus.APPROVED,
          heritageCommittee: faker.datatype.boolean() ? ApprovalStatus.APPROVED : undefined,
          fireNOC: ApprovalStatus.APPROVED,
          aviationClearance: faker.datatype.boolean() ? ApprovalStatus.APPROVED : undefined
        },
        documents: this.generateDocuments(['Design Drawings', 'Technical Specifications', 'Cost Estimate'])
      }
    };
  }

  private generateStage4Data(project: HMDAProject): Stage4TenderingProcurement {
    const contractAmount = project.approvedBudget * faker.number.float({ min: 0.85, max: 0.95 });
    
    return {
      stageId: 'STAGE_4',
      stageName: 'Tendering & Procurement',
      status: ApprovalStatus.APPROVED,
      startDate: faker.date.past(),
      completionDate: faker.date.past(),
      data: {
        tenderDetails: {
          tenderNumber: `TNR-${faker.number.int({ min: 1000, max: 9999 })}`,
          tenderType: faker.helpers.arrayElement(['OPEN', 'LIMITED', 'SINGLE', 'EPC']),
          publishDate: faker.date.past(),
          prebidDate: faker.date.past(),
          submissionDeadline: faker.date.past(),
          estimatedValue: project.estimatedCost,
          earnestMoney: project.estimatedCost * 0.02
        },
        bidders: [
          {
            bidderId: 'B001',
            name: 'ABC Construction Ltd',
            registrationNumber: 'REG123456',
            experience: 15,
            technicalScore: 85,
            financialBid: contractAmount,
            ranking: 1,
            status: 'SELECTED'
          },
          {
            bidderId: 'B002',
            name: 'XYZ Builders Pvt Ltd',
            registrationNumber: 'REG234567',
            experience: 12,
            technicalScore: 78,
            financialBid: contractAmount * 1.1,
            ranking: 2,
            status: 'QUALIFIED'
          }
        ],
        evaluation: {
          technicalEvaluationDate: faker.date.past(),
          financialOpeningDate: faker.date.past(),
          lowestBidder: 'ABC Construction Ltd',
          recommendedBidder: 'ABC Construction Ltd',
          negotiatedAmount: contractAmount,
          savingsPercentage: ((project.estimatedCost - contractAmount) / project.estimatedCost) * 100
        },
        awardDetails: {
          contractorName: 'ABC Construction Ltd',
          contractAmount,
          contractDate: faker.date.past(),
          completionPeriod: project.duration,
          performanceGuarantee: contractAmount * 0.05,
          defectLiabilityPeriod: 12
        },
        documents: this.generateDocuments(['Tender Notice', 'Contract Agreement', 'Performance Guarantee'])
      }
    };
  }

  private generateStage5Data(project: HMDAProject): Stage5PermissionsApprovals {
    return {
      stageId: 'STAGE_5',
      stageName: 'Permissions & Approvals',
      status: ApprovalStatus.APPROVED,
      startDate: faker.date.past(),
      completionDate: faker.date.past(),
      data: {
        buildingPermission: {
          applicationNumber: `BP-${faker.number.int({ min: 10000, max: 99999 })}`,
          submissionDate: faker.date.past(),
          bpassNumber: `BPASS-${faker.number.int({ min: 1000, max: 9999 })}`,
          approvalDate: faker.date.past(),
          validity: 36,
          conditions: ['Compliance with building regulations', 'Fire safety measures', 'Parking provisions']
        },
        environmentalClearance: {
          required: project.category === ProjectCategory.LARGE || project.category === ProjectCategory.MEGA,
          applicationNumber: `EC-${faker.number.int({ min: 1000, max: 9999 })}`,
          category: faker.helpers.arrayElement(['A', 'B1', 'B2', 'NA']),
          status: ApprovalStatus.APPROVED,
          validityPeriod: 60,
          monitoringRequirements: ['Air quality monitoring', 'Noise level monitoring']
        },
        specialPermissions: [
          {
            type: 'Heritage Committee',
            authority: 'Archaeological Survey of India',
            applicationDate: faker.date.past(),
            status: ApprovalStatus.APPROVED,
            referenceNumber: `HC-${faker.number.int({ min: 100, max: 999 })}`,
            conditions: ['Maintain heritage character', 'Use traditional materials']
          }
        ],
        utilities: {
          waterConnection: {
            status: ApprovalStatus.APPROVED,
            sanctionedLoad: faker.number.int({ min: 1000, max: 10000 }),
            connectionCharges: faker.number.int({ min: 50000, max: 500000 })
          },
          powerConnection: {
            status: ApprovalStatus.APPROVED,
            sanctionedLoad: faker.number.int({ min: 100, max: 1000 }),
            transformerCapacity: faker.number.int({ min: 250, max: 1000 })
          },
          sewerageConnection: {
            status: ApprovalStatus.APPROVED,
            treatmentRequired: faker.datatype.boolean()
          }
        },
        documents: this.generateDocuments(['Building Permission', 'Environmental Clearance', 'Utility Connections'])
      }
    };
  }

  private generateStage6Data(project: HMDAProject): Stage6ProjectExecution {
    return {
      stageId: 'STAGE_6',
      stageName: 'Project Execution',
      status: project.overallProgress >= 90 ? ApprovalStatus.APPROVED : ApprovalStatus.IN_REVIEW,
      startDate: faker.date.past(),
      completionDate: project.overallProgress >= 90 ? faker.date.past() : undefined,
      data: {
        executionPlan: {
          mobilizationDate: faker.date.past(),
          phases: [
            {
              phaseName: 'Foundation',
              startDate: faker.date.past(),
              endDate: faker.date.past(),
              activities: ['Excavation', 'PCC', 'Reinforcement', 'Concreting'],
              progress: 100
            },
            {
              phaseName: 'Superstructure',
              startDate: faker.date.past(),
              endDate: faker.date.recent(),
              activities: ['Column casting', 'Beam work', 'Slab work'],
              progress: project.overallProgress
            }
          ],
          resourcePlan: {
            manpower: faker.number.int({ min: 50, max: 200 }),
            machinery: ['Concrete mixer', 'Tower crane', 'JCB'],
            materials: ['Cement', 'Steel', 'Aggregate', 'Bricks']
          }
        },
        progress: {
          overallProgress: project.overallProgress,
          physicalProgress: project.overallProgress,
          financialProgress: project.overallProgress * 0.9,
          lastUpdated: faker.date.recent(),
          criticalActivities: ['Structural work', 'Electrical installation'],
          delays: project.overallProgress < 80 ? [
            {
              reason: 'Material shortage',
              impact: 15,
              recoveryPlan: 'Expedite material procurement'
            }
          ] : []
        },
        qualityControl: {
          tests: [
            {
              testName: 'Concrete Cube Test',
              date: faker.date.past(),
              result: 'PASS',
              remarks: 'Strength achieved as per design'
            },
            {
              testName: 'Steel Tensile Test',
              date: faker.date.past(),
              result: 'PASS',
              remarks: 'Confirms to IS standards'
            }
          ],
          inspections: [
            {
              type: 'Quality Inspection',
              date: faker.date.past(),
              inspector: faker.person.fullName(),
              findings: ['Good workmanship', 'Materials as per specification'],
              compliance: true
            }
          ],
          nonConformances: []
        },
        safetyRecords: {
          incidents: 0,
          lostTimeInjuries: 0,
          safetyMeetings: 12,
          trainingSessions: 8,
          complianceScore: 95
        },
        bills: [
          {
            billNumber: 'BILL-001',
            date: faker.date.past(),
            amount: project.approvedBudget * 0.3,
            workDone: 'Foundation work',
            status: 'PAID',
            deductions: 0
          },
          {
            billNumber: 'BILL-002',
            date: faker.date.recent(),
            amount: project.approvedBudget * 0.4,
            workDone: 'Superstructure work',
            status: 'APPROVED',
            deductions: project.approvedBudget * 0.01
          }
        ],
        documents: this.generateDocuments(['Work Orders', 'Progress Reports', 'Quality Certificates'])
      }
    };
  }

  private generateStage7Data(project: HMDAProject): Stage7QualityInspection {
    return {
      stageId: 'STAGE_7',
      stageName: 'Quality Control & Inspection',
      status: ApprovalStatus.APPROVED,
      startDate: faker.date.past(),
      completionDate: faker.date.past(),
      data: {
        qualityPlan: {
          version: 2,
          approvedDate: faker.date.past(),
          standards: ['IS 456:2000', 'IS 1893:2016', 'NBC 2016'],
          checkpoints: [
            {
              stage: 'Foundation',
              parameters: ['Concrete strength', 'Reinforcement details'],
              frequency: 'Every pour',
              responsibility: 'Site Engineer'
            }
          ]
        },
        materialTesting: [
          {
            material: 'Concrete',
            testType: 'Compressive Strength',
            standard: 'IS 516:1999',
            samples: 12,
            results: [
              {
                parameter: 'Compressive Strength',
                required: '25 MPa',
                achieved: '28 MPa',
                status: 'PASS'
              }
            ],
            labName: 'Accredited Testing Laboratory',
            certificateNumber: `CERT-${faker.number.int({ min: 1000, max: 9999 })}`
          }
        ],
        workmanshipInspection: [
          {
            area: 'Foundation',
            date: faker.date.past(),
            inspector: faker.person.fullName(),
            checklist: [
              {
                item: 'Concrete finish',
                compliance: true,
                remarks: 'Good finish'
              },
              {
                item: 'Reinforcement placement',
                compliance: true,
                remarks: 'As per drawing'
              }
            ],
            overallRating: 'GOOD',
            correctiveActions: []
          }
        ],
        thirdPartyInspection: {
          agency: 'Independent Quality Consultants',
          inspections: [
            {
              date: faker.date.past(),
              scope: 'Overall quality assessment',
              findings: ['Work quality satisfactory', 'Materials as per specification'],
              recommendations: ['Continue current quality practices'],
              complianceStatus: true
            }
          ]
        },
        defects: [],
        documents: this.generateDocuments(['Quality Plan', 'Test Certificates', 'Inspection Reports'])
      }
    };
  }

  private generateStage8Data(project: HMDAProject): Stage8ProjectHandover {
    return {
      stageId: 'STAGE_8',
      stageName: 'Project Handover',
      status: ApprovalStatus.APPROVED,
      startDate: faker.date.past(),
      completionDate: faker.date.past(),
      data: {
        completionCertificate: {
          certificateNumber: `CC-${faker.number.int({ min: 1000, max: 9999 })}`,
          issueDate: faker.date.past(),
          issuedBy: 'Executive Engineer',
          scope: 'Complete project as per approved drawings',
          defectsLiability: {
            startDate: faker.date.past(),
            endDate: faker.date.future({ years: 1 }),
            retentionAmount: project.approvedBudget * 0.05
          }
        },
        asBuiltDocuments: {
          drawings: this.generateDocuments(['As-built Drawings']),
          specifications: this.generateDocuments(['Final Specifications']),
          manuals: this.generateDocuments(['Operation Manual', 'Maintenance Manual']),
          warranties: [
            {
              item: 'Electrical Equipment',
              vendor: 'ABC Electricals',
              warrantyPeriod: 24,
              startDate: faker.date.past(),
              endDate: faker.date.future({ years: 2 })
            }
          ]
        },
        handoverProcess: {
          preliminaryInspection: {
            date: faker.date.past(),
            team: ['Project Manager', 'Technical Head', 'Quality Controller'],
            snaggingList: ['Minor painting work', 'Electrical connections'],
            clearanceStatus: true
          },
          finalInspection: {
            date: faker.date.past(),
            attendees: [project.projectManager],
            observations: ['Work completed satisfactorily'],
            accepted: true
          },
          trainingProvided: [
            {
              topic: 'System Operation',
              date: faker.date.past(),
              participants: 15,
              trainer: faker.person.fullName()
            }
          ]
        },
        performanceTests: [
          {
            system: 'Electrical System',
            testDate: faker.date.past(),
            parameters: [
              {
                name: 'Voltage',
                expected: '230V',
                actual: '232V',
                result: 'PASS'
              }
            ],
            witnessed: ['Electrical Engineer'],
            certified: true
          }
        ],
        financialClosure: {
          finalBillAmount: project.approvedBudget * 0.95,
          totalPayments: project.approvedBudget * 0.90,
          retentionHeld: project.approvedBudget * 0.05,
          penaltiesDeducted: 0,
          bonusAwarded: 0,
          finalSettlement: project.approvedBudget * 0.95,
          closureDate: faker.date.past()
        },
        documents: this.generateDocuments(['Completion Certificate', 'Handover Documents', 'Warranties'])
      }
    };
  }

  private generateStage9Data(project: HMDAProject): Stage9PostConstruction {
    return {
      stageId: 'STAGE_9',
      stageName: 'Post-Construction Monitoring',
      status: ApprovalStatus.IN_REVIEW,
      startDate: faker.date.past(),
      completionDate: undefined,
      data: {
        maintenanceContract: {
          contractNumber: `MC-${faker.number.int({ min: 1000, max: 9999 })}`,
          contractor: 'Maintenance Services Ltd',
          startDate: faker.date.past(),
          duration: 60,
          annualCost: project.approvedBudget * 0.02,
          scope: ['Cleaning', 'Minor repairs', 'Preventive maintenance'],
          performanceMetrics: [
            {
              parameter: 'Response Time',
              target: '4 hours',
              achieved: '3.5 hours'
            }
          ]
        },
        defectRectification: [],
        performanceMonitoring: {
          utilizationRate: faker.number.int({ min: 70, max: 95 }),
          userSatisfaction: faker.number.int({ min: 80, max: 95 }),
          operationalCosts: project.approvedBudget * 0.015,
          maintenanceFrequency: 'Monthly',
          breakdownHours: faker.number.int({ min: 0, max: 24 }),
          complianceAudits: [
            {
              date: faker.date.past(),
              auditor: 'Internal Audit Team',
              score: 92,
              findings: ['Excellent maintenance', 'Good operational performance']
            }
          ]
        },
        benefitRealization: {
          plannedBenefits: ['Improved connectivity', 'Economic development', 'Better quality of life'],
          actualBenefits: [
            {
              benefit: 'Improved connectivity',
              metric: 'Travel time reduction',
              target: 30,
              achieved: 35,
              variance: 5
            }
          ],
          impactAssessment: {
            economic: 'Positive impact on local economy',
            social: 'Improved accessibility for residents',
            environmental: 'Minimal environmental impact'
          }
        },
        documents: this.generateDocuments(['Maintenance Reports', 'Performance Reports', 'Audit Reports'])
      }
    };
  }

  // Utility methods
  private generateDocuments(types: string[]): Document[] {
    return types.map(type => ({
      id: faker.string.uuid(),
      name: `${type}.pdf`,
      type: 'PDF',
      category: type,
      uploadDate: faker.date.past(),
      size: faker.number.int({ min: 100000, max: 10000000 }),
      version: faker.number.int({ min: 1, max: 3 }),
      status: faker.helpers.arrayElement(['DRAFT', 'SUBMITTED', 'VERIFIED', 'APPROVED']),
      uploadedBy: faker.person.fullName(),
      checksum: faker.string.hexadecimal({ length: 32 }),
      remarks: faker.datatype.boolean(0.3) ? faker.lorem.sentence() : undefined
    }));
  }

  private generateFinancialDetails(): FinancialDetail {
    const estimated = faker.number.int({ min: 1000000, max: 100000000 });
    const sanctioned = estimated * faker.number.float({ min: 0.95, max: 1.05 });
    const released = sanctioned * faker.number.float({ min: 0.7, max: 0.9 });
    const utilized = released * faker.number.float({ min: 0.8, max: 0.95 });
    
    return {
      estimatedCost: estimated,
      sanctionedAmount: sanctioned,
      releasedAmount: released,
      utilizedAmount: utilized,
      pendingBills: faker.number.int({ min: 0, max: sanctioned * 0.1 }),
      retentionAmount: sanctioned * 0.05,
      performanceGuarantee: sanctioned * 0.05,
      lastUpdated: faker.date.recent()
    };
  }

  private generateTechnicalSpecs(type: ProjectType): any {
    const specs: Record<ProjectType, any> = {
      [ProjectType.BUILDING_PERMISSION]: {
        area: faker.number.int({ min: 1000, max: 10000 }),
        floors: faker.number.int({ min: 1, max: 20 }),
        units: faker.number.int({ min: 10, max: 200 }),
        specifications: {
          structure: 'RCC Frame',
          elevators: faker.number.int({ min: 1, max: 4 }),
          parking: faker.number.int({ min: 50, max: 300 })
        }
      },
      [ProjectType.ROAD_DEVELOPMENT]: {
        length: faker.number.int({ min: 1000, max: 20000 }),
        specifications: {
          roadType: faker.helpers.arrayElement(['2-lane', '4-lane', '6-lane']),
          surface: 'Bituminous',
          drainage: 'RCC box drains'
        }
      },
      [ProjectType.WATER_SUPPLY]: {
        capacity: `${faker.number.int({ min: 1, max: 50 })} MLD`,
        specifications: {
          pipelineLength: faker.number.int({ min: 5000, max: 50000 }),
          pumpingStations: faker.number.int({ min: 1, max: 5 }),
          storageCapacity: faker.number.int({ min: 1000, max: 10000 })
        }
      },
      [ProjectType.SEWERAGE]: {
        capacity: `${faker.number.int({ min: 1, max: 30 })} MLD`,
        specifications: {
          treatmentType: 'STP',
          networkLength: faker.number.int({ min: 10000, max: 100000 }),
          pumpingStations: faker.number.int({ min: 2, max: 8 })
        }
      },
      [ProjectType.PARKS_RECREATION]: {
        area: faker.number.int({ min: 5000, max: 50000 }),
        specifications: {
          facilities: ['Walking track', 'Children play area', 'Gym equipment'],
          greenCover: faker.number.int({ min: 60, max: 80 }),
          infrastructure: 'Pavilions, restrooms, lighting'
        }
      },
      [ProjectType.COMMERCIAL_COMPLEX]: {
        area: faker.number.int({ min: 10000, max: 100000 }),
        floors: faker.number.int({ min: 3, max: 15 }),
        specifications: {
          shops: faker.number.int({ min: 50, max: 500 }),
          parking: faker.number.int({ min: 200, max: 1000 }),
          facilities: 'Food court, multiplex, anchor stores'
        }
      },
      [ProjectType.RESIDENTIAL_LAYOUT]: {
        area: faker.number.int({ min: 50000, max: 500000 }),
        units: faker.number.int({ min: 100, max: 1000 }),
        specifications: {
          plotSizes: '200-500 sq yards',
          roads: '30-60 feet wide',
          amenities: 'Park, community hall, shopping area'
        }
      },
      [ProjectType.INDUSTRIAL_DEVELOPMENT]: {
        area: faker.number.int({ min: 100000, max: 1000000 }),
        specifications: {
          plotSizes: '1000-5000 sq yards',
          infrastructure: 'Power, water, sewerage, roads',
          zoning: 'Industrial as per master plan'
        }
      },
      [ProjectType.INFRASTRUCTURE]: {
        specifications: {
          scope: 'Multi-utility infrastructure',
          coverage: 'Complete locality',
          duration: '18-36 months'
        }
      },
      [ProjectType.SMART_CITY]: {
        specifications: {
          technology: 'IoT, sensors, automation',
          coverage: 'City-wide implementation',
          components: 'Traffic management, waste management, energy efficiency'
        }
      }
    };

    return specs[type] || { specifications: {} };
  }

  private generatePlannedStartDate(): Date {
    return faker.date.between({ 
      from: new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000), 
      to: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000) 
    });
  }

  private generateActualStartDate(): Date | undefined {
    return faker.datatype.boolean(0.8) ? faker.date.past() : undefined;
  }

  private generatePlannedCompletionDate(durationRange: { min: number; max: number }): Date {
    const months = faker.number.int(durationRange);
    return new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000);
  }

  private generateProjectStatus(completionPercentage?: number): ProjectStatus {
    if (!completionPercentage) {
      return faker.helpers.arrayElement(Object.values(ProjectStatus));
    }
    
    if (completionPercentage === 100) return ProjectStatus.COMPLETED;
    if (completionPercentage > 0) return ProjectStatus.IN_PROGRESS;
    return ProjectStatus.PLANNED;
  }

  private generatePriority(category: ProjectCategory): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const priorityMap = {
      [ProjectCategory.MEGA]: 'CRITICAL',
      [ProjectCategory.LARGE]: 'HIGH',
      [ProjectCategory.MEDIUM]: 'MEDIUM',
      [ProjectCategory.SMALL]: 'MEDIUM',
      [ProjectCategory.SPECIAL]: 'HIGH'
    };
    
    return priorityMap[category] as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  }

  private generateDivision(type: ProjectType): string {
    const divisionMap = {
      [ProjectType.BUILDING_PERMISSION]: 'Town Planning Division',
      [ProjectType.INFRASTRUCTURE]: 'Engineering Division',
      [ProjectType.ROAD_DEVELOPMENT]: 'Roads & Bridges Division',
      [ProjectType.WATER_SUPPLY]: 'Water Supply Division',
      [ProjectType.SEWERAGE]: 'Sewerage Division',
      [ProjectType.PARKS_RECREATION]: 'Parks & Recreation Division',
      [ProjectType.COMMERCIAL_COMPLEX]: 'Commercial Development Division',
      [ProjectType.RESIDENTIAL_LAYOUT]: 'Layout Division',
      [ProjectType.INDUSTRIAL_DEVELOPMENT]: 'Industrial Development Division',
      [ProjectType.SMART_CITY]: 'Smart City Division'
    };
    
    return divisionMap[type];
  }

  private generateFundingSources(category: ProjectCategory): string[] {
    const sources = ['HMDA Internal Funds', 'State Government', 'Central Government', 'World Bank', 'ADB', 'Private Partnership'];
    
    if (category === ProjectCategory.MEGA) {
      return faker.helpers.arrayElements(sources, { min: 2, max: 4 });
    } else if (category === ProjectCategory.LARGE) {
      return faker.helpers.arrayElements(sources, { min: 1, max: 3 });
    } else {
      return faker.helpers.arrayElements(sources, { min: 1, max: 2 });
    }
  }

  private generateBudget(range: { min: number; max: number }): number {
    return faker.number.int(range);
  }

  private generateCurrentStage(): string {
    const stages = [
      'Project Initiation',
      'Survey & Investigation', 
      'Design & Development',
      'Tendering & Procurement',
      'Permissions & Approvals',
      'Project Execution',
      'Quality Control & Inspection',
      'Project Handover',
      'Post-Construction Monitoring'
    ];
    
    return faker.helpers.arrayElement(stages);
  }

  private generateRealisticProgress(): number {
    // Generate more realistic distribution of project progress
    const rand = Math.random();
    
    if (rand < 0.1) return 100; // 10% completed projects
    if (rand < 0.25) return faker.number.int({ min: 80, max: 99 }); // 15% near completion
    if (rand < 0.65) return faker.number.int({ min: 30, max: 79 }); // 40% in progress
    if (rand < 0.85) return faker.number.int({ min: 10, max: 29 }); // 20% early stage
    return faker.number.int({ min: 0, max: 9 }); // 15% just started
  }

  private generateMilestoneStatus(): 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED' {
    return faker.helpers.arrayElement(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'DELAYED']);
  }

  private generateLandParcelNumbers(): string[] {
    const count = faker.number.int({ min: 1, max: 5 });
    return Array.from({ length: count }, () => 
      `${faker.number.int({ min: 100, max: 999 })}/${faker.number.int({ min: 1, max: 50 })}`
    );
  }

  private generateNearbyLandmarks(): string[] {
    const landmarks = [
      'Government Hospital', 'Police Station', 'School', 'Temple', 'Metro Station',
      'Bus Stop', 'Shopping Center', 'Park', 'Bank', 'Post Office'
    ];
    
    return faker.helpers.arrayElements(landmarks, { min: 2, max: 5 });
  }

  private generateTags(type: ProjectType): string[] {
    const commonTags = ['HMDA', 'Urban Development', 'Infrastructure'];
    const typeSpecificTags = {
      [ProjectType.BUILDING_PERMISSION]: ['Building', 'Construction', 'Approval'],
      [ProjectType.INFRASTRUCTURE]: ['Infrastructure', 'Public Works', 'Utilities'],
      [ProjectType.ROAD_DEVELOPMENT]: ['Roads', 'Transportation', 'Connectivity'],
      [ProjectType.WATER_SUPPLY]: ['Water', 'Supply', 'Utilities'],
      [ProjectType.SEWERAGE]: ['Sewerage', 'Sanitation', 'Environment'],
      [ProjectType.PARKS_RECREATION]: ['Parks', 'Recreation', 'Public Spaces'],
      [ProjectType.COMMERCIAL_COMPLEX]: ['Commercial', 'Business', 'Economy'],
      [ProjectType.RESIDENTIAL_LAYOUT]: ['Residential', 'Housing', 'Layout'],
      [ProjectType.INDUSTRIAL_DEVELOPMENT]: ['Industrial', 'Manufacturing', 'Economy'],
      [ProjectType.SMART_CITY]: ['Smart City', 'Technology', 'Digital']
    };
    
    return [...commonTags, ...typeSpecificTags[type]];
  }

  private generateAuditLog(): Array<any> {
    const actions = ['Created', 'Updated', 'Approved', 'Submitted', 'Reviewed'];
    const count = faker.number.int({ min: 5, max: 15 });
    
    return Array.from({ length: count }, () => ({
      timestamp: faker.date.past(),
      action: faker.helpers.arrayElement(actions),
      user: faker.person.fullName(),
      changes: { field: 'status', from: 'pending', to: 'approved' },
      ipAddress: faker.internet.ip()
    }));
  }

  private weightedRandomSelect(weights: Record<string, number>): string {
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    let random = faker.number.int({ min: 1, max: totalWeight });
    
    for (const [item, weight] of Object.entries(weights)) {
      random -= weight;
      if (random <= 0) {
        return item;
      }
    }
    
    return Object.keys(weights)[0]; // fallback
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}