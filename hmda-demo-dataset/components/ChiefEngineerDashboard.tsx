// Chief Engineer Dashboard - Main Component with Filtering
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Grid,
  Card,
  CardContent,
  Fab,
  Backdrop,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Menu as MenuIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import {
  FilterState,
  Filter,
  FilterPreset
} from '../filter-types';
import { FilterUtils } from '../filter-engine';
import { DEFAULT_FILTER_PRESETS } from '../filter-config';
import FilterSidebar from './FilterSidebar';
import ProjectMetricsCards from './ProjectMetricsCards';
import ProjectCharts from './ProjectCharts';
import ProjectTable from './ProjectTable';
import ProjectMap from './ProjectMap';

interface ChiefEngineerDashboardProps {
  projects: any[];
  loading?: boolean;
  error?: string;
  onRefresh?: () => void;
  onExport?: (filteredProjects: any[]) => void;
}

const ChiefEngineerDashboard: React.FC<ChiefEngineerDashboardProps> = ({
  projects,
  loading = false,
  error,
  onRefresh,
  onExport
}) => {
  const theme = useTheme();
  
  // State management
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [compactMode, setCompactMode] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity?: 'success' | 'error' }>({
    open: false,
    message: ''
  });

  // Filter state
  const [filterState, setFilterState] = useState<FilterState>({
    filters: {},
    activeFilters: [],
    filterGroups: {
      basic: [],
      performance: [],
      risk_environment: [],
      advanced: []
    },
    presets: DEFAULT_FILTER_PRESETS.map(preset => ({
      ...preset,
      createdBy: 'System',
      createdAt: new Date('2024-01-01'),
      isDefault: true
    }))
  });

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    return FilterUtils.filterProjects(projects, filterState.filters, filterState.activeFilters);
  }, [projects, filterState.filters, filterState.activeFilters]);

  // Calculate metrics
  const metrics = useMemo(() => {
    if (!filteredProjects) return null;

    const totalValue = filteredProjects.reduce((sum, project) => sum + (project.totalBudget || 0), 0);
    const delayedProjects = filteredProjects.filter(project => 
      project.timeline?.delayDays > 0 || project.currentStage === 'Delayed'
    );
    const criticalProjects = filteredProjects.filter(project => 
      project.riskLevel === 'CRITICAL' || project.hasCriticalIssues
    );
    const completedProjects = filteredProjects.filter(project => 
      project.currentStage === 'Completion' || project.physicalProgress >= 100
    );

    return {
      totalProjects: filteredProjects.length,
      totalValue: totalValue / 10000000, // Convert to crores
      delayedProjects: delayedProjects.length,
      criticalProjects: criticalProjects.length,
      completedProjects: completedProjects.length,
      completionRate: filteredProjects.length > 0 ? (completedProjects.length / filteredProjects.length) * 100 : 0
    };
  }, [filteredProjects]);

  // Handle filter changes
  const handleFilterChange = useCallback((filterId: string, filter: Filter | null) => {
    setFilterState(prev => {
      const newFilters = { ...prev.filters };
      const newActiveFilters = [...prev.activeFilters];

      if (filter) {
        newFilters[filterId] = filter;
        if (filter.active && !newActiveFilters.includes(filterId)) {
          newActiveFilters.push(filterId);
        } else if (!filter.active && newActiveFilters.includes(filterId)) {
          const index = newActiveFilters.indexOf(filterId);
          newActiveFilters.splice(index, 1);
        }
      } else {
        delete newFilters[filterId];
        const index = newActiveFilters.indexOf(filterId);
        if (index > -1) {
          newActiveFilters.splice(index, 1);
        }
      }

      return {
        ...prev,
        filters: newFilters,
        activeFilters: newActiveFilters
      };
    });
  }, []);

  // Clear all filters
  const handleClearAllFilters = useCallback(() => {
    setFilterState(prev => ({
      ...prev,
      filters: {},
      activeFilters: []
    }));
    setSnackbar({
      open: true,
      message: 'All filters cleared',
      severity: 'success'
    });
  }, []);

  // Apply filter preset
  const handleApplyPreset = useCallback((presetId: string) => {
    const preset = filterState.presets.find(p => p.id === presetId);
    if (preset) {
      setFilterState(prev => ({
        ...prev,
        filters: { ...preset.filters },
        activeFilters: Object.keys(preset.filters),
        activePreset: presetId
      }));
      setSnackbar({
        open: true,
        message: `Applied preset: ${preset.name}`,
        severity: 'success'
      });
    }
  }, [filterState.presets]);

  // Save filter preset
  const handleSavePreset = useCallback((name: string, description?: string) => {
    const newPreset: FilterPreset = {
      id: `preset_${Date.now()}`,
      name,
      description,
      filters: { ...filterState.filters },
      createdBy: 'Chief Engineer',
      createdAt: new Date(),
      isDefault: false,
      isShared: false
    };

    setFilterState(prev => ({
      ...prev,
      presets: [...prev.presets, newPreset]
    }));

    setSnackbar({
      open: true,
      message: `Preset "${name}" saved successfully`,
      severity: 'success'
    });
  }, [filterState.filters]);

  // Handle export
  const handleExport = useCallback(() => {
    if (onExport) {
      onExport(filteredProjects);
      setSnackbar({
        open: true,
        message: `Exported ${filteredProjects.length} projects`,
        severity: 'success'
      });
    }
  }, [filteredProjects, onExport]);

  // Render view based on mode
  const renderMainContent = () => {
    switch (viewMode) {
      case 'map':
        return (
          <ProjectMap
            projects={filteredProjects}
            onProjectSelect={(project) => console.log('Selected project:', project)}
          />
        );
      case 'list':
        return (
          <ProjectTable
            projects={filteredProjects}
            compact={compactMode}
            onRowClick={(project) => console.log('Project clicked:', project)}
          />
        );
      default:
        return (
          <>
            {metrics && (
              <ProjectMetricsCards
                metrics={metrics}
                totalProjects={projects.length}
                sx={{ mb: 3 }}
              />
            )}
            <ProjectCharts
              projects={filteredProjects}
              compact={compactMode}
            />
          </>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setFilterSidebarOpen(true)}
            sx={{ mr: 2 }}
          >
            <FilterListIcon />
          </IconButton>
          
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Chief Engineer Dashboard
          </Typography>

          {/* Filter Summary */}
          {filterState.activeFilters.length > 0 && (
            <Typography variant="body2" sx={{ mr: 2 }}>
              {filterState.activeFilters.length} filters active
            </Typography>
          )}

          {/* View Mode Toggle */}
          <Box sx={{ mr: 2 }}>
            <IconButton
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : viewMode === 'list' ? 'map' : 'grid')}
              title="Toggle View Mode"
            >
              {viewMode === 'grid' ? <ViewListIcon /> : viewMode === 'list' ? <ViewModuleIcon /> : <ViewModuleIcon />}
            </IconButton>
          </Box>

          {/* Action Buttons */}
          <Button
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={filteredProjects.length === 0}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          
          <IconButton onClick={onRefresh} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" onClose={() => {}}>
          {error}
        </Alert>
      )}

      {/* Main Content */}
      <Box sx={{ 
        display: 'flex', 
        flexGrow: 1, 
        overflow: 'hidden',
        pl: filterSidebarOpen ? '320px' : 0,
        transition: 'padding-left 0.3s'
      }}>
        <Box sx={{ 
          flexGrow: 1, 
          p: 3, 
          overflow: 'auto',
          backgroundColor: theme.palette.background.default
        }}>
          {renderMainContent()}
        </Box>
      </Box>

      {/* Filter Sidebar */}
      <FilterSidebar
        open={filterSidebarOpen}
        onClose={() => setFilterSidebarOpen(false)}
        filters={filterState}
        onFilterChange={handleFilterChange}
        onClearAllFilters={handleClearAllFilters}
        onApplyPreset={handleApplyPreset}
        onSavePreset={handleSavePreset}
        projectCount={projects.length}
        filteredCount={filteredProjects.length}
        compactMode={compactMode}
      />

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: theme.zIndex.speedDial
        }}
        onClick={() => setFilterSidebarOpen(true)}
      >
        <FilterListIcon />
      </Fab>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity || 'info'}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChiefEngineerDashboard;