import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
  Typography
} from '@mui/material';
import { HMDAProject } from '../../types/Project';
import ProjectHeader from './ProjectHeader';
import SmartTimeline from './SmartTimeline';
import DynamicContentArea from './DynamicContentArea';
import SmartSidebarWrapper from './SmartSidebarWrapper';
import PredictiveInsights from './PredictiveInsights';
import { FullscreenableCard } from '../FullscreenableCard';
import { FocusProvider, FocusableContainer } from '../FocusableContainer';
import { KeyboardShortcuts } from '../KeyboardShortcuts';

interface Project360ViewProps {
  project: HMDAProject;
  onBack?: () => void;
}

const Project360View: React.FC<Project360ViewProps> = ({ project, onBack }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedTab, setSelectedTab] = useState(0);
  const [timelineLoading, setTimelineLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  // Simulate initial loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimelineLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Add keyboard shortcut for sidebar toggle
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Press 'S' to toggle sidebar
      if (e.key === 's' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeElement = document.activeElement;
        // Don't toggle if user is typing in an input
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          setSidebarCollapsed(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <FocusProvider>
      <Box sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        pb: 3 
      }}>
        {/* Keyboard shortcuts handler */}
        <KeyboardShortcuts />
      {/* Project Header - Always visible */}
      <Box 
        sx={{ 
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        <ProjectHeader project={project} onBack={onBack} />
      </Box>

      {/* Smart Timeline - Interactive */}
      <Box sx={{ 
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        py: 2,
        px: { xs: 2, sm: 3 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)'
        }
      }}>
        <SmartTimeline 
          currentStage={project.currentStage} 
          projectTimeline={project.timeline}
          loading={timelineLoading}
          showProgress={true}
        />
      </Box>

      {/* Main Content Area */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          mt: 3,
          px: { xs: 2, sm: 3 }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          gap: sidebarCollapsed ? 2 : 3,
          flexDirection: isTablet ? 'column' : 'row',
          transition: 'all 0.3s ease'
        }}>
          {/* Main Dashboard */}
          <Box sx={{ 
            flex: 1,
            minWidth: 0, // Prevent overflow
            transition: 'all 0.3s ease'
          }}>
            <FullscreenableCard
              title={
                <Typography variant="h6" fontWeight={600}>
                  Project Dashboard - {project.projectName}
                </Typography>
              }
              sx={{ 
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)'
                }
              }}
              contentSx={{
                p: { xs: 2, sm: 3 },
              }}
              zIndexOffset={0}
            >
              <DynamicContentArea 
                project={project}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
              />
            </FullscreenableCard>
          </Box>

          {/* Smart Sidebar - Hidden on mobile */}
          {!isMobile && (
            <Box sx={{ 
              width: isTablet ? '100%' : (sidebarCollapsed ? 56 : 320),
              flexShrink: 0,
              transition: 'width 0.3s ease',
              position: 'relative'
            }}>
              <SmartSidebarWrapper 
                project={project}
                currentStage={project.currentStage}
                onCollapsedChange={setSidebarCollapsed}
              />
            </Box>
          )}
        </Box>

        {/* Predictive Insights Bar */}
        <Box sx={{ mt: 3 }}>
          <PredictiveInsights project={project} />
        </Box>
      </Container>
      </Box>
    </FocusProvider>
  );
};

export default Project360View;