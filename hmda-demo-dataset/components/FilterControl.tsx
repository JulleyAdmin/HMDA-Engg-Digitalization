// Individual Filter Control Component
import React, { useState, useCallback } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  Slider,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  Chip,
  InputAdornment
} from '@mui/material';
import {
  DatePicker,
  DateRangePicker
} from '@mui/x-date-pickers';
import {
  Info as InfoIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import {
  FilterConfig,
  Filter,
  FilterOperator,
  FilterOption,
  DateRange
} from '../filter-types';

interface FilterControlProps {
  config: FilterConfig;
  filter?: Filter;
  onChange: (filter: Filter | null) => void;
  onToggle?: () => void;
  compact?: boolean;
}

const FilterControl: React.FC<FilterControlProps> = ({
  config,
  filter,
  onChange,
  onToggle,
  compact = false
}) => {
  const theme = useTheme();
  const [localValue, setLocalValue] = useState(filter?.value || '');

  // Handle value change
  const handleValueChange = useCallback((newValue: any) => {
    const updatedFilter: Filter = {
      id: config.id,
      field: config.field,
      label: config.label,
      operator: filter?.operator || config.defaultOperator,
      value: newValue,
      active: filter?.active !== false
    };
    onChange(updatedFilter);
  }, [config, filter, onChange]);

  // Handle clear
  const handleClear = useCallback(() => {
    onChange(null);
  }, [onChange]);

  // Render based on filter type
  const renderControl = () => {
    switch (config.type) {
      case 'select':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{config.label}</InputLabel>
            <Select
              value={filter?.value || ''}
              onChange={(e) => handleValueChange(e.target.value)}
              label={config.label}
              endAdornment={
                filter?.value && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClear}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }
            >
              {config.options?.map((option: FilterOption) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {option.color && (
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: option.color
                        }}
                      />
                    )}
                    <span>{option.label}</span>
                    {option.count !== undefined && (
                      <Chip
                        label={option.count}
                        size="small"
                        sx={{ ml: 'auto', height: 20 }}
                      />
                    )}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'multiselect':
        const selectedValues = Array.isArray(filter?.value) ? filter.value : [];
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{config.label}</InputLabel>
            <Select
              multiple
              value={selectedValues}
              onChange={(e) => handleValueChange(e.target.value)}
              label={config.label}
              renderValue={(selected) => (
                <Box display="flex" flexWrap="wrap" gap={0.5}>
                  {(selected as any[]).map((value) => {
                    const option = config.options?.find(opt => opt.value === value);
                    return (
                      <Chip
                        key={value}
                        label={option?.label || value}
                        size="small"
                        sx={{
                          height: 24,
                          backgroundColor: option?.color || theme.palette.grey[200]
                        }}
                      />
                    );
                  })}
                </Box>
              )}
              endAdornment={
                selectedValues.length > 0 && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClear}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }
            >
              {config.options?.map((option: FilterOption) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox checked={selectedValues.includes(option.value)} />
                  <ListItemText 
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        {option.color && (
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: option.color
                            }}
                          />
                        )}
                        <span>{option.label}</span>
                      </Box>
                    }
                  />
                  {option.count !== undefined && (
                    <Chip
                      label={option.count}
                      size="small"
                      sx={{ ml: 1, height: 20 }}
                    />
                  )}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'range':
        const rangeValue = Array.isArray(filter?.value) ? filter.value : [0, 100];
        return (
          <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="caption">{config.label}</Typography>
              {filter?.value && (
                <IconButton size="small" onClick={handleClear}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            <Slider
              value={rangeValue}
              onChange={(_, newValue) => handleValueChange(newValue)}
              valueLabelDisplay="auto"
              size="small"
              marks={[
                { value: 0, label: '0' },
                { value: 100, label: '100' }
              ]}
            />
          </Box>
        );

      case 'date':
        return (
          <DatePicker
            label={config.label}
            value={filter?.value ? new Date(filter.value as string) : null}
            onChange={(newValue) => handleValueChange(newValue?.toISOString())}
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                InputProps: {
                  endAdornment: filter?.value && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={handleClear}>
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }
            }}
          />
        );

      case 'daterange':
        const dateRange = (filter?.value as DateRange) || { from: null, to: null };
        return (
          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              {config.label}
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              <DatePicker
                label="From"
                value={dateRange.from}
                onChange={(newValue) => handleValueChange({ ...dateRange, from: newValue })}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true
                  }
                }}
              />
              <Typography variant="body2">to</Typography>
              <DatePicker
                label="To"
                value={dateRange.to}
                onChange={(newValue) => handleValueChange({ ...dateRange, to: newValue })}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true
                  }
                }}
              />
              {(dateRange.from || dateRange.to) && (
                <IconButton size="small" onClick={handleClear}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>
        );

      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(filter?.value)}
                onChange={(e) => handleValueChange(e.target.checked)}
                size="small"
              />
            }
            label={config.label}
          />
        );

      case 'search':
        return (
          <TextField
            fullWidth
            size="small"
            label={config.label}
            placeholder={config.placeholder}
            value={filter?.value || ''}
            onChange={(e) => {
              setLocalValue(e.target.value);
              // Debounce the actual filter update
              const timer = setTimeout(() => {
                handleValueChange(e.target.value);
              }, 300);
              return () => clearTimeout(timer);
            }}
            InputProps={{
              endAdornment: filter?.value && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClear}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        mb: compact ? 1.5 : 2,
        p: compact ? 1 : 1.5,
        borderRadius: 1,
        backgroundColor: filter?.active ? theme.palette.action.hover : 'transparent',
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        }
      }}
    >
      <Box display="flex" alignItems="flex-start" gap={1}>
        <Box flexGrow={1}>
          {renderControl()}
        </Box>
        {config.description && !compact && (
          <Tooltip title={config.description}>
            <IconButton size="small" sx={{ mt: 0.5 }}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

// Fix TypeScript import issue
import { Typography } from '@mui/material';

export default FilterControl;