// Enhanced Filter Control Component with Diverse UI/UX
import React, { useState, useCallback, useMemo } from 'react';
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
  InputAdornment,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  ButtonGroup,
  Stack,
  Autocomplete,
  Rating,
  FormGroup,
  Avatar,
  ListItemIcon,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Info as InfoIcon,
  Clear as ClearIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Circle as CircleIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  Construction as ConstructionIcon,
  Assessment as AssessmentIcon,
  WaterDrop as WaterDropIcon,
  Gavel as GavelIcon,
  Engineering as EngineeringIcon,
  Apartment as ApartmentIcon,
  Nature as NatureIcon,
  SmartCity as SmartCityIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import {
  FilterConfig,
  Filter,
  FilterOperator,
  FilterOption,
  DateRange
} from '../../filters/filter-types';
import {
  PROJECT_SIZE_RANGES,
  CONTRACTOR_PERFORMANCE_RANGES,
  CE_SCORE_RANGES,
  TIMELINE_STATUSES,
  PROGRESS_RANGES,
  BUDGET_UTILIZATION_RANGES
} from '../../filters/filter-config';

interface FilterControlProps {
  config: FilterConfig;
  filter?: Filter;
  onChange: (filter: Filter | null) => void;
  onToggle?: () => void;
  compact?: boolean;
}

// Icon mapping for different filter types
const iconMap: Record<string, React.ReactNode> = {
  category: <CategoryIcon />,
  timeline: <ScheduleIcon />,
  location_on: <LocationIcon />,
  account_balance: <AccountBalanceIcon />,
  construction: <ConstructionIcon />,
  stars: <TrendingUpIcon />,
  assessment: <AssessmentIcon />,
  schedule: <ScheduleIcon />,
  trending_up: <TrendingUpIcon />,
  payments: <AccountBalanceIcon />,
  account_balance_wallet: <AccountBalanceIcon />,
  water_drop: <WaterDropIcon />,
  gavel: <GavelIcon />,
  terrain: <LocationIcon />,
  warning: <WarningIcon />
};

const FilterControlEnhanced: React.FC<FilterControlProps> = ({
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

  // Get icon for option
  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    return iconMap[iconName] || null;
  };

  // Get category-specific icon
  const getCategoryIcon = (categoryValue: string) => {
    switch (categoryValue) {
      case 'INFRASTRUCTURE':
        return <EngineeringIcon />;
      case 'URBAN_DEVELOPMENT':
        return <ApartmentIcon />;
      case 'ENVIRONMENTAL':
        return <NatureIcon />;
      case 'SMART_CITY':
        return <SmartCityIcon />;
      default:
        return <CategoryIcon />;
    }
  };

  // Enhanced render based on filter type and ID
  const renderControl = () => {
    // Special cases based on filter ID for better UX
    switch (config.id) {
      // Visual card selection for categories
      case 'category':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              {config.label}
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {config.options?.map((option: FilterOption) => {
                const isSelected = filter?.value && Array.isArray(filter.value) 
                  ? (filter.value as any[]).includes(option.value)
                  : filter?.value === option.value;
                
                return (
                  <Box key={option.value} sx={{ flexBasis: { xs: 'calc(50% - 4px)', sm: 'calc(33.333% - 8px)', md: 'calc(25% - 12px)' } }}>
                    <Paper
                      elevation={isSelected ? 4 : 1}
                      sx={{
                        p: 1.5,
                        cursor: 'pointer',
                        borderRadius: 2,
                        border: 2,
                        borderColor: isSelected ? option.color : 'transparent',
                        backgroundColor: isSelected ? `${option.color}15` : 'background.paper',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: option.color,
                          transform: 'translateY(-2px)',
                          boxShadow: 4
                        }
                      }}
                      onClick={() => {
                        const currentValues = filter?.value && Array.isArray(filter.value) 
                          ? filter.value as any[]
                          : [];
                        const newValues = isSelected
                          ? currentValues.filter((v: any) => v !== option.value)
                          : [...currentValues, option.value];
                        handleValueChange(newValues);
                      }}
                    >
                      <Stack alignItems="center" spacing={1}>
                        <Avatar sx={{ bgcolor: option.color, width: 40, height: 40 }}>
                          {getCategoryIcon(option.value)}
                        </Avatar>
                        <Typography variant="body2" textAlign="center" fontWeight={500}>
                          {option.label}
                        </Typography>
                      </Stack>
                    </Paper>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );

      // Toggle button group for project size
      case 'projectSize':
        const selectedSizes = filter?.value && Array.isArray(filter.value) ? filter.value : [];
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              {config.label}
            </Typography>
            <ToggleButtonGroup
              value={selectedSizes}
              onChange={(e, newValue) => handleValueChange(newValue)}
              aria-label="project size"
              fullWidth
              sx={{ flexWrap: 'wrap', gap: 1 }}
            >
              {PROJECT_SIZE_RANGES.map((range) => (
                <ToggleButton
                  key={range.id}
                  value={range.id}
                  aria-label={range.label}
                  sx={{
                    flex: '1 1 45%',
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'divider',
                    '&.Mui-selected': {
                      backgroundColor: `${range.color}20`,
                      borderColor: range.color,
                      '&:hover': {
                        backgroundColor: `${range.color}30`
                      }
                    }
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircleIcon sx={{ fontSize: 16, color: range.color }} />
                    <Box textAlign="left">
                      <Typography variant="body2" fontWeight={600}>
                        {range.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {range.maxValue 
                          ? `₹${range.minValue}-${range.maxValue} Cr`
                          : `₹${range.minValue}+ Cr`
                        }
                      </Typography>
                    </Box>
                  </Stack>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        );

      // Rating component for contractor performance
      case 'contractorPerformance':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              {config.label}
            </Typography>
            <Stack spacing={1}>
              {CONTRACTOR_PERFORMANCE_RANGES.map((range) => {
                const isSelected = filter?.value && Array.isArray(filter.value)
                  ? (filter.value as string[]).includes(range.id)
                  : false;
                
                return (
                  <Box
                    key={range.id}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: 1,
                      borderColor: isSelected ? range.color : 'divider',
                      backgroundColor: isSelected ? `${range.color}10` : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: range.color,
                        backgroundColor: `${range.color}05`
                      }
                    }}
                    onClick={() => {
                      const currentValues = filter?.value && Array.isArray(filter.value) 
                        ? filter.value as string[]
                        : [];
                      const newValues = isSelected
                        ? currentValues.filter((v: string) => v !== range.id)
                        : [...currentValues, range.id];
                      handleValueChange(newValues);
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {range.label}
                        </Typography>
                        <Rating
                          value={(range.minValue + range.maxValue) / 2}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                      </Box>
                      {isSelected && <CheckCircleIcon sx={{ color: range.color }} />}
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        );

      // Visual progress bars for CE Score
      case 'ceScore':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              {config.label}
            </Typography>
            <Stack spacing={1.5}>
              {CE_SCORE_RANGES.map((range) => {
                const isSelected = filter?.value && Array.isArray(filter.value)
                  ? (filter.value as string[]).includes(range.id)
                  : false;
                
                return (
                  <Paper
                    key={range.id}
                    elevation={isSelected ? 2 : 0}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      borderRadius: 2,
                      border: 1,
                      borderColor: isSelected ? range.color : 'divider',
                      backgroundColor: isSelected ? `${range.color}10` : 'background.paper',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: range.color,
                        elevation: 2
                      }
                    }}
                    onClick={() => {
                      const currentValues = filter?.value && Array.isArray(filter.value) 
                        ? filter.value as string[]
                        : [];
                      const newValues = isSelected
                        ? currentValues.filter((v: string) => v !== range.id)
                        : [...currentValues, range.id];
                      handleValueChange(newValues);
                    }}
                  >
                    <Stack spacing={1}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" fontWeight={600}>
                          {range.label}
                        </Typography>
                        <Chip 
                          label={range.grade} 
                          size="small" 
                          sx={{ 
                            bgcolor: range.color,
                            color: 'white',
                            fontWeight: 700
                          }} 
                        />
                      </Box>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'grey.200',
                            overflow: 'hidden'
                          }}
                        >
                          <Box
                            sx={{
                              height: '100%',
                              width: `${range.maxScore}%`,
                              bgcolor: range.color,
                              transition: 'width 0.3s'
                            }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {range.minScore}-{range.maxScore} points
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                );
              })}
            </Stack>
          </Box>
        );

      // Timeline status with visual indicators
      case 'timelineStatus':
        return (
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              {config.label}
            </Typography>
            <ButtonGroup 
              orientation="vertical" 
              fullWidth
              sx={{ gap: 0.5 }}
            >
              {TIMELINE_STATUSES.map((status) => {
                const isSelected = filter?.value && Array.isArray(filter.value)
                  ? (filter.value as string[]).includes(status.id)
                  : false;
                
                const Icon = status.id === 'on_schedule' ? CheckCircleIcon :
                            status.id === 'minor_delay' ? ScheduleIcon :
                            status.id === 'moderate_delay' ? WarningIcon :
                            WarningIcon;
                
                return (
                  <Button
                    key={status.id}
                    variant={isSelected ? "contained" : "outlined"}
                    onClick={() => {
                      const currentValues = filter?.value && Array.isArray(filter.value) 
                        ? filter.value as string[]
                        : [];
                      const newValues = isSelected
                        ? currentValues.filter((v: string) => v !== status.id)
                        : [...currentValues, status.id];
                      handleValueChange(newValues);
                    }}
                    startIcon={<Icon />}
                    sx={{
                      justifyContent: 'flex-start',
                      borderColor: status.color,
                      color: isSelected ? 'white' : status.color,
                      backgroundColor: isSelected ? status.color : 'transparent',
                      '&:hover': {
                        backgroundColor: isSelected ? status.color : `${status.color}10`,
                        borderColor: status.color
                      }
                    }}
                  >
                    {status.label}
                  </Button>
                );
              })}
            </ButtonGroup>
          </Box>
        );

      // Visual progress slider for physical/financial progress
      case 'physicalProgress':
      case 'financialProgress':
        const progressValue = filter?.value && Array.isArray(filter.value) 
          ? filter.value as number[]
          : [0, 100];
        
        return (
          <Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {config.label}
              </Typography>
              {filter?.value && (
                <IconButton size="small" onClick={handleClear}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            <Box px={2}>
              <Slider
                value={progressValue}
                onChange={(_, newValue) => handleValueChange(newValue)}
                valueLabelDisplay="on"
                valueLabelFormat={(value) => `${value}%`}
                marks={[
                  { value: 0, label: '0%' },
                  { value: 25, label: '25%' },
                  { value: 50, label: '50%' },
                  { value: 75, label: '75%' },
                  { value: 100, label: '100%' }
                ]}
                sx={{
                  '& .MuiSlider-thumb': {
                    backgroundColor: theme.palette.primary.main,
                  },
                  '& .MuiSlider-track': {
                    background: `linear-gradient(90deg, ${theme.palette.error.main} 0%, ${theme.palette.warning.main} 50%, ${theme.palette.success.main} 100%)`,
                  }
                }}
              />
            </Box>
            <Stack direction="row" spacing={1} mt={2}>
              {PROGRESS_RANGES.map((range) => (
                <Chip
                  key={range.id}
                  label={range.label}
                  size="small"
                  onClick={() => handleValueChange([range.minProgress, range.maxProgress])}
                  sx={{
                    backgroundColor: 
                      progressValue[0] === range.minProgress && 
                      progressValue[1] === range.maxProgress 
                        ? range.color 
                        : 'grey.200',
                    color: 
                      progressValue[0] === range.minProgress && 
                      progressValue[1] === range.maxProgress 
                        ? 'white' 
                        : 'text.secondary',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: range.color,
                      color: 'white'
                    }
                  }}
                />
              ))}
            </Stack>
          </Box>
        );

      // Search field for location-based filters
      case 'circle':
        return (
          <Autocomplete
            multiple
            options={config.options || []}
            getOptionLabel={(option) => option.label}
            value={
              filter?.value && Array.isArray(filter.value)
                ? (filter.value as string[]).map(v => 
                    config.options?.find(opt => opt.value === v) || { value: v, label: v }
                  )
                : []
            }
            onChange={(_, newValue) => {
              handleValueChange(newValue.map(v => v.value));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={config.label}
                placeholder="Search circles..."
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <LocationIcon />
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  )
                }}
              />
            )}
            renderOption={(props, option) => (
              <MenuItem {...props}>
                <ListItemIcon>
                  <LocationIcon sx={{ color: option.color }} />
                </ListItemIcon>
                <ListItemText primary={option.label} />
              </MenuItem>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.label}
                  {...getTagProps({ index })}
                  icon={<LocationIcon />}
                  size="small"
                />
              ))
            }
          />
        );

      // Date range picker for advanced date filters
      case 'projectStartDate':
      case 'projectEndDate':
        if (config.type === 'daterange') {
          const dateRange = (filter?.value as DateRange) || { from: null, to: null };
          return (
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                {config.label}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
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
              </Stack>
            </Box>
          );
        }
        break;

      // Visual switch for boolean filters
      case 'criticalIssues':
      case 'environmentalClearance':
        return (
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(filter?.value)}
                  onChange={(e) => handleValueChange(e.target.checked)}
                  size="medium"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: config.id === 'criticalIssues' ? 'error.main' : 'success.main'
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: config.id === 'criticalIssues' ? 'error.main' : 'success.main'
                    }
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {config.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {config.description}
                  </Typography>
                </Box>
              }
              labelPlacement="start"
              sx={{ width: '100%', justifyContent: 'space-between', ml: 0 }}
            />
          </Paper>
        );

      // Default multiselect with enhanced visuals
      default:
        if (config.type === 'multiselect') {
          const selectedValues = filter?.value && Array.isArray(filter.value) ? filter.value : [];
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
                            backgroundColor: option?.color || theme.palette.grey[200],
                            color: option?.color ? 'white' : 'text.primary'
                          }}
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {config.options?.map((option: FilterOption) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Checkbox checked={(selectedValues as any[]).includes(option.value)} />
                    <ListItemText 
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          {option.color && (
                            <CircleIcon sx={{ fontSize: 12, color: option.color }} />
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
        }

        // Default search field
        if (config.type === 'search') {
          return (
            <TextField
              fullWidth
              size="small"
              label={config.label}
              placeholder={config.placeholder}
              value={filter?.value || ''}
              onChange={(e) => {
                setLocalValue(e.target.value);
                const timer = setTimeout(() => {
                  handleValueChange(e.target.value);
                }, 300);
                return () => clearTimeout(timer);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
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
        }

        return null;
    }
  };

  return (
    <Box
      sx={{
        mb: compact ? 1.5 : 3,
        p: compact ? 1 : 0,
        borderRadius: 2,
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

export default FilterControlEnhanced;