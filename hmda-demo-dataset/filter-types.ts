// Chief Engineer Dashboard Filter Types and Interfaces
// Based on Portfolio Intelligence Dashboard requirements

import { 
  ProjectCategory, 
  ProjectStage, 
  Circle, 
  RiskLevel,
  ContractorGrade,
  MonsoonImpact,
  PoliticalInterest,
  LandIssueStatus,
  WorkType,
  ApprovalAuthority
} from './enhanced-project-schema';

// Filter value types
export type FilterValue = string | number | boolean | string[] | number[] | DateRange;

// Date range for advanced filtering
export interface DateRange {
  from: Date | null;
  to: Date | null;
}

// Filter operator types
export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  IN = 'in',
  NOT_IN = 'not_in',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  BETWEEN = 'between',
  CONTAINS = 'contains',
  STARTS_WITH = 'starts_with',
  ENDS_WITH = 'ends_with'
}

// Base filter interface
export interface Filter {
  id: string;
  field: string;
  label: string;
  operator: FilterOperator;
  value: FilterValue;
  active: boolean;
}

// Filter group types
export enum FilterGroupType {
  BASIC = 'basic',
  PERFORMANCE = 'performance',
  RISK_ENVIRONMENT = 'risk_environment',
  ADVANCED = 'advanced'
}

// Filter configuration
export interface FilterConfig {
  id: string;
  field: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'date' | 'daterange' | 'boolean' | 'search';
  group: FilterGroupType;
  options?: FilterOption[];
  defaultOperator: FilterOperator;
  placeholder?: string;
  icon?: string;
  description?: string;
}

// Filter option
export interface FilterOption {
  value: string | number;
  label: string;
  count?: number;
  color?: string;
  icon?: string;
}

// Filter state
export interface FilterState {
  filters: Record<string, Filter>;
  activeFilters: string[];
  filterGroups: Record<FilterGroupType, string[]>;
  presets: FilterPreset[];
  activePreset?: string;
}

// Filter preset
export interface FilterPreset {
  id: string;
  name: string;
  description?: string;
  filters: Record<string, Filter>;
  createdBy: string;
  createdAt: Date;
  isDefault?: boolean;
  isShared?: boolean;
}

// Basic Filters
export interface BasicFilters {
  categories: ProjectCategory[];
  stages: ProjectStage[];
  circles: Circle[];
  projectSizes: ProjectSizeRange[];
  workTypes: WorkType[];
  divisions: string[];
}

// Performance Filters
export interface PerformanceFilters {
  contractorPerformance: PerformanceRange[];
  ceScores: CEScoreRange[];
  timelineStatuses: TimelineStatus[];
  physicalProgress: ProgressRange[];
  financialProgress: ProgressRange[];
  budgetUtilization: UtilizationRange[];
}

// Risk & Environment Filters
export interface RiskEnvironmentFilters {
  monsoonRisks: MonsoonImpact[];
  politicalSensitivities: PoliticalInterest[];
  landIssues: LandIssueStatus[];
  criticalIssues: boolean;
  riskLevels: RiskLevel[];
  environmentalClearance: ClearanceStatus[];
}

// Advanced Filters
export interface AdvancedFilters {
  stageDateSearch: StageDateFilter;
  goSearch: GOSearchFilter;
  documentSearch: DocumentSearchFilter;
  contractorSearch: ContractorSearchFilter;
  locationSearch: LocationSearchFilter;
}

// Project size ranges
export interface ProjectSizeRange {
  id: string;
  label: string;
  minValue: number; // in Crores
  maxValue?: number; // in Crores
  color: string;
}

// Performance ranges
export interface PerformanceRange {
  id: string;
  label: string;
  minValue: number;
  maxValue: number;
  color: string;
}

// CE Score ranges
export interface CEScoreRange {
  id: string;
  label: string;
  minScore: number;
  maxScore: number;
  grade: string;
  color: string;
}

// Timeline status
export interface TimelineStatus {
  id: string;
  label: string;
  delayRange?: {
    min: number;
    max?: number;
  };
  color: string;
  icon: string;
}

// Progress ranges
export interface ProgressRange {
  id: string;
  label: string;
  minProgress: number;
  maxProgress: number;
  color: string;
}

// Budget utilization ranges
export interface UtilizationRange {
  id: string;
  label: string;
  minUtilization: number;
  maxUtilization: number;
  status: 'under' | 'optimal' | 'over';
  color: string;
}

// Clearance status
export interface ClearanceStatus {
  id: string;
  label: string;
  status: 'obtained' | 'pending' | 'rejected' | 'not_required';
  color: string;
}

// Stage date filter
export interface StageDateFilter {
  stage: ProjectStage | null;
  dateRange: DateRange;
  dateType: 'planned' | 'actual' | 'both';
}

// GO search filter
export interface GOSearchFilter {
  goNumber?: string;
  approvalAuthority?: ApprovalAuthority;
  dateRange?: DateRange;
  amountRange?: {
    min: number;
    max: number;
  };
}

// Document search filter
export interface DocumentSearchFilter {
  documentNumber?: string;
  documentType?: string;
  department?: string;
  dateRange?: DateRange;
}

// Contractor search filter
export interface ContractorSearchFilter {
  name?: string;
  grade?: ContractorGrade;
  performanceRange?: {
    min: number;
    max: number;
  };
  specialization?: WorkType[];
  blacklisted?: boolean;
}

// Location search filter
export interface LocationSearchFilter {
  circle?: Circle;
  mandal?: string;
  village?: string;
  pincode?: string;
  radius?: number; // km from coordinates
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Filter summary for display
export interface FilterSummary {
  totalFilters: number;
  activeFilters: number;
  filteredProjects: number;
  totalProjects: number;
  filterGroups: {
    basic: number;
    performance: number;
    riskEnvironment: number;
    advanced: number;
  };
}

// Filter change event
export interface FilterChangeEvent {
  filter: Filter;
  action: 'add' | 'remove' | 'update';
  timestamp: Date;
  userId?: string;
}

// Filter validation
export interface FilterValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Export all filter-related types
export type AllFilters = BasicFilters & PerformanceFilters & RiskEnvironmentFilters & AdvancedFilters;