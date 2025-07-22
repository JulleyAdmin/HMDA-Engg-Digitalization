import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Chip,
  Fab,
  Badge,
  Button,
  CircularProgress
} from '@mui/material';
import {
  Dashboard,
  Assignment,
  Visibility,
  AccountCircle,
  Engineering,
  FilterList as FilterListIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { DashboardOverview } from './components/DashboardOverview';
import { ProjectsTable } from './components/ProjectsTable';
import Project360View from './components/Project360View/Project360View';
import { HMDAProject, Circle } from './types/Project';
import FilterSidebar from './components/filters/FilterSidebar';
import GlobalSearchBar from './components/GlobalSearchBar';
import { FilterState, Filter, FilterPreset } from './filters/filter-types';
import { FilterUtils } from './filters/filter-engine';
import { DEFAULT_FILTER_PRESETS } from './filters/filter-config';
import dataService from './services/dataService';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Modern Professional HMDA Theme (keeping existing theme)
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e3a8a', // HMDA Blue
      light: '#3b82f6',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#059669', // HMDA Green
      light: '#10b981',
      dark: '#047857',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f1f5f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 13,
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.75rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedProject, setSelectedProject] = useState<HMDAProject | null>(null);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [allProjects, setAllProjects] = useState<HMDAProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Load project data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const dataset = await dataService.loadDataset();
        const projects = dataService.getProjects();
        
        // Enhance projects with additional fields for filtering
        const enhancedProjects = projects.map(project => ({
          ...project,
          // Add CE Score (computed metric)
          ceScore: calculateCEScore(project),
          // Add critical issues flag
          hasCriticalIssues: project.riskLevel === 'CRITICAL' || 
                            (project.timeline?.delayDays || 0) > 90,
          // Add monsoon impact (mock data)
          monsoonImpact: project.location.circle === Circle.CIRCLE_1 ? 'HIGH' : 'MEDIUM',
          // Add political interest (mock data)
          politicalInterest: project.totalBudget > 100000000000 ? 'MINISTER' : 'ROUTINE',
          // Add land issue status (mock data)
          landIssueStatus: project.riskLevel === 'HIGH' ? 'COURT_CASE' : 'CLEAR'
        }));
        
        setAllProjects(enhancedProjects);
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load project data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate CE Score based on multiple factors
  const calculateCEScore = (project: HMDAProject): number => {
    let score = 70; // Base score
    
    // Timeline performance
    const delayDays = project.timeline?.delayDays || 0;
    if (delayDays <= 0) score += 15;
    else if (delayDays <= 30) score += 10;
    else if (delayDays <= 90) score += 5;
    else score -= 10;
    
    // Budget performance
    const budgetUtilization = project.financial?.budgetUtilization || 0;
    if (budgetUtilization <= 100) score += 12;
    else if (budgetUtilization <= 110) score += 8;
    else score -= 5;
    
    // Physical progress
    if (project.physicalProgress >= 90) score += 12;
    else if (project.physicalProgress >= 70) score += 8;
    else if (project.physicalProgress >= 50) score += 4;
    else score -= 5;
    
    // Risk level
    switch (project.riskLevel) {
      case 'LOW': score += 10; break;
      case 'MEDIUM': score += 5; break;
      case 'HIGH': score -= 5; break;
      case 'CRITICAL': score -= 15; break;
    }
    
    return Math.max(0, Math.min(100, score));
  };

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (!allProjects || allProjects.length === 0) return [];
    return FilterUtils.filterProjects(allProjects, filterState.filters, filterState.activeFilters);
  }, [allProjects, filterState.filters, filterState.activeFilters]);

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
  }, [filterState.filters]);


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProjectSelect = (project: HMDAProject) => {
    setSelectedProject(project);
    setTabValue(2); // Switch to 360° view
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredProjects, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hmda-filtered-projects.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Calculate metrics
  const totalBudget = filteredProjects.reduce((sum, p) => sum + p.totalBudget, 0);
  const activeFiltersCount = filterState.activeFilters.length;

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          {/* Header */}
          <AppBar position="sticky" elevation={0}>
            <Toolbar sx={{ padding: '0 24px', minHeight: '64px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 40, 
                  height: 40, 
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Engineering sx={{ fontSize: 24, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'white', lineHeight: 1.2 }}>
                  HMDA Engineering Department
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem' }}>
                  Project Execution System • Chief Engineer Dashboard
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            {/* Global Search Bar */}
            <GlobalSearchBar 
              projects={allProjects}
              onProjectSelect={handleProjectSelect}
              currentProjectId={selectedProject?.projectId}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Filter Button */}
              <Button
                variant="contained"
                startIcon={
                  <Badge badgeContent={activeFiltersCount} color="error">
                    <FilterListIcon />
                  </Badge>
                }
                onClick={() => setFilterSidebarOpen(true)}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' }
                }}
              >
                Filters
              </Button>

              {/* Export Button */}
              <IconButton
                color="inherit"
                onClick={handleExport}
                disabled={filteredProjects.length === 0}
              >
                <DownloadIcon />
              </IconButton>

              <Chip 
                label="Live Demo" 
                size="small" 
                sx={{ 
                  background: 'rgba(16, 185, 129, 0.9)',
                  color: 'white',
                  fontWeight: 600,
                }}
              />
              <Box sx={{ textAlign: 'right', mr: 1 }}>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, fontSize: '0.8125rem' }}>
                  B. Ravinder
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.6875rem' }}>
                  Chief Engineer
                </Typography>
              </Box>
              <Tooltip title="Profile Settings">
                <IconButton 
                  color="inherit" 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                  }}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
          <Container maxWidth="xl">
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
              <Tab 
                icon={<Dashboard />} 
                label="Portfolio Overview" 
                id="dashboard-tab-0"
                aria-controls="dashboard-tabpanel-0"
              />
              <Tab 
                icon={<Assignment />} 
                label="Projects Table" 
                id="dashboard-tab-1"
                aria-controls="dashboard-tabpanel-1"
              />
              <Tab 
                icon={<Visibility />} 
                label="360° Project View" 
                id="dashboard-tab-2"
                aria-controls="dashboard-tabpanel-2"
                disabled={!selectedProject}
              />
            </Tabs>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 2, mb: 3, px: { xs: 2, sm: 3 } }}>
          <TabPanel value={tabValue} index={0}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <Typography color="error">{error}</Typography>
              </Box>
            ) : filteredProjects.length === 0 ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <Typography>No projects to display. Try adjusting your filters.</Typography>
              </Box>
            ) : (
              <DashboardOverview projects={filteredProjects} />
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <ProjectsTable 
              projects={filteredProjects} 
              onProjectSelect={handleProjectSelect} 
            />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            {selectedProject ? (
              <Project360View 
                project={selectedProject} 
                onBack={() => setTabValue(1)}
              />
            ) : (
              <Box textAlign="center" py={8}>
                <Typography variant="h6" color="text.secondary">
                  Select a project from the Projects Table to view detailed information
                </Typography>
              </Box>
            )}
          </TabPanel>

        </Container>

        {/* Footer */}
        <Box 
          component="footer" 
          sx={{ 
            py: 2, 
            px: 2, 
            mt: 'auto', 
            backgroundColor: theme.palette.grey[100],
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="body2" color="text.secondary" align="center">
              © 2025 HMDA Engineering Department Digitalization Project | 
              {filteredProjects.length} of {allProjects.length} Projects | 
              ₹{(totalBudget / 10000000000).toFixed(1)}K Cr Portfolio
            </Typography>
          </Container>
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
          projectCount={allProjects.length}
          filteredCount={filteredProjects.length}
        />

        {/* Floating Action Button for filters */}
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            display: filterSidebarOpen ? 'none' : 'flex'
          }}
          onClick={() => setFilterSidebarOpen(true)}
        >
          <Badge badgeContent={activeFiltersCount} color="error">
            <FilterListIcon />
          </Badge>
        </Fab>
      </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;