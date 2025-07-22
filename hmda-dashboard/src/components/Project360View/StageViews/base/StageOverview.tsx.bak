import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import { HMDAProject, ProjectStage } from '../../../../types/Project';

export interface StageOverviewProps {
  project: HMDAProject;
  stageTitle: string;
  stageNumber: number;
  duration: string;
  progress: number;
  status: 'completed' | 'active' | 'future' | 'delayed';
  children: React.ReactNode;
  compactMode?: boolean;
  showProgress?: boolean;
}

const StageOverview: React.FC<StageOverviewProps> = ({
  project,
  stageTitle,
  stageNumber,
  duration,
  progress,
  status,
  children,
  compactMode = false,
  showProgress = true
}) => {
  const theme = useTheme();

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return theme.palette.success.main;
      case 'active': return theme.palette.primary.main;
      case 'delayed': return theme.palette.warning.main;
      default: return theme.palette.grey[400];
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed': return 'COMPLETED';
      case 'active': return 'IN PROGRESS';
      case 'delayed': return 'DELAYED';
      default: return 'PENDING';
    }
  };

  const getProgressText = () => {
    if (status === 'completed') return '100%';
    if (status === 'future') return '0%';
    return `${progress}%`;
  };

  return (
    <Box>
      {/* Stage Header */}
      <Box
        sx={{
          p: compactMode ? 2 : 3,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${alpha(getStatusColor(), 0.05)} 0%, ${alpha(getStatusColor(), 0.02)} 100%)`,
          border: `1px solid ${alpha(getStatusColor(), 0.2)}`,
          position: 'relative',
          overflow: 'hidden',
          mb: 3,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${getStatusColor()} 0%, ${alpha(getStatusColor(), 0.7)} 100%)`
          }
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box flex={1}>
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <Typography 
                variant="h5" 
                fontWeight={700}
                sx={{ 
                  fontSize: compactMode ? '1.1rem' : '1.25rem',
                  color: 'text.primary'
                }}
              >
                STAGE {stageNumber}: {stageTitle.toUpperCase()}
              </Typography>
              
              <Chip
                label={getStatusText()}
                size="small"
                sx={{
                  bgcolor: alpha(getStatusColor(), 0.1),
                  color: getStatusColor(),
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  border: `1px solid ${alpha(getStatusColor(), 0.3)}`
                }}
              />
            </Stack>

            <Stack 
              direction={compactMode ? "column" : "row"} 
              alignItems={compactMode ? "flex-start" : "center"} 
              spacing={compactMode ? 0.5 : 3}
              sx={{ mb: showProgress ? 2 : 0 }}
            >
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Duration: {duration}
              </Typography>
              
              {status === 'active' && (
                <>
                  <Typography variant="body2" color="text.secondary">
                    Day {Math.floor(Math.random() * 45 + 15)} of {Math.floor(Math.random() * 180 + 90)}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    Progress: {getProgressText()}
                  </Typography>
                </>
              )}
            </Stack>

            {/* Progress Bar */}
            {showProgress && status !== 'future' && (
              <Box sx={{ width: '100%', maxWidth: 400 }}>
                <LinearProgress
                  variant="determinate"
                  value={status === 'completed' ? 100 : progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: alpha(getStatusColor(), 0.1),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      bgcolor: getStatusColor(),
                      transition: 'all 0.8s ease-in-out'
                    }
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Project Info Summary */}
          <Box sx={{ textAlign: 'right', minWidth: 200 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Project: {project.projectName.substring(0, 30)}...
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              ID: {project.projectId}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Location: {project.location.locality}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Stage Content */}
      <Box>
        {children}
      </Box>
    </Box>
  );
};

export default StageOverview;