#!/usr/bin/env node

// HMDA Dataset Generation Script (JavaScript version)
// Generates the complete 150-project dataset for demo

const fs = require('fs');

// Enums and constants
const ProjectCategory = {
  INFRASTRUCTURE: 'INFRA',
  URBAN_DEVELOPMENT: 'URBAN', 
  ENVIRONMENTAL: 'ENV',
  SMART_CITY: 'SMART'
};

const ProjectSubCategory = {
  ROADS_TRANSPORT: 'RT',
  WATER_SEWERAGE: 'WS', 
  POWER_UTILITIES: 'PU',
  TOWNSHIP_DEVELOPMENT: 'TD',
  AREA_DEVELOPMENT: 'AD',
  PUBLIC_AMENITIES: 'PA',
  GREEN_INFRASTRUCTURE: 'GI',
  POLLUTION_CONTROL: 'PC',
  DIGITAL_INFRASTRUCTURE: 'DI',
  INTELLIGENT_SYSTEMS: 'IS'
};

const ProjectStage = {
  CONCEPTUALIZATION: 1,
  DPR_APPROVALS: 2,
  TENDERING: 3,
  CONTRACT_AWARD: 4,
  CONSTRUCTION: 5,
  QUALITY_CONTROL: 6,
  TESTING_COMMISSIONING: 7,
  HANDOVER: 8,
  DLP_OM: 9
};

const RiskLevel = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM', 
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

const Circle = {
  CIRCLE_1: 'C1',
  CIRCLE_2: 'C2',
  CIRCLE_3: 'C3',
  CIRCLE_4: 'C4',
  CIRCLE_5: 'C5'
};

const ContractorGrade = {
  AAA: 'AAA',
  AA: 'AA',
  A: 'A',
  B: 'B',
  C: 'C'
};

// Real contractors data
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

// Location data
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

// Simple random helpers
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomEnum(enumObject) {
  const values = Object.values(enumObject);
  return values[Math.floor(Math.random() * values.length)];
}

// Date helpers
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Generator class
class SimpleHMDAGenerator {
  constructor() {
    this.projectCounter = 1;
    this.currentYear = new Date().getFullYear();
  }

  generateProject() {
    const category = getRandomEnum(ProjectCategory);
    const stage = getRandomEnum(ProjectStage);
    const location = this.generateLocation();
    const budget = this.generateBudget();
    const contractor = this.generateContractor();
    
    const projectId = this.generateProjectId(category, location.circle);
    const projectName = this.generateProjectName(category, location);
    
    const physicalProgress = getRandomFloat(
      stage === ProjectStage.CONCEPTUALIZATION ? 5 : (stage * 10),
      stage === ProjectStage.DLP_OM ? 100 : ((stage + 1) * 10)
    );
    
    const financialProgress = Math.max(0, physicalProgress - getRandomFloat(0, 10));
    
    const plannedStart = getRandomDate(new Date(2023, 0, 1), new Date(2024, 11, 31));
    const duration = getRandomInt(6, 48); // 6-48 months
    const plannedCompletion = new Date(plannedStart);
    plannedCompletion.setMonth(plannedCompletion.getMonth() + duration);
    
    const delayDays = stage >= ProjectStage.CONSTRUCTION ? getRandomInt(0, 90) : 0;
    const projectedCompletion = new Date(plannedCompletion);
    projectedCompletion.setDate(projectedCompletion.getDate() + delayDays);
    
    // Calculate CE Score
    const qualityScore = getRandomFloat(70, 95);
    const ceScore = Math.round(
      (physicalProgress * 0.3) + 
      (financialProgress * 0.2) + 
      (qualityScore * 0.2) + 
      (contractor.rating * 15) + 
      ((delayDays === 0 ? 100 : Math.max(0, 100 - delayDays)) * 0.15)
    );
    
    // Determine risk level
    let riskLevel = RiskLevel.LOW;
    if (delayDays > 60 || budget > 100000000000) riskLevel = RiskLevel.HIGH;
    else if (delayDays > 30 || budget > 50000000000) riskLevel = RiskLevel.MEDIUM;
    if (delayDays > 90) riskLevel = RiskLevel.CRITICAL;
    
    return {
      projectId,
      projectName,
      category,
      subCategory: this.getSubCategoryForCategory(category),
      currentStage: stage,
      stageStartDate: formatDate(getRandomDate(plannedStart, new Date())),
      totalBudget: budget,
      physicalProgress: Math.round(physicalProgress * 10) / 10,
      financialProgress: Math.round(financialProgress * 10) / 10,
      ceScore,
      riskLevel,
      location,
      contractor,
      consultant: stage >= ProjectStage.DPR_APPROVALS ? this.generateConsultant() : undefined,
      timeline: {
        plannedStart: formatDate(plannedStart),
        actualStart: formatDate(getRandomDate(plannedStart, new Date(plannedStart.getTime() + 45 * 24 * 60 * 60 * 1000))),
        plannedCompletion: formatDate(plannedCompletion),
        projectedCompletion: formatDate(projectedCompletion),
        delayDays,
        monsoonBuffer: Math.floor(duration * 0.2 * 30),
        daysInCurrentStage: getRandomInt(1, 90)
      },
      financial: {
        contractValue: budget,
        originalEstimate: Math.floor(budget * getRandomFloat(0.95, 1.05)),
        paidTillDate: Math.floor(budget * financialProgress / 100),
        pendingBills: getRandomInt(0, 4),
        lastPaymentDate: formatDate(getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date())),
        mobilizationAdvance: Math.floor(budget * 0.1),
        retentionAmount: Math.floor(budget * 0.05),
        variations: [],
        costOverrun: getRandomFloat(-5, 15),
        budgetUtilization: financialProgress
      },
      quality: {
        overallScore: qualityScore,
        testsCompleted: stage >= ProjectStage.CONSTRUCTION ? getRandomInt(20, 200) : 0,
        testsPassed: 0, // Will be calculated
        testsPassRate: getRandomFloat(85, 98),
        ncrsOpen: getRandomInt(0, 5),
        ncrsClosed: getRandomInt(5, 35),
        lastAuditScore: contractor.rating + getRandomFloat(-0.2, 0.2),
        lastAuditDate: formatDate(getRandomDate(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date())),
        thirdPartyAudit: stage >= ProjectStage.CONSTRUCTION && Math.random() > 0.3,
        materialTestingLab: getRandomFromArray(['HMDA Lab', 'NABL Certified Lab', 'Third Party Lab'])
      },
      stakeholders: {
        politicalInterest: budget > 100000000000 ? 'CM' : (budget > 50000000000 ? 'MINISTER' : 'ROUTINE'),
        publicSentiment: getRandomEnum(['VERY_POSITIVE', 'POSITIVE', 'NEUTRAL', 'NEGATIVE']),
        mediaAttention: budget > 50000000000 ? 'HIGH' : (budget > 10000000000 ? 'MEDIUM' : 'LOW'),
        complaintsThisMonth: getRandomInt(0, 10),
        appreciationLetters: getRandomInt(0, 5),
        rtiQueries: getRandomInt(0, 3),
        socialMediaMentions: getRandomInt(0, 50)
      },
      realWorldFactors: {
        monsoonImpact: category === ProjectCategory.INFRASTRUCTURE ? (Math.random() > 0.3 ? 'HIGH' : 'MEDIUM') : 'LOW',
        landIssues: getRandomEnum(['CLEAR', 'MINOR_ISSUES', 'COURT_CASE', 'ACQUISITION_PENDING']),
        utilityShifting: getRandomFromArray(['COMPLETED', 'IN_PROGRESS', 'PENDING']),
        environmentalClearance: Math.random() > 0.7 ? 'PENDING' : 'OBTAINED',
        heritageImpact: location.ward === 'Charminar' || Math.random() > 0.9,
        trafficImpact: category === ProjectCategory.INFRASTRUCTURE ? (Math.random() > 0.4 ? 'HIGH' : 'MEDIUM') : 'LOW'
      },
      milestones: this.generateMilestones(stage),
      createdDate: formatDate(new Date()),
      lastUpdated: new Date().toISOString(),
      createdBy: 'CE Office',
      tags: [category, stage >= ProjectStage.CONSTRUCTION ? 'ONGOING' : 'PLANNING'],
      priority: this.calculatePriority(riskLevel, budget, stage)
    };
  }

  generateBudget() {
    const ranges = [
      [500000000, 2000000000], // Small: ₹5-20 Cr
      [2000000000, 20000000000], // Medium: ₹20-200 Cr  
      [20000000000, 100000000000], // Large: ₹200-1000 Cr
      [100000000000, 500000000000] // Mega: ₹1000-5000 Cr
    ];
    
    const range = getRandomFromArray(ranges);
    return getRandomInt(range[0], range[1]);
  }

  generateLocation() {
    const circles = Object.keys(HMDA_LOCATIONS);
    const circle = getRandomFromArray(circles);
    const locations = HMDA_LOCATIONS[circle];
    const location = getRandomFromArray(locations);

    return {
      circle,
      ward: location.ward,
      mandal: location.mandal,
      locality: location.locality,
      pincode: location.pincode,
      coordinates: {
        latitude: 17.3850 + (Math.random() - 0.5) * 0.5,
        longitude: 78.4867 + (Math.random() - 0.5) * 0.5
      }
    };
  }

  generateContractor() {
    const contractor = getRandomFromArray(REAL_CONTRACTORS);
    return {
      name: contractor.name,
      grade: contractor.grade,
      performanceRating: contractor.rating + getRandomFloat(-0.2, 0.2),
      currentLoad: getRandomInt(40, 80),
      safetyRecord: getRandomInt(50, 250),
      completedProjects: getRandomInt(10, 60),
      ongoingProjects: getRandomInt(1, 9),
      blacklisted: false,
      specialization: contractor.specialization
    };
  }

  generateConsultant() {
    const consultants = [
      'M/s AECOM India', 'M/s STUP Consultants', 'M/s COWI India', 'M/s Aarvee Associates',
      'M/s Engineering Projects (India) Limited', 'M/s Louis Berger', 'M/s Jacobs India', 'M/s RAMBOLL India'
    ];
    return getRandomFromArray(consultants);
  }

  generateProjectId(category, circle) {
    return `${category}-${this.currentYear}-${String(this.projectCounter++).padStart(3, '0')}-${circle}`;
  }

  generateProjectName(category, location) {
    const prefixes = {
      [ProjectCategory.INFRASTRUCTURE]: ['Elevated Corridor', 'Flyover', 'Bridge', 'Road Widening'],
      [ProjectCategory.URBAN_DEVELOPMENT]: ['Township Development', 'Area Development', 'Complex'],
      [ProjectCategory.ENVIRONMENTAL]: ['Lake Rejuvenation', 'Eco Park', 'Green Belt'],
      [ProjectCategory.SMART_CITY]: ['Smart Infrastructure', 'Digital Hub', 'Command Center']
    };
    
    const prefix = getRandomFromArray(prefixes[category]);
    return `${location.locality} ${prefix} - Phase ${getRandomInt(1, 3)}`;
  }

  getSubCategoryForCategory(category) {
    const mapping = {
      [ProjectCategory.INFRASTRUCTURE]: [ProjectSubCategory.ROADS_TRANSPORT, ProjectSubCategory.WATER_SEWERAGE, ProjectSubCategory.POWER_UTILITIES],
      [ProjectCategory.URBAN_DEVELOPMENT]: [ProjectSubCategory.TOWNSHIP_DEVELOPMENT, ProjectSubCategory.AREA_DEVELOPMENT, ProjectSubCategory.PUBLIC_AMENITIES],
      [ProjectCategory.ENVIRONMENTAL]: [ProjectSubCategory.GREEN_INFRASTRUCTURE, ProjectSubCategory.POLLUTION_CONTROL],
      [ProjectCategory.SMART_CITY]: [ProjectSubCategory.DIGITAL_INFRASTRUCTURE, ProjectSubCategory.INTELLIGENT_SYSTEMS]
    };
    
    const options = mapping[category];
    return getRandomFromArray(options);
  }

  generateMilestones(stage) {
    const milestones = [];
    const stageNames = [
      'Project Sanction', 'DPR Approval', 'Tender Award', 'Site Handover',
      '25% Physical Progress', '50% Physical Progress', '75% Physical Progress',
      'Testing Complete', 'Project Handover'
    ];

    stageNames.forEach((name, index) => {
      milestones.push({
        id: `M${String(index + 1).padStart(2, '0')}`,
        name,
        plannedDate: formatDate(new Date(2023, index * 2, 1)),
        actualDate: index < stage ? formatDate(new Date(2023, index * 2, getRandomInt(1, 15))) : undefined,
        status: index < stage ? 'COMPLETED' : (index === stage ? 'IN_PROGRESS' : 'PENDING'),
        importance: [0, 1, 2, 3, 8].includes(index) ? 'CRITICAL' : 'HIGH',
        dependencies: index > 0 ? [`M${String(index).padStart(2, '0')}`] : []
      });
    });

    return milestones;
  }

  calculatePriority(riskLevel, budget, stage) {
    if (riskLevel === RiskLevel.CRITICAL) return 'CRITICAL';
    if (budget > 100000000000 || riskLevel === RiskLevel.HIGH) return 'HIGH';
    if (budget > 10000000000 || stage >= ProjectStage.CONSTRUCTION) return 'MEDIUM';
    return 'LOW';
  }

  generateDataset(count = 150) {
    const projects = [];
    for (let i = 0; i < count; i++) {
      projects.push(this.generateProject());
    }
    return projects;
  }
}

// Main generation function
async function generateCompleteDataset() {
  console.log('🏗️  HMDA Demo Dataset Generation');
  console.log('='.repeat(50));
  
  const startTime = Date.now();
  
  const generator = new SimpleHMDAGenerator();
  
  console.log('📊 Generating 150 realistic HMDA projects...');
  const projects = generator.generateDataset(150);
  
  // Fix quality test calculations
  projects.forEach(project => {
    const testsCompleted = project.quality.testsCompleted;
    const passRate = project.quality.testsPassRate;
    project.quality.testsPassed = Math.floor(testsCompleted * passRate / 100);
  });
  
  console.log('✅ Generated projects successfully');
  
  // Calculate statistics
  const totalBudget = projects.reduce((sum, p) => sum + p.totalBudget, 0);
  const avgProgress = projects.reduce((sum, p) => sum + p.physicalProgress, 0) / projects.length;
  const avgScore = projects.reduce((sum, p) => sum + p.ceScore, 0) / projects.length;
  
  const statistics = {
    overview: {
      totalProjects: projects.length,
      totalBudget,
      avgBudget: totalBudget / projects.length,
      avgProgress,
      avgScore
    },
    distribution: {
      byStage: getDistribution(projects, 'currentStage'),
      byCategory: getDistribution(projects, 'category'),
      byRisk: getDistribution(projects, 'riskLevel'),
      byCircle: getDistribution(projects, p => p.location.circle)
    }
  };
  
  // Main dataset
  const mainDataset = {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalProjects: projects.length,
      version: '1.0.0',
      description: 'HMDA Demo Dataset - Realistic project data for Chief Engineer dashboard demonstration',
      generationTime: Date.now() - startTime + 'ms'
    },
    statistics,
    projects
  };
  
  // Generate sample projects
  const sampleProjects = projects.slice(0, 5);
  
  console.log('💾 Writing dataset files...');
  
  // Write main dataset
  fs.writeFileSync(
    './hmda-projects-150.json',
    JSON.stringify(mainDataset, null, 2)
  );
  
  // Write sample projects
  fs.writeFileSync(
    './sample-projects-5.json',
    JSON.stringify({
      metadata: {
        generatedAt: new Date().toISOString(),
        description: 'Sample projects representing different categories and complexities'
      },
      projects: sampleProjects
    }, null, 2)
  );
  
  // Generate CSV
  const csvData = generateCSV(projects);
  fs.writeFileSync('./hmda-projects.csv', csvData);
  
  const endTime = Date.now();
  
  console.log('\n🎉 Dataset Generation Complete!');
  console.log('='.repeat(50));
  console.log(`⏱️  Total Time: ${endTime - startTime}ms`);
  console.log(`📊 Projects Generated: ${projects.length}`);
  console.log(`💰 Total Budget: ₹${(totalBudget / 10000000000).toFixed(1)} Thousand Crores`);
  console.log(`📈 Average Progress: ${avgProgress.toFixed(1)}%`);
  console.log(`✅ Average CE Score: ${avgScore.toFixed(1)}/100`);
  
  console.log('\n📁 Files Generated:');
  console.log('   • hmda-projects-150.json (Complete dataset)');
  console.log('   • sample-projects-5.json (Sample projects)');
  console.log('   • hmda-projects.csv (Excel import)');
  
  console.log('\n🚀 Ready for dashboard demonstration!');
}

function getDistribution(projects, key) {
  const distribution = {};
  
  projects.forEach(project => {
    const value = typeof key === 'function' ? key(project) : project[key];
    const stringValue = String(value);
    distribution[stringValue] = (distribution[stringValue] || 0) + 1;
  });
  
  return distribution;
}

function generateCSV(projects) {
  const headers = [
    'Project ID', 'Project Name', 'Category', 'Sub Category', 'Current Stage',
    'Total Budget (₹)', 'Physical Progress (%)', 'Financial Progress (%)',
    'CE Score', 'Risk Level', 'Circle', 'Ward', 'Locality',
    'Contractor', 'Contractor Grade', 'Planned Start', 'Planned Completion',
    'Delay Days', 'Quality Score', 'Priority'
  ];
  
  const rows = projects.map(p => [
    p.projectId,
    `"${p.projectName}"`,
    p.category,
    p.subCategory,
    p.currentStage,
    p.totalBudget,
    p.physicalProgress,
    p.financialProgress,
    p.ceScore,
    p.riskLevel,
    p.location.circle,
    `"${p.location.ward}"`,
    `"${p.location.locality}"`,
    p.contractor ? `"${p.contractor.name}"` : '',
    p.contractor ? p.contractor.grade : '',
    p.timeline.plannedStart,
    p.timeline.plannedCompletion,
    p.timeline.delayDays,
    p.quality.overallScore.toFixed(1),
    p.priority
  ]);
  
  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

// Run the generation
generateCompleteDataset().catch(console.error);