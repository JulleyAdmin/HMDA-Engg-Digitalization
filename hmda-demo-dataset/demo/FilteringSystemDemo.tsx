// Chief Engineer Dashboard Filtering System Demo
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, CircularProgress, Alert } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ChiefEngineerDashboard from '../components/ChiefEngineerDashboard';

// HMDA Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a', // HMDA Blue
      dark: '#1e40af',
      light: '#3b82f6'
    },
    secondary: {
      main: '#059669', // HMDA Green
      dark: '#047857',
      light: '#10b981'
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6
        }
      }
    }
  }
});

const FilteringSystemDemo: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load project data
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        
        // In a real application, this would be an API call
        // For demo, we'll load from our generated dataset
        const response = await fetch('/hmda-projects-150-with-documents.json');
        if (!response.ok) {
          throw new Error('Failed to load project data');
        }
        
        const data = await response.json();
        
        // Add computed fields for demo
        const enhancedProjects = data.projects.map((project: any) => ({
          ...project,
          // Add CE Score (computed metric)
          ceScore: calculateCEScore(project),
          // Add critical issues flag
          hasCriticalIssues: project.riskLevel === 'CRITICAL' || 
                            (project.timeline?.delayDays || 0) > 90 ||
                            (project.physicalProgress || 0) < 50 && 
                            (project.financial?.budgetUtilization || 0) > 80,
          // Ensure timeline data
          timeline: {
            ...project.timeline,
            delayDays: project.timeline?.delayDays || Math.max(0, Math.random() * 120 - 30)
          }
        }));
        
        setProjects(enhancedProjects);
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to load project data');
        
        // Fallback to sample data for demo
        setProjects(generateSampleProjects());
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Calculate CE Score based on multiple factors
  const calculateCEScore = (project: any): number => {
    let score = 70; // Base score
    
    // Timeline performance (30% weight)
    const delayDays = project.timeline?.delayDays || 0;
    if (delayDays <= 0) score += 15;
    else if (delayDays <= 30) score += 10;
    else if (delayDays <= 90) score += 5;
    else score -= 10;
    
    // Budget performance (25% weight)
    const budgetUtilization = project.financial?.budgetUtilization || 0;
    if (budgetUtilization <= 100) score += 12;
    else if (budgetUtilization <= 110) score += 8;
    else score -= 5;
    
    // Physical progress (25% weight)
    const physicalProgress = project.physicalProgress || 0;
    if (physicalProgress >= 90) score += 12;
    else if (physicalProgress >= 70) score += 8;
    else if (physicalProgress >= 50) score += 4;
    else score -= 5;
    
    // Risk level (20% weight)
    switch (project.riskLevel) {
      case 'LOW': score += 10; break;
      case 'MEDIUM': score += 5; break;
      case 'HIGH': score -= 5; break;
      case 'CRITICAL': score -= 15; break;
    }
    
    return Math.max(0, Math.min(100, score));
  };

  // Generate sample projects for demo fallback
  const generateSampleProjects = (): any[] => {
    const sampleProjects = [];
    const categories = ['INFRA', 'URBAN', 'ENV', 'SMART'];
    const stages = ['Planning', 'Approval', 'Construction', 'Completion'];
    const circles = ['C1', 'C2', 'C3', 'C4', 'C5'];
    const risks = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    
    for (let i = 1; i <= 50; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const stage = stages[Math.floor(Math.random() * stages.length)];
      const circle = circles[Math.floor(Math.random() * circles.length)];
      const risk = risks[Math.floor(Math.random() * risks.length)];
      
      const project = {
        projectId: `DEMO-${i.toString().padStart(3, '0')}`,
        projectName: `Sample Project ${i} - ${category} Development`,
        category,
        currentStage: stage,
        workType: 'Infrastructure',
        totalBudget: (Math.random() * 500 + 10) * 10000000, // 10-500 Cr
        physicalProgress: Math.floor(Math.random() * 100),
        riskLevel: risk,
        location: {
          circle,
          mandal: `Mandal ${i % 10 + 1}`,
          village: `Village ${i % 20 + 1}`
        },
        timeline: {
          delayDays: Math.floor(Math.random() * 120 - 30)
        },
        financial: {
          budgetUtilization: Math.floor(Math.random() * 150 + 50)
        },
        contractor: {
          name: `Contractor ${i % 15 + 1}`,
          grade: ['AAA', 'AA', 'A', 'B'][Math.floor(Math.random() * 4)],
          performanceRating: Math.random() * 2 + 3 // 3-5 rating
        },
        governmentApproval: {
          goNumber: `G.O.Ms.No.${100 + i}`,
          approvalAuthority: 'CHIEF_ENGINEER'
        },
        hasCriticalIssues: risk === 'CRITICAL'
      };
      
      project.ceScore = calculateCEScore(project);
      sampleProjects.push(project);
    }
    
    return sampleProjects;
  };

  // Handle data refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  // Handle data export
  const handleExport = (filteredProjects: any[]) => {
    const dataStr = JSON.stringify(filteredProjects, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hmda-filtered-projects.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          flexDirection="column"
          gap={2}
        >
          <CircularProgress size={60} />
          <Box textAlign="center">
            Loading HMDA Project Data...
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          {error && (
            <Alert severity="warning" sx={{ m: 2 }}>
              {error} - Using sample data for demonstration.
            </Alert>
          )}
          
          <ChiefEngineerDashboard
            projects={projects}
            loading={loading}
            error={error}
            onRefresh={handleRefresh}
            onExport={handleExport}
          />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default FilteringSystemDemo;