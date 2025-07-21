// HMDA Project Name Generator - Creates realistic project names based on actual patterns
import { 
  HMDALocation, 
  HMDALocationsDatabase,
  ProjectNameTemplates,
  WorkDescriptionTemplates,
  getLocationForProjectType,
  generateSurveyNumbers,
  getAllVillages
} from './hmda-locations-database';
import { WorkType, ProjectCategory, ProjectSubCategory } from './enhanced-project-schema';

// Map categories and subcategories to work types
const CategoryToWorkType: Record<string, string> = {
  'INFRA-RT': 'ROADS',
  'INFRA-WS': 'INFRASTRUCTURE',
  'INFRA-PU': 'INFRASTRUCTURE',
  'URBAN-TD': 'LAYOUTS',
  'URBAN-AD': 'LAYOUTS',
  'URBAN-PA': 'BUILDINGS',
  'ENV-GI': 'PARKS',
  'ENV-PC': 'LAKES',
  'SMART-DI': 'INFRASTRUCTURE',
  'SMART-IS': 'INFRASTRUCTURE'
};

// Building types for variety
const BuildingTypes = [
  'Community Center',
  'Convention Center',
  'Office Complex',
  'Skill Development Center',
  'Sports Complex',
  'Cultural Center',
  'Health Center'
];

// Infrastructure types
const InfrastructureTypes = [
  'IoT sensors and connectivity',
  'smart street lighting',
  'traffic management systems',
  'digital kiosks',
  'surveillance network',
  'smart parking systems'
];

// Phase numbers for multi-phase projects
const Phases = ['1', '2', '3', 'I', 'II', 'III', 'A', 'B'];

// Used names tracker to avoid duplicates
const usedProjectNames = new Set<string>();

export interface GeneratedProjectName {
  projectName: string;
  nameOfWork: string;
  location: HMDALocation;
  surveyNumbers: string[];
  workType: WorkType;
}

// Generate a unique project name
export function generateProjectName(
  category: ProjectCategory,
  subCategory: ProjectSubCategory,
  existingNames?: Set<string>
): GeneratedProjectName {
  const categoryKey = `${category}-${subCategory}`;
  const workTypeKey = CategoryToWorkType[categoryKey] || 'INFRASTRUCTURE';
  
  // Get appropriate location for this work type
  const location = getLocationForProjectType(workTypeKey);
  
  // Get name templates for this work type
  const templates = ProjectNameTemplates[workTypeKey as keyof typeof ProjectNameTemplates] || 
                   ProjectNameTemplates.INFRASTRUCTURE;
  
  let projectName = '';
  let attempts = 0;
  
  // Try to generate a unique name
  while (attempts < 50) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Get a second landmark/village for routes
    const villages = getAllVillages();
    const otherVillage = villages.filter(v => v !== location.village)[
      Math.floor(Math.random() * (villages.length - 1))
    ];
    
    // Replace placeholders
    projectName = template
      .replace('{village}', location.village)
      .replace('{locality}', location.landmarks?.[0] || location.village)
      .replace('{landmark}', location.landmarks?.[0] || location.village)
      .replace('{landmark2}', otherVillage)
      .replace('{phase}', Phases[Math.floor(Math.random() * Phases.length)]);
    
    // Check if name is unique
    if (!usedProjectNames.has(projectName) && 
        (!existingNames || !existingNames.has(projectName))) {
      usedProjectNames.add(projectName);
      break;
    }
    
    attempts++;
  }
  
  // Generate work description
  const surveyNumbers = generateSurveyNumbers(Math.floor(Math.random() * 3) + 1);
  const workDescTemplate = WorkDescriptionTemplates[workTypeKey as keyof typeof WorkDescriptionTemplates] || 
                          WorkDescriptionTemplates.INFRASTRUCTURE;
  
  const nameOfWork = workDescTemplate
    .replace('{village}', location.village)
    .replace('{locality}', location.landmarks?.[0] || location.village)
    .replace('{landmark}', location.landmarks?.[0] || location.village)
    .replace('{mandal}', location.mandal)
    .replace('{district}', location.district)
    .replace('{surveyNo}', `Sy.No.${surveyNumbers.join(', ')}`)
    .replace('{buildingType}', BuildingTypes[Math.floor(Math.random() * BuildingTypes.length)])
    .replace('{infraType}', InfrastructureTypes[Math.floor(Math.random() * InfrastructureTypes.length)]);
  
  return {
    projectName,
    nameOfWork,
    location,
    surveyNumbers,
    workType: workTypeKey as WorkType
  };
}

// Batch generate unique project names
export function generateBatchProjectNames(
  count: number,
  categoryDistribution?: Record<string, number>
): GeneratedProjectName[] {
  const generatedNames: GeneratedProjectName[] = [];
  
  // Default category distribution if not provided
  const distribution = categoryDistribution || {
    'INFRA-RT': 20,  // Roads/Transport
    'INFRA-WS': 10,  // Water/Sewerage
    'URBAN-TD': 25,  // Township/Layouts
    'URBAN-PA': 15,  // Public Amenities
    'ENV-GI': 20,    // Green Infrastructure
    'ENV-PC': 10,    // Lakes
    'SMART-DI': 10,  // Digital Infrastructure
    'SMART-IS': 10   // Intelligent Systems
  };
  
  // Generate names for each category
  for (const [categoryKey, targetCount] of Object.entries(distribution)) {
    const [category, subCategory] = categoryKey.split('-');
    
    for (let i = 0; i < targetCount && generatedNames.length < count; i++) {
      const generated = generateProjectName(
        category as ProjectCategory,
        subCategory as ProjectSubCategory
      );
      generatedNames.push(generated);
    }
  }
  
  // Fill remaining with random categories if needed
  while (generatedNames.length < count) {
    const categories = Object.keys(distribution);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const [category, subCategory] = randomCategory.split('-');
    
    const generated = generateProjectName(
      category as ProjectCategory,
      subCategory as ProjectSubCategory
    );
    generatedNames.push(generated);
  }
  
  return generatedNames;
}

// Update existing project with realistic name
export function updateProjectWithRealisticName(
  project: any,
  category: ProjectCategory,
  subCategory: ProjectSubCategory
): any {
  const generated = generateProjectName(category, subCategory);
  
  return {
    ...project,
    projectName: generated.projectName,
    nameOfWork: generated.nameOfWork,
    workType: generated.workType,
    location: {
      ...project.location,
      village: generated.location.village,
      mandal: generated.location.mandal,
      ward: generated.location.village, // Use village as ward for consistency
      locality: generated.location.landmarks?.[0] || generated.location.village
    },
    workLocation: {
      surveyNumbers: generated.surveyNumbers,
      village: generated.location.village,
      mandal: generated.location.mandal,
      district: generated.location.district,
      assemblyConstituency: generated.location.assemblyConstituency,
      landmarks: generated.location.landmarks
    }
  };
}

// Validate project names for duplicates
export function validateProjectNames(projects: any[]): {
  isValid: boolean;
  duplicates: string[];
  issues: string[];
} {
  const nameCount = new Map<string, number>();
  const duplicates: string[] = [];
  const issues: string[] = [];
  
  // Count occurrences
  projects.forEach(project => {
    const name = project.projectName;
    nameCount.set(name, (nameCount.get(name) || 0) + 1);
    
    // Validate name format
    if (!name || name.trim().length === 0) {
      issues.push(`Project ${project.projectId} has empty name`);
    }
    
    // Check for generic names
    if (name && (name.includes('Test') || name.includes('Demo') || name.includes('Sample'))) {
      issues.push(`Project ${project.projectId} has generic name: ${name}`);
    }
  });
  
  // Find duplicates
  nameCount.forEach((count, name) => {
    if (count > 1) {
      duplicates.push(`"${name}" appears ${count} times`);
    }
  });
  
  return {
    isValid: duplicates.length === 0 && issues.length === 0,
    duplicates,
    issues
  };
}

// Generate name statistics
export function generateNameStatistics(projects: any[]): {
  totalProjects: number;
  uniqueNames: number;
  villageDistribution: Record<string, number>;
  mandalDistribution: Record<string, number>;
  workTypeDistribution: Record<string, number>;
} {
  const uniqueNames = new Set(projects.map(p => p.projectName));
  const villageCount = new Map<string, number>();
  const mandalCount = new Map<string, number>();
  const workTypeCount = new Map<string, number>();
  
  projects.forEach(project => {
    // Village distribution
    const village = project.location?.village || project.workLocation?.village;
    if (village) {
      villageCount.set(village, (villageCount.get(village) || 0) + 1);
    }
    
    // Mandal distribution
    const mandal = project.location?.mandal || project.workLocation?.mandal;
    if (mandal) {
      mandalCount.set(mandal, (mandalCount.get(mandal) || 0) + 1);
    }
    
    // Work type distribution
    const workType = project.workType;
    if (workType) {
      workTypeCount.set(workType, (workTypeCount.get(workType) || 0) + 1);
    }
  });
  
  return {
    totalProjects: projects.length,
    uniqueNames: uniqueNames.size,
    villageDistribution: Object.fromEntries(villageCount),
    mandalDistribution: Object.fromEntries(mandalCount),
    workTypeDistribution: Object.fromEntries(workTypeCount)
  };
}

// Clear used names cache (for testing)
export function clearUsedNamesCache(): void {
  usedProjectNames.clear();
}