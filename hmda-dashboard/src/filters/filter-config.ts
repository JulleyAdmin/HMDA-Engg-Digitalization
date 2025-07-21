// Chief Engineer Dashboard Filter Configuration
// Defines all available filters and their options

import {
  FilterConfig,
  FilterGroupType,
  FilterOperator,
  FilterPreset,
  ProjectSizeRange,
  PerformanceRange,
  CEScoreRange,
  TimelineStatus,
  ProgressRange,
  UtilizationRange,
  ClearanceStatus,
  ProjectCategory,
  ProjectStage,
  Circle,
  WorkType,
  ContractorGrade,
  MonsoonImpact,
  PoliticalInterest,
  LandIssueStatus,
  RiskLevel,
  ApprovalAuthority
} from './filter-types';

// Project size ranges definition
export const PROJECT_SIZE_RANGES: ProjectSizeRange[] = [
  { id: 'small', label: 'Small Projects', minValue: 0, maxValue: 5, color: '#10B981' },
  { id: 'medium', label: 'Medium Projects', minValue: 5, maxValue: 50, color: '#3B82F6' },
  { id: 'large', label: 'Large Projects', minValue: 50, maxValue: 500, color: '#F59E0B' },
  { id: 'mega', label: 'Mega Projects', minValue: 500, color: '#EF4444' }
];

// Contractor performance ranges
export const CONTRACTOR_PERFORMANCE_RANGES: PerformanceRange[] = [
  { id: 'excellent', label: 'Excellent (4.5-5.0)', minValue: 4.5, maxValue: 5.0, color: '#10B981' },
  { id: 'good', label: 'Good (3.5-4.5)', minValue: 3.5, maxValue: 4.5, color: '#3B82F6' },
  { id: 'average', label: 'Average (2.5-3.5)', minValue: 2.5, maxValue: 3.5, color: '#F59E0B' },
  { id: 'below_average', label: 'Below Average (1.5-2.5)', minValue: 1.5, maxValue: 2.5, color: '#EF4444' },
  { id: 'poor', label: 'Poor (1.0-1.5)', minValue: 1.0, maxValue: 1.5, color: '#991B1B' }
];

// CE Score ranges
export const CE_SCORE_RANGES: CEScoreRange[] = [
  { id: 'outstanding', label: 'Outstanding', minScore: 90, maxScore: 100, grade: 'A+', color: '#10B981' },
  { id: 'excellent', label: 'Excellent', minScore: 80, maxScore: 90, grade: 'A', color: '#34D399' },
  { id: 'good', label: 'Good', minScore: 70, maxScore: 80, grade: 'B', color: '#3B82F6' },
  { id: 'satisfactory', label: 'Satisfactory', minScore: 60, maxScore: 70, grade: 'C', color: '#F59E0B' },
  { id: 'needs_improvement', label: 'Needs Improvement', minScore: 0, maxScore: 60, grade: 'D', color: '#EF4444' }
];

// Timeline status definitions
export const TIMELINE_STATUSES: TimelineStatus[] = [
  { id: 'on_schedule', label: 'On Schedule', color: '#10B981', icon: 'check_circle' },
  { id: 'minor_delay', label: 'Minor Delay (<30 days)', delayRange: { min: 1, max: 30 }, color: '#F59E0B', icon: 'schedule' },
  { id: 'moderate_delay', label: 'Moderate Delay (30-90 days)', delayRange: { min: 30, max: 90 }, color: '#F97316', icon: 'warning' },
  { id: 'major_delay', label: 'Major Delay (>90 days)', delayRange: { min: 90 }, color: '#EF4444', icon: 'error' }
];

// Progress ranges
export const PROGRESS_RANGES: ProgressRange[] = [
  { id: 'not_started', label: 'Not Started', minProgress: 0, maxProgress: 0, color: '#6B7280' },
  { id: 'initial', label: 'Initial (1-25%)', minProgress: 1, maxProgress: 25, color: '#3B82F6' },
  { id: 'intermediate', label: 'Intermediate (26-50%)', minProgress: 26, maxProgress: 50, color: '#10B981' },
  { id: 'advanced', label: 'Advanced (51-75%)', minProgress: 51, maxProgress: 75, color: '#F59E0B' },
  { id: 'final', label: 'Final (76-99%)', minProgress: 76, maxProgress: 99, color: '#8B5CF6' },
  { id: 'completed', label: 'Completed (100%)', minProgress: 100, maxProgress: 100, color: '#10B981' }
];

// Budget utilization ranges
export const BUDGET_UTILIZATION_RANGES: UtilizationRange[] = [
  { id: 'under_utilized', label: 'Under-utilized (<70%)', minUtilization: 0, maxUtilization: 70, status: 'under', color: '#3B82F6' },
  { id: 'optimal', label: 'Optimal (70-90%)', minUtilization: 70, maxUtilization: 90, status: 'optimal', color: '#10B981' },
  { id: 'high', label: 'High (90-100%)', minUtilization: 90, maxUtilization: 100, status: 'optimal', color: '#F59E0B' },
  { id: 'over_utilized', label: 'Over-utilized (>100%)', minUtilization: 100, maxUtilization: 999, status: 'over', color: '#EF4444' }
];

// Clearance status options
export const CLEARANCE_STATUSES: ClearanceStatus[] = [
  { id: 'obtained', label: 'Obtained', status: 'obtained', color: '#10B981' },
  { id: 'pending', label: 'Pending', status: 'pending', color: '#F59E0B' },
  { id: 'rejected', label: 'Rejected', status: 'rejected', color: '#EF4444' },
  { id: 'not_required', label: 'Not Required', status: 'not_required', color: '#6B7280' }
];

// Main filter configurations
export const FILTER_CONFIGS: FilterConfig[] = [
  // Basic Filters
  {
    id: 'category',
    field: 'category',
    label: 'Project Category',
    type: 'multiselect',
    group: FilterGroupType.BASIC,
    defaultOperator: FilterOperator.IN,
    options: [
      { value: 'INFRASTRUCTURE', label: 'Infrastructure', color: '#F97316' },
      { value: 'URBAN_DEVELOPMENT', label: 'Urban Development', color: '#F59E0B' },
      { value: 'ENVIRONMENTAL', label: 'Environmental', color: '#10B981' },
      { value: 'SMART_CITY', label: 'Smart City', color: '#3B82F6' }
    ],
    icon: 'category',
    description: 'Filter by project category'
  },
  {
    id: 'stage',
    field: 'currentStage',
    label: 'Project Stage',
    type: 'multiselect',
    group: FilterGroupType.BASIC,
    defaultOperator: FilterOperator.IN,
    options: [
      { value: '1', label: '1. Conceptualization' },
      { value: '2', label: '2. DPR & Approvals' },
      { value: '3', label: '3. Tendering' },
      { value: '4', label: '4. Contract Award' },
      { value: '5', label: '5. Construction' },
      { value: '6', label: '6. Quality Control' },
      { value: '7', label: '7. Testing & Commissioning' },
      { value: '8', label: '8. Handover' },
      { value: '9', label: '9. DLP & O&M' }
    ],
    icon: 'timeline',
    description: 'Filter by current project stage'
  },
  {
    id: 'circle',
    field: 'location.circle',
    label: 'Circle',
    type: 'multiselect',
    group: FilterGroupType.BASIC,
    defaultOperator: FilterOperator.IN,
    options: [
      { value: 'C1', label: 'Circle 1 - Hyderabad Core' },
      { value: 'C2', label: 'Circle 2 - Rangareddy' },
      { value: 'C3', label: 'Circle 3 - Medchal-Malkajgiri' },
      { value: 'C4', label: 'Circle 4 - Sangareddy' },
      { value: 'C5', label: 'Circle 5 - Vikarabad' }
    ],
    icon: 'location_on',
    description: 'Filter by geographical circle'
  },
  {
    id: 'projectSize',
    field: 'totalBudget',
    label: 'Project Size',
    type: 'multiselect',
    group: FilterGroupType.BASIC,
    defaultOperator: FilterOperator.BETWEEN,
    options: PROJECT_SIZE_RANGES.map(range => ({
      value: range.id,
      label: range.label,
      color: range.color
    })),
    icon: 'account_balance',
    description: 'Filter by project budget size'
  },
  {
    id: 'workType',
    field: 'workType',
    label: 'Work Type',
    type: 'multiselect',
    group: FilterGroupType.BASIC,
    defaultOperator: FilterOperator.IN,
    options: [
      { value: WorkType.LAYOUTS, label: 'Layouts' },
      { value: WorkType.ROADS, label: 'Roads' },
      { value: WorkType.PARKS, label: 'Parks' },
      { value: WorkType.LAKES, label: 'Lakes' },
      { value: WorkType.OM, label: 'O&M' },
      { value: WorkType.HERITAGE, label: 'Heritage' },
      { value: WorkType.INFRASTRUCTURE, label: 'Infrastructure' },
      { value: WorkType.BUILDINGS, label: 'Buildings' }
    ],
    icon: 'construction',
    description: 'Filter by type of work'
  },
  {
    id: 'division',
    field: 'divisionNumber',
    label: 'Division',
    type: 'multiselect',
    group: FilterGroupType.BASIC,
    defaultOperator: FilterOperator.IN,
    options: [
      { value: 'I', label: 'Division I' },
      { value: 'II', label: 'Division II' },
      { value: 'III', label: 'Division III' },
      { value: 'IV', label: 'Division IV' },
      { value: 'V', label: 'Division V' },
      { value: 'VI', label: 'Division VI' }
    ],
    icon: 'domain',
    description: 'Filter by division'
  },

  // Performance Filters
  {
    id: 'contractorPerformance',
    field: 'contractor.performanceRating',
    label: 'Contractor Performance',
    type: 'multiselect',
    group: FilterGroupType.PERFORMANCE,
    defaultOperator: FilterOperator.BETWEEN,
    options: CONTRACTOR_PERFORMANCE_RANGES.map(range => ({
      value: range.id,
      label: range.label,
      color: range.color
    })),
    icon: 'stars',
    description: 'Filter by contractor performance rating'
  },
  {
    id: 'ceScore',
    field: 'ceScore',
    label: 'CE Score',
    type: 'multiselect',
    group: FilterGroupType.PERFORMANCE,
    defaultOperator: FilterOperator.BETWEEN,
    options: CE_SCORE_RANGES.map(range => ({
      value: range.id,
      label: `${range.label} (${range.grade})`,
      color: range.color
    })),
    icon: 'assessment',
    description: 'Filter by Chief Engineer performance score'
  },
  {
    id: 'timelineStatus',
    field: 'timeline.delayDays',
    label: 'Timeline Status',
    type: 'multiselect',
    group: FilterGroupType.PERFORMANCE,
    defaultOperator: FilterOperator.IN,
    options: TIMELINE_STATUSES.map(status => ({
      value: status.id,
      label: status.label,
      color: status.color,
      icon: status.icon
    })),
    icon: 'schedule',
    description: 'Filter by project timeline status'
  },
  {
    id: 'physicalProgress',
    field: 'physicalProgress',
    label: 'Physical Progress',
    type: 'multiselect',
    group: FilterGroupType.PERFORMANCE,
    defaultOperator: FilterOperator.BETWEEN,
    options: PROGRESS_RANGES.map(range => ({
      value: range.id,
      label: range.label,
      color: range.color
    })),
    icon: 'trending_up',
    description: 'Filter by physical progress percentage'
  },
  {
    id: 'financialProgress',
    field: 'financial.budgetUtilization',
    label: 'Financial Progress',
    type: 'multiselect',
    group: FilterGroupType.PERFORMANCE,
    defaultOperator: FilterOperator.BETWEEN,
    options: PROGRESS_RANGES.map(range => ({
      value: range.id,
      label: range.label,
      color: range.color
    })),
    icon: 'payments',
    description: 'Filter by financial progress percentage'
  },
  {
    id: 'budgetUtilization',
    field: 'financial.budgetUtilization',
    label: 'Budget Utilization',
    type: 'multiselect',
    group: FilterGroupType.PERFORMANCE,
    defaultOperator: FilterOperator.BETWEEN,
    options: BUDGET_UTILIZATION_RANGES.map(range => ({
      value: range.id,
      label: range.label,
      color: range.color
    })),
    icon: 'account_balance_wallet',
    description: 'Filter by budget utilization percentage'
  },

  // Risk & Environment Filters
  {
    id: 'monsoonRisk',
    field: 'monsoonImpact',
    label: 'Monsoon Risk',
    type: 'multiselect',
    group: FilterGroupType.RISK_ENVIRONMENT,
    defaultOperator: FilterOperator.IN,
    options: [
      { value: MonsoonImpact.HIGH, label: 'High Risk', color: '#EF4444' },
      { value: MonsoonImpact.MEDIUM, label: 'Medium Risk', color: '#F59E0B' },
      { value: MonsoonImpact.LOW, label: 'Low Risk', color: '#10B981' },
      { value: MonsoonImpact.NONE, label: 'No Risk', color: '#6B7280' }
    ],
    icon: 'water_drop',
    description: 'Filter by monsoon impact risk'
  },
  {
    id: 'politicalSensitivity',
    field: 'politicalInterest',
    label: 'Political Sensitivity',
    type: 'multiselect',
    group: FilterGroupType.RISK_ENVIRONMENT,
    defaultOperator: FilterOperator.IN,
    options: [
      { value: PoliticalInterest.CM, label: 'CM Interest', color: '#DC2626' },
      { value: PoliticalInterest.MINISTER, label: 'Minister Interest', color: '#F59E0B' },
      { value: PoliticalInterest.MLA, label: 'MLA Interest', color: '#3B82F6' },
      { value: PoliticalInterest.MP, label: 'MP Interest', color: '#8B5CF6' },
      { value: PoliticalInterest.PUBLIC, label: 'Public Interest', color: '#10B981' },
      { value: PoliticalInterest.ROUTINE, label: 'Routine', color: '#6B7280' }
    ],
    icon: 'gavel',
    description: 'Filter by political sensitivity level'
  },
  {
    id: 'landIssues',
    field: 'landIssueStatus',
    label: 'Land Issues',
    type: 'multiselect',
    group: FilterGroupType.RISK_ENVIRONMENT,
    defaultOperator: FilterOperator.IN,
    options: [
      { value: LandIssueStatus.CLEAR, label: 'Clear', color: '#10B981' },
      { value: LandIssueStatus.MINOR_ISSUES, label: 'Minor Issues', color: '#F59E0B' },
      { value: LandIssueStatus.COURT_CASE, label: 'Court Case', color: '#EF4444' },
      { value: LandIssueStatus.ACQUISITION_PENDING, label: 'Acquisition Pending', color: '#F97316' },
      { value: LandIssueStatus.MAJOR_DISPUTE, label: 'Major Dispute', color: '#991B1B' }
    ],
    icon: 'terrain',
    description: 'Filter by land issue status'
  },
  {
    id: 'criticalIssues',
    field: 'hasCriticalIssues',
    label: 'Critical Issues',
    type: 'boolean',
    group: FilterGroupType.RISK_ENVIRONMENT,
    defaultOperator: FilterOperator.EQUALS,
    icon: 'error_outline',
    description: 'Show only projects with critical issues'
  },
  {
    id: 'riskLevel',
    field: 'riskLevel',
    label: 'Risk Level',
    type: 'multiselect',
    group: FilterGroupType.RISK_ENVIRONMENT,
    defaultOperator: FilterOperator.IN,
    options: [
      { value: 'LOW', label: 'Low Risk', color: '#10B981' },
      { value: 'MEDIUM', label: 'Medium Risk', color: '#F59E0B' },
      { value: 'HIGH', label: 'High Risk', color: '#F97316' },
      { value: 'CRITICAL', label: 'Critical Risk', color: '#EF4444' }
    ],
    icon: 'warning',
    description: 'Filter by overall risk level'
  },

  // Advanced Filters
  {
    id: 'stageDateSearch',
    field: 'stageTransitions',
    label: 'Stage Date Search',
    type: 'daterange',
    group: FilterGroupType.ADVANCED,
    defaultOperator: FilterOperator.BETWEEN,
    icon: 'date_range',
    description: 'Search by stage transition dates'
  },
  {
    id: 'goNumber',
    field: 'governmentApproval.goNumber',
    label: 'GO Number',
    type: 'search',
    group: FilterGroupType.ADVANCED,
    defaultOperator: FilterOperator.CONTAINS,
    placeholder: 'Enter GO number',
    icon: 'article',
    description: 'Search by Government Order number'
  },
  {
    id: 'approvalAuthority',
    field: 'governmentApproval.approvalAuthority',
    label: 'Approval Authority',
    type: 'multiselect',
    group: FilterGroupType.ADVANCED,
    defaultOperator: FilterOperator.IN,
    options: [
      { value: ApprovalAuthority.GOVT, label: 'Government' },
      { value: ApprovalAuthority.METROPOLITAN_COMMISSIONER, label: 'Metropolitan Commissioner' },
      { value: ApprovalAuthority.BOARD, label: 'Board' },
      { value: ApprovalAuthority.SECRETARY, label: 'Secretary' },
      { value: ApprovalAuthority.CHIEF_ENGINEER, label: 'Chief Engineer' },
      { value: ApprovalAuthority.DEPUTY_CHIEF_ENGINEER, label: 'Deputy Chief Engineer' },
      { value: ApprovalAuthority.EXECUTIVE_ENGINEER, label: 'Executive Engineer' }
    ],
    icon: 'security',
    description: 'Filter by approval authority'
  },
  {
    id: 'documentNumber',
    field: 'documents',
    label: 'Document Number',
    type: 'search',
    group: FilterGroupType.ADVANCED,
    defaultOperator: FilterOperator.CONTAINS,
    placeholder: 'Enter document number',
    icon: 'description',
    description: 'Search by document number'
  },
  {
    id: 'contractorName',
    field: 'contractor.name',
    label: 'Contractor',
    type: 'search',
    group: FilterGroupType.ADVANCED,
    defaultOperator: FilterOperator.CONTAINS,
    placeholder: 'Enter contractor name',
    icon: 'business',
    description: 'Search by contractor name'
  },
  {
    id: 'contractorGrade',
    field: 'contractor.grade',
    label: 'Contractor Grade',
    type: 'multiselect',
    group: FilterGroupType.ADVANCED,
    defaultOperator: FilterOperator.IN,
    options: [
      { value: ContractorGrade.AAA, label: 'AAA Grade', color: '#10B981' },
      { value: ContractorGrade.AA, label: 'AA Grade', color: '#34D399' },
      { value: ContractorGrade.A, label: 'A Grade', color: '#3B82F6' },
      { value: ContractorGrade.B, label: 'B Grade', color: '#F59E0B' },
      { value: ContractorGrade.C, label: 'C Grade', color: '#EF4444' }
    ],
    icon: 'grade',
    description: 'Filter by contractor grade'
  },
  {
    id: 'location',
    field: 'location',
    label: 'Location Search',
    type: 'search',
    group: FilterGroupType.ADVANCED,
    defaultOperator: FilterOperator.CONTAINS,
    placeholder: 'Enter mandal, village, or pincode',
    icon: 'search_location',
    description: 'Search by location details'
  }
];

// Filter group metadata
export const FILTER_GROUP_METADATA = {
  [FilterGroupType.BASIC]: {
    label: 'Basic Filters',
    icon: 'filter_alt',
    description: 'Essential project filters',
    defaultExpanded: true
  },
  [FilterGroupType.PERFORMANCE]: {
    label: 'Performance Filters',
    icon: 'insights',
    description: 'Performance and progress metrics',
    defaultExpanded: true
  },
  [FilterGroupType.RISK_ENVIRONMENT]: {
    label: 'Risk & Environment',
    icon: 'report_problem',
    description: 'Risk and environmental factors',
    defaultExpanded: true
  },
  [FilterGroupType.ADVANCED]: {
    label: 'Advanced',
    icon: 'tune',
    description: 'Advanced search options',
    defaultExpanded: false
  }
};

// Default filter presets
export const DEFAULT_FILTER_PRESETS: Omit<FilterPreset, 'createdBy' | 'createdAt' | 'isShared'>[] = [
  {
    id: 'delayed_projects',
    name: 'Delayed Projects',
    description: 'Projects with timeline delays',
    filters: {
      timelineStatus: {
        id: 'timelineStatus',
        field: 'timeline.delayDays',
        label: 'Timeline Status',
        operator: FilterOperator.IN,
        value: ['minor_delay', 'moderate_delay', 'major_delay'],
        active: true
      }
    }
  },
  {
    id: 'critical_projects',
    name: 'Critical Projects',
    description: 'High-risk projects needing attention',
    filters: {
      riskLevel: {
        id: 'riskLevel',
        field: 'riskLevel',
        label: 'Risk Level',
        operator: FilterOperator.IN,
        value: ['HIGH', 'CRITICAL'],
        active: true
      },
      criticalIssues: {
        id: 'criticalIssues',
        field: 'hasCriticalIssues',
        label: 'Critical Issues',
        operator: FilterOperator.EQUALS,
        value: true,
        active: true
      }
    }
  },
  {
    id: 'construction_phase',
    name: 'Active Construction',
    description: 'Projects in construction phase',
    filters: {
      stage: {
        id: 'stage',
        field: 'currentStage',
        label: 'Project Stage',
        operator: FilterOperator.IN,
        value: ['5', '6'],
        active: true
      }
    }
  },
  {
    id: 'budget_overrun',
    name: 'Budget Overrun',
    description: 'Projects exceeding budget',
    filters: {
      budgetUtilization: {
        id: 'budgetUtilization',
        field: 'financial.budgetUtilization',
        label: 'Budget Utilization',
        operator: FilterOperator.GREATER_THAN,
        value: 100,
        active: true
      }
    }
  }
];

// Export helper function to get filter config by ID
export function getFilterConfig(filterId: string): FilterConfig | undefined {
  return FILTER_CONFIGS.find(config => config.id === filterId);
}

// Export helper function to get filters by group
export function getFiltersByGroup(group: FilterGroupType): FilterConfig[] {
  return FILTER_CONFIGS.filter(config => config.group === group);
}