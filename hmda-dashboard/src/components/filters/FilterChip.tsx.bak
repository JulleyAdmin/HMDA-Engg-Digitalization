// Filter Chip Component for Active Filters Display
import React from 'react';
import { Chip, Tooltip, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Filter,
  FilterConfig,
  FilterOperator,
  DateRange,
  FilterOption
} from '../../filters/filter-types';
import {
  PROJECT_SIZE_RANGES,
  TIMELINE_STATUSES,
  PROGRESS_RANGES,
  BUDGET_UTILIZATION_RANGES,
  CONTRACTOR_PERFORMANCE_RANGES,
  CE_SCORE_RANGES
} from '../../filters/filter-config';

interface FilterChipProps {
  filter: Filter;
  config: FilterConfig;
  onRemove: () => void;
  size?: 'small' | 'medium';
}

const FilterChip: React.FC<FilterChipProps> = ({
  filter,
  config,
  onRemove,
  size = 'small'
}) => {
  const theme = useTheme();

  // Format filter value for display
  const formatValue = (value: any): string => {
    // Handle arrays (multiselect)
    if (Array.isArray(value)) {
      if (value.length === 0) return 'None';
      if (value.length === 1) {
        return formatSingleValue(value[0]);
      }
      return `${value.length} selected`;
    }

    // Handle date ranges
    if (isDateRange(value)) {
      const from = value.from ? new Date(value.from).toLocaleDateString() : '';
      const to = value.to ? new Date(value.to).toLocaleDateString() : '';
      if (from && to) {
        return `${from} - ${to}`;
      } else if (from) {
        return `From ${from}`;
      } else if (to) {
        return `Until ${to}`;
      }
      return 'No date';
    }

    // Handle boolean
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    // Handle single values
    return formatSingleValue(value);
  };

  // Format single value based on filter type
  const formatSingleValue = (value: any): string => {
    // Look up label from options
    if (config.options) {
      const option = config.options.find((opt: FilterOption) => opt.value === value);
      if (option) {
        return option.label;
      }
    }

    // Handle special range filters
    switch (config.id) {
      case 'projectSize':
        const sizeRange = PROJECT_SIZE_RANGES.find(r => r.id === value);
        return sizeRange?.label || String(value);
      
      case 'timelineStatus':
        const timelineStatus = TIMELINE_STATUSES.find(s => s.id === value);
        return timelineStatus?.label || String(value);
      
      case 'physicalProgress':
      case 'financialProgress':
        const progressRange = PROGRESS_RANGES.find(r => r.id === value);
        return progressRange?.label || String(value);
      
      case 'budgetUtilization':
        const utilizationRange = BUDGET_UTILIZATION_RANGES.find(r => r.id === value);
        return utilizationRange?.label || String(value);
      
      case 'contractorPerformance':
        const performanceRange = CONTRACTOR_PERFORMANCE_RANGES.find(r => r.id === value);
        return performanceRange?.label || String(value);
      
      case 'ceScore':
        const scoreRange = CE_SCORE_RANGES.find(r => r.id === value);
        return scoreRange?.label || String(value);
      
      default:
        return String(value);
    }
  };

  // Get operator symbol
  const getOperatorSymbol = (operator: FilterOperator): string => {
    switch (operator) {
      case FilterOperator.EQUALS:
        return '=';
      case FilterOperator.NOT_EQUALS:
        return '≠';
      case FilterOperator.GREATER_THAN:
        return '>';
      case FilterOperator.LESS_THAN:
        return '<';
      case FilterOperator.CONTAINS:
        return '∋';
      default:
        return '';
    }
  };

  // Type guard for date range
  const isDateRange = (value: any): value is DateRange => {
    return value && typeof value === 'object' && ('from' in value || 'to' in value);
  };

  // Get chip color based on filter type or value
  const getChipColor = (): string => {
    // Use option color if available
    if (config.options && !Array.isArray(filter.value)) {
      const option = config.options.find(opt => opt.value === filter.value);
      if (option?.color) {
        return option.color;
      }
    }

    // Default colors by filter group
    switch (config.group) {
      case 'basic':
        return theme.palette.primary.main;
      case 'performance':
        return theme.palette.info.main;
      case 'risk_environment':
        return theme.palette.warning.main;
      case 'advanced':
        return theme.palette.secondary.main;
      default:
        return theme.palette.grey[600];
    }
  };

  // Build chip label
  const chipLabel = (
    <Box display="flex" alignItems="center" gap={0.5}>
      <span style={{ fontWeight: 500 }}>{config.label}</span>
      {filter.operator !== config.defaultOperator && (
        <span style={{ opacity: 0.7 }}>{getOperatorSymbol(filter.operator)}</span>
      )}
      <span style={{ opacity: 0.8 }}>{formatValue(filter.value)}</span>
    </Box>
  );

  // Build tooltip content
  const tooltipContent = (
    <Box>
      <Box fontWeight={600} mb={0.5}>{config.label}</Box>
      {config.description && (
        <Box fontSize="0.875rem" mb={0.5}>{config.description}</Box>
      )}
      <Box fontSize="0.875rem">
        Value: {formatValue(filter.value)}
      </Box>
    </Box>
  );

  return (
    <Tooltip title={tooltipContent} arrow>
      <Chip
        label={chipLabel}
        onDelete={onRemove}
        size={size}
        sx={{
          backgroundColor: getChipColor(),
          color: theme.palette.getContrastText(getChipColor()),
          fontWeight: 500,
          '& .MuiChip-deleteIcon': {
            color: 'inherit',
            opacity: 0.7,
            '&:hover': {
              opacity: 1
            }
          }
        }}
      />
    </Tooltip>
  );
};

export default FilterChip;