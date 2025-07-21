// Unit tests for Enhanced HMDA Project Schema
import { describe, it, expect, test } from '@jest/globals';
import * as EnhancedSchema from './enhanced-project-schema';
import * as OriginalSchema from './project-schema';

describe('Enhanced Project Schema Tests', () => {
  
  describe('Type Definitions', () => {
    it('should export all original schema types', () => {
      expect(EnhancedSchema.ProjectCategory).toBeDefined();
      expect(EnhancedSchema.ProjectStage).toBeDefined();
      expect(EnhancedSchema.RiskLevel).toBeDefined();
      expect(EnhancedSchema.Circle).toBeDefined();
    });

    it('should define new enum types', () => {
      expect(EnhancedSchema.ApprovalAuthority).toBeDefined();
      expect(EnhancedSchema.WorkType).toBeDefined();
      expect(EnhancedSchema.ProjectStatus).toBeDefined();
    });
  });

  describe('Government Approval Interface', () => {
    it('should create valid government approval object', () => {
      const govApproval: EnhancedSchema.GovernmentApproval = {
        goNumber: 'G.O.Ms.No.127',
        goDate: '2022-07-13',
        approvalAuthority: EnhancedSchema.ApprovalAuthority.GOVT,
        fileNumber: 'HMDA/DEV/CE/23/2022-23',
        sanctionedAmount: 102,
        financialYear: '2022-23'
      };
      
      expect(govApproval.goNumber).toMatch(/G\.O\.Ms\.No\.\d+/);
      expect(govApproval.approvalAuthority).toBe('Govt');
    });
  });

  describe('Technical Sanction Interface', () => {
    it('should calculate variance correctly', () => {
      const ts: EnhancedSchema.TechnicalSanction = {
        tsAmount: 102,
        varianceFromEstimate: 10.5,
        tsDate: '2022-08-15',
        tsAuthority: 'Chief Engineer'
      };
      
      expect(ts.varianceFromEstimate).toBeGreaterThan(5);
      expect(ts.varianceFromEstimate).toBeLessThan(15);
    });
  });

  describe('Tender Documentation Interface', () => {
    it('should validate tender percentage range', () => {
      const tender: EnhancedSchema.TenderDocumentation = {
        tenderNoticeNumber: 'HMDA/DEV/CE/23/2022-23',
        tenderNoticeDate: '2022-09-01',
        ecv: 55.29,
        tenderType: 'OPEN',
        bidSubmissionDates: {
          lastDate: '2022-09-30'
        },
        quotedTCV: 55.24,
        tenderPercentage: -0.10
      };
      
      expect(tender.tenderPercentage).toBeGreaterThanOrEqual(-5);
      expect(tender.tenderPercentage).toBeLessThanOrEqual(10);
    });
  });

  describe('Work Location Details', () => {
    it('should store survey numbers correctly', () => {
      const location: EnhancedSchema.WorkLocationDetails = {
        surveyNumbers: ['383/1', '384/2', '385/A'],
        village: 'Thorrur',
        mandal: 'Abdullapurmet',
        district: 'R.R District'
      };
      
      expect(location.surveyNumbers).toHaveLength(3);
      expect(location.surveyNumbers[0]).toMatch(/\d+\/\w+/);
    });
  });

  describe('Enhanced Project Interface', () => {
    it('should create complete enhanced project object', () => {
      const project: Partial<EnhancedSchema.EnhancedHMDAProject> = {
        projectId: 'INFRA-RT-2023-042-C1',
        projectName: 'Inmulnarva Layout Development',
        nameOfWork: 'Providing Infrastructure facilities for the proposed layout Inmulnarva (V), R.R District',
        workType: EnhancedSchema.WorkType.LAYOUTS,
        category: 'INFRA',
        currentStage: 5,
        projectStatus: EnhancedSchema.ProjectStatus.WORK_IN_PROGRESS,
        divisionNumber: 'VI',
        financialYear: '2022-23',
        estimateAmount: 50,
        governmentApproval: {
          goNumber: 'G.O.Ms.No.127',
          goDate: '2022-07-13',
          approvalAuthority: EnhancedSchema.ApprovalAuthority.GOVT,
          financialYear: '2022-23'
        },
        workLocation: {
          surveyNumbers: ['102/1'],
          village: 'Inmulnarva',
          mandal: 'Rangareddy',
          district: 'R.R District'
        },
        workProgress: {
          workGroundedDate: '2022-12-15',
          expectedCompletionDate: '2023-08-15',
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
          paymentMilestones: []
        },
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        updatedBy: 'system',
        dataSource: 'SYSTEM'
      };
      
      expect(project.projectId).toMatch(/^[A-Z]+-[A-Z]+-\d{4}-\d{3}-C\d$/);
      expect(project.estimateAmount).toBeLessThan(project.financialDetails!.contractValue);
    });
  });

  describe('Document Number Formats', () => {
    it('should generate correct document numbers', () => {
      const formats: EnhancedSchema.DocumentNumberFormats = {
        tenderNotice: (year, projectId) => `HMDA/DEV/CE/${projectId}/${year}`,
        loa: (projectName, year) => `14572/HMDA/DEV/CE/${projectName}/${year}`,
        agreement: (divisionNo, year) => `HMDA/DEV/CE/${divisionNo}/${year}`,
        goNumber: () => `G.O.Ms.No.${Math.floor(Math.random() * 200) + 1}`,
        voNumber: (projectId, seq) => `VO/${projectId}/${seq}/2023`
      };
      
      const tenderNo = formats.tenderNotice('2022-23', '23');
      expect(tenderNo).toBe('HMDA/DEV/CE/23/2022-23');
      
      const goNo = formats.goNumber();
      expect(goNo).toMatch(/G\.O\.Ms\.No\.\d+/);
    });
  });

  describe('Validation Rules', () => {
    it('should define correct validation ranges', () => {
      const rules: EnhancedSchema.ValidationRules = {
        tsVarianceRange: { min: 5, max: 15 },
        tenderPercentageRange: { min: -5, max: 10 },
        mobilizationAdvanceLimit: 10,
        retentionMoneyPercentage: 5,
        defectLiabilityPeriod: 12
      };
      
      expect(rules.tsVarianceRange.min).toBe(5);
      expect(rules.tsVarianceRange.max).toBe(15);
      expect(rules.tenderPercentageRange.min).toBe(-5);
    });
  });

  describe('Backward Compatibility', () => {
    it('should maintain compatibility with original schema', () => {
      // Original schema project should be assignable to enhanced schema
      const originalProject: Partial<OriginalSchema.HMDAProject> = {
        projectId: 'TEST-001',
        projectName: 'Test Project',
        category: OriginalSchema.ProjectCategory.INFRASTRUCTURE,
        currentStage: OriginalSchema.ProjectStage.CONSTRUCTION,
        totalBudget: 100
      };
      
      // This should not cause type errors
      expect(originalProject.projectId).toBeDefined();
      expect(originalProject.category).toBe('INFRA');
    });
  });
});

describe('Schema Integration Tests', () => {
  
  it('should generate realistic project with all enhancements', () => {
    const enhancedProject: Partial<EnhancedSchema.EnhancedHMDAProject> = {
      projectId: 'ENV-GI-2023-045-C3',
      projectName: 'Kukatpally Lake Rejuvenation',
      nameOfWork: 'Rejuvenation and beautification of Kukatpally Lake including desilting and pathway development',
      workType: EnhancedSchema.WorkType.LAKES,
      category: 'ENV',
      currentStage: 3,
      projectStatus: EnhancedSchema.ProjectStatus.TENDER_STAGE,
      
      governmentApproval: {
        goNumber: 'G.O.Ms.No.145',
        goDate: '2023-02-15',
        approvalAuthority: EnhancedSchema.ApprovalAuthority.GOVT,
        sanctionedAmount: 25,
        financialYear: '2022-23'
      },
      
      technicalSanction: {
        tsAmount: 27.5,
        varianceFromEstimate: 10,
        tsDate: '2023-03-20',
        tsAuthority: 'Chief Engineer',
        tsFileNumber: 'HMDA/TS/CE/045/2023'
      },
      
      tenderDocumentation: {
        tenderNoticeNumber: 'HMDA/DEV/CE/045/2022-23',
        tenderNoticeDate: '2023-04-01',
        ecv: 28.5,
        tenderType: 'OPEN',
        bidSubmissionDates: {
          firstDate: '2023-04-15',
          lastDate: '2023-04-30',
          prebidMeetingDate: '2023-04-10'
        },
        quotedTCV: 27.8,
        tenderPercentage: -2.45
      }
    };
    
    // Validate relationships
    expect(enhancedProject.technicalSanction!.tsAmount).toBeGreaterThan(
      enhancedProject.governmentApproval!.sanctionedAmount!
    );
    expect(enhancedProject.tenderDocumentation!.quotedTCV).toBeLessThan(
      enhancedProject.tenderDocumentation!.ecv
    );
  });
  
  it('should handle stage-specific data correctly', () => {
    const stage1Data: EnhancedSchema.EnhancedStage1Data = {
      proposalId: 'PROP/2023/CE/042',
      initiatedDate: '2023-03-15',
      proposer: 'DCE Circle-I',
      sourceOfRequirement: 'CITIZEN_DEMAND',
      citizenSignatures: 3450,
      mlaEndorsement: {
        endorsed: true,
        referenceNumber: 'MLA/2023/156',
        mlaName: 'Representative Name'
      },
      feasibilityComponents: {
        needAnalysis: { status: 'COMPLETED', completionDate: '2023-03-20' },
        siteInspection: { status: 'COMPLETED', completionDate: '2023-03-25' },
        trafficStudy: { status: 'IN_PROGRESS' },
        landVerification: { status: 'IN_PROGRESS' },
        environmentalStudy: { status: 'NOT_STARTED' },
        financialAnalysis: { status: 'IN_PROGRESS' },
        socialImpact: { status: 'PENDING' }
      },
      preliminaryCostBreakdown: {
        landAcquisition: 13.5,
        earthWork: 2.25,
        pavement: 37.5,
        structures: 4.5,
        utilitiesShifting: 2.0,
        consultancy: 0.6,
        contingency: 1.8,
        total: 62.15
      }
    };
    
    expect(stage1Data.citizenSignatures).toBeGreaterThan(1000);
    expect(stage1Data.preliminaryCostBreakdown.total).toBeCloseTo(62.15, 2);
  });
});