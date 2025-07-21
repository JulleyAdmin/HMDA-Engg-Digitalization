import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Chip,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import {
  ArrowBack,
  Menu,
  Star,
  Bolt,
  Help,
  StarBorder
} from '@mui/icons-material';
import { HMDAProject } from '../../types/Project';
import dataService from '../../services/dataService';

interface ProjectHeaderProps {
  project: HMDAProject;
  onBack?: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, onBack }) => {
  const theme = useTheme();
  
  // Calculate CE Score based on various factors
  const calculateCEScore = (): { score: number; status: 'good' | 'caution' | 'critical' } => {
    let score = 70; // Base score
    
    // Timeline performance (30 points)
    const delayDays = project.timeline?.delayDays || 0;
    if (delayDays <= 0) score += 30;
    else if (delayDays <= 30) score += 20;
    else if (delayDays <= 60) score += 10;
    else score += 0;
    
    // Budget performance (30 points)
    const budgetUtilization = project.financial?.budgetUtilization || 0;
    if (budgetUtilization <= 100) score += 30;
    else if (budgetUtilization <= 110) score += 20;
    else if (budgetUtilization <= 120) score += 10;
    else score += 0;
    
    // Physical progress (20 points)
    const progressRatio = project.physicalProgress / (project.timeline?.percentageElapsed || 100);
    if (progressRatio >= 1) score += 20;
    else if (progressRatio >= 0.9) score += 15;
    else if (progressRatio >= 0.8) score += 10;
    else score += 5;
    
    // Risk level (20 points)
    switch (project.riskLevel) {
      case 'LOW': score += 20; break;
      case 'MEDIUM': score += 15; break;
      case 'HIGH': score += 5; break;
      case 'CRITICAL': score += 0; break;
    }
    
    // Determine status
    let status: 'good' | 'caution' | 'critical';
    if (score >= 85) status = 'good';
    else if (score >= 70) status = 'caution';
    else status = 'critical';
    
    return { score: Math.min(100, Math.max(0, score)), status };
  };

  const { score: ceScore, status: ceStatus } = calculateCEScore();
  
  const getStatusColor = () => {
    switch (ceStatus) {
      case 'good': return theme.palette.success.main;
      case 'caution': return theme.palette.warning.main;
      case 'critical': return theme.palette.error.main;
    }
  };

  const getStatusEmoji = () => {
    switch (ceStatus) {
      case 'good': return '🟢';
      case 'caution': return '🟡';
      case 'critical': return '🔴';
    }
  };

  // Get project rank (mock data)
  const projectRank = 3;
  const totalProjects = 45;

  return (
    <Box sx={{ 
      px: { xs: 2, sm: 3 }, 
      py: 2,
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    }}>
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={{ xs: 2, md: 3 }}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
      >
        {/* Left Section - Project Info */}
        <Stack direction="row" spacing={2} alignItems="flex-start" flex={1}>
          {/* Back Button */}
          {onBack && (
            <Tooltip title="Back to Projects Table">
              <IconButton onClick={onBack} size="small">
                <ArrowBack />
              </IconButton>
            </Tooltip>
          )}
          
          {/* Project Details */}
          <Box flex={1}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }} alignItems={{ xs: 'flex-start', sm: 'center' }}>
              {/* Project ID */}
              <Box>
                <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
                  PROJECT ID
                </Typography>
                <Typography variant="h6" fontWeight={700} fontSize={{ xs: '0.875rem', sm: '1rem' }}>
                  {project.projectId}
                </Typography>
              </Box>

              {/* Project Name */}
              <Box flex={1}>
                <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
                  PROJECT NAME
                </Typography>
                <Typography variant="h6" fontWeight={600} fontSize={{ xs: '0.875rem', sm: '1rem' }}>
                  {project.projectName}
                </Typography>
              </Box>

              {/* Total Value */}
              <Box>
                <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
                  TOTAL VALUE
                </Typography>
                <Typography variant="h6" fontWeight={700} fontSize={{ xs: '0.875rem', sm: '1rem' }}>
                  {dataService.formatCurrency(project.totalBudget)}
                </Typography>
              </Box>

              {/* CE Score */}
              <Box>
                <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
                  CE SCORE
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography 
                    variant="h6" 
                    fontWeight={700} 
                    fontSize={{ xs: '0.875rem', sm: '1rem' }}
                    color={getStatusColor()}
                  >
                    {ceScore}/100
                  </Typography>
                  <Typography variant="body2">
                    {getStatusEmoji()}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" fontSize="0.65rem">
                  Rank: {projectRank}/{totalProjects}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>

        {/* Right Section - Quick Actions */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="View all details/history">
            <IconButton size="small" sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
            }}>
              <Menu fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Add to CE watchlist">
            <IconButton size="small" sx={{ 
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              '&:hover': { bgcolor: alpha(theme.palette.warning.main, 0.2) }
            }}>
              <StarBorder fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Emergency escalation mode">
            <IconButton size="small" sx={{ 
              bgcolor: alpha(theme.palette.error.main, 0.1),
              '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) }
            }}>
              <Bolt fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="AI assistant for this project">
            <IconButton size="small" sx={{ 
              bgcolor: alpha(theme.palette.info.main, 0.1),
              '&:hover': { bgcolor: alpha(theme.palette.info.main, 0.2) }
            }}>
              <Help fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Back to Table Button */}
          {onBack && (
            <Button
              variant="outlined"
              size="small"
              onClick={onBack}
              sx={{ ml: 2, display: { xs: 'none', sm: 'flex' } }}
            >
              ← Table
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProjectHeader;