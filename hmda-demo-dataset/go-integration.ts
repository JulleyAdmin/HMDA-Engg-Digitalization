// Government Order (GO) Integration Module
// Generates realistic GO references and approval details based on HMDA patterns

import { ApprovalAuthority, GovernmentApproval } from './enhanced-project-schema';
import { format, subDays, parseISO } from 'date-fns';

// GO number patterns based on actual HMDA data
export interface GOPattern {
  prefix: string;
  minNumber: number;
  maxNumber: number;
  authority: ApprovalAuthority;
  usedForProjects: string[]; // Project types
}

// Real GO patterns from master data
const GOPatterns: GOPattern[] = [
  {
    prefix: 'G.O.Ms.No.',
    minNumber: 1,
    maxNumber: 250,
    authority: ApprovalAuthority.GOVT,
    usedForProjects: ['LAYOUTS', 'INFRASTRUCTURE', 'PARKS', 'LAKES']
  },
  {
    prefix: 'G.O.Rt.No.',
    minNumber: 500,
    maxNumber: 999,
    authority: ApprovalAuthority.GOVT,
    usedForProjects: ['ROADS', 'FLYOVERS', 'BUILDINGS']
  }
];

// Used GO numbers tracker to ensure uniqueness
const usedGONumbers = new Set<string>();

// Financial year calculation
export function getFinancialYear(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based
  
  // Financial year starts April 1
  if (month >= 3) { // April (3) to March (2)
    return `${year}-${(year + 1).toString().slice(2)}`;
  } else {
    return `${year - 1}-${year.toString().slice(2)}`;
  }
}

// Generate unique GO number
export function generateGONumber(projectType: string, existingNumbers?: Set<string>): string {
  // Find appropriate pattern for project type
  const pattern = GOPatterns.find(p => 
    p.usedForProjects.includes(projectType)
  ) || GOPatterns[0];
  
  let goNumber = '';
  let attempts = 0;
  
  while (attempts < 100) {
    const number = Math.floor(
      Math.random() * (pattern.maxNumber - pattern.minNumber + 1) + pattern.minNumber
    );
    goNumber = `${pattern.prefix}${number}`;
    
    // Check uniqueness
    if (!usedGONumbers.has(goNumber) && 
        (!existingNumbers || !existingNumbers.has(goNumber))) {
      usedGONumbers.add(goNumber);
      break;
    }
    attempts++;
  }
  
  return goNumber;
}

// Determine approval authority based on project budget
export function determineApprovalAuthority(budgetInCrores: number): ApprovalAuthority {
  if (budgetInCrores <= 10) {
    return ApprovalAuthority.EXECUTIVE_ENGINEER;
  } else if (budgetInCrores <= 25) {
    return ApprovalAuthority.DEPUTY_CHIEF_ENGINEER;
  } else if (budgetInCrores <= 50) {
    return ApprovalAuthority.CHIEF_ENGINEER;
  } else if (budgetInCrores <= 100) {
    return ApprovalAuthority.SECRETARY;
  } else if (budgetInCrores <= 200) {
    return ApprovalAuthority.METROPOLITAN_COMMISSIONER;
  } else if (budgetInCrores <= 500) {
    return ApprovalAuthority.GOVT;
  } else {
    return ApprovalAuthority.BOARD;
  }
}

// Generate GO date based on project stage and dates
export function generateGODate(
  projectStartDate: string,
  currentStage: number,
  stageStartDate?: string
): string {
  // GO should be before project start
  const startDate = parseISO(projectStartDate);
  
  // GO typically issued 30-90 days before project start
  const daysBeforeStart = Math.floor(Math.random() * 60) + 30;
  const goDate = subDays(startDate, daysBeforeStart);
  
  return format(goDate, 'yyyy-MM-dd');
}

// Generate AS (Administrative Sanction) file number
export function generateASFileNumber(
  divisionNumber: string,
  financialYear: string,
  projectId: string
): string {
  // Format: HMDA/DEV/CE/{Division}/{ProjectSeq}/{FY}
  const projectSeq = projectId.split('-')[2]; // Extract year from project ID
  return `HMDA/DEV/CE/${divisionNumber}/${projectSeq}/${financialYear}`;
}

// Generate complete Government Approval object
export function generateGovernmentApproval(
  project: any,
  workType: string
): GovernmentApproval {
  const budgetInCrores = project.totalBudget / 10000000; // Convert to crores
  const goDate = generateGODate(
    project.timeline?.plannedStart || '2024-01-01',
    project.currentStage,
    project.stageStartDate
  );
  
  const goDateObj = parseISO(goDate);
  const financialYear = getFinancialYear(goDateObj);
  
  return {
    goNumber: generateGONumber(workType),
    goDate: goDate,
    approvalAuthority: determineApprovalAuthority(budgetInCrores),
    fileNumber: generateASFileNumber(
      project.divisionNumber || 'VI',
      financialYear,
      project.projectId
    ),
    asFileNo: `AS/${project.projectId}/${financialYear}`,
    sanctionedAmount: Math.round(budgetInCrores * 1.05), // 5% higher than estimate typically
    financialYear: financialYear
  };
}

// Validate GO reference format
export function validateGOFormat(goNumber: string): boolean {
  // Check if it matches known patterns
  const validPatterns = [
    /^G\.O\.Ms\.No\.\d+$/,
    /^G\.O\.Rt\.No\.\d+$/,
    /^G\.O\.No\.\d+$/
  ];
  
  return validPatterns.some(pattern => pattern.test(goNumber));
}

// Validate GO date logic
export function validateGODate(
  goDate: string,
  projectStartDate: string,
  currentDate: string = new Date().toISOString()
): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  const go = parseISO(goDate);
  const start = parseISO(projectStartDate);
  const current = parseISO(currentDate);
  
  // GO should be before project start
  if (go >= start) {
    issues.push('GO date should be before project start date');
  }
  
  // GO should not be in future
  if (go > current) {
    issues.push('GO date cannot be in future');
  }
  
  // GO should not be more than 2 years before project
  const twoYearsBefore = subDays(start, 730);
  if (go < twoYearsBefore) {
    issues.push('GO date is too old (more than 2 years before project)');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}

// Batch generate GO approvals for multiple projects
export function generateBatchGOApprovals(
  projects: any[]
): Map<string, GovernmentApproval> {
  const goApprovals = new Map<string, GovernmentApproval>();
  
  projects.forEach(project => {
    const workType = project.workType || 'INFRASTRUCTURE';
    const goApproval = generateGovernmentApproval(project, workType);
    goApprovals.set(project.projectId, goApproval);
  });
  
  return goApprovals;
}

// Generate GO statistics
export function generateGOStatistics(projects: any[]): {
  totalGOs: number;
  uniqueGONumbers: number;
  authorityDistribution: Record<string, number>;
  financialYearDistribution: Record<string, number>;
  averageSanctionAmount: number;
  goNumberPatterns: Record<string, number>;
} {
  const goNumbers = new Set<string>();
  const authorityCount = new Map<string, number>();
  const fyCount = new Map<string, number>();
  const patterns = new Map<string, number>();
  let totalSanction = 0;
  let goCount = 0;
  
  projects.forEach(project => {
    if (project.governmentApproval) {
      const go = project.governmentApproval;
      
      // Count unique GO numbers
      if (go.goNumber) {
        goNumbers.add(go.goNumber);
        
        // Count patterns
        const patternType = go.goNumber.split('.No.')[0] + '.No.';
        patterns.set(patternType, (patterns.get(patternType) || 0) + 1);
      }
      
      // Count authorities
      if (go.approvalAuthority) {
        authorityCount.set(
          go.approvalAuthority,
          (authorityCount.get(go.approvalAuthority) || 0) + 1
        );
      }
      
      // Count financial years
      if (go.financialYear) {
        fyCount.set(go.financialYear, (fyCount.get(go.financialYear) || 0) + 1);
      }
      
      // Sum sanctions
      if (go.sanctionedAmount) {
        totalSanction += go.sanctionedAmount;
        goCount++;
      }
    }
  });
  
  return {
    totalGOs: goCount,
    uniqueGONumbers: goNumbers.size,
    authorityDistribution: Object.fromEntries(authorityCount),
    financialYearDistribution: Object.fromEntries(fyCount),
    averageSanctionAmount: goCount > 0 ? totalSanction / goCount : 0,
    goNumberPatterns: Object.fromEntries(patterns)
  };
}

// Clear used GO numbers cache (for testing)
export function clearGOCache(): void {
  usedGONumbers.clear();
}