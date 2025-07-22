// Chief Engineer Dashboard - Filter Sidebar Component
import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Badge,
  TextField,
  InputAdornment,
  Tooltip,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Search as SearchIcon,
  Tune as TuneIcon,
  Save as SaveIcon,
  RestartAlt as ResetIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { 
  FilterConfig, 
  FilterGroupType,
  FilterState,
  Filter
} from '../../filters/filter-types';
import { 
  FILTER_CONFIGS, 
  FILTER_GROUP_METADATA,
  DEFAULT_FILTER_PRESETS 
} from '../../filters/filter-config';
import { FilterUtils } from '../../filters/filter-engine';
import FilterControl from './FilterControl';
import FilterControlEnhanced from './FilterControlEnhanced';
import FilterChip from './FilterChip';
import FilterPresets from './FilterPresets';

interface FilterSidebarProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filterId: string, filter: Filter | null) => void;
  onClearAllFilters: () => void;
  onApplyPreset: (presetId: string) => void;
  onSavePreset: (name: string, description?: string) => void;
  projectCount: number;
  filteredCount: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  open,
  onClose,
  filters,
  onFilterChange,
  onClearAllFilters,
  onApplyPreset,
  onSavePreset,
  projectCount,
  filteredCount
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPresets, setShowPresets] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    [FilterGroupType.BASIC]: true,
    [FilterGroupType.PERFORMANCE]: true,
    [FilterGroupType.RISK_ENVIRONMENT]: true,
    [FilterGroupType.ADVANCED]: false
  });

  // Get filter configs grouped by type
  const filtersByGroup = useMemo(() => {
    const grouped: Record<FilterGroupType, FilterConfig[]> = {
      [FilterGroupType.BASIC]: [],
      [FilterGroupType.PERFORMANCE]: [],
      [FilterGroupType.RISK_ENVIRONMENT]: [],
      [FilterGroupType.ADVANCED]: []
    };

    FILTER_CONFIGS.forEach(config => {
      if (!searchQuery || 
          config.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          config.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
        grouped[config.group].push(config);
      }
    });

    return grouped;
  }, [searchQuery]);

  // Count active filters per group
  const activeFilterCounts = useMemo(() => {
    const counts: Record<FilterGroupType, number> = {
      [FilterGroupType.BASIC]: 0,
      [FilterGroupType.PERFORMANCE]: 0,
      [FilterGroupType.RISK_ENVIRONMENT]: 0,
      [FilterGroupType.ADVANCED]: 0
    };

    filters.activeFilters.forEach(filterId => {
      const config = FILTER_CONFIGS.find(c => c.id === filterId);
      if (config && filters.filters[filterId]?.active) {
        counts[config.group]++;
      }
    });

    return counts;
  }, [filters]);

  // Handle group expansion
  const handleGroupToggle = (group: FilterGroupType) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // Handle filter toggle
  const handleFilterToggle = (filterId: string) => {
    const currentFilter = filters.filters[filterId];
    if (currentFilter) {
      onFilterChange(filterId, { ...currentFilter, active: !currentFilter.active });
    }
  };

  // Handle filter removal
  const handleFilterRemove = (filterId: string) => {
    onFilterChange(filterId, null);
  };

  const drawerWidth = 320;

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.default,
            borderLeft: `1px solid ${theme.palette.divider}`
          }
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <FilterListIcon color="primary" />
              <Typography variant="h6" fontWeight="600">
                Filters
              </Typography>
              {filters.activeFilters.length > 0 && (
                <Chip
                  size="small"
                  label={filters.activeFilters.length}
                  color="primary"
                  sx={{ height: 24 }}
                />
              )}
            </Box>
            <Box>
              <Tooltip title="Filter Presets">
                <IconButton size="small" onClick={() => setShowPresets(!showPresets)}>
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reset All Filters">
                <IconButton size="small" onClick={onClearAllFilters}>
                  <ResetIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          
          {/* Filter Summary */}
          <Box mt={1}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredCount} of {projectCount} projects
            </Typography>
          </Box>

          {/* Search */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search filters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>

        {/* Filter Presets */}
        {showPresets && (
          <FilterPresets
            presets={filters.presets}
            activePreset={filters.activePreset}
            onApplyPreset={onApplyPreset}
            onSavePreset={onSavePreset}
            onClose={() => setShowPresets(false)}
          />
        )}

        {/* Active Filters */}
        {filters.activeFilters.length > 0 && (
          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle2" fontWeight="600">
                Active Filters
              </Typography>
              <Button
                size="small"
                onClick={onClearAllFilters}
                startIcon={<ClearIcon />}
              >
                Clear All
              </Button>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={0.5}>
              {filters.activeFilters.map(filterId => {
                const filter = filters.filters[filterId];
                const config = FILTER_CONFIGS.find(c => c.id === filterId);
                if (!filter || !config || !filter.active) return null;
                
                return (
                  <FilterChip
                    key={filterId}
                    filter={filter}
                    config={config}
                    onRemove={() => handleFilterRemove(filterId)}
                  />
                );
              })}
            </Box>
          </Box>
        )}

        {/* Filter Groups */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {Object.entries(filtersByGroup).map(([group, configs]) => {
            const groupKey = group as FilterGroupType;
            const metadata = FILTER_GROUP_METADATA[groupKey];
            const activeCount = activeFilterCounts[groupKey];
            
            if (configs.length === 0) return null;

            return (
              <Accordion
                key={group}
                expanded={expandedGroups[groupKey]}
                onChange={() => handleGroupToggle(groupKey)}
                sx={{
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  backgroundColor: 'transparent'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    px: 2,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1} width="100%">
                    <Typography variant="subtitle2" fontWeight="600">
                      {metadata.label}
                    </Typography>
                    {activeCount > 0 && (
                      <Badge badgeContent={activeCount} color="primary" />
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <Box sx={{ px: 2, pb: 2 }}>
                    {configs.map(config => {
                      const filter = filters.filters[config.id];
                      return (
                        <FilterControlEnhanced
                          key={config.id}
                          config={config}
                          filter={filter}
                          onChange={(newFilter) => onFilterChange(config.id, newFilter)}
                          onToggle={() => handleFilterToggle(config.id)}
                        />
                      );
                    })}
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

        {/* Footer */}
        <Box sx={{ 
          p: 2, 
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper
        }}>
          <Button
            fullWidth
            variant="contained"
            onClick={onClose}
            startIcon={<FilterListIcon />}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default FilterSidebar;