/**
 * Sample HMDA Projects
 * 5 representative projects showcasing different categories and types
 */

import {
  HMDAProject,
  ProjectCategory,
  ProjectType,
  ProjectStatus,
  ApprovalStatus,
  RiskLevel
} from '../schemas/project-schema';

export const sampleProjects: HMDAProject[] = [
  // 1. SMALL PROJECT - Building Permission
  {
    projectId: 'HMDA-2024-SBP-1001',
    projectCode: 'Z3/SB/145',
    projectName: 'Kukatpally Residential Complex Phase-I',
    projectDescription: 'Development of modern residential apartments with all necessary amenities and compliance with HMDA regulations for affordable housing segment.',
    category: ProjectCategory.SMALL,
    type: ProjectType.BUILDING_PERMISSION,
    status: ProjectStatus.IN_PROGRESS,
    priority: 'MEDIUM',
    
    department: 'Engineering Department',
    executingAgency: 'HMDA',
    implementingDivision: 'Town Planning Division',
    projectManager: {
      id: 'PM001',
      name: 'K. Rajesh Kumar',
      role: 'PROJECT_MANAGER',
      designation: 'Executive Engineer',
      department: 'Engineering Department',
      email: 'rajesh.kumar@hmda.gov.in',
      phone: '9849123456',
      responsibilityLevel: 'PRIMARY'
    },
    stakeholders: [
      {
        id: 'ST001',
        name: 'M. Srinivas Rao',
        role: 'TECHNICAL_HEAD',
        designation: 'Deputy Chief Engineer',
        department: 'Engineering Department',
        email: 'srinivas.rao@hmda.gov.in',
        phone: '9849234567',
        responsibilityLevel: 'PRIMARY'
      },
      {
        id: 'ST002',
        name: 'A. Lakshmi Prasad',
        role: 'FIELD_ENGINEER',
        designation: 'Assistant Engineer',
        department: 'Engineering Department',
        email: 'lakshmi.prasad@hmda.gov.in',
        phone: '9849345678',
        responsibilityLevel: 'SECONDARY'
      },
      {
        id: 'ST003',
        name: 'S. Venkata Reddy',
        role: 'ADMIN_HEAD',
        designation: 'Joint Commissioner',
        department: 'Finance Department',
        email: 'venkata.reddy@hmda.gov.in',
        phone: '9849456789',
        responsibilityLevel: 'SUPPORT'
      }
    ],
    
    location: {
      zone: 'Zone 3 (Kukatpally)',
      circle: 'Circle IV',
      ward: 'Ward 89',
      locality: 'Kukatpally',
      latitude: 17.4875,
      longitude: 78.4095,
      address: 'Survey No. 234/1, Kukatpally Main Road, Hyderabad',
      landParcelNumbers: ['234/1', '234/2'],
      nearbyLandmarks: ['Kukatpally Metro Station', 'Government Hospital', 'Municipal School']
    },
    
    plannedStartDate: new Date('2024-01-15'),
    actualStartDate: new Date('2024-02-01'),
    plannedCompletionDate: new Date('2024-12-31'),
    duration: 12,
    
    estimatedCost: 3_50_00_000, // ₹3.5 Cr
    approvedBudget: 3_75_00_000, // ₹3.75 Cr
    fundingSource: ['HMDA Internal Funds', 'State Government'],
    financialDetails: {
      estimatedCost: 3_50_00_000,
      sanctionedAmount: 3_75_00_000,
      releasedAmount: 2_25_00_000,
      utilizedAmount: 1_80_00_000,
      pendingBills: 25_00_000,
      retentionAmount: 18_75_000,
      performanceGuarantee: 18_75_000,
      lastUpdated: new Date('2024-10-15')
    },
    
    technicalSpecs: {
      area: 5_000, // sq ft
      floors: 4,
      units: 24,
      specifications: {
        structure: 'RCC Frame',
        elevators: 1,
        parking: 30,
        amenities: ['Children Play Area', 'Community Hall', 'Security Cabin']
      }
    },
    
    milestones: [
      {
        id: 'MS001',
        name: 'Project Initiation Approval',
        description: 'Initial project approval and budget sanction',
        plannedDate: new Date('2024-01-31'),
        actualDate: new Date('2024-02-05'),
        status: 'COMPLETED',
        dependencies: [],
        criticalPath: true,
        delayDays: 5,
        completionPercentage: 100
      },
      {
        id: 'MS002',
        name: 'Building Permission Approval',
        description: 'HMDA building permission and layout approval',
        plannedDate: new Date('2024-03-15'),
        actualDate: new Date('2024-03-20'),
        status: 'COMPLETED',
        dependencies: ['MS001'],
        criticalPath: true,
        delayDays: 5,
        completionPercentage: 100
      },
      {
        id: 'MS003',
        name: 'Foundation Complete',
        description: 'Foundation work completion with quality checks',
        plannedDate: new Date('2024-06-30'),
        actualDate: new Date('2024-07-10'),
        status: 'COMPLETED',
        dependencies: ['MS002'],
        criticalPath: true,
        delayDays: 10,
        completionPercentage: 100
      },
      {
        id: 'MS004',
        name: '50% Physical Progress',
        description: 'Superstructure work 50% completion',
        plannedDate: new Date('2024-09-30'),
        actualDate: new Date('2024-10-15'),
        status: 'COMPLETED',
        dependencies: ['MS003'],
        criticalPath: true,
        delayDays: 15,
        completionPercentage: 100
      },
      {
        id: 'MS005',
        name: 'Work Completion',
        description: 'Complete construction work with finishing',
        plannedDate: new Date('2024-12-31'),
        status: 'IN_PROGRESS',
        dependencies: ['MS004'],
        criticalPath: true,
        completionPercentage: 75
      }
    ],
    
    overallProgress: 65,
    currentStage: 'Project Execution',
    
    risks: [
      {
        id: 'R001',
        category: 'Technical',
        description: 'Foundation challenges due to soil conditions',
        probability: RiskLevel.MEDIUM,
        impact: RiskLevel.MEDIUM,
        mitigationStrategy: 'Soil testing completed, foundation design revised',
        owner: 'K. Rajesh Kumar',
        status: 'MITIGATED'
      },
      {
        id: 'R002',
        category: 'Schedule',
        description: 'Monsoon delays affecting construction timeline',
        probability: RiskLevel.HIGH,
        impact: RiskLevel.MEDIUM,
        mitigationStrategy: 'Weather protection measures and revised schedule',
        owner: 'A. Lakshmi Prasad',
        status: 'ACTIVE'
      },
      {
        id: 'R003',
        category: 'Financial',
        description: 'Material cost escalation',
        probability: RiskLevel.MEDIUM,
        impact: RiskLevel.LOW,
        mitigationStrategy: 'Price escalation clause in contract',
        owner: 'S. Venkata Reddy',
        status: 'ACTIVE'
      }
    ],
    
    stages: {
      stage1: {
        stageId: 'STAGE_1',
        stageName: 'Project Initiation',
        status: ApprovalStatus.APPROVED,
        startDate: new Date('2024-01-15'),
        completionDate: new Date('2024-02-05'),
        data: {
          projectProposal: {
            proposalNumber: 'PROP-2024-001',
            submissionDate: new Date('2024-01-15'),
            proposedBy: 'K. Rajesh Kumar',
            department: 'Engineering Department',
            justification: 'Affordable housing development to meet growing demand in Kukatpally area',
            beneficiaries: 24_000, // Approx 100 people per unit
            preliminaryBudget: 3_25_00_000
          },
          feasibilityStudy: {
            technicalFeasibility: true,
            financialFeasibility: true,
            environmentalImpact: 'LOW',
            socialImpact: 'POSITIVE',
            recommendedActions: [
              'Proceed with detailed survey',
              'Obtain building permission',
              'Finalize contractor selection'
            ]
          },
          initialApprovals: {
            departmentApproval: ApprovalStatus.APPROVED,
            budgetaryApproval: ApprovalStatus.APPROVED,
            technicalCommitteeReview: ApprovalStatus.APPROVED,
            approvalDate: new Date('2024-02-01'),
            approvedBy: 'M. Srinivas Rao',
            remarks: 'Approved with budget revision to ₹3.75 Cr'
          },
          documents: [
            {
              id: 'DOC001',
              name: 'Project_Proposal_v2.pdf',
              type: 'PDF',
              category: 'Proposal',
              uploadDate: new Date('2024-01-20'),
              size: 2_500_000,
              version: 2,
              status: 'APPROVED',
              uploadedBy: 'K. Rajesh Kumar',
              checksum: 'a1b2c3d4e5f6789012345678',
              remarks: 'Final approved version'
            }
          ],
          risks: [
            {
              type: 'Technical',
              description: 'Limited space for construction activities',
              probability: 'MEDIUM',
              impact: 'MEDIUM',
              mitigationPlan: 'Detailed site planning and phased construction'
            }
          ]
        }
      },
      stage5: {
        stageId: 'STAGE_5',
        stageName: 'Permissions & Approvals',
        status: ApprovalStatus.APPROVED,
        startDate: new Date('2024-02-10'),
        completionDate: new Date('2024-03-20'),
        data: {
          buildingPermission: {
            applicationNumber: 'BP-2024-12345',
            submissionDate: new Date('2024-02-10'),
            bpassNumber: 'BPASS-4567',
            approvalDate: new Date('2024-03-20'),
            validity: 36,
            conditions: [
              'Compliance with NBC 2016',
              'Fire safety measures as per guidelines',
              'Adequate parking provision (1:1 ratio)',
              'Rainwater harvesting mandatory'
            ]
          },
          environmentalClearance: {
            required: false,
            category: 'NA',
            status: ApprovalStatus.APPROVED
          },
          specialPermissions: [],
          utilities: {
            waterConnection: {
              status: ApprovalStatus.APPROVED,
              sanctionedLoad: 5_000, // liters per day
              connectionCharges: 75_000
            },
            powerConnection: {
              status: ApprovalStatus.APPROVED,
              sanctionedLoad: 150, // KW
              transformerCapacity: 250
            },
            sewerageConnection: {
              status: ApprovalStatus.APPROVED,
              treatmentRequired: false
            }
          },
          documents: [
            {
              id: 'DOC005',
              name: 'Building_Permission_Certificate.pdf',
              type: 'PDF',
              category: 'Building Permission',
              uploadDate: new Date('2024-03-20'),
              size: 1_200_000,
              version: 1,
              status: 'APPROVED',
              uploadedBy: 'Town Planning Officer',
              checksum: 'bp123456789abcdef',
              remarks: 'Valid for 3 years from approval date'
            }
          ]
        }
      },
      stage6: {
        stageId: 'STAGE_6',
        stageName: 'Project Execution',
        status: ApprovalStatus.IN_REVIEW,
        startDate: new Date('2024-04-01'),
        data: {
          executionPlan: {
            mobilizationDate: new Date('2024-04-01'),
            phases: [
              {
                phaseName: 'Foundation',
                startDate: new Date('2024-04-01'),
                endDate: new Date('2024-07-10'),
                activities: ['Site preparation', 'Excavation', 'Foundation laying'],
                progress: 100
              },
              {
                phaseName: 'Superstructure',
                startDate: new Date('2024-07-11'),
                endDate: new Date('2024-11-30'),
                activities: ['Column casting', 'Beam work', 'Slab work', 'Masonry'],
                progress: 70
              },
              {
                phaseName: 'Finishing',
                startDate: new Date('2024-12-01'),
                endDate: new Date('2024-12-31'),
                activities: ['Plastering', 'Flooring', 'Electrical', 'Plumbing'],
                progress: 15
              }
            ],
            resourcePlan: {
              manpower: 45,
              machinery: ['Concrete mixer', 'Tower crane', 'JCB', 'Transit mixer'],
              materials: ['Cement (OPC 53)', 'Steel (Fe 500)', 'Aggregate', 'Bricks']
            }
          },
          progress: {
            overallProgress: 65,
            physicalProgress: 65,
            financialProgress: 58,
            lastUpdated: new Date('2024-10-15'),
            criticalActivities: ['Superstructure completion', 'Electrical rough-in'],
            delays: [
              {
                reason: 'Monsoon delays and material shortage',
                impact: 20, // days
                recoveryPlan: 'Additional shifts and expedited material procurement'
              }
            ]
          },
          qualityControl: {
            tests: [
              {
                testName: 'Concrete Cube Test (M25)',
                date: new Date('2024-05-15'),
                result: 'PASS',
                remarks: 'Compressive strength: 28.5 MPa (Target: 25 MPa)'
              },
              {
                testName: 'Steel Tensile Test',
                date: new Date('2024-06-01'),
                result: 'PASS',
                remarks: 'Fe 500 grade confirmed, elongation 16%'
              }
            ],
            inspections: [
              {
                type: 'Foundation Inspection',
                date: new Date('2024-06-25'),
                inspector: 'A. Lakshmi Prasad',
                findings: ['Foundation level correct', 'Reinforcement as per drawing'],
                compliance: true
              },
              {
                type: 'Structural Inspection',
                date: new Date('2024-09-15'),
                inspector: 'Quality Control Officer',
                findings: ['Column dimensions verified', 'Minor finishing defects noted'],
                compliance: true
              }
            ],
            nonConformances: [
              {
                id: 'NC001',
                description: 'Minor honeycombing in column C-5',
                severity: 'MINOR',
                status: 'CLOSED',
                correctiveAction: 'Surface repair with polymer modified mortar'
              }
            ]
          },
          safetyRecords: {
            incidents: 1, // Minor cut injury
            lostTimeInjuries: 0,
            safetyMeetings: 8,
            trainingSessions: 4,
            complianceScore: 92
          },
          bills: [
            {
              billNumber: 'BILL-2024-001',
              date: new Date('2024-06-30'),
              amount: 1_05_00_000,
              workDone: 'Foundation work complete',
              status: 'PAID',
              deductions: 0
            },
            {
              billNumber: 'BILL-2024-002',
              date: new Date('2024-09-30'),
              amount: 1_12_50_000,
              workDone: 'Superstructure up to 3rd floor',
              status: 'APPROVED',
              deductions: 5_000 // Quality related deduction
            }
          ],
          documents: [
            {
              id: 'DOC010',
              name: 'Progress_Report_Oct2024.pdf',
              type: 'PDF',
              category: 'Progress Reports',
              uploadDate: new Date('2024-10-15'),
              size: 3_500_000,
              version: 1,
              status: 'SUBMITTED',
              uploadedBy: 'K. Rajesh Kumar',
              checksum: 'pr789012345abcdef'
            }
          ]
        }
      }
    },
    
    createdDate: new Date('2024-01-10'),
    createdBy: 'K. Rajesh Kumar',
    lastModifiedDate: new Date('2024-10-15'),
    lastModifiedBy: 'A. Lakshmi Prasad',
    version: 3,
    tags: ['HMDA', 'Residential', 'Affordable Housing', 'Kukatpally', 'Small Project'],
    
    auditLog: [
      {
        timestamp: new Date('2024-01-10'),
        action: 'Created',
        user: 'K. Rajesh Kumar',
        changes: { status: 'Created new project' },
        ipAddress: '192.168.1.100'
      },
      {
        timestamp: new Date('2024-02-01'),
        action: 'Approved',
        user: 'M. Srinivas Rao',
        changes: { status: 'approved', budget: 'revised to 3.75 Cr' },
        ipAddress: '192.168.1.105'
      },
      {
        timestamp: new Date('2024-10-15'),
        action: 'Updated',
        user: 'A. Lakshmi Prasad',
        changes: { progress: 'updated to 65%', bills: 'added bill-002' },
        ipAddress: '192.168.1.102'
      }
    ]
  },

  // 2. MEDIUM PROJECT - Infrastructure Development
  {
    projectId: 'HMDA-2023-MIN-2005',
    projectCode: 'Z2/MI/287',
    projectName: 'Gachibowli IT Corridor Infrastructure Upgrade',
    projectDescription: 'Comprehensive infrastructure development including roads, utilities, and public facilities to support IT industry growth in Gachibowli corridor.',
    category: ProjectCategory.MEDIUM,
    type: ProjectType.INFRASTRUCTURE,
    status: ProjectStatus.IN_PROGRESS,
    priority: 'HIGH',
    
    department: 'Engineering Department',
    executingAgency: 'HMDA',
    implementingDivision: 'Engineering Division',
    projectManager: {
      id: 'PM002',
      name: 'Dr. P. Madhavi Latha',
      role: 'PROJECT_MANAGER',
      designation: 'Superintending Engineer',
      department: 'Engineering Department',
      email: 'madhavi.latha@hmda.gov.in',
      phone: '9849567890',
      responsibilityLevel: 'PRIMARY'
    },
    stakeholders: [
      {
        id: 'ST004',
        name: 'B. Ravinder',
        role: 'TECHNICAL_HEAD',
        designation: 'Chief Engineer',
        department: 'Engineering Department',
        email: 'b.ravinder@hmda.gov.in',
        phone: '9849909792',
        responsibilityLevel: 'PRIMARY'
      },
      {
        id: 'ST005',
        name: 'T. Sai Krishna',
        role: 'FIELD_ENGINEER',
        designation: 'Executive Engineer',
        department: 'Engineering Department',
        email: 'sai.krishna@hmda.gov.in',
        phone: '9849678901',
        responsibilityLevel: 'SECONDARY'
      },
      {
        id: 'ST006',
        name: 'N. Ramesh Babu',
        role: 'FIELD_ENGINEER',
        designation: 'Assistant Executive Engineer',
        department: 'Engineering Department',
        email: 'ramesh.babu@hmda.gov.in',
        phone: '9849789012',
        responsibilityLevel: 'SECONDARY'
      }
    ],
    
    location: {
      zone: 'Zone 2 (Hyderabad)',
      circle: 'Circle II',
      ward: 'Ward 45',
      locality: 'Gachibowli',
      latitude: 17.4399,
      longitude: 78.3488,
      address: 'Gachibowli IT Corridor, Financial District Road, Hyderabad',
      landParcelNumbers: ['158/A', '158/B', '159/1', '159/2', '160/A'],
      nearbyLandmarks: ['HITEC City', 'ISB', 'Financial District', 'DLF Cyber City']
    },
    
    plannedStartDate: new Date('2023-04-01'),
    actualStartDate: new Date('2023-05-15'),
    plannedCompletionDate: new Date('2025-03-31'),
    duration: 24,
    
    estimatedCost: 28_00_00_000, // ₹28 Cr
    approvedBudget: 30_50_00_000, // ₹30.5 Cr
    fundingSource: ['State Government', 'Central Government', 'HMDA Internal Funds'],
    financialDetails: {
      estimatedCost: 28_00_00_000,
      sanctionedAmount: 30_50_00_000,
      releasedAmount: 21_35_00_000,
      utilizedAmount: 18_90_00_000,
      pendingBills: 1_45_00_000,
      retentionAmount: 1_52_50_000,
      performanceGuarantee: 1_52_50_000,
      lastUpdated: new Date('2024-10-01')
    },
    
    technicalSpecs: {
      specifications: {
        roadLength: 8500, // meters
        utilityLines: ['Power lines (11KV)', 'Water supply (600mm)', 'Sewerage (450mm)', 'Telecom ducts'],
        stormWaterDrains: '3.2 km RCC box drains',
        streetLights: 245,
        landscaping: '12,000 sq meters',
        signage: 'Smart digital signage system'
      }
    },
    
    milestones: [
      {
        id: 'MS006',
        name: 'Project Initiation & DPR Approval',
        description: 'Detailed Project Report approval and budget sanction',
        plannedDate: new Date('2023-05-31'),
        actualDate: new Date('2023-06-15'),
        status: 'COMPLETED',
        dependencies: [],
        criticalPath: true,
        delayDays: 15,
        completionPercentage: 100
      },
      {
        id: 'MS007',
        name: 'Tender Award',
        description: 'Contractor selection and contract signing',
        plannedDate: new Date('2023-08-31'),
        actualDate: new Date('2023-09-10'),
        status: 'COMPLETED',
        dependencies: ['MS006'],
        criticalPath: true,
        delayDays: 10,
        completionPercentage: 100
      },
      {
        id: 'MS008',
        name: 'Phase 1 - Utility Relocation',
        description: 'Existing utility lines relocation',
        plannedDate: new Date('2023-12-31'),
        actualDate: new Date('2024-01-20'),
        status: 'COMPLETED',
        dependencies: ['MS007'],
        criticalPath: true,
        delayDays: 20,
        completionPercentage: 100
      },
      {
        id: 'MS009',
        name: 'Phase 2 - Road Construction 50%',
        description: 'Main road construction 50% completion',
        plannedDate: new Date('2024-08-31'),
        actualDate: new Date('2024-09-15'),
        status: 'COMPLETED',
        dependencies: ['MS008'],
        criticalPath: true,
        delayDays: 15,
        completionPercentage: 100
      },
      {
        id: 'MS010',
        name: 'Project Completion',
        description: 'Complete infrastructure development with handover',
        plannedDate: new Date('2025-03-31'),
        status: 'IN_PROGRESS',
        dependencies: ['MS009'],
        criticalPath: true,
        completionPercentage: 78
      }
    ],
    
    overallProgress: 78,
    currentStage: 'Project Execution',
    
    risks: [
      {
        id: 'R004',
        category: 'Technical',
        description: 'Utility relocation complexity in active IT corridor',
        probability: RiskLevel.HIGH,
        impact: RiskLevel.HIGH,
        mitigationStrategy: 'Coordination with utility providers and phased execution',
        owner: 'Dr. P. Madhavi Latha',
        status: 'MITIGATED'
      },
      {
        id: 'R005',
        category: 'Schedule',
        description: 'Monsoon impact on road construction',
        probability: RiskLevel.HIGH,
        impact: RiskLevel.MEDIUM,
        mitigationStrategy: 'Weather protection and revised work schedule',
        owner: 'T. Sai Krishna',
        status: 'ACTIVE'
      },
      {
        id: 'R006',
        category: 'Financial',
        description: 'Cost escalation due to utility relocation',
        probability: RiskLevel.MEDIUM,
        impact: RiskLevel.MEDIUM,
        mitigationStrategy: 'Contingency provision and cost monitoring',
        owner: 'N. Ramesh Babu',
        status: 'MITIGATED'
      }
    ],
    
    stages: {
      stage6: {
        stageId: 'STAGE_6',
        stageName: 'Project Execution',
        status: ApprovalStatus.IN_REVIEW,
        startDate: new Date('2023-10-01'),
        data: {
          executionPlan: {
            mobilizationDate: new Date('2023-10-01'),
            phases: [
              {
                phaseName: 'Utility Relocation',
                startDate: new Date('2023-10-01'),
                endDate: new Date('2024-01-20'),
                activities: ['Survey existing utilities', 'Coordinate with providers', 'Execute relocation'],
                progress: 100
              },
              {
                phaseName: 'Road Construction',
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-12-31'),
                activities: ['Earthwork', 'Sub-base', 'Base course', 'Bituminous layers'],
                progress: 85
              },
              {
                phaseName: 'Utility Installation',
                startDate: new Date('2024-08-01'),
                endDate: new Date('2025-02-28'),
                activities: ['Water lines', 'Sewerage', 'Power cables', 'Telecom ducts'],
                progress: 60
              },
              {
                phaseName: 'Finishing Works',
                startDate: new Date('2025-01-01'),
                endDate: new Date('2025-03-31'),
                activities: ['Street lighting', 'Signage', 'Landscaping', 'Road markings'],
                progress: 25
              }
            ],
            resourcePlan: {
              manpower: 120,
              machinery: ['Road roller', 'Paver machine', 'Excavators', 'Tipper trucks', 'Concrete mixer'],
              materials: ['Aggregate', 'Bitumen', 'Cement concrete', 'Steel', 'Pipes']
            }
          },
          progress: {
            overallProgress: 78,
            physicalProgress: 78,
            financialProgress: 74,
            lastUpdated: new Date('2024-10-01'),
            criticalActivities: ['Bituminous road completion', 'Street light installation'],
            delays: [
              {
                reason: 'Coordination delays with private utility providers',
                impact: 45, // days
                recoveryPlan: 'Parallel execution of multiple activities and extended working hours'
              }
            ]
          },
          qualityControl: {
            tests: [
              {
                testName: 'Aggregate Gradation Test',
                date: new Date('2024-03-15'),
                result: 'PASS',
                remarks: 'Aggregate meets IS:383 specifications'
              },
              {
                testName: 'Bitumen Penetration Test',
                date: new Date('2024-07-20'),
                result: 'PASS',
                remarks: 'VG-30 grade bitumen confirmed'
              },
              {
                testName: 'Concrete Strength Test',
                date: new Date('2024-09-10'),
                result: 'PASS',
                remarks: 'M30 grade strength achieved for drains'
              }
            ],
            inspections: [
              {
                type: 'Sub-grade Inspection',
                date: new Date('2024-04-10'),
                inspector: 'T. Sai Krishna',
                findings: ['Proper compaction achieved', 'Levels as per design'],
                compliance: true
              },
              {
                type: 'Utility Installation Inspection',
                date: new Date('2024-09-25'),
                inspector: 'Quality Control Team',
                findings: ['Pipe laying as per specifications', 'Proper bedding provided'],
                compliance: true
              }
            ],
            nonConformances: [
              {
                id: 'NC002',
                description: 'Inadequate compaction in chainage 2+500 to 2+600',
                severity: 'MAJOR',
                status: 'CLOSED',
                correctiveAction: 'Re-compaction with proper moisture content'
              }
            ]
          },
          safetyRecords: {
            incidents: 2, // Minor accidents
            lostTimeInjuries: 0,
            safetyMeetings: 24,
            trainingSessions: 12,
            complianceScore: 88
          },
          bills: [
            {
              billNumber: 'BILL-2024-003',
              date: new Date('2024-03-31'),
              amount: 8_50_00_000,
              workDone: 'Utility relocation and initial road work',
              status: 'PAID',
              deductions: 25_000
            },
            {
              billNumber: 'BILL-2024-004',
              date: new Date('2024-09-30'),
              amount: 9_75_00_000,
              workDone: 'Road construction and utility installation progress',
              status: 'VERIFIED',
              deductions: 0
            }
          ],
          documents: [
            {
              id: 'DOC015',
              name: 'Monthly_Progress_Report_Sep2024.pdf',
              type: 'PDF',
              category: 'Progress Reports',
              uploadDate: new Date('2024-10-01'),
              size: 8_500_000,
              version: 1,
              status: 'SUBMITTED',
              uploadedBy: 'Dr. P. Madhavi Latha',
              checksum: 'mp789012345abcdef'
            }
          ]
        }
      }
    },
    
    createdDate: new Date('2023-02-15'),
    createdBy: 'Dr. P. Madhavi Latha',
    lastModifiedDate: new Date('2024-10-01'),
    lastModifiedBy: 'T. Sai Krishna',
    version: 8,
    tags: ['HMDA', 'Infrastructure', 'IT Corridor', 'Gachibowli', 'Medium Project', 'High Priority'],
    
    auditLog: [
      {
        timestamp: new Date('2023-02-15'),
        action: 'Created',
        user: 'Dr. P. Madhavi Latha',
        changes: { status: 'Project created and DPR initiated' },
        ipAddress: '192.168.2.100'
      },
      {
        timestamp: new Date('2023-06-15'),
        action: 'Approved',
        user: 'B. Ravinder',
        changes: { status: 'approved', budget: 'sanctioned 30.5 Cr' },
        ipAddress: '192.168.2.105'
      },
      {
        timestamp: new Date('2024-10-01'),
        action: 'Updated',
        user: 'T. Sai Krishna',
        changes: { progress: 'updated to 78%', milestone: 'Phase 2 milestone achieved' },
        ipAddress: '192.168.2.102'
      }
    ]
  },

  // 3. LARGE PROJECT - Smart City Initiative  
  {
    projectId: 'HMDA-2023-LSC-3001',
    projectCode: 'Z1/LS/095',
    projectName: 'Hyderabad Smart City Digital Infrastructure Implementation',
    projectDescription: 'Implementation of comprehensive smart city technologies including IoT sensors, traffic management systems, waste management automation, and citizen service digitalization across Hyderabad metropolitan area.',
    category: ProjectCategory.LARGE,
    type: ProjectType.SMART_CITY,
    status: ProjectStatus.IN_PROGRESS,
    priority: 'CRITICAL',
    
    department: 'IT Department',
    executingAgency: 'HMDA',
    implementingDivision: 'Smart City Division',
    projectManager: {
      id: 'PM003',
      name: 'Ar. Suresh Kumar Reddy',
      role: 'PROJECT_MANAGER',
      designation: 'Chief Technical Officer',
      department: 'IT Department',
      email: 'suresh.reddy@hmda.gov.in',
      phone: '9849123789',
      responsibilityLevel: 'PRIMARY'
    },
    stakeholders: [
      {
        id: 'ST007',
        name: 'K. Vijayanand',
        role: 'TECHNICAL_HEAD',
        designation: 'Additional Commissioner (IT)',
        department: 'IT Department',
        email: 'k.vijayanand@hmda.gov.in',
        phone: '9849234890',
        responsibilityLevel: 'PRIMARY'
      },
      {
        id: 'ST008',
        name: 'Dr. Anitha Rao',
        role: 'TECHNICAL_HEAD',
        designation: 'Smart City Mission Director',
        department: 'IT Department',
        email: 'anitha.rao@hmda.gov.in',
        phone: '9849345901',
        responsibilityLevel: 'PRIMARY'
      },
      {
        id: 'ST009',
        name: 'M. Venkat Rao',
        role: 'FIELD_ENGINEER',
        designation: 'System Administrator',
        department: 'IT Department',
        email: 'venkat.rao@hmda.gov.in',
        phone: '9849456012',
        responsibilityLevel: 'SECONDARY'
      }
    ],
    
    location: {
      zone: 'Zone 1 (Secunderabad)',
      circle: 'Circle I',
      ward: 'All Wards (City-wide)',
      locality: 'Hyderabad Metropolitan Area',
      latitude: 17.3850,
      longitude: 78.4867,
      address: 'HMDA Head Office, Tarnaka, Secunderabad',
      landParcelNumbers: ['City-wide implementation'],
      nearbyLandmarks: ['HMDA Head Office', 'Secretariat', 'Tank Bund', 'Hussain Sagar']
    },
    
    plannedStartDate: new Date('2023-01-01'),
    actualStartDate: new Date('2023-02-15'),
    plannedCompletionDate: new Date('2025-12-31'),
    duration: 36,
    
    estimatedCost: 185_00_00_000, // ₹185 Cr
    approvedBudget: 195_00_00_000, // ₹195 Cr
    fundingSource: ['Central Government', 'State Government', 'World Bank', 'Private Partnership'],
    financialDetails: {
      estimatedCost: 185_00_00_000,
      sanctionedAmount: 195_00_00_000,
      releasedAmount: 117_00_00_000,
      utilizedAmount: 89_25_00_000,
      pendingBills: 8_75_00_000,
      retentionAmount: 9_75_00_000,
      performanceGuarantee: 9_75_00_000,
      lastUpdated: new Date('2024-09-30')
    },
    
    technicalSpecs: {
      specifications: {
        iotSensors: 5000,
        trafficCameras: 800,
        smartStreetLights: 12000,
        wifiHotspots: 500,
        commandControlCenters: 3,
        mobileApp: 'Hyderabad Smart City App',
        dataCapacity: '10 TB daily processing',
        coverage: '7257 sq km metropolitan area'
      }
    },
    
    milestones: [
      {
        id: 'MS011',
        name: 'Smart City Mission Approval',
        description: 'Central government smart city mission selection and funding approval',
        plannedDate: new Date('2023-03-31'),
        actualDate: new Date('2023-04-15'),
        status: 'COMPLETED',
        dependencies: [],
        criticalPath: true,
        delayDays: 15,
        completionPercentage: 100
      },
      {
        id: 'MS012',
        name: 'Technology Partner Selection',
        description: 'Selection of technology partners and system integrators',
        plannedDate: new Date('2023-08-31'),
        actualDate: new Date('2023-09-20'),
        status: 'COMPLETED',
        dependencies: ['MS011'],
        criticalPath: true,
        delayDays: 20,
        completionPercentage: 100
      },
      {
        id: 'MS013',
        name: 'Phase 1 - Core Infrastructure',
        description: 'Command center setup and basic IoT deployment',
        plannedDate: new Date('2024-03-31'),
        actualDate: new Date('2024-04-30'),
        status: 'COMPLETED',
        dependencies: ['MS012'],
        criticalPath: true,
        delayDays: 30,
        completionPercentage: 100
      },
      {
        id: 'MS014',
        name: 'Phase 2 - Traffic Management',
        description: 'Smart traffic management system deployment',
        plannedDate: new Date('2024-12-31'),
        status: 'IN_PROGRESS',
        dependencies: ['MS013'],
        criticalPath: true,
        completionPercentage: 65
      },
      {
        id: 'MS015',
        name: 'Phase 3 - Citizen Services',
        description: 'Digital citizen service platform and mobile app launch',
        plannedDate: new Date('2025-06-30'),
        status: 'PENDING',
        dependencies: ['MS014'],
        criticalPath: true,
        completionPercentage: 25
      },
      {
        id: 'MS016',
        name: 'Project Completion & Handover',
        description: 'Complete smart city system integration and handover',
        plannedDate: new Date('2025-12-31'),
        status: 'PENDING',
        dependencies: ['MS015'],
        criticalPath: true,
        completionPercentage: 0
      }
    ],
    
    overallProgress: 52,
    currentStage: 'Project Execution',
    
    risks: [
      {
        id: 'R007',
        category: 'Technical',
        description: 'Integration complexity across multiple technology platforms',
        probability: RiskLevel.HIGH,
        impact: RiskLevel.HIGH,
        mitigationStrategy: 'Phased implementation with extensive testing and system integration protocols',
        owner: 'Ar. Suresh Kumar Reddy',
        status: 'ACTIVE'
      },
      {
        id: 'R008',
        category: 'Financial',
        description: 'Technology cost escalation and currency fluctuation',
        probability: RiskLevel.MEDIUM,
        impact: RiskLevel.HIGH,
        mitigationStrategy: 'Fixed price contracts with escalation caps and currency hedging',
        owner: 'Dr. Anitha Rao',
        status: 'MITIGATED'
      },
      {
        id: 'R009',
        category: 'Regulatory',
        description: 'Data privacy and security compliance requirements',
        probability: RiskLevel.MEDIUM,
        impact: RiskLevel.HIGH,
        mitigationStrategy: 'Comprehensive security framework and privacy policy implementation',
        owner: 'K. Vijayanand',
        status: 'ACTIVE'
      },
      {
        id: 'R010',
        category: 'Resource',
        description: 'Shortage of skilled technical manpower',
        probability: RiskLevel.HIGH,
        impact: RiskLevel.MEDIUM,
        mitigationStrategy: 'Training programs and partnership with technology institutes',
        owner: 'M. Venkat Rao',
        status: 'ACTIVE'
      }
    ],
    
    stages: {
      stage6: {
        stageId: 'STAGE_6',
        stageName: 'Project Execution',
        status: ApprovalStatus.IN_REVIEW,
        startDate: new Date('2023-10-01'),
        data: {
          executionPlan: {
            mobilizationDate: new Date('2023-10-01'),
            phases: [
              {
                phaseName: 'Infrastructure Setup',
                startDate: new Date('2023-10-01'),
                endDate: new Date('2024-04-30'),
                activities: ['Command center setup', 'Network infrastructure', 'Basic IoT deployment'],
                progress: 100
              },
              {
                phaseName: 'Traffic Management System',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-12-31'),
                activities: ['Camera installation', 'Signal automation', 'Traffic analytics'],
                progress: 70
              },
              {
                phaseName: 'Waste Management Automation',
                startDate: new Date('2024-06-01'),
                endDate: new Date('2025-03-31'),
                activities: ['Smart bins', 'Route optimization', 'Monitoring system'],
                progress: 35
              },
              {
                phaseName: 'Citizen Services Platform',
                startDate: new Date('2024-09-01'),
                endDate: new Date('2025-12-31'),
                activities: ['Portal development', 'Mobile app', 'Service integration'],
                progress: 25
              }
            ],
            resourcePlan: {
              manpower: 85,
              machinery: ['Server infrastructure', 'Networking equipment', 'IoT devices', 'Cameras'],
              materials: ['Fiber optic cables', 'Sensors', 'Computing hardware', 'Software licenses']
            }
          },
          progress: {
            overallProgress: 52,
            physicalProgress: 52,
            financialProgress: 46,
            lastUpdated: new Date('2024-09-30'),
            criticalActivities: ['Traffic system integration', 'Mobile app development', 'Data analytics platform'],
            delays: [
              {
                reason: 'Integration challenges between different vendor systems',
                impact: 60, // days
                recoveryPlan: 'Dedicated integration team and extended testing phase'
              }
            ]
          },
          qualityControl: {
            tests: [
              {
                testName: 'Network Performance Test',
                date: new Date('2024-05-15'),
                result: 'PASS',
                remarks: 'Network latency within acceptable limits (< 50ms)'
              },
              {
                testName: 'IoT Sensor Accuracy Test',
                date: new Date('2024-07-20'),
                result: 'PASS',
                remarks: 'Sensor accuracy 98.5% (Target: >95%)'
              },
              {
                testName: 'Security Penetration Test',
                date: new Date('2024-08-30'),
                result: 'PASS',
                remarks: 'No critical vulnerabilities found'
              }
            ],
            inspections: [
              {
                type: 'System Integration Audit',
                date: new Date('2024-06-15'),
                inspector: 'External IT Auditor',
                findings: ['System architecture compliant', 'Security protocols adequate'],
                compliance: true
              },
              {
                type: 'Data Center Inspection',
                date: new Date('2024-08-10'),
                inspector: 'Infrastructure Team',
                findings: ['Proper cooling systems', 'Backup power systems functional'],
                compliance: true
              }
            ],
            nonConformances: [
              {
                id: 'NC003',
                description: 'Traffic camera positioning not optimal for lane detection',
                severity: 'MAJOR',
                status: 'IN_PROGRESS',
                correctiveAction: 'Camera repositioning and calibration in progress'
              }
            ]
          },
          safetyRecords: {
            incidents: 0,
            lostTimeInjuries: 0,
            safetyMeetings: 18,
            trainingSessions: 25,
            complianceScore: 97
          },
          bills: [
            {
              billNumber: 'BILL-2024-005',
              date: new Date('2024-04-30'),
              amount: 35_75_00_000,
              workDone: 'Infrastructure setup and initial IoT deployment',
              status: 'PAID',
              deductions: 0
            },
            {
              billNumber: 'BILL-2024-006',
              date: new Date('2024-09-30'),
              amount: 28_50_00_000,
              workDone: 'Traffic management system and platform development',
              status: 'VERIFIED',
              deductions: 1_25_000 // Performance related deduction
            }
          ],
          documents: [
            {
              id: 'DOC020',
              name: 'Smart_City_Progress_Report_Q3_2024.pdf',
              type: 'PDF',
              category: 'Progress Reports',
              uploadDate: new Date('2024-09-30'),
              size: 15_500_000,
              version: 1,
              status: 'SUBMITTED',
              uploadedBy: 'Ar. Suresh Kumar Reddy',
              checksum: 'sc789012345abcdef'
            }
          ]
        }
      }
    },
    
    createdDate: new Date('2022-11-15'),
    createdBy: 'Ar. Suresh Kumar Reddy',
    lastModifiedDate: new Date('2024-09-30'),
    lastModifiedBy: 'Dr. Anitha Rao',
    version: 12,
    tags: ['HMDA', 'Smart City', 'IoT', 'Technology', 'Large Project', 'Critical Priority', 'Digital Transformation'],
    
    auditLog: [
      {
        timestamp: new Date('2022-11-15'),
        action: 'Created',
        user: 'Ar. Suresh Kumar Reddy',
        changes: { status: 'Smart City project proposal created' },
        ipAddress: '192.168.3.100'
      },
      {
        timestamp: new Date('2023-04-15'),
        action: 'Approved',
        user: 'K. Vijayanand',
        changes: { status: 'approved', budget: 'sanctioned ₹195 Cr' },
        ipAddress: '192.168.3.105'
      },
      {
        timestamp: new Date('2024-09-30'),
        action: 'Updated',
        user: 'Dr. Anitha Rao',
        changes: { progress: 'updated to 52%', phase: 'traffic management system progress' },
        ipAddress: '192.168.3.108'
      }
    ]
  },

  // 4. MEGA PROJECT - Outer Ring Road Extension
  {
    projectId: 'HMDA-2022-MRD-4001',
    projectCode: 'Z6/MR/052',
    projectName: 'Hyderabad Outer Ring Road Extension & Connectivity Enhancement',
    projectDescription: 'Extension of Outer Ring Road (ORR) with additional connectivity points, service roads, flyovers, and integrated transportation infrastructure to reduce traffic congestion and support metropolitan growth.',
    category: ProjectCategory.MEGA,
    type: ProjectType.ROAD_DEVELOPMENT,
    status: ProjectStatus.IN_PROGRESS,
    priority: 'CRITICAL',
    
    department: 'Engineering Department',
    executingAgency: 'HMDA',
    implementingDivision: 'Roads & Bridges Division',
    projectManager: {
      id: 'PM004',
      name: 'Er. Rajesh Kumar Gupta',
      role: 'PROJECT_MANAGER',
      designation: 'Chief Engineer (Roads)',
      department: 'Engineering Department',
      email: 'rajesh.gupta@hmda.gov.in',
      phone: '9849456123',
      responsibilityLevel: 'PRIMARY'
    },
    stakeholders: [
      {
        id: 'ST010',
        name: 'Dr. B. Janardhan Reddy',
        role: 'TECHNICAL_HEAD',
        designation: 'Special Chief Secretary',
        department: 'MA&UD Department',
        email: 'janardhan.reddy@telangana.gov.in',
        phone: '9849567234',
        responsibilityLevel: 'PRIMARY'
      },
      {
        id: 'ST011',
        name: 'V. Balakrishna',
        role: 'TECHNICAL_HEAD',
        designation: 'Principal Secretary',
        department: 'Roads & Buildings',
        email: 'v.balakrishna@telangana.gov.in',
        phone: '9849678345',
        responsibilityLevel: 'PRIMARY'
      },
      {
        id: 'ST012',
        name: 'N. Satyanarayana',
        role: 'FIELD_ENGINEER',
        designation: 'Superintending Engineer',
        department: 'Engineering Department',
        email: 'n.satyanarayana@hmda.gov.in',
        phone: '9849789456',
        responsibilityLevel: 'SECONDARY'
      }
    ],
    
    location: {
      zone: 'Zone 6 (Rajendranagar)',
      circle: 'Circle VI',
      ward: 'Multiple Wards (Outer Ring Road Corridor)',
      locality: 'Outer Ring Road Extension Corridor',
      latitude: 17.2403,
      longitude: 78.4294,
      address: 'Outer Ring Road Extension from Shamshabad to Medchal via Rajendranagar',
      landParcelNumbers: ['Multiple survey numbers along 85 km corridor'],
      nearbyLandmarks: ['Rajiv Gandhi International Airport', 'Shamshabad', 'Medchal', 'Kondapur']
    },
    
    plannedStartDate: new Date('2022-01-01'),
    actualStartDate: new Date('2022-03-15'),
    plannedCompletionDate: new Date('2027-12-31'),
    duration: 72,
    
    estimatedCost: 850_00_00_000, // ₹850 Cr
    approvedBudget: 920_00_00_000, // ₹920 Cr
    fundingSource: ['Central Government', 'State Government', 'World Bank', 'ADB'],
    financialDetails: {
      estimatedCost: 850_00_00_000,
      sanctionedAmount: 920_00_00_000,
      releasedAmount: 368_00_00_000,
      utilizedAmount: 276_00_00_000,
      pendingBills: 35_00_00_000,
      retentionAmount: 46_00_00_000,
      performanceGuarantee: 46_00_00_000,
      lastUpdated: new Date('2024-08-31')
    },
    
    technicalSpecs: {
      length: 85000, // meters
      specifications: {
        roadType: '6-lane divided carriageway',
        totalLength: '85 km',
        flyovers: 12,
        serviceRoads: '170 km (both sides)',
        majorJunctions: 18,
        tollPlazas: 4,
        designSpeed: '120 kmph',
        pavementType: 'Flexible pavement with bituminous surface',
        drainage: 'Comprehensive storm water management system'
      }
    },
    
    milestones: [
      {
        id: 'MS017',
        name: 'Environmental & Forest Clearances',
        description: 'Obtain all statutory environmental and forest clearances',
        plannedDate: new Date('2022-12-31'),
        actualDate: new Date('2023-02-28'),
        status: 'COMPLETED',
        dependencies: [],
        criticalPath: true,
        delayDays: 59,
        completionPercentage: 100
      },
      {
        id: 'MS018',
        name: 'Land Acquisition Completion',
        description: 'Complete land acquisition for entire corridor',
        plannedDate: new Date('2023-12-31'),
        actualDate: new Date('2024-03-31'),
        status: 'COMPLETED',
        dependencies: ['MS017'],
        criticalPath: true,
        delayDays: 91,
        completionPercentage: 100
      },
      {
        id: 'MS019',
        name: 'Package 1 - Shamshabad to Nandigama (30 km)',
        description: 'Complete construction of first package including 4 flyovers',
        plannedDate: new Date('2025-06-30'),
        status: 'IN_PROGRESS',
        dependencies: ['MS018'],
        criticalPath: true,
        completionPercentage: 45
      },
      {
        id: 'MS020',
        name: 'Package 2 - Nandigama to Kondapur (25 km)',
        description: 'Complete construction of second package including 4 flyovers',
        plannedDate: new Date('2026-06-30'),
        status: 'IN_PROGRESS',
        dependencies: ['MS018'],
        criticalPath: false,
        completionPercentage: 25
      },
      {
        id: 'MS021',
        name: 'Package 3 - Kondapur to Medchal (30 km)',
        description: 'Complete construction of third package including 4 flyovers',
        plannedDate: new Date('2027-06-30'),
        status: 'PENDING',
        dependencies: ['MS019'],
        criticalPath: true,
        completionPercentage: 10
      },
      {
        id: 'MS022',
        name: 'Complete Project Handover',
        description: 'Final completion with all auxiliary works and handover',
        plannedDate: new Date('2027-12-31'),
        status: 'PENDING',
        dependencies: ['MS019', 'MS020', 'MS021'],
        criticalPath: true,
        completionPercentage: 0
      }
    ],
    
    overallProgress: 32,
    currentStage: 'Project Execution',
    
    risks: [
      {
        id: 'R011',
        category: 'Technical',
        description: 'Complex flyover construction over existing traffic corridors',
        probability: RiskLevel.HIGH,
        impact: RiskLevel.HIGH,
        mitigationStrategy: 'Phased construction with temporary traffic diversions and night work',
        owner: 'Er. Rajesh Kumar Gupta',
        status: 'ACTIVE'
      },
      {
        id: 'R012',
        category: 'Financial',
        description: 'Significant cost escalation due to land acquisition delays',
        probability: RiskLevel.MEDIUM,
        impact: RiskLevel.CRITICAL,
        mitigationStrategy: 'Government intervention and additional budget allocation',
        owner: 'Dr. B. Janardhan Reddy',
        status: 'MITIGATED'
      },
      {
        id: 'R013',
        category: 'Environmental',
        description: 'Environmental compliance for forest land diversion',
        probability: RiskLevel.MEDIUM,
        impact: RiskLevel.HIGH,
        mitigationStrategy: 'Compensatory afforestation and environmental monitoring',
        owner: 'V. Balakrishna',
        status: 'ACTIVE'
      },
      {
        id: 'R014',
        category: 'Schedule',
        description: 'Monsoon impact on large-scale earthwork activities',
        probability: RiskLevel.HIGH,
        impact: RiskLevel.MEDIUM,
        mitigationStrategy: 'Monsoon-proof construction methodology and equipment',
        owner: 'N. Satyanarayana',
        status: 'ACTIVE'
      }
    ],
    
    stages: {
      stage6: {
        stageId: 'STAGE_6',
        stageName: 'Project Execution',
        status: ApprovalStatus.IN_REVIEW,
        startDate: new Date('2023-04-01'),
        data: {
          executionPlan: {
            mobilizationDate: new Date('2023-04-01'),
            phases: [
              {
                phaseName: 'Land Clearing & Site Preparation',
                startDate: new Date('2023-04-01'),
                endDate: new Date('2024-03-31'),
                activities: ['Forest clearance', 'Land survey', 'Site preparation', 'Temporary facilities'],
                progress: 100
              },
              {
                phaseName: 'Package 1 Construction',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2025-12-31'),
                activities: ['Earthwork', 'Drainage', 'Pavement', 'Flyover construction'],
                progress: 55
              },
              {
                phaseName: 'Package 2 Construction',
                startDate: new Date('2024-07-01'),
                endDate: new Date('2026-12-31'),
                activities: ['Earthwork', 'Drainage', 'Pavement', 'Flyover construction'],
                progress: 28
              },
              {
                phaseName: 'Package 3 Construction',
                startDate: new Date('2025-01-01'),
                endDate: new Date('2027-12-31'),
                activities: ['Earthwork', 'Drainage', 'Pavement', 'Flyover construction'],
                progress: 8
              }
            ],
            resourcePlan: {
              manpower: 850,
              machinery: ['Bulldozers', 'Excavators', 'Compactors', 'Pavers', 'Concrete pumps', 'Cranes'],
              materials: ['Aggregate (5M MT)', 'Bitumen (50K MT)', 'Cement (2M MT)', 'Steel (150K MT)']
            }
          },
          progress: {
            overallProgress: 32,
            physicalProgress: 32,
            financialProgress: 30,
            lastUpdated: new Date('2024-08-31'),
            criticalActivities: ['Package 1 flyover construction', 'Package 2 earthwork', 'Environmental compliance'],
            delays: [
              {
                reason: 'Land acquisition legal disputes and environmental clearance delays',
                impact: 180, // days
                recoveryPlan: 'Parallel execution of packages and accelerated construction'
              }
            ]
          },
          qualityControl: {
            tests: [
              {
                testName: 'Soil Compaction Test (Modified Proctor)',
                date: new Date('2024-05-20'),
                result: 'PASS',
                remarks: '98% compaction achieved (Target: 95%)'
              },
              {
                testName: 'Aggregate Impact Value Test',
                date: new Date('2024-07-15'),
                result: 'PASS',
                remarks: 'Impact value 18% (Max allowed: 30%)'
              },
              {
                testName: 'Concrete Cube Test (M40 for flyovers)',
                date: new Date('2024-08-10'),
                result: 'PASS',
                remarks: 'Average strength 45.2 MPa (Target: 40 MPa)'
              }
            ],
            inspections: [
              {
                type: 'Earthwork Quality Inspection',
                date: new Date('2024-06-30'),
                inspector: 'Quality Control Engineer',
                findings: ['Proper layer thickness', 'Adequate compaction achieved'],
                compliance: true
              },
              {
                type: 'Flyover Foundation Inspection',
                date: new Date('2024-08-25'),
                inspector: 'Structural Engineer',
                findings: ['Foundation depth as per design', 'Reinforcement placement correct'],
                compliance: true
              }
            ],
            nonConformances: [
              {
                id: 'NC004',
                description: 'Insufficient compaction in embankment section Ch. 15+000 to 15+200',
                severity: 'MAJOR',
                status: 'CLOSED',
                correctiveAction: 'Re-compaction with optimal moisture content'
              },
              {
                id: 'NC005',
                description: 'Concrete honeycombing in flyover pier P-8',
                severity: 'CRITICAL',
                status: 'IN_PROGRESS',
                correctiveAction: 'Structural assessment and repair methodology under review'
              }
            ]
          },
          safetyRecords: {
            incidents: 8, // Given the scale and duration
            lostTimeInjuries: 2,
            safetyMeetings: 52,
            trainingSessions: 38,
            complianceScore: 85
          },
          bills: [
            {
              billNumber: 'BILL-2024-007',
              date: new Date('2024-03-31'),
              amount: 125_00_00_000,
              workDone: 'Land acquisition, site preparation and initial earthwork',
              status: 'PAID',
              deductions: 2_50_00_000 // Quality and delay related
            },
            {
              billNumber: 'BILL-2024-008',
              date: new Date('2024-08-31'),
              amount: 95_00_00_000,
              workDone: 'Package 1 earthwork and flyover foundation work',
              status: 'VERIFIED',
              deductions: 1_50_00_000
            }
          ],
          documents: [
            {
              id: 'DOC025',
              name: 'ORR_Extension_Progress_Report_Aug2024.pdf',
              type: 'PDF',
              category: 'Progress Reports',
              uploadDate: new Date('2024-08-31'),
              size: 25_500_000,
              version: 1,
              status: 'SUBMITTED',
              uploadedBy: 'Er. Rajesh Kumar Gupta',
              checksum: 'orr789012345abcdef'
            }
          ]
        }
      }
    },
    
    createdDate: new Date('2021-10-01'),
    createdBy: 'Er. Rajesh Kumar Gupta',
    lastModifiedDate: new Date('2024-08-31'),
    lastModifiedBy: 'N. Satyanarayana',
    version: 18,
    tags: ['HMDA', 'Mega Project', 'ORR Extension', 'Transportation', 'Critical Priority', 'World Bank', 'Infrastructure'],
    
    auditLog: [
      {
        timestamp: new Date('2021-10-01'),
        action: 'Created',
        user: 'Er. Rajesh Kumar Gupta',
        changes: { status: 'ORR Extension project created with detailed feasibility study' },
        ipAddress: '192.168.4.100'
      },
      {
        timestamp: new Date('2022-03-15'),
        action: 'Approved',
        user: 'Dr. B. Janardhan Reddy',
        changes: { status: 'approved', budget: 'sanctioned ₹920 Cr with international funding' },
        ipAddress: '192.168.4.105'
      },
      {
        timestamp: new Date('2024-08-31'),
        action: 'Updated',
        user: 'N. Satyanarayana',
        changes: { progress: 'updated to 32%', package1: '55% progress achieved' },
        ipAddress: '192.168.4.102'
      }
    ]
  },

  // 5. SPECIAL PROJECT - Heritage Conservation
  {
    projectId: 'HMDA-2024-SHC-5001',
    projectCode: 'Z4/SH/078',
    projectName: 'Charminar Heritage Precinct Conservation & Development',
    projectDescription: 'Comprehensive heritage conservation project for Charminar precinct including monument restoration, infrastructure upgrades, tourist facilities development, and heritage-sensitive urban planning.',
    category: ProjectCategory.SPECIAL,
    type: ProjectType.PARKS_RECREATION,
    status: ProjectStatus.IN_PROGRESS,
    priority: 'HIGH',
    
    department: 'Town Planning Department',
    executingAgency: 'HMDA',
    implementingDivision: 'Heritage Conservation Division',
    projectManager: {
      id: 'PM005',
      name: 'Dr. Kavitha Sharma',
      role: 'PROJECT_MANAGER',
      designation: 'Conservation Architect',
      department: 'Town Planning Department',
      email: 'kavitha.sharma@hmda.gov.in',
      phone: '9849789123',
      responsibilityLevel: 'PRIMARY'
    },
    stakeholders: [
      {
        id: 'ST013',
        name: 'Prof. M. Ramachandran',
        role: 'TECHNICAL_HEAD',
        designation: 'Heritage Conservation Expert',
        department: 'Archaeological Survey of India',
        email: 'm.ramachandran@asi.gov.in',
        phone: '9849890234',
        responsibilityLevel: 'PRIMARY'
      },
      {
        id: 'ST014',
        name: 'Ar. Priya Nair',
        role: 'TECHNICAL_HEAD',
        designation: 'Urban Planner',
        department: 'Town Planning Department',
        email: 'priya.nair@hmda.gov.in',
        phone: '9849901345',
        responsibilityLevel: 'SECONDARY'
      },
      {
        id: 'ST015',
        name: 'K. Abdul Rahman',
        role: 'FIELD_ENGINEER',
        designation: 'Site Supervisor',
        department: 'Engineering Department',
        email: 'abdul.rahman@hmda.gov.in',
        phone: '9849012456',
        responsibilityLevel: 'SECONDARY'
      }
    ],
    
    location: {
      zone: 'Zone 4 (Charminar)',
      circle: 'Circle III',
      ward: 'Ward 76',
      locality: 'Charminar',
      latitude: 17.3616,
      longitude: 78.4747,
      address: 'Charminar Heritage Precinct, Old City, Hyderabad',
      landParcelNumbers: ['Heritage precinct area - multiple survey numbers'],
      nearbyLandmarks: ['Charminar', 'Mecca Masjid', 'Laad Bazaar', 'Madina Building']
    },
    
    plannedStartDate: new Date('2024-01-01'),
    actualStartDate: new Date('2024-02-14'),
    plannedCompletionDate: new Date('2026-12-31'),
    duration: 36,
    
    estimatedCost: 45_00_00_000, // ₹45 Cr
    approvedBudget: 48_50_00_000, // ₹48.5 Cr
    fundingSource: ['Central Government', 'State Government', 'UNESCO Grant'],
    financialDetails: {
      estimatedCost: 45_00_00_000,
      sanctionedAmount: 48_50_00_000,
      releasedAmount: 19_40_00_000,
      utilizedAmount: 14_55_00_000,
      pendingBills: 2_25_00_000,
      retentionAmount: 2_42_50_000,
      performanceGuarantee: 2_42_50_000,
      lastUpdated: new Date('2024-09-15')
    },
    
    technicalSpecs: {
      area: 125000, // Heritage precinct area in sq meters
      specifications: {
        monumentRestoration: 'Charminar, Mecca Masjid, adjacent structures',
        touristFacilities: 'Visitor center, interpretation center, parking',
        infrastructureUpgrade: 'Underground utilities, heritage lighting',
        landscaping: 'Heritage-sensitive garden development',
        accessibilityFeatures: 'Universal design for heritage tourism',
        conservationStandards: 'UNESCO World Heritage Site standards'
      }
    },
    
    milestones: [
      {
        id: 'MS023',
        name: 'Heritage Impact Assessment',
        description: 'Comprehensive heritage impact assessment and conservation plan approval',
        plannedDate: new Date('2024-04-30'),
        actualDate: new Date('2024-05-20'),
        status: 'COMPLETED',
        dependencies: [],
        criticalPath: true,
        delayDays: 20,
        completionPercentage: 100
      },
      {
        id: 'MS024',
        name: 'Archaeological Survey Clearance',
        description: 'ASI clearance for conservation and development activities',
        plannedDate: new Date('2024-06-30'),
        actualDate: new Date('2024-07-15'),
        status: 'COMPLETED',
        dependencies: ['MS023'],
        criticalPath: true,
        delayDays: 15,
        completionPercentage: 100
      },
      {
        id: 'MS025',
        name: 'Phase 1 - Monument Conservation',
        description: 'Charminar structural conservation and restoration work',
        plannedDate: new Date('2025-03-31'),
        status: 'IN_PROGRESS',
        dependencies: ['MS024'],
        criticalPath: true,
        completionPercentage: 40
      },
      {
        id: 'MS026',
        name: 'Phase 2 - Infrastructure Development',
        description: 'Underground utilities and heritage-sensitive infrastructure',
        plannedDate: new Date('2025-12-31'),
        status: 'IN_PROGRESS',
        dependencies: ['MS025'],
        criticalPath: false,
        completionPercentage: 20
      },
      {
        id: 'MS027',
        name: 'Phase 3 - Tourist Facilities',
        description: 'Visitor center and interpretation facilities development',
        plannedDate: new Date('2026-09-30'),
        status: 'PENDING',
        dependencies: ['MS026'],
        criticalPath: false,
        completionPercentage: 5
      },
      {
        id: 'MS028',
        name: 'Project Completion & Inauguration',
        description: 'Complete heritage precinct development and public inauguration',
        plannedDate: new Date('2026-12-31'),
        status: 'PENDING',
        dependencies: ['MS025', 'MS026', 'MS027'],
        criticalPath: true,
        completionPercentage: 0
      }
    ],
    
    overallProgress: 35,
    currentStage: 'Project Execution',
    
    risks: [
      {
        id: 'R015',
        category: 'Technical',
        description: 'Complex heritage restoration requiring specialized techniques',
        probability: RiskLevel.HIGH,
        impact: RiskLevel.HIGH,
        mitigationStrategy: 'International heritage conservation experts and traditional craftsmen',
        owner: 'Dr. Kavitha Sharma',
        status: 'ACTIVE'
      },
      {
        id: 'R016',
        category: 'Regulatory',
        description: 'Multiple approvals required from heritage and archaeological authorities',
        probability: RiskLevel.MEDIUM,
        impact: RiskLevel.HIGH,
        mitigationStrategy: 'Early stakeholder engagement and compliance monitoring',
        owner: 'Prof. M. Ramachandran',
        status: 'MITIGATED'
      },
      {
        id: 'R017',
        category: 'Social',
        description: 'Local community and trader concerns about tourism impact',
        probability: RiskLevel.MEDIUM,
        impact: RiskLevel.MEDIUM,
        mitigationStrategy: 'Community consultation and livelihood enhancement programs',
        owner: 'Ar. Priya Nair',
        status: 'ACTIVE'
      },
      {
        id: 'R018',
        category: 'Environmental',
        description: 'Preservation of heritage character while ensuring accessibility',
        probability: RiskLevel.MEDIUM,
        impact: RiskLevel.MEDIUM,
        mitigationStrategy: 'Heritage-sensitive design and phased implementation',
        owner: 'K. Abdul Rahman',
        status: 'ACTIVE'
      }
    ],
    
    stages: {
      stage6: {
        stageId: 'STAGE_6',
        stageName: 'Project Execution',
        status: ApprovalStatus.IN_REVIEW,
        startDate: new Date('2024-08-01'),
        data: {
          executionPlan: {
            mobilizationDate: new Date('2024-08-01'),
            phases: [
              {
                phaseName: 'Heritage Documentation',
                startDate: new Date('2024-08-01'),
                endDate: new Date('2024-10-31'),
                activities: ['3D scanning', 'Historical research', 'Condition assessment'],
                progress: 90
              },
              {
                phaseName: 'Charminar Conservation',
                startDate: new Date('2024-11-01'),
                endDate: new Date('2025-08-31'),
                activities: ['Structural stabilization', 'Stone restoration', 'Architectural conservation'],
                progress: 35
              },
              {
                phaseName: 'Infrastructure Development',
                startDate: new Date('2025-03-01'),
                endDate: new Date('2026-03-31'),
                activities: ['Underground utilities', 'Heritage lighting', 'Accessibility features'],
                progress: 15
              },
              {
                phaseName: 'Tourist Facilities',
                startDate: new Date('2025-09-01'),
                endDate: new Date('2026-12-31'),
                activities: ['Visitor center', 'Interpretation center', 'Landscaping'],
                progress: 5
              }
            ],
            resourcePlan: {
              manpower: 65,
              machinery: ['Specialized conservation equipment', 'Micro drilling machines', 'Stone cutting tools'],
              materials: ['Traditional lime mortar', 'Matching stone', 'Heritage-grade materials']
            }
          },
          progress: {
            overallProgress: 35,
            physicalProgress: 35,
            financialProgress: 30,
            lastUpdated: new Date('2024-09-15'),
            criticalActivities: ['Stone restoration work', 'Structural stabilization', 'Heritage clearances'],
            delays: [
              {
                reason: 'Specialized heritage material procurement and traditional craftsmen availability',
                impact: 35, // days
                recoveryPlan: 'International sourcing and accelerated training program'
              }
            ]
          },
          qualityControl: {
            tests: [
              {
                testName: 'Stone Strength Analysis',
                date: new Date('2024-08-20'),
                result: 'PASS',
                remarks: 'Original stone strength adequate for restoration'
              },
              {
                testName: 'Mortar Compatibility Test',
                date: new Date('2024-09-05'),
                result: 'PASS',
                remarks: 'Traditional lime mortar compatible with existing structure'
              },
              {
                testName: 'Structural Stability Assessment',
                date: new Date('2024-09-10'),
                result: 'PASS',
                remarks: 'Structure stable with minor intervention required'
              }
            ],
            inspections: [
              {
                type: 'Heritage Conservation Inspection',
                date: new Date('2024-09-01'),
                inspector: 'ASI Conservation Expert',
                findings: ['Work proceeding as per conservation standards', 'Traditional techniques being followed'],
                compliance: true
              },
              {
                type: 'Quality Control Inspection',
                date: new Date('2024-09-12'),
                inspector: 'Dr. Kavitha Sharma',
                findings: ['Craftmanship quality excellent', 'Material authenticity verified'],
                compliance: true
              }
            ],
            nonConformances: [
              {
                id: 'NC006',
                description: 'Minor variation in stone color match on south facade',
                severity: 'MINOR',
                status: 'CLOSED',
                correctiveAction: 'Color treatment applied to achieve better match'
              }
            ]
          },
          safetyRecords: {
            incidents: 1, // Minor scaffolding accident
            lostTimeInjuries: 0,
            safetyMeetings: 15,
            trainingSessions: 8,
            complianceScore: 94
          },
          bills: [
            {
              billNumber: 'BILL-2024-009',
              date: new Date('2024-08-31'),
              amount: 8_75_00_000,
              workDone: 'Heritage documentation and initial conservation work',
              status: 'PAID',
              deductions: 0
            },
            {
              billNumber: 'BILL-2024-010',
              date: new Date('2024-09-15'),
              amount: 6_25_00_000,
              workDone: 'Charminar structural stabilization and stone restoration',
              status: 'SUBMITTED',
              deductions: 0
            }
          ],
          documents: [
            {
              id: 'DOC030',
              name: 'Heritage_Conservation_Progress_Sep2024.pdf',
              type: 'PDF',
              category: 'Progress Reports',
              uploadDate: new Date('2024-09-15'),
              size: 12_500_000,
              version: 1,
              status: 'SUBMITTED',
              uploadedBy: 'Dr. Kavitha Sharma',
              checksum: 'hc789012345abcdef'
            }
          ]
        }
      }
    },
    
    createdDate: new Date('2023-10-01'),
    createdBy: 'Dr. Kavitha Sharma',
    lastModifiedDate: new Date('2024-09-15'),
    lastModifiedBy: 'Prof. M. Ramachandran',
    version: 6,
    tags: ['HMDA', 'Heritage Conservation', 'Charminar', 'Tourism', 'Special Project', 'UNESCO', 'Cultural Heritage'],
    
    auditLog: [
      {
        timestamp: new Date('2023-10-01'),
        action: 'Created',
        user: 'Dr. Kavitha Sharma',
        changes: { status: 'Heritage conservation project proposal created' },
        ipAddress: '192.168.5.100'
      },
      {
        timestamp: new Date('2024-02-14'),
        action: 'Approved',
        user: 'Prof. M. Ramachandran',
        changes: { status: 'approved', budget: 'sanctioned ₹48.5 Cr with UNESCO support' },
        ipAddress: '192.168.5.105'
      },
      {
        timestamp: new Date('2024-09-15'),
        action: 'Updated',
        user: 'Prof. M. Ramachandran',
        changes: { progress: 'updated to 35%', conservation: 'Charminar work progressing well' },
        ipAddress: '192.168.5.108'
      }
    ]
  }
];

export default sampleProjects;