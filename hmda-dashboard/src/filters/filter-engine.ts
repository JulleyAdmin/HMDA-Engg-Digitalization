// Chief Engineer Dashboard Filter Engine
// Handles filtering logic for projects

import {
  Filter,
  FilterOperator,
  FilterValue,
  DateRange,
  FilterValidation,
  ProjectSizeRange,
  TimelineStatus,
  ProgressRange,
  UtilizationRange
} from './filter-types';
import {
  PROJECT_SIZE_RANGES,
  TIMELINE_STATUSES,
  PROGRESS_RANGES,
  BUDGET_UTILIZATION_RANGES,
  CONTRACTOR_PERFORMANCE_RANGES,
  CE_SCORE_RANGES
} from './filter-config';

// Type guard for date range
function isDateRange(value: any): value is DateRange {
  return value && typeof value === 'object' && ('from' in value || 'to' in value);
}

// Type guard for array
function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

// Get nested property value from object
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let value = obj;
  
  for (const key of keys) {
    if (value === null || value === undefined) {
      return undefined;
    }
    value = value[key];
  }
  
  return value;
}

// Convert value to number for comparison
function toNumber(value: any): number | null {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  }
  return null;
}

// Convert value to string for comparison
function toString(value: any): string {
  if (typeof value === 'string') return value.toLowerCase();
  if (value === null || value === undefined) return '';
  return String(value).toLowerCase();
}

// Convert value to date for comparison
function toDate(value: any): Date | null {
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }
  return null;
}

// Check if a single filter matches a project
function matchesFilter(project: any, filter: Filter): boolean {
  const fieldValue = getNestedValue(project, filter.field);
  const filterValue = filter.value;

  switch (filter.operator) {
    case FilterOperator.EQUALS:
      return fieldValue === filterValue;
    
    case FilterOperator.NOT_EQUALS:
      return fieldValue !== filterValue;
    
    case FilterOperator.IN:
      if (!isArray(filterValue)) return false;
      return (filterValue as any[]).includes(fieldValue);
    
    case FilterOperator.NOT_IN:
      if (!isArray(filterValue)) return false;
      return !(filterValue as any[]).includes(fieldValue);
    
    case FilterOperator.GREATER_THAN:
      const numValue1 = toNumber(fieldValue);
      const numFilter1 = toNumber(filterValue);
      if (numValue1 === null || numFilter1 === null) return false;
      return numValue1 > numFilter1;
    
    case FilterOperator.LESS_THAN:
      const numValue2 = toNumber(fieldValue);
      const numFilter2 = toNumber(filterValue);
      if (numValue2 === null || numFilter2 === null) return false;
      return numValue2 < numFilter2;
    
    case FilterOperator.BETWEEN:
      if (isDateRange(filterValue)) {
        const dateValue = toDate(fieldValue);
        if (!dateValue) return false;
        
        if (filterValue.from && filterValue.to) {
          const fromDate = toDate(filterValue.from);
          const toDateValue = toDate(filterValue.to);
          if (!fromDate || !toDateValue) return false;
          return dateValue >= fromDate && dateValue <= toDateValue;
        } else if (filterValue.from) {
          const fromDate = toDate(filterValue.from);
          if (!fromDate) return false;
          return dateValue >= fromDate;
        } else if (filterValue.to) {
          const toDateValue = toDate(filterValue.to);
          if (!toDateValue) return false;
          return dateValue <= toDateValue;
        }
        return true;
      } else if (isArray(filterValue) && filterValue.length === 2) {
        const numValue = toNumber(fieldValue);
        const min = toNumber(filterValue[0]);
        const max = toNumber(filterValue[1]);
        if (numValue === null || min === null || max === null) return false;
        return numValue >= min && numValue <= max;
      }
      // Handle special range filters
      return matchesRangeFilter(fieldValue, filter);
    
    case FilterOperator.CONTAINS:
      const strValue = toString(fieldValue);
      const strFilter = toString(filterValue);
      return strValue.includes(strFilter);
    
    case FilterOperator.STARTS_WITH:
      const strValue2 = toString(fieldValue);
      const strFilter2 = toString(filterValue);
      return strValue2.startsWith(strFilter2);
    
    case FilterOperator.ENDS_WITH:
      const strValue3 = toString(fieldValue);
      const strFilter3 = toString(filterValue);
      return strValue3.endsWith(strFilter3);
    
    default:
      return false;
  }
}

// Handle special range filters (project size, timeline status, etc.)
function matchesRangeFilter(fieldValue: any, filter: Filter): boolean {
  const value = toNumber(fieldValue);
  if (value === null) return false;

  // Handle project size ranges
  if (filter.id === 'projectSize' && isArray(filter.value)) {
    return filter.value.some(rangeId => {
      const range = PROJECT_SIZE_RANGES.find(r => r.id === rangeId);
      if (!range) return false;
      
      // Convert budget from rupees to crores
      const valueInCrores = value / 10000000;
      
      if (range.maxValue) {
        return valueInCrores >= range.minValue && valueInCrores < range.maxValue;
      } else {
        return valueInCrores >= range.minValue;
      }
    });
  }

  // Handle timeline status
  if (filter.id === 'timelineStatus' && isArray(filter.value)) {
    return filter.value.some(statusId => {
      const status = TIMELINE_STATUSES.find(s => s.id === statusId);
      if (!status) return false;
      
      if (statusId === 'on_schedule') {
        return value <= 0;
      } else if (status.delayRange) {
        if (status.delayRange.max) {
          return value >= status.delayRange.min && value <= status.delayRange.max;
        } else {
          return value >= status.delayRange.min;
        }
      }
      return false;
    });
  }

  // Handle progress ranges
  if ((filter.id === 'physicalProgress' || filter.id === 'financialProgress') && isArray(filter.value)) {
    return filter.value.some(rangeId => {
      const range = PROGRESS_RANGES.find(r => r.id === rangeId);
      if (!range) return false;
      return value >= range.minProgress && value <= range.maxProgress;
    });
  }

  // Handle budget utilization ranges
  if (filter.id === 'budgetUtilization' && isArray(filter.value)) {
    return filter.value.some(rangeId => {
      const range = BUDGET_UTILIZATION_RANGES.find(r => r.id === rangeId);
      if (!range) return false;
      return value >= range.minUtilization && value <= range.maxUtilization;
    });
  }

  // Handle contractor performance ranges
  if (filter.id === 'contractorPerformance' && isArray(filter.value)) {
    return filter.value.some(rangeId => {
      const range = CONTRACTOR_PERFORMANCE_RANGES.find(r => r.id === rangeId);
      if (!range) return false;
      return value >= range.minValue && value <= range.maxValue;
    });
  }

  // Handle CE score ranges
  if (filter.id === 'ceScore' && isArray(filter.value)) {
    return filter.value.some(rangeId => {
      const range = CE_SCORE_RANGES.find(r => r.id === rangeId);
      if (!range) return false;
      return value >= range.minScore && value <= range.maxScore;
    });
  }

  return false;
}

// Apply all active filters to a project
export function applyFilters(project: any, filters: Record<string, Filter>, activeFilters: string[]): boolean {
  // If no active filters, include all projects
  if (activeFilters.length === 0) {
    return true;
  }

  // Check if project matches all active filters (AND operation)
  for (const filterId of activeFilters) {
    const filter = filters[filterId];
    if (!filter || !filter.active) continue;
    
    if (!matchesFilter(project, filter)) {
      return false;
    }
  }

  return true;
}

// Filter an array of projects
export function filterProjects(
  projects: any[],
  filters: Record<string, Filter>,
  activeFilters: string[]
): any[] {
  return projects.filter(project => applyFilters(project, filters, activeFilters));
}

// Validate filter configuration
export function validateFilter(filter: Filter): FilterValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate required fields
  if (!filter.id) {
    errors.push('Filter ID is required');
  }
  if (!filter.field) {
    errors.push('Filter field is required');
  }
  if (!filter.operator) {
    errors.push('Filter operator is required');
  }

  // Validate operator-specific requirements
  switch (filter.operator) {
    case FilterOperator.IN:
    case FilterOperator.NOT_IN:
      if (!isArray(filter.value) || filter.value.length === 0) {
        errors.push(`${filter.operator} operator requires a non-empty array value`);
      }
      break;
    
    case FilterOperator.BETWEEN:
      if (isDateRange(filter.value)) {
        if (!filter.value.from && !filter.value.to) {
          errors.push('Date range must have at least one bound');
        }
      } else if (!isArray(filter.value) || filter.value.length !== 2) {
        warnings.push('BETWEEN operator typically uses an array with two values or a date range');
      }
      break;
    
    case FilterOperator.GREATER_THAN:
    case FilterOperator.LESS_THAN:
      if (typeof filter.value !== 'number' && typeof filter.value !== 'string') {
        errors.push(`${filter.operator} operator requires a numeric or string value`);
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Get filter summary for a set of projects
export function getFilterSummary(
  allProjects: any[],
  filteredProjects: any[],
  filters: Record<string, Filter>,
  activeFilters: string[]
): any {
  const filterGroups = {
    basic: 0,
    performance: 0,
    riskEnvironment: 0,
    advanced: 0
  };

  // Count active filters by group
  activeFilters.forEach(filterId => {
    const filter = filters[filterId];
    if (filter && filter.active) {
      // Determine group based on filter ID patterns
      if (['category', 'stage', 'circle', 'projectSize', 'workType', 'division'].includes(filterId)) {
        filterGroups.basic++;
      } else if (['contractorPerformance', 'ceScore', 'timelineStatus', 'physicalProgress', 'financialProgress', 'budgetUtilization'].includes(filterId)) {
        filterGroups.performance++;
      } else if (['monsoonRisk', 'politicalSensitivity', 'landIssues', 'criticalIssues', 'riskLevel'].includes(filterId)) {
        filterGroups.riskEnvironment++;
      } else {
        filterGroups.advanced++;
      }
    }
  });

  return {
    totalFilters: Object.keys(filters).length,
    activeFilters: activeFilters.length,
    filteredProjects: filteredProjects.length,
    totalProjects: allProjects.length,
    filterGroups
  };
}

// Create a filter from a preset
export function createFilterFromPreset(preset: any, fieldOverrides?: Partial<Filter>): Filter {
  return {
    id: preset.id,
    field: preset.field,
    label: preset.label,
    operator: preset.operator,
    value: preset.value,
    active: true,
    ...fieldOverrides
  };
}

// Serialize filters for URL or storage
export function serializeFilters(filters: Record<string, Filter>): string {
  const activeFilters = Object.values(filters)
    .filter(f => f.active)
    .map(f => ({
      id: f.id,
      operator: f.operator,
      value: f.value
    }));
  
  return JSON.stringify(activeFilters);
}

// Deserialize filters from URL or storage
export function deserializeFilters(serialized: string, filterConfigs: any[]): Record<string, Filter> {
  try {
    const activeFilters = JSON.parse(serialized);
    const filters: Record<string, Filter> = {};
    
    activeFilters.forEach((saved: any) => {
      const config = filterConfigs.find(c => c.id === saved.id);
      if (config) {
        filters[saved.id] = {
          id: saved.id,
          field: config.field,
          label: config.label,
          operator: saved.operator || config.defaultOperator,
          value: saved.value,
          active: true
        };
      }
    });
    
    return filters;
  } catch (error) {
    console.error('Error deserializing filters:', error);
    return {};
  }
}

// Export filter utilities
export const FilterUtils = {
  applyFilters,
  filterProjects,
  validateFilter,
  getFilterSummary,
  createFilterFromPreset,
  serializeFilters,
  deserializeFilters,
  matchesFilter,
  getNestedValue
};