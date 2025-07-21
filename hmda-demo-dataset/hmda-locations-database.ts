// HMDA Locations Database - Real villages, mandals, and areas under HMDA jurisdiction
// Based on actual HMDA master data and jurisdiction areas

import { Circle } from './enhanced-project-schema';

export interface HMDALocation {
  village: string;
  mandal: string;
  district: string;
  circle: Circle;
  assemblyConstituency?: string;
  landmarks?: string[];
  pincode?: string;
}

// Real HMDA locations organized by circle
export const HMDALocationsDatabase: HMDALocation[] = [
  // Circle 1 - Hyderabad Core
  {
    village: 'Jubilee Hills',
    mandal: 'Jubilee Hills',
    district: 'Hyderabad',
    circle: 'C1' as Circle,
    assemblyConstituency: 'Jubilee Hills',
    landmarks: ['Road No. 36', 'KBR Park', 'Jubilee Hills Check Post'],
    pincode: '500033'
  },
  {
    village: 'Banjara Hills',
    mandal: 'Banjara Hills',
    district: 'Hyderabad',
    circle: 'C1' as Circle,
    assemblyConstituency: 'Banjara Hills',
    landmarks: ['Road No. 12', 'City Center Mall', 'Banjara Hills Police Station'],
    pincode: '500034'
  },
  {
    village: 'Madhapur',
    mandal: 'Serilingampally',
    district: 'Hyderabad',
    circle: 'C1' as Circle,
    assemblyConstituency: 'Serilingampally',
    landmarks: ['Hitech City', 'Cyber Towers', 'Mindspace'],
    pincode: '500081'
  },
  {
    village: 'Gachibowli',
    mandal: 'Serilingampally',
    district: 'Hyderabad',
    circle: 'C1' as Circle,
    assemblyConstituency: 'Serilingampally',
    landmarks: ['DLF', 'ISB', 'Gachibowli Stadium'],
    pincode: '500032'
  },
  {
    village: 'Kondapur',
    mandal: 'Serilingampally',
    district: 'Hyderabad',
    circle: 'C1' as Circle,
    assemblyConstituency: 'Serilingampally',
    landmarks: ['Botanical Garden', 'Kothaguda Junction', 'Hitec City'],
    pincode: '500084'
  },

  // Circle 2 - Rangareddy
  {
    village: 'Nanakramguda',
    mandal: 'Serilingampally',
    district: 'Rangareddy',
    circle: 'C2' as Circle,
    assemblyConstituency: 'Serilingampally',
    landmarks: ['Financial District', 'IT Corridor', 'Nanakramguda Circle'],
    pincode: '500032'
  },
  {
    village: 'Kokapet',
    mandal: 'Rajendranagar',
    district: 'Rangareddy',
    circle: 'C2' as Circle,
    assemblyConstituency: 'Rajendranagar',
    landmarks: ['Neopolis', 'Kokapet Metro Station', 'ORR Exit 14'],
    pincode: '500075'
  },
  {
    village: 'Narsingi',
    mandal: 'Rajendranagar',
    district: 'Rangareddy',
    circle: 'C2' as Circle,
    assemblyConstituency: 'Rajendranagar',
    landmarks: ['Narsingi Cross Roads', 'ORR', 'TSPA'],
    pincode: '500075'
  },
  {
    village: 'Puppalaguda',
    mandal: 'Rajendranagar',
    district: 'Rangareddy',
    circle: 'C2' as Circle,
    assemblyConstituency: 'Rajendranagar',
    landmarks: ['Manikonda', 'ORR Junction', 'Puppalaguda Lake'],
    pincode: '500089'
  },
  {
    village: 'Tellapur',
    mandal: 'Ramachandrapuram',
    district: 'Rangareddy',
    circle: 'C2' as Circle,
    assemblyConstituency: 'Serilingampally',
    landmarks: ['Tellapur Road', 'NALSAR University', 'Tellapur Lake'],
    pincode: '502032'
  },

  // Circle 3 - Medchal-Malkajgiri
  {
    village: 'Kompally',
    mandal: 'Quthbullapur',
    district: 'Medchal-Malkajgiri',
    circle: 'C3' as Circle,
    assemblyConstituency: 'Quthbullapur',
    landmarks: ['IIT Campus', 'Kompally Circle', 'NH44'],
    pincode: '500100'
  },
  {
    village: 'Nizampet',
    mandal: 'Quthbullapur',
    district: 'Medchal-Malkajgiri',
    circle: 'C3' as Circle,
    assemblyConstituency: 'Kukatpally',
    landmarks: ['Nizampet X Roads', 'JNTU', 'Nizampet Municipal Office'],
    pincode: '500090'
  },
  {
    village: 'Miyapur',
    mandal: 'Serilingampally',
    district: 'Medchal-Malkajgiri',
    circle: 'C3' as Circle,
    assemblyConstituency: 'Serilingampally',
    landmarks: ['Miyapur Metro Station', 'Miyapur X Roads', 'Allwyn Colony'],
    pincode: '500049'
  },
  {
    village: 'Bachupally',
    mandal: 'Quthbullapur',
    district: 'Medchal-Malkajgiri',
    circle: 'C3' as Circle,
    assemblyConstituency: 'Quthbullapur',
    landmarks: ['Bachupally X Roads', 'Pragathi Nagar', 'Mall of Asia'],
    pincode: '500090'
  },
  {
    village: 'Dundigal',
    mandal: 'Dundigal-Gandimaisamma',
    district: 'Medchal-Malkajgiri',
    circle: 'C3' as Circle,
    assemblyConstituency: 'Medchal',
    landmarks: ['Dundigal Police Academy', 'Air Force Academy Road', 'ORR'],
    pincode: '500043'
  },
  {
    village: 'Uppal',
    mandal: 'Uppal',
    district: 'Medchal-Malkajgiri',
    circle: 'C3' as Circle,
    assemblyConstituency: 'Uppal',
    landmarks: ['Uppal Ring Road', 'Uppal Metro Station', 'Survey of India'],
    pincode: '500039'
  },
  {
    village: 'Nagole',
    mandal: 'Uppal',
    district: 'Medchal-Malkajgiri',
    circle: 'C3' as Circle,
    assemblyConstituency: 'LB Nagar',
    landmarks: ['Nagole Metro Station', 'ORR Exit', 'Nagole Lake'],
    pincode: '500068'
  },

  // Circle 4 - Sangareddy
  {
    village: 'Patancheru',
    mandal: 'Patancheru',
    district: 'Sangareddy',
    circle: 'C4' as Circle,
    assemblyConstituency: 'Patancheru',
    landmarks: ['BHEL', 'Patancheru Bus Stand', 'Industrial Area'],
    pincode: '502319'
  },
  {
    village: 'Gummadidala',
    mandal: 'Jinnaram',
    district: 'Sangareddy',
    circle: 'C4' as Circle,
    assemblyConstituency: 'Patancheru',
    landmarks: ['IDA Gummadidala', 'ORR', 'Gummadidala Lake'],
    pincode: '502313'
  },
  {
    village: 'Ameenpur',
    mandal: 'Ameenpur',
    district: 'Sangareddy',
    circle: 'C4' as Circle,
    assemblyConstituency: 'Patancheru',
    landmarks: ['Ameenpur Lake', 'Ameenpur Cross Roads', 'Miyapur Road'],
    pincode: '502032'
  },
  {
    village: 'Chandanagar',
    mandal: 'Serilingampally',
    district: 'Sangareddy',
    circle: 'C4' as Circle,
    assemblyConstituency: 'Serilingampally',
    landmarks: ['Chandanagar Circle', 'Lingampally Station', 'Chanda Nagar'],
    pincode: '500050'
  },
  {
    village: 'Kollur',
    mandal: 'Ramachandrapuram',
    district: 'Sangareddy',
    circle: 'C4' as Circle,
    assemblyConstituency: 'Serilingampally',
    landmarks: ['Kollur ORR Exit', 'Velimela', 'Kollur Village'],
    pincode: '502300'
  },

  // Circle 5 - Vikarabad
  {
    village: 'Shamshabad',
    mandal: 'Shamshabad',
    district: 'Rangareddy',
    circle: 'C5' as Circle,
    assemblyConstituency: 'Rajendranagar',
    landmarks: ['RGI Airport', 'Airport Road', 'Shamshabad Bus Stand'],
    pincode: '501218'
  },
  {
    village: 'Tukkuguda',
    mandal: 'Rajendranagar',
    district: 'Rangareddy',
    circle: 'C5' as Circle,
    assemblyConstituency: 'Serilingampally',
    landmarks: ['Tukkuguda Junction', 'Exit 17 ORR', 'Electronics SEZ'],
    pincode: '501359'
  },
  {
    village: 'Shadnagar',
    mandal: 'Shadnagar',
    district: 'Rangareddy',
    circle: 'C5' as Circle,
    assemblyConstituency: 'Shadnagar',
    landmarks: ['Shadnagar Town', 'NH44', 'Bus Stand'],
    pincode: '509216'
  },
  {
    village: 'Bongulur',
    mandal: 'Ibrahimpatnam',
    district: 'Rangareddy',
    circle: 'C5' as Circle,
    assemblyConstituency: 'Ibrahimpatnam',
    landmarks: ['Bongulur Village', 'Ibrahimpatnam Road', 'Lake'],
    pincode: '501510'
  },

  // Additional locations from master data
  {
    village: 'Inmulnarva',
    mandal: 'Rangareddy',
    district: 'Rangareddy',
    circle: 'C2' as Circle,
    assemblyConstituency: 'Chevella',
    landmarks: ['Inmulnarva Village', 'Layout Area'],
    pincode: '501503'
  },
  {
    village: 'Lemoor',
    mandal: 'Kandukur',
    district: 'Rangareddy',
    circle: 'C2' as Circle,
    assemblyConstituency: 'Kandukur',
    landmarks: ['Lemoor Village', 'Layout Area'],
    pincode: '501359'
  },
  {
    village: 'Thorrur',
    mandal: 'Abdullapurmet',
    district: 'Rangareddy',
    circle: 'C5' as Circle,
    assemblyConstituency: 'Ibrahimpatnam',
    landmarks: ['Thorrur Village', 'Sy.No.383/1'],
    pincode: '501505'
  },
  {
    village: 'Kurmalguda',
    mandal: 'Balapur',
    district: 'Rangareddy',
    circle: 'C5' as Circle,
    assemblyConstituency: 'LB Nagar',
    landmarks: ['Kurmalguda Village', 'Sy.No.46/p'],
    pincode: '500079'
  },
  {
    village: 'Hakimpet',
    mandal: 'Shaikpet',
    district: 'Hyderabad',
    circle: 'C1' as Circle,
    assemblyConstituency: 'Secunderabad Cantonment',
    landmarks: ['Air Force Station', 'HUDA Heights', 'Hakimpet Road'],
    pincode: '500014'
  },
  {
    village: 'Bhongir',
    mandal: 'Bhongir',
    district: 'Yadadri Bhuvanagiri',
    circle: 'C3' as Circle,
    assemblyConstituency: 'Bhongir',
    landmarks: ['Bhongir Fort', 'Tank Bund', 'Bhongir Town'],
    pincode: '508116'
  }
];

// Project type-specific location preferences
export const ProjectTypeLocationPreferences = {
  LAYOUTS: ['Inmulnarva', 'Lemoor', 'Thorrur', 'Kurmalguda', 'Hakimpet', 'Tellapur', 'Kokapet'],
  ROADS: ['Gachibowli', 'Madhapur', 'Jubilee Hills', 'Banjara Hills', 'Miyapur', 'Uppal', 'Kompally'],
  PARKS: ['Jubilee Hills', 'Banjara Hills', 'Kondapur', 'Narsingi', 'Nizampet', 'Bhongir'],
  LAKES: ['Nizampet', 'Nagole', 'Puppalaguda', 'Tellapur', 'Ameenpur', 'Kollur', 'Bhongir'],
  FLYOVERS: ['Gachibowli', 'Madhapur', 'Miyapur', 'Uppal', 'Kompally', 'Patancheru', 'Shamshabad'],
  BUILDINGS: ['Madhapur', 'Gachibowli', 'Kokapet', 'Nanakramguda', 'Kompally', 'Patancheru'],
  INFRASTRUCTURE: ['Financial District', 'Hitech City', 'Shamshabad', 'Patancheru', 'Kompally']
};

// Realistic project name templates based on work type
export const ProjectNameTemplates = {
  LAYOUTS: [
    '{village} Layout Development',
    '{village} Residential Layout',
    'Infrastructure Development at {village}',
    '{village} Township Development',
    '{village} Layout - Phase {phase}'
  ],
  ROADS: [
    '{locality} to {landmark} Road Widening',
    '{village} Main Road Development',
    '{locality} Road Improvement Works',
    '{village} Ring Road Construction',
    '{landmark} Junction Improvement'
  ],
  PARKS: [
    '{village} Urban Park Development',
    '{locality} Green Park',
    '{village} Eco Park - Phase {phase}',
    '{landmark} Park Beautification',
    '{village} Children\'s Park'
  ],
  LAKES: [
    '{village} Lake Rejuvenation',
    '{village} Lake Conservation Project',
    '{village} Tank Restoration',
    '{village} Lake Beautification',
    '{village} Water Body Development'
  ],
  FLYOVERS: [
    '{village} Flyover Construction',
    '{landmark} Grade Separator',
    '{locality} Elevated Corridor',
    '{village} Junction Flyover',
    '{landmark} to {landmark2} Flyover'
  ],
  BUILDINGS: [
    '{village} Community Center',
    '{locality} Office Complex',
    '{village} Convention Center',
    'HMDA Office at {village}',
    '{village} Skill Development Center'
  ],
  INFRASTRUCTURE: [
    '{village} Smart Infrastructure',
    '{locality} Digital Hub',
    '{village} IoT Network',
    '{landmark} Command Center',
    '{village} Smart City Infrastructure'
  ]
};

// Work descriptions based on type
export const WorkDescriptionTemplates = {
  LAYOUTS: 'Providing Infrastructure facilities for the proposed layout at {village} ({surveyNo}), {mandal} (M), {district} District',
  ROADS: 'Construction and improvement of road from {locality} to {landmark} including widening, drainage and street lighting in {village}, {mandal}',
  PARKS: 'Development and beautification of urban park at {village} including walking tracks, children play area and landscaping',
  LAKES: 'Rejuvenation and beautification of {village} lake including desilting, bund strengthening and pathway development',
  FLYOVERS: 'Construction of grade separator/flyover at {landmark} junction in {village} to ease traffic congestion',
  BUILDINGS: 'Construction of {buildingType} at {village}, {mandal} including all amenities and infrastructure',
  INFRASTRUCTURE: 'Development of smart city infrastructure including {infraType} at {village}, {mandal}'
};

// Helper function to get random location for a project type
export function getLocationForProjectType(projectType: string): HMDALocation {
  const preferredVillages = ProjectTypeLocationPreferences[projectType as keyof typeof ProjectTypeLocationPreferences] || [];
  const matchingLocations = HMDALocationsDatabase.filter(loc => 
    preferredVillages.includes(loc.village)
  );
  
  if (matchingLocations.length > 0) {
    return matchingLocations[Math.floor(Math.random() * matchingLocations.length)];
  }
  
  // Fallback to any location
  return HMDALocationsDatabase[Math.floor(Math.random() * HMDALocationsDatabase.length)];
}

// Helper function to generate survey numbers
export function generateSurveyNumbers(count: number = 1): string[] {
  const surveyNumbers: string[] = [];
  const baseNumber = Math.floor(Math.random() * 500) + 100;
  
  for (let i = 0; i < count; i++) {
    const number = baseNumber + i;
    const suffix = Math.random() > 0.7 ? `/${Math.floor(Math.random() * 5) + 1}` : '';
    const part = Math.random() > 0.8 ? ['A', 'B', 'C', 'p'][Math.floor(Math.random() * 4)] : '';
    surveyNumbers.push(`${number}${suffix}${part}`);
  }
  
  return surveyNumbers;
}

// Validate if a location exists in HMDA jurisdiction
export function isValidHMDALocation(village: string, mandal?: string): boolean {
  return HMDALocationsDatabase.some(loc => 
    loc.village === village && (!mandal || loc.mandal === mandal)
  );
}

// Get all unique villages
export function getAllVillages(): string[] {
  return [...new Set(HMDALocationsDatabase.map(loc => loc.village))];
}

// Get all unique mandals
export function getAllMandals(): string[] {
  return [...new Set(HMDALocationsDatabase.map(loc => loc.mandal))];
}

// Get locations by circle
export function getLocationsByCircle(circle: Circle): HMDALocation[] {
  return HMDALocationsDatabase.filter(loc => loc.circle === circle);
}