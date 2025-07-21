import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import { HMDAProject } from '../../types/Project';
import ProjectHeader from './ProjectHeader';
import SmartTimeline from './SmartTimeline';
import DynamicContentArea from './DynamicContentArea';
import SmartSidebar from './SmartSidebar';
import PredictiveInsights from './PredictiveInsights';

interface Project360ViewProps {
  project: HMDAProject;
  onBack?: () => void;
}

const Project360View: React.FC<Project360ViewProps> = ({ project, onBack }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      pb: 3 
    }}>
      {/* Project Header - Always visible */}
      <Paper 
        elevation={0} 
        sx={{ 
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          borderRadius: 0,
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <ProjectHeader project={project} onBack={onBack} />
      </Paper>

      {/* Smart Timeline - Interactive */}
      <Box sx={{ 
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        py: 2,
        px: { xs: 2, sm: 3 }
      }}>
        <SmartTimeline 
          currentStage={project.currentStage} 
          projectTimeline={project.timeline}
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
          gap: 3,
          flexDirection: isTablet ? 'column' : 'row'
        }}>
          {/* Main Dashboard */}
          <Box sx={{ 
            flex: 1,
            minWidth: 0 // Prevent overflow
          }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              }}
            >
              <DynamicContentArea 
                project={project}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
              />
            </Paper>
          </Box>

          {/* Smart Sidebar - Hidden on mobile */}
          {!isMobile && (
            <Box sx={{ 
              width: isTablet ? '100%' : 320,
              flexShrink: 0
            }}>
              <SmartSidebar 
                project={project}
                currentStage={project.currentStage}
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
  );
};

export default Project360View;