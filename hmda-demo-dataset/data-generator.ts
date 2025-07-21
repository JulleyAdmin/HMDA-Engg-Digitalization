// HMDA Project Data Generator
// Creates realistic project data based on actual HMDA research

import { 
  HMDAProject, 
  ProjectCategory, 
  ProjectSubCategory, 
  ProjectStage, 
  RiskLevel, 
  Circle,
  ContractorGrade,
  PoliticalInterest,
  PublicSentiment,
  MonsoonImpact,
  LandIssueStatus,
  Location,
  Contractor,
  Timeline,
  Financial,
  Quality,
  Stakeholders,
  RealWorldFactors,
  Milestone
} from './project-schema';

// Real HMDA data based on research
const REAL_CONTRACTORS = [
  { name: 'L&T Construction', grade: ContractorGrade.AAA, rating: 3.5, specialization: ['FLYOVERS', 'METRO', 'INFRASTRUCTURE'] },
  { name: 'NCC Limited', grade: ContractorGrade.AA, rating: 4.5, specialization: ['ROADS', 'BUILDINGS', 'WATER'] },
  { name: 'MEIL', grade: ContractorGrade.AA, rating: 4.2, specialization: ['INFRASTRUCTURE', 'WATER', 'POWER'] },
  { name: 'AFCONS Infrastructure', grade: ContractorGrade.AA, rating: 4.0, specialization: ['FLYOVERS', 'BRIDGES'] },
  { name: 'Ramky Infrastructure', grade: ContractorGrade.A, rating: 3.8, specialization: ['ROADS', 'BUILDINGS'] },
  { name: 'KNR Constructions', grade: ContractorGrade.A, rating: 4.1, specialization: ['ROADS', 'INFRASTRUCTURE'] },
  { name: 'Nagarjuna Construction', grade: ContractorGrade.A, rating: 3.9, specialization: ['BUILDINGS', 'INFRASTRUCTURE'] },
  { name: 'IRB Infrastructure', grade: ContractorGrade.AA, rating: 4.3, specialization: ['HIGHWAYS', 'EXPRESSWAYS'] },
  { name: 'Simplex Infrastructures', grade: ContractorGrade.A, rating: 3.7, specialization: ['METRO', 'TUNNELS'] },
  { name: 'Tata Projects', grade: ContractorGrade.AAA, rating: 4.4, specialization: ['AIRPORTS', 'SMART_CITY'] }
];

const HMDA_LOCATIONS = {
  [Circle.CIRCLE_1]: [
    { ward: 'Jubilee Hills', mandal: 'Jubilee Hills', locality: 'Road No. 36', pincode: '500033' },
    { ward: 'Banjara Hills', mandal: 'Khairatabad', locality: 'Road No. 12', pincode: '500034' },
    { ward: 'Hitech City', mandal: 'Serilingampally', locality: 'Cyber Towers', pincode: '500081' },
    { ward: 'Gachibowli', mandal: 'Serilingampally', locality: 'DLF', pincode: '500032' },
    { ward: 'Madhapur', mandal: 'Serilingampally', locality: 'Mindspace', pincode: '500081' }
  ],
  [Circle.CIRCLE_2]: [
    { ward: 'Attapur', mandal: 'Rajendranagar', locality: 'TSIIC', pincode: '500048' },
    { ward: 'Shamshabad', mandal: 'Shamshabad', locality: 'Airport Road', pincode: '500409' },
    { ward: 'Kokapet', mandal: 'Gandipet', locality: 'Financial District', pincode: '500075' },
    { ward: 'Nanakramguda', mandal: 'Serilingampally', locality: 'IT Corridor', pincode: '500032' }
  ],
  [Circle.CIRCLE_3]: [
    { ward: 'Miyapur', mandal: 'Miyapur', locality: 'Metro Station', pincode: '500049' },
    { ward: 'Bachupally', mandal: 'Quthbullapur', locality: 'Housing Board', pincode: '500090' },
    { ward: 'Kompally', mandal: 'Quthbullapur', locality: 'IIT Campus', pincode: '500100' },
    { ward: 'Nizampet', mandal: 'Quthbullapur', locality: 'X Roads', pincode: '500090' }
  ],
  [Circle.CIRCLE_4]: [
    { ward: 'Patancheru', mandal: 'Patancheru', locality: 'Industrial Area', pincode: '502319' },
    { ward: 'Sangareddy', mandal: 'Sangareddy', locality: 'Town Center', pincode: '502001' },
    { ward: 'Zaheerabad', mandal: 'Zaheerabad', locality: 'Main Road', pincode: '502220' }
  ],
  [Circle.CIRCLE_5]: [
    { ward: 'Vikarabad', mandal: 'Vikarabad', locality: 'Bus Stand', pincode: '501101' },
    { ward: 'Tandur', mandal: 'Tandur', locality: 'Railway Station', pincode: '501141' },
    { ward: 'Chevella', mandal: 'Chevella', locality: 'Market Area', pincode: '501503' }
  ]
};

const REAL_PROJECT_INSPIRATIONS = [
  { name: 'Biodiversity Junction Flyover', budget: 46550000000, category: ProjectCategory.INFRASTRUCTURE },
  { name: 'Paradise to Punjagutta Elevated Corridor', budget: 77260000000, category: ProjectCategory.INFRASTRUCTURE },
  { name: 'Shilpa Layout Junction Elevated Road', budget: 25340000000, category: ProjectCategory.INFRASTRUCTURE },
  { name: 'KPHB Malaysian Township Connector', budget: 24868000000, category: ProjectCategory.INFRASTRUCTURE },
  { name: 'Future City Development - Phase I', budget: 166500000000, category: ProjectCategory.URBAN_DEVELOPMENT },
  { name: 'Kothwalguda Eco Park Development', budget: 7500000000, category: ProjectCategory.ENVIRONMENTAL },
  { name: 'Hussain Sagar Rejuvenation Project', budget: 50000000000, category: ProjectCategory.ENVIRONMENTAL },
  { name: 'Smart City Command Center', budget: 15000000000, category: ProjectCategory.SMART_CITY },
  { name: 'Outer Ring Road Cycle Track', budget: 2500000000, category: ProjectCategory.INFRASTRUCTURE }
];

export class HMDADataGenerator {
  private currentYear = new Date().getFullYear();
  private projectCounter = 1;

  // Generate realistic budget based on category and complexity
  private generateBudget(category: ProjectCategory, complexity: 'SMALL' | 'MEDIUM' | 'LARGE' | 'MEGA'): number {
    const budgetRanges = {
      [ProjectCategory.INFRASTRUCTURE]: {
        SMALL: [1000000000, 5000000000], // ₹10-50 Cr
        MEDIUM: [5000000000, 50000000000], // ₹50-500 Cr  
        LARGE: [50000000000, 200000000000], // ₹500-2000 Cr
        MEGA: [200000000000, 500000000000] // ₹2000-5000 Cr
      },
      [ProjectCategory.URBAN_DEVELOPMENT]: {
        SMALL: [500000000, 2000000000], // ₹5-20 Cr
        MEDIUM: [2000000000, 20000000000], // ₹20-200 Cr
        LARGE: [20000000000, 100000000000], // ₹200-1000 Cr
        MEGA: [100000000000, 300000000000] // ₹1000-3000 Cr
      },
      [ProjectCategory.ENVIRONMENTAL]: {
        SMALL: [200000000, 1000000000], // ₹2-10 Cr
        MEDIUM: [1000000000, 10000000000], // ₹10-100 Cr
        LARGE: [10000000000, 50000000000], // ₹100-500 Cr
        MEGA: [50000000000, 150000000000] // ₹500-1500 Cr
      },
      [ProjectCategory.SMART_CITY]: {
        SMALL: [300000000, 1500000000], // ₹3-15 Cr
        MEDIUM: [1500000000, 15000000000], // ₹15-150 Cr
        LARGE: [15000000000, 75000000000], // ₹150-750 Cr
        MEGA: [75000000000, 200000000000] // ₹750-2000 Cr
      }
    };

    const [min, max] = budgetRanges[category][complexity];
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Generate realistic timeline based on budget and category
  private generateTimeline(budget: number, category: ProjectCategory, stage: ProjectStage): Timeline {
    // Duration in months based on budget
    let durationMonths: number;
    if (budget < 1000000000) durationMonths = 6 + Math.random() * 6; // 6-12 months
    else if (budget < 5000000000) durationMonths = 12 + Math.random() * 12; // 12-24 months
    else if (budget < 50000000000) durationMonths = 18 + Math.random() * 18; // 18-36 months
    else durationMonths = 36 + Math.random() * 24; // 36-60 months

    // Add category-specific factors
    if (category === ProjectCategory.INFRASTRUCTURE) durationMonths *= 1.2;
    if (category === ProjectCategory.ENVIRONMENTAL) durationMonths *= 0.8;

    const plannedStart = new Date(2023, Math.floor(Math.random() * 12), 1);
    const actualStart = new Date(plannedStart);
    actualStart.setDate(actualStart.getDate() + Math.floor(Math.random() * 45)); // 0-45 days delay

    const plannedCompletion = new Date(plannedStart);
    plannedCompletion.setMonth(plannedCompletion.getMonth() + durationMonths);

    // Calculate realistic delays based on stage and factors
    let delayDays = 0;
    if (stage >= ProjectStage.CONSTRUCTION) {
      delayDays = Math.floor(Math.random() * 60); // 0-60 days for ongoing projects
    }

    const projectedCompletion = new Date(plannedCompletion);
    projectedCompletion.setDate(projectedCompletion.getDate() + delayDays);

    const monsoonBuffer = Math.floor(durationMonths * 0.2 * 30); // 20% for monsoon
    const daysInCurrentStage = Math.floor(Math.random() * 90) + 1;

    return {
      plannedStart: plannedStart.toISOString().split('T')[0],
      actualStart: actualStart.toISOString().split('T')[0],
      plannedCompletion: plannedCompletion.toISOString().split('T')[0],
      projectedCompletion: projectedCompletion.toISOString().split('T')[0],
      delayDays,
      monsoonBuffer,
      daysInCurrentStage
    };
  }

  // Generate contractor based on project type and budget
  private generateContractor(category: ProjectCategory, budget: number): Contractor {
    let eligibleContractors = [...REAL_CONTRACTORS];
    
    // Filter by budget capability
    if (budget > 50000000000) {
      eligibleContractors = eligibleContractors.filter(c => c.grade === ContractorGrade.AAA || c.grade === ContractorGrade.AA);
    }

    // Filter by specialization
    const categoryMapping = {
      [ProjectCategory.INFRASTRUCTURE]: ['FLYOVERS', 'ROADS', 'INFRASTRUCTURE', 'BRIDGES'],
      [ProjectCategory.URBAN_DEVELOPMENT]: ['BUILDINGS', 'INFRASTRUCTURE'],
      [ProjectCategory.ENVIRONMENTAL]: ['WATER', 'INFRASTRUCTURE'],
      [ProjectCategory.SMART_CITY]: ['SMART_CITY', 'INFRASTRUCTURE']
    };

    const relevantSpecs = categoryMapping[category];
    eligibleContractors = eligibleContractors.filter(c => 
      c.specialization.some(spec => relevantSpecs.includes(spec))
    );

    if (eligibleContractors.length === 0) eligibleContractors = [REAL_CONTRACTORS[0]];

    const contractor = eligibleContractors[Math.floor(Math.random() * eligibleContractors.length)];

    return {
      name: contractor.name,
      grade: contractor.grade,
      performanceRating: contractor.rating + (Math.random() - 0.5) * 0.4, // ±0.2 variation
      currentLoad: Math.floor(Math.random() * 40) + 40, // 40-80%
      safetyRecord: Math.floor(Math.random() * 200) + 50, // 50-250 days
      completedProjects: Math.floor(Math.random() * 50) + 10,
      ongoingProjects: Math.floor(Math.random() * 8) + 1,
      blacklisted: false,
      specialization: contractor.specialization
    };
  }

  // Generate location
  private generateLocation(): Location {
    const circles = Object.keys(HMDA_LOCATIONS) as Circle[];
    const circle = circles[Math.floor(Math.random() * circles.length)];
    const locations = HMDA_LOCATIONS[circle];
    const location = locations[Math.floor(Math.random() * locations.length)];

    return {
      circle,
      ward: location.ward,
      mandal: location.mandal,
      locality: location.locality,
      pincode: location.pincode,
      coordinates: {
        latitude: 17.3850 + (Math.random() - 0.5) * 0.5, // Hyderabad area
        longitude: 78.4867 + (Math.random() - 0.5) * 0.5
      }
    };
  }

  // Generate progress based on stage and timeline
  private generateProgress(stage: ProjectStage, timeline: Timeline, contractor: Contractor): { physical: number, financial: number } {
    const stageProgress = {
      [ProjectStage.CONCEPTUALIZATION]: [5, 15],
      [ProjectStage.DPR_APPROVALS]: [15, 25],
      [ProjectStage.TENDERING]: [25, 30],
      [ProjectStage.CONTRACT_AWARD]: [30, 35],
      [ProjectStage.CONSTRUCTION]: [35, 85],
      [ProjectStage.QUALITY_CONTROL]: [85, 90],
      [ProjectStage.TESTING_COMMISSIONING]: [90, 95],
      [ProjectStage.HANDOVER]: [95, 99],
      [ProjectStage.DLP_OM]: [99, 100]
    };

    const [minProgress, maxProgress] = stageProgress[stage];
    let baseProgress = Math.random() * (maxProgress - minProgress) + minProgress;

    // Adjust based on contractor performance
    const contractorFactor = (contractor.performanceRating - 3) * 5; // -10 to +10
    baseProgress += contractorFactor;

    // Financial progress typically lags physical by 5-15%
    const physicalProgress = Math.max(0, Math.min(100, baseProgress));
    const financialProgress = Math.max(0, Math.min(physicalProgress, physicalProgress - Math.random() * 10));

    return {
      physical: Math.round(physicalProgress * 10) / 10,
      financial: Math.round(financialProgress * 10) / 10
    };
  }

  // Generate quality metrics
  private generateQuality(contractor: Contractor, stage: ProjectStage): Quality {
    const baseScore = (contractor.performanceRating * 18) + Math.random() * 10; // 18-100 range
    const testsCompleted = stage >= ProjectStage.CONSTRUCTION ? Math.floor(Math.random() * 200) + 20 : 0;
    const passRate = Math.max(85, baseScore + Math.random() * 5);
    const testsPassed = Math.floor(testsCompleted * passRate / 100);

    return {
      overallScore: Math.round(baseScore * 10) / 10,
      testsCompleted,
      testsPassed,
      testsPassRate: Math.round(passRate * 10) / 10,
      ncrsOpen: Math.floor(Math.random() * 5),
      ncrsClosed: Math.floor(Math.random() * 30) + 5,
      lastAuditScore: Math.min(5, contractor.performanceRating + (Math.random() - 0.5) * 0.4),
      lastAuditDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      thirdPartyAudit: stage >= ProjectStage.CONSTRUCTION && Math.random() > 0.3,
      materialTestingLab: ['HMDA Lab', 'NABL Certified Lab', 'Third Party Lab'][Math.floor(Math.random() * 3)]
    };
  }

  // Generate project ID
  private generateProjectId(category: ProjectCategory, subCategory: ProjectSubCategory, circle: Circle): string {
    return `${category}-${subCategory}-${this.currentYear}-${String(this.projectCounter++).padStart(3, '0')}-${circle}`;
  }

  // Generate single project
  public generateProject(
    complexity: 'SMALL' | 'MEDIUM' | 'LARGE' | 'MEGA' = 'MEDIUM',
    preferredStage?: ProjectStage,
    preferredCategory?: ProjectCategory
  ): HMDAProject {
    // Determine category
    const category = preferredCategory || this.getRandomEnum(ProjectCategory);
    const subCategory = this.getSubCategoryForCategory(category);
    
    // Generate basic info
    const location = this.generateLocation();
    const budget = this.generateBudget(category, complexity);
    const stage = preferredStage || this.getRandomEnum(ProjectStage);
    const timeline = this.generateTimeline(budget, category, stage);
    const contractor = this.generateContractor(category, budget);
    const progress = this.generateProgress(stage, timeline, contractor);
    const quality = this.generateQuality(contractor, stage);

    // Generate project name
    const inspiration = REAL_PROJECT_INSPIRATIONS[Math.floor(Math.random() * REAL_PROJECT_INSPIRATIONS.length)];
    const projectName = this.generateProjectName(category, location, inspiration.name);
    
    const projectId = this.generateProjectId(category, subCategory, location.circle);

    // Calculate CE Score (weighted formula)
    const ceScore = Math.round(
      (progress.physical * 0.3) + 
      (progress.financial * 0.2) + 
      (quality.overallScore * 0.2) + 
      (contractor.performanceRating * 15) + 
      ((timeline.delayDays === 0 ? 100 : Math.max(0, 100 - timeline.delayDays)) * 0.15)
    );

    // Determine risk level
    const riskLevel = this.calculateRiskLevel(timeline.delayDays, budget, quality.overallScore, contractor.performanceRating);

    // Generate financial details
    const financial: Financial = {
      contractValue: budget,
      originalEstimate: Math.floor(budget * (0.95 + Math.random() * 0.1)), // ±5% variation
      paidTillDate: Math.floor(budget * progress.financial / 100),
      pendingBills: Math.floor(Math.random() * 4),
      lastPaymentDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      mobilizationAdvance: Math.floor(budget * 0.1), // 10%
      retentionAmount: Math.floor(budget * 0.05), // 5%
      variations: [],
      costOverrun: Math.random() * 20 - 5, // -5% to +15%
      budgetUtilization: progress.financial
    };

    const project: HMDAProject = {
      projectId,
      projectName,
      category,
      subCategory,
      currentStage: stage,
      stageStartDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalBudget: budget,
      physicalProgress: progress.physical,
      financialProgress: progress.financial,
      ceScore,
      riskLevel,
      location,
      contractor,
      consultant: stage >= ProjectStage.DPR_APPROVALS ? this.generateConsultant() : undefined,
      timeline,
      financial,
      quality,
      stakeholders: this.generateStakeholders(budget, location),
      realWorldFactors: this.generateRealWorldFactors(category, location),
      milestones: this.generateMilestones(stage, timeline),
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString(),
      createdBy: 'CE Office',
      tags: this.generateTags(category, stage, riskLevel),
      priority: this.calculatePriority(riskLevel, budget, stage)
    };

    // Add stage-specific data
    this.addStageSpecificData(project);

    return project;
  }

  // Helper methods
  private getRandomEnum<T>(enumObject: T): T[keyof T] {
    const values = Object.values(enumObject) as T[keyof T][];
    return values[Math.floor(Math.random() * values.length)];
  }

  private getSubCategoryForCategory(category: ProjectCategory): ProjectSubCategory {
    const mapping = {
      [ProjectCategory.INFRASTRUCTURE]: [ProjectSubCategory.ROADS_TRANSPORT, ProjectSubCategory.WATER_SEWERAGE, ProjectSubCategory.POWER_UTILITIES],
      [ProjectCategory.URBAN_DEVELOPMENT]: [ProjectSubCategory.TOWNSHIP_DEVELOPMENT, ProjectSubCategory.AREA_DEVELOPMENT, ProjectSubCategory.PUBLIC_AMENITIES],
      [ProjectCategory.ENVIRONMENTAL]: [ProjectSubCategory.GREEN_INFRASTRUCTURE, ProjectSubCategory.POLLUTION_CONTROL],
      [ProjectCategory.SMART_CITY]: [ProjectSubCategory.DIGITAL_INFRASTRUCTURE, ProjectSubCategory.INTELLIGENT_SYSTEMS]
    };
    
    const options = mapping[category];
    return options[Math.floor(Math.random() * options.length)];
  }

  private generateProjectName(category: ProjectCategory, location: Location, inspiration: string): string {
    const prefixes = {
      [ProjectCategory.INFRASTRUCTURE]: ['Elevated Corridor', 'Flyover', 'Bridge', 'Road Widening', 'Junction Improvement'],
      [ProjectCategory.URBAN_DEVELOPMENT]: ['Township Development', 'Area Development', 'Complex', 'Park Development'],
      [ProjectCategory.ENVIRONMENTAL]: ['Lake Rejuvenation', 'Eco Park', 'Green Belt', 'Pollution Control'],
      [ProjectCategory.SMART_CITY]: ['Smart Infrastructure', 'Digital Hub', 'Command Center', 'IoT Network']
    };

    const prefix = prefixes[category][Math.floor(Math.random() * prefixes[category].length)];
    return `${location.locality} ${prefix} - Phase ${Math.floor(Math.random() * 3) + 1}`;
  }

  private calculateRiskLevel(delayDays: number, budget: number, qualityScore: number, contractorRating: number): RiskLevel {
    let riskScore = 0;
    
    if (delayDays > 60) riskScore += 3;
    else if (delayDays > 30) riskScore += 2;
    else if (delayDays > 0) riskScore += 1;

    if (budget > 100000000000) riskScore += 2; // High value projects are riskier
    if (qualityScore < 80) riskScore += 2;
    if (contractorRating < 3.5) riskScore += 2;

    if (riskScore >= 6) return RiskLevel.CRITICAL;
    if (riskScore >= 4) return RiskLevel.HIGH;
    if (riskScore >= 2) return RiskLevel.MEDIUM;
    return RiskLevel.LOW;
  }

  private generateConsultant(): string {
    const consultants = [
      'M/s AECOM India',
      'M/s STUP Consultants',
      'M/s COWI India',
      'M/s Aarvee Associates',
      'M/s Engineering Projects (India) Limited',
      'M/s Louis Berger',
      'M/s Jacobs India',
      'M/s RAMBOLL India'
    ];
    return consultants[Math.floor(Math.random() * consultants.length)];
  }

  private generateStakeholders(budget: number, location: Location): Stakeholders {
    let politicalInterest = PoliticalInterest.ROUTINE;
    
    if (budget > 100000000000) politicalInterest = PoliticalInterest.CM;
    else if (budget > 50000000000) politicalInterest = PoliticalInterest.MINISTER;
    else if (budget > 10000000000) politicalInterest = PoliticalInterest.MLA;
    else if (Math.random() > 0.7) politicalInterest = PoliticalInterest.PUBLIC;

    return {
      politicalInterest,
      publicSentiment: this.getRandomEnum(PublicSentiment),
      mediaAttention: budget > 50000000000 ? 'HIGH' : (budget > 10000000000 ? 'MEDIUM' : 'LOW'),
      complaintsThisMonth: Math.floor(Math.random() * 10),
      appreciationLetters: Math.floor(Math.random() * 5),
      rtiQueries: Math.floor(Math.random() * 3),
      socialMediaMentions: Math.floor(Math.random() * 50)
    };
  }

  private generateRealWorldFactors(category: ProjectCategory, location: Location): RealWorldFactors {
    const monsoonImpact = category === ProjectCategory.INFRASTRUCTURE ? 
      (Math.random() > 0.3 ? MonsoonImpact.HIGH : MonsoonImpact.MEDIUM) : 
      MonsoonImpact.LOW;

    return {
      monsoonImpact,
      landIssues: this.getRandomEnum(LandIssueStatus),
      utilityShifting: Math.random() > 0.5 ? 'IN_PROGRESS' : 'COMPLETED',
      environmentalClearance: Math.random() > 0.7 ? 'PENDING' : 'OBTAINED',
      heritageImpact: location.ward === 'Charminar' || Math.random() > 0.9,
      trafficImpact: category === ProjectCategory.INFRASTRUCTURE ? 
        (Math.random() > 0.4 ? 'HIGH' : 'MEDIUM') : 'LOW'
    };
  }

  private generateMilestones(stage: ProjectStage, timeline: Timeline): Milestone[] {
    const milestones: Milestone[] = [];
    const startDate = new Date(timeline.actualStart);
    
    const stageNames = [
      'Project Sanction',
      'DPR Approval', 
      'Tender Award',
      'Site Handover',
      '25% Physical Progress',
      '50% Physical Progress', 
      '75% Physical Progress',
      'Testing Complete',
      'Project Handover'
    ];

    stageNames.forEach((name, index) => {
      const milestoneDate = new Date(startDate);
      milestoneDate.setMonth(milestoneDate.getMonth() + index * 2);
      
      milestones.push({
        id: `M${String(index + 1).padStart(2, '0')}`,
        name,
        plannedDate: milestoneDate.toISOString().split('T')[0],
        actualDate: index < stage ? new Date(milestoneDate.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
        status: index < stage ? 'COMPLETED' : (index === stage ? 'IN_PROGRESS' : 'PENDING'),
        importance: [0, 1, 2, 3, 8].includes(index) ? 'CRITICAL' : 'HIGH',
        dependencies: index > 0 ? [`M${String(index).padStart(2, '0')}`] : []
      });
    });

    return milestones;
  }

  private generateTags(category: ProjectCategory, stage: ProjectStage, riskLevel: RiskLevel): string[] {
    const tags = [category];
    
    if (stage >= ProjectStage.CONSTRUCTION) tags.push('ONGOING');
    if (riskLevel === RiskLevel.HIGH || riskLevel === RiskLevel.CRITICAL) tags.push('HIGH_PRIORITY');
    if (Math.random() > 0.7) tags.push('VIP_INTEREST');
    if (Math.random() > 0.8) tags.push('MEDIA_COVERAGE');
    
    return tags;
  }

  private calculatePriority(riskLevel: RiskLevel, budget: number, stage: ProjectStage): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    if (riskLevel === RiskLevel.CRITICAL) return 'CRITICAL';
    if (budget > 100000000000 || riskLevel === RiskLevel.HIGH) return 'HIGH';
    if (budget > 10000000000 || stage >= ProjectStage.CONSTRUCTION) return 'MEDIUM';
    return 'LOW';
  }

  private addStageSpecificData(project: HMDAProject): void {
    // Add stage-specific data based on current stage
    // This would include detailed implementation for each stage
    // For brevity, adding basic structure
    
    if (project.currentStage >= ProjectStage.CONCEPTUALIZATION) {
      project.stage1Data = {
        feasibilityStatus: 'COMPLETED',
        needAnalysis: 'TRAFFIC_CONGESTION',
        landRequired: Math.random() * 10 + 1,
        estimatedCost: project.totalBudget * (0.9 + Math.random() * 0.2),
        publicSupport: Math.floor(Math.random() * 5000) + 500,
        mlaEndorsement: Math.random() > 0.3,
        assemblyQuestion: Math.random() > 0.7 ? `AQ#${Math.floor(Math.random() * 9000) + 1000}` : undefined,
        approvalPending: 'CE',
        targetApproval: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
    }

    if (project.currentStage >= ProjectStage.CONSTRUCTION) {
      project.stage5Data = {
        todayProgress: Math.floor(Math.random() * 40) + 60,
        activeLocations: Math.floor(Math.random() * 8) + 1,
        workforce: {
          current: Math.floor(Math.random() * 50) + 100,
          target: 150,
          efficiency: Math.floor(Math.random() * 20) + 80
        },
        equipmentUtilization: Math.floor(Math.random() * 30) + 70,
        safetyDays: project.contractor?.safetyRecord || 0,
        materialDeliveryStatus: Math.random() > 0.7 ? 'DELAYED' : 'ON_TIME',
        weatherImpact: Math.random() > 0.8
      };
    }
  }

  // Generate multiple projects with distribution
  public generateProjectDataset(totalProjects: number = 150): HMDAProject[] {
    const projects: HMDAProject[] = [];
    
    // Stage distribution (realistic for ongoing portfolio)
    const stageDistribution = {
      [ProjectStage.CONCEPTUALIZATION]: Math.floor(totalProjects * 0.17), // 17%
      [ProjectStage.DPR_APPROVALS]: Math.floor(totalProjects * 0.13), // 13%
      [ProjectStage.TENDERING]: Math.floor(totalProjects * 0.10), // 10%
      [ProjectStage.CONTRACT_AWARD]: Math.floor(totalProjects * 0.08), // 8%
      [ProjectStage.CONSTRUCTION]: Math.floor(totalProjects * 0.30), // 30%
      [ProjectStage.QUALITY_CONTROL]: Math.floor(totalProjects * 0.10), // 10%
      [ProjectStage.TESTING_COMMISSIONING]: Math.floor(totalProjects * 0.05), // 5%
      [ProjectStage.HANDOVER]: Math.floor(totalProjects * 0.04), // 4%
      [ProjectStage.DLP_OM]: Math.floor(totalProjects * 0.03) // 3%
    };

    // Complexity distribution
    const complexityDistribution = {
      SMALL: Math.floor(totalProjects * 0.40), // 40%
      MEDIUM: Math.floor(totalProjects * 0.35), // 35%
      LARGE: Math.floor(totalProjects * 0.20), // 20%
      MEGA: Math.floor(totalProjects * 0.05) // 5%
    };

    // Generate projects
    Object.entries(stageDistribution).forEach(([stage, count]) => {
      for (let i = 0; i < count; i++) {
        const complexity = this.getComplexityForProject(i, complexityDistribution);
        const project = this.generateProject(complexity as any, parseInt(stage) as ProjectStage);
        projects.push(project);
      }
    });

    return projects;
  }

  private getComplexityForProject(index: number, distribution: any): string {
    let total = 0;
    for (const [complexity, count] of Object.entries(distribution)) {
      total += count as number;
      if (index < total) return complexity;
    }
    return 'MEDIUM';
  }

  // Validation rules implementation
  public validateProject(project: HMDAProject): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    let score = 100;

    // Basic validation
    if (!project.projectId || !project.projectId.match(/^INFRA|URBAN|ENV|SMART-/)) {
      errors.push('Invalid project ID format');
      score -= 10;
    }

    if (!project.projectName || project.projectName.length < 10) {
      errors.push('Project name too short');
      score -= 5;
    }

    if (project.totalBudget <= 0) {
      errors.push('Invalid budget amount');
      score -= 15;
    }

    // Stage validation
    if (project.physicalProgress > 100 || project.physicalProgress < 0) {
      errors.push('Invalid physical progress');
      score -= 10;
    }

    if (project.financialProgress > project.physicalProgress + 5) {
      warnings.push('Financial progress exceeds physical progress');
      score -= 3;
    }

    // Risk validation
    if (project.timeline.delayDays > 90 && project.riskLevel === RiskLevel.LOW) {
      warnings.push('High delay with low risk level seems inconsistent');
      score -= 5;
    }

    // Quality validation
    if (project.quality.overallScore < 70 && project.physicalProgress > 50) {
      warnings.push('Low quality score for advanced project');
      score -= 8;
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.max(0, score)
    };
  }

  // Export dataset to JSON
  public exportDataset(projects: HMDAProject[]): string {
    return JSON.stringify({
      metadata: {
        generatedAt: new Date().toISOString(),
        totalProjects: projects.length,
        version: '1.0.0',
        description: 'HMDA Demo Dataset - Realistic project data for demonstration'
      },
      projects
    }, null, 2);
  }

  // Generate sample projects for demo scenarios
  public generateDemoScenarios(): { [key: string]: HMDAProject[] } {
    return {
      // Scenario 1: High-value infrastructure projects
      highValueInfra: Array(5).fill(null).map(() => 
        this.generateProject('MEGA', ProjectStage.CONSTRUCTION, ProjectCategory.INFRASTRUCTURE)
      ),
      
      // Scenario 2: Quick approval residential projects
      quickApproval: Array(8).fill(null).map(() => 
        this.generateProject('SMALL', ProjectStage.DPR_APPROVALS, ProjectCategory.URBAN_DEVELOPMENT)
      ),
      
      // Scenario 3: Environmental projects with risks
      environmentalRisks: Array(6).fill(null).map(() => {
        const project = this.generateProject('MEDIUM', ProjectStage.TENDERING, ProjectCategory.ENVIRONMENTAL);
        project.riskLevel = RiskLevel.HIGH;
        project.realWorldFactors.landIssues = LandIssueStatus.COURT_CASE;
        return project;
      })
    };
  }
}

export default HMDADataGenerator;