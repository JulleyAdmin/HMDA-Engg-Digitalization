import React, { useState, useEffect } from 'react';
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
  Chip,
  Skeleton,
  CircularProgress,
  Fade,
  Grow
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
  loading?: boolean;
  showProgress?: boolean;
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

const SmartTimeline: React.FC<SmartTimelineProps> = ({ 
  currentStage, 
  projectTimeline, 
  loading = false, 
  showProgress = true 
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const [animateProgress, setAnimateProgress] = useState(false);
  const [stagesLoaded, setStagesLoaded] = useState<boolean[]>(new Array(9).fill(false));

  // Simulate loading states for stages
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setAnimateProgress(true);
        // Stagger the loading of stages for visual effect
        Object.keys(stages).forEach((_, index) => {
          setTimeout(() => {
            setStagesLoaded(prev => {
              const newLoaded = [...prev];
              newLoaded[index] = true;
              return newLoaded;
            });
          }, index * 150); // 150ms delay between each stage
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

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

  // Loading skeleton component
  const TimelineSkeleton = () => (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Skeleton variant="text" width={120} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 1 }} />
      </Stack>
      
      <Box sx={{ overflowX: 'auto', pb: 2 }}>
        <Stack direction="row" spacing={0} alignItems="center" sx={{ minWidth: 'max-content' }}>
          {Array.from({ length: 9 }).map((_, index) => (
            <React.Fragment key={index}>
              <Box sx={{ position: 'relative' }}>
                <Skeleton 
                  variant="circular" 
                  width={40} 
                  height={40}
                  animation="wave"
                  sx={{
                    animationDelay: `${index * 0.1}s`
                  }}
                />
                <Skeleton 
                  variant="text" 
                  width={60} 
                  height={16} 
                  sx={{ 
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    mt: 1,
                    animationDelay: `${index * 0.1}s`
                  }} 
                />
              </Box>
              {index < 8 && (
                <Skeleton 
                  variant="rectangular" 
                  width={40} 
                  height={4}
                  animation="wave"
                  sx={{
                    flex: 1,
                    minWidth: 40,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Stack>
      </Box>
    </Box>
  );

  // Enhanced progress indicator with pulse animation
  const EnhancedProgressIndicator = ({ progress, stage }: { progress: number; stage: ProjectStage }) => (
    <Box
      sx={{
        position: 'relative',
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Background circle */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={36}
        thickness={3}
        sx={{
          position: 'absolute',
          color: theme.palette.grey[200],
        }}
      />
      
      {/* Progress circle with animation */}
      <CircularProgress
        variant="determinate"
        value={animateProgress ? progress : 0}
        size={36}
        thickness={3}
        sx={{
          position: 'absolute',
          color: getProgressBarColor(stages[stage] || {} as StageInfo),
          transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'rotate(-90deg)',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }}
      />
      
      {/* Center content */}
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: 'primary.main'
        }}
      >
        {progress}%
      </Typography>
      
      {/* Pulse animation for active stages */}
      {stages[stage]?.status === 'active' && (
        <Box
          sx={{
            position: 'absolute',
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(1)',
                opacity: 0.8,
              },
              '70%': {
                transform: 'scale(1.1)',
                opacity: 0,
              },
              '100%': {
                transform: 'scale(1)',
                opacity: 0,
              },
            },
          }}
        />
      )}
    </Box>
  );

  if (loading) {
    return <TimelineSkeleton />;
  }

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
            const isLoaded = stagesLoaded[index];
            
            return (
              <React.Fragment key={stage}>
                {/* Stage Node */}
                <Grow
                  in={isLoaded}
                  timeout={{
                    enter: 500,
                    exit: 300,
                  }}
                  style={{
                    transformOrigin: '50% 50%',
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    {/* Enhanced progress visualization for active stages */}
                    {info.status === 'active' && showProgress && info.progress !== undefined ? (
                      <Tooltip title={`${info.name} (${info.progress}% complete)`}>
                        <Box
                          onClick={(e) => handleStageClick(e, stage)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <EnhancedProgressIndicator progress={info.progress} stage={stage} />
                        </Box>
                      </Tooltip>
                    ) : (
                      <Tooltip title={`${info.name} (${info.plannedDuration})`}>
                        <IconButton
                          size="small"
                          onClick={(e) => handleStageClick(e, stage)}
                          sx={{
                            p: 0.5,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: alpha(getStageColor(info), 0.1),
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          {getStageIcon(stage, info)}
                        </IconButton>
                      </Tooltip>
                    )}
                  
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
                  
                  {/* Animated Status Indicator */}
                  {info.status === 'active' && (
                    <Fade in={animateProgress} timeout={1000}>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          mb: 0.5,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            animation: 'blink 1s infinite',
                            '@keyframes blink': {
                              '0%, 50%': { opacity: 1 },
                              '51%, 100%': { opacity: 0.3 },
                            },
                          }}
                        />
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: 'primary.main'
                          }}
                        >
                          {info.progress ? `${info.progress}%` : 'Active'}
                        </Typography>
                      </Box>
                    </Fade>
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
                </Grow>

                {/* Enhanced Connector Line */}
                {!isLast && (
                  <Grow
                    in={isLoaded}
                    timeout={{
                      enter: 600 + (index * 100),
                      exit: 300,
                    }}
                  >
                    <Box sx={{ 
                      flex: 1, 
                      height: 4,
                      minWidth: 40,
                      bgcolor: info.status === 'completed' ? getStageColor(info) : 'grey.300',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 2,
                      transition: 'all 0.5s ease'
                    }}>
                      {info.status === 'active' && info.progress !== undefined && (
                        <Box
                          sx={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: animateProgress ? `${info.progress}%` : '0%',
                            bgcolor: getProgressBarColor(info),
                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            borderRadius: 2,
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              width: '20px',
                              height: '100%',
                              background: `linear-gradient(90deg, transparent 0%, ${alpha(theme.palette.common.white, 0.8)} 100%)`,
                              animation: info.progress > 0 && info.progress < 100 ? 'shimmer 2s infinite' : 'none',
                              '@keyframes shimmer': {
                                '0%': { transform: 'translateX(-20px)' },
                                '100%': { transform: 'translateX(20px)' },
                              }
                            }
                          }}
                        />
                      )}
                      
                      {/* Flow animation for completed stages */}
                      {info.status === 'completed' && animateProgress && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: '-10px',
                            width: '10px',
                            height: '100%',
                            background: `linear-gradient(90deg, transparent 0%, ${alpha(theme.palette.common.white, 0.6)} 50%, transparent 100%)`,
                            animation: 'flow 3s ease-in-out infinite',
                            '@keyframes flow': {
                              '0%': { left: '-10px' },
                              '100%': { left: '100%' },
                            }
                          }}
                        />
                      )}
                    </Box>
                  </Grow>
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