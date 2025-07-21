import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  LinearProgress,
  Stack,
  useTheme,
  alpha,
  Popover,
  Paper,
  Chip
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  PlayCircleFilled,
  Warning,
  Info
} from '@mui/icons-material';
import { ProjectStage } from '../../types/Project';

interface SmartTimelineProps {
  currentStage: ProjectStage;
  projectTimeline?: any; // We'll define proper timeline type later
}

interface StageInfo {
  name: string;
  shortName: string;
  plannedDuration: string;
  actualDuration?: string;
  status: 'completed' | 'active' | 'future' | 'delayed';
  progress?: number;
  milestones?: string[];
  issues?: string[];
}

const SmartTimeline: React.FC<SmartTimelineProps> = ({ currentStage, projectTimeline }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  // Define all 9 stages with their information
  const stages: Partial<Record<ProjectStage, StageInfo>> = {
    [ProjectStage.CONCEPTUALIZATION]: {
      name: 'Project Conceptualization & Feasibility',
      shortName: 'Concept',
      plannedDuration: '3-6 mo',
      actualDuration: '3 mo',
      status: currentStage >= ProjectStage.CONCEPTUALIZATION ? 'completed' : 'future',
      progress: 100,
      milestones: ['Need Analysis', 'Site Inspection', 'Feasibility Report']
    },
    [ProjectStage.DPR_APPROVALS]: {
      name: 'Detailed Project Report & Approvals',
      shortName: 'DPR',
      plannedDuration: '4-8 mo',
      actualDuration: '8 mo',
      status: currentStage > ProjectStage.DPR_APPROVALS ? 'completed' : 
               currentStage === ProjectStage.DPR_APPROVALS ? 'active' : 'future',
      progress: currentStage === ProjectStage.DPR_APPROVALS ? 65 : 100,
      milestones: ['Consultant Selection', 'DPR Submission', 'Technical Sanction']
    },
    [ProjectStage.TENDERING]: {
      name: 'Tendering & Procurement',
      shortName: 'Tender',
      plannedDuration: '2-4 mo',
      actualDuration: '4 mo',
      status: currentStage > ProjectStage.TENDERING ? 'completed' : 
               currentStage === ProjectStage.TENDERING ? 'active' : 'future',
      progress: currentStage === ProjectStage.TENDERING ? 40 : 100,
      milestones: ['NIT Publication', 'Pre-bid Meeting', 'Bid Evaluation']
    },
    [ProjectStage.CONTRACT_AWARD]: {
      name: 'Contract Award & Mobilization',
      shortName: 'Award',
      plannedDuration: '1-2 mo',
      actualDuration: '1 mo',
      status: currentStage > ProjectStage.CONTRACT_AWARD ? 'completed' : 
               currentStage === ProjectStage.CONTRACT_AWARD ? 'active' : 'future',
      progress: currentStage === ProjectStage.CONTRACT_AWARD ? 80 : 100,
      milestones: ['LOA Issue', 'Agreement Signing', 'Site Handover']
    },
    [ProjectStage.CONSTRUCTION]: {
      name: 'Construction/Execution Phase',
      shortName: 'Construction',
      plannedDuration: '18-30 mo',
      actualDuration: currentStage >= ProjectStage.CONSTRUCTION ? '18/30 mo' : undefined,
      status: currentStage > ProjectStage.CONSTRUCTION ? 'completed' : 
               currentStage === ProjectStage.CONSTRUCTION ? 'active' : 'future',
      progress: currentStage === ProjectStage.CONSTRUCTION ? 65 : 0,
      milestones: ['Foundation', 'Superstructure', 'Finishing'],
      issues: currentStage === ProjectStage.CONSTRUCTION ? ['Land dispute at Ch 2+300'] : undefined
    },
    [ProjectStage.QUALITY_CONTROL]: {
      name: 'Quality Control & Monitoring',
      shortName: 'QC',
      plannedDuration: 'Continuous',
      status: currentStage >= ProjectStage.CONSTRUCTION ? 'active' : 'future',
      progress: currentStage >= ProjectStage.CONSTRUCTION ? 95 : 0,
      milestones: ['Material Testing', 'Third Party Audit', 'NCR Resolution']
    },
    [ProjectStage.TESTING_COMMISSIONING]: {
      name: 'Testing & Commissioning',
      shortName: 'Testing',
      plannedDuration: '1-3 mo',
      status: currentStage > ProjectStage.TESTING_COMMISSIONING ? 'completed' : 
               currentStage === ProjectStage.TESTING_COMMISSIONING ? 'active' : 'future',
      progress: 0,
      milestones: ['Load Testing', 'Performance Trials', 'Safety Clearance']
    },
    [ProjectStage.HANDOVER]: {
      name: 'Project Handover',
      shortName: 'Handover',
      plannedDuration: '1 mo',
      status: currentStage > ProjectStage.HANDOVER ? 'completed' : 
               currentStage === ProjectStage.HANDOVER ? 'active' : 'future',
      progress: 0,
      milestones: ['Final Documentation', 'Asset Transfer', 'O&M Training']
    },
    [ProjectStage.DLP_OM]: {
      name: 'Defect Liability Period',
      shortName: 'DLP',
      plannedDuration: '12 mo',
      status: currentStage === ProjectStage.DLP_OM ? 'active' : 'future',
      progress: 0,
      milestones: ['Defect Identification', 'Rectification', 'Final Certificate']
    }
  };

  const handleStageClick = (event: React.MouseEvent<HTMLElement>, stage: ProjectStage) => {
    setAnchorEl(event.currentTarget);
    setSelectedStage(stage);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedStage(null);
  };

  const getStageIcon = (stage: ProjectStage, info: StageInfo) => {
    switch (info.status) {
      case 'completed':
        return <CheckCircle sx={{ color: theme.palette.success.main }} />;
      case 'active':
        return <PlayCircleFilled sx={{ color: theme.palette.primary.main }} />;
      case 'delayed':
        return <Warning sx={{ color: theme.palette.warning.main }} />;
      default:
        return <RadioButtonUnchecked sx={{ color: theme.palette.grey[400] }} />;
    }
  };

  const getStageColor = (info: StageInfo) => {
    switch (info.status) {
      case 'completed':
        return theme.palette.success.main;
      case 'active':
        return theme.palette.primary.main;
      case 'delayed':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[400];
    }
  };

  const getProgressBarColor = (info: StageInfo) => {
    if (info.status === 'delayed') return theme.palette.warning.main;
    if (info.status === 'active') return theme.palette.primary.main;
    return theme.palette.success.main;
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      {/* Timeline Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Typography variant="h6" fontWeight={600} fontSize="1rem">
          Project Timeline
        </Typography>
        <Chip 
          label={`Stage ${currentStage} of 9`} 
          size="small" 
          color="primary"
          sx={{ fontWeight: 600 }}
        />
        {projectTimeline?.delayDays > 0 && (
          <Chip 
            icon={<Warning sx={{ fontSize: '0.875rem' }} />}
            label={`${projectTimeline.delayDays} days delay`} 
            size="small" 
            color="warning"
            sx={{ fontWeight: 600 }}
          />
        )}
      </Stack>

      {/* Timeline Visualization */}
      <Box sx={{ 
        overflowX: 'auto',
        pb: 2,
        '&::-webkit-scrollbar': {
          height: 6,
        },
        '&::-webkit-scrollbar-track': {
          bgcolor: 'grey.100',
          borderRadius: 3,
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: 'grey.400',
          borderRadius: 3,
        },
      }}>
        <Stack 
          direction="row" 
          spacing={0} 
          alignItems="center"
          sx={{ minWidth: 'max-content' }}
        >
          {Object.entries(stages).map(([stageNum, info], index) => {
            const stage = parseInt(stageNum) as ProjectStage;
            const isLast = index === Object.entries(stages).length - 1;
            
            return (
              <React.Fragment key={stage}>
                {/* Stage Node */}
                <Box sx={{ position: 'relative' }}>
                  <Tooltip title={`${info.name} (${info.plannedDuration})`}>
                    <IconButton
                      size="small"
                      onClick={(e) => handleStageClick(e, stage)}
                      sx={{
                        p: 0.5,
                        '&:hover': {
                          bgcolor: alpha(getStageColor(info), 0.1)
                        }
                      }}
                    >
                      {getStageIcon(stage, info)}
                    </IconButton>
                  </Tooltip>
                  
                  {/* Stage Label */}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      mt: 0.5,
                      fontSize: '0.65rem',
                      fontWeight: info.status === 'active' ? 700 : 500,
                      color: info.status === 'future' ? 'text.secondary' : 'text.primary',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {stage}
                  </Typography>
                  
                  {/* Progress Indicator for Active Stage */}
                  {info.status === 'active' && info.progress !== undefined && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        mb: 0.5,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: 'primary.main'
                      }}
                    >
                      ▶{info.progress}%
                    </Typography>
                  )}
                  
                  {/* Duration Display */}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      position: 'absolute',
                      top: 'calc(100% + 16px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '0.6rem',
                      color: 'text.secondary',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {info.actualDuration || info.plannedDuration}
                  </Typography>
                </Box>

                {/* Connector Line */}
                {!isLast && (
                  <Box sx={{ 
                    flex: 1, 
                    height: 4,
                    minWidth: 40,
                    bgcolor: info.status === 'completed' ? getStageColor(info) : 'grey.300',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {info.status === 'active' && info.progress !== undefined && (
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: `${info.progress}%`,
                          bgcolor: getProgressBarColor(info),
                          transition: 'width 0.3s ease'
                        }}
                      />
                    )}
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        </Stack>
      </Box>

      {/* Stage Details Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {selectedStage !== null && (
          <Paper sx={{ p: 2, maxWidth: 300 }}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              {stages[selectedStage as ProjectStage]?.name}
            </Typography>
            
            {stages[selectedStage as ProjectStage]?.milestones && (
              <Box mb={1}>
                <Typography variant="caption" color="text.secondary">
                  Key Milestones:
                </Typography>
                {stages[selectedStage as ProjectStage]?.milestones?.map((milestone: string, idx: number) => (
                  <Typography key={idx} variant="body2" fontSize="0.75rem">
                    • {milestone}
                  </Typography>
                ))}
              </Box>
            )}
            
            {stages[selectedStage as ProjectStage]?.issues && (
              <Box>
                <Typography variant="caption" color="error">
                  Current Issues:
                </Typography>
                {stages[selectedStage as ProjectStage]?.issues?.map((issue: string, idx: number) => (
                  <Typography key={idx} variant="body2" fontSize="0.75rem" color="error">
                    • {issue}
                  </Typography>
                ))}
              </Box>
            )}
            
            <Stack direction="row" spacing={1} mt={2}>
              <Chip 
                label={`Duration: ${stages[selectedStage as ProjectStage]?.actualDuration || stages[selectedStage as ProjectStage]?.plannedDuration}`} 
                size="small" 
                variant="outlined"
              />
              {stages[selectedStage as ProjectStage]?.progress !== undefined && stages[selectedStage as ProjectStage]?.progress! > 0 && (
                <Chip 
                  label={`Progress: ${stages[selectedStage as ProjectStage]?.progress}%`} 
                  size="small" 
                  color="primary"
                />
              )}
            </Stack>
          </Paper>
        )}
      </Popover>
    </Box>
  );
};

export default SmartTimeline;