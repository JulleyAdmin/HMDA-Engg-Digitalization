import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  IconButton,
  Collapse,
  LinearProgress,
  useTheme,
  alpha,
  Button,
  Tooltip,
  Grid
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import {
  CheckCircle,
  RadioButtonUnchecked,
  Warning,
  Schedule,
  ExpandMore,
  ExpandLess,
  Flag,
  Construction,
  Description,
  Assignment
} from '@mui/icons-material';
import { HMDAProject } from '../../../../types/Project';

interface Milestone {
  id: string;
  name: string;
  plannedDate: Date;
  actualDate?: Date;
  status: 'completed' | 'in-progress' | 'upcoming' | 'delayed';
  progress: number;
  dependencies: string[];
  deliverables: string[];
  criticalPath: boolean;
}

interface MilestoneTrackerProps {
  project: HMDAProject;
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ project }) => {
  const theme = useTheme();
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);

  // Generate milestones based on project data
  const milestones: Milestone[] = [
    {
      id: 'M1',
      name: 'Project Initiation & Approvals',
      plannedDate: new Date('2023-01-15'),
      actualDate: new Date('2023-01-20'),
      status: 'completed',
      progress: 100,
      dependencies: [],
      deliverables: ['Project Charter', 'Stakeholder Register', 'Initial Budget Approval'],
      criticalPath: true
    },
    {
      id: 'M2',
      name: 'Design & DPR Completion',
      plannedDate: new Date('2023-04-30'),
      actualDate: new Date('2023-05-10'),
      status: 'completed',
      progress: 100,
      dependencies: ['M1'],
      deliverables: ['Detailed Project Report', 'Design Drawings', 'BOQ'],
      criticalPath: true
    },
    {
      id: 'M3',
      name: 'Tender Award',
      plannedDate: new Date('2023-06-30'),
      actualDate: new Date('2023-07-05'),
      status: 'completed',
      progress: 100,
      dependencies: ['M2'],
      deliverables: ['Tender Document', 'Contractor Agreement', 'Work Order'],
      criticalPath: true
    },
    {
      id: 'M4',
      name: 'Foundation Completion',
      plannedDate: new Date('2023-12-31'),
      actualDate: new Date('2024-01-15'),
      status: 'completed',
      progress: 100,
      dependencies: ['M3'],
      deliverables: ['Foundation Certificate', 'Soil Test Reports', 'Structural Certification'],
      criticalPath: true
    },
    {
      id: 'M5',
      name: 'Structural Work - 50%',
      plannedDate: new Date('2024-06-30'),
      actualDate: undefined,
      status: 'in-progress',
      progress: 75,
      dependencies: ['M4'],
      deliverables: ['Progress Certificate', 'Quality Test Reports', 'Safety Compliance'],
      criticalPath: true
    },
    {
      id: 'M6',
      name: 'Structural Work - 100%',
      plannedDate: new Date('2024-12-31'),
      actualDate: undefined,
      status: 'upcoming',
      progress: 0,
      dependencies: ['M5'],
      deliverables: ['Completion Certificate', 'Final Structural Report', 'As-Built Drawings'],
      criticalPath: true
    },
    {
      id: 'M7',
      name: 'Project Commissioning',
      plannedDate: new Date('2025-06-30'),
      actualDate: undefined,
      status: 'upcoming',
      progress: 0,
      dependencies: ['M6'],
      deliverables: ['Commissioning Report', 'O&M Manual', 'Handover Certificate'],
      criticalPath: true
    }
  ];

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle />;
      case 'in-progress':
        return <Construction />;
      case 'delayed':
        return <Warning />;
      default:
        return <RadioButtonUnchecked />;
    }
  };

  const getMilestoneTimelineDotColor = (status: string): 'success' | 'primary' | 'warning' | 'inherit' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'primary';
      case 'delayed':
        return 'warning';
      default:
        return 'inherit';
    }
  };

  const getMilestoneChipColor = (status: string): 'success' | 'primary' | 'warning' | 'default' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'primary';
      case 'delayed':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const calculateDelayDays = (milestone: Milestone) => {
    if (milestone.actualDate && milestone.plannedDate) {
      const delay = Math.floor((milestone.actualDate.getTime() - milestone.plannedDate.getTime()) / (1000 * 60 * 60 * 24));
      return delay;
    }
    if (milestone.status === 'in-progress' || milestone.status === 'delayed') {
      const today = new Date();
      const delay = Math.floor((today.getTime() - milestone.plannedDate.getTime()) / (1000 * 60 * 60 * 24));
      return delay > 0 ? delay : 0;
    }
    return 0;
  };

  const toggleExpanded = (milestoneId: string) => {
    setExpandedMilestone(expandedMilestone === milestoneId ? null : milestoneId);
  };

  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const overallProgress = (completedCount / milestones.length) * 100;

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Milestone Tracker
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {completedCount} of {milestones.length} milestones completed
            </Typography>
          </Box>
          <Stack direction="row" gap={2} alignItems="center">
            <Box sx={{ minWidth: 120 }}>
              <Typography variant="caption" color="text.secondary">
                Overall Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={overallProgress}
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: alpha(theme.palette.primary.main, 0.1)
                }}
              />
            </Box>
            <Button variant="outlined" size="small" startIcon={<Assignment />}>
              Export
            </Button>
          </Stack>
        </Stack>

        <Timeline position="right">
          {milestones.map((milestone, index) => {
            const delayDays = calculateDelayDays(milestone);
            const isExpanded = expandedMilestone === milestone.id;

            return (
              <TimelineItem key={milestone.id}>
                <TimelineOppositeContent sx={{ flex: 0.3, m: 'auto 0' }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(milestone.plannedDate)}
                  </Typography>
                  {milestone.actualDate && (
                    <Typography variant="caption" color="success.main">
                      Actual: {formatDate(milestone.actualDate)}
                    </Typography>
                  )}
                  {delayDays > 0 && (
                    <Chip
                      label={`${delayDays}d delay`}
                      size="small"
                      color="warning"
                      sx={{ mt: 0.5 }}
                    />
                  )}
                </TimelineOppositeContent>
                
                <TimelineSeparator>
                  <TimelineConnector sx={{ bgcolor: index === 0 ? 'transparent' : 'grey.300' }} />
                  <TimelineDot color={getMilestoneTimelineDotColor(milestone.status)}>
                    {getMilestoneIcon(milestone.status)}
                  </TimelineDot>
                  <TimelineConnector sx={{ bgcolor: index === milestones.length - 1 ? 'transparent' : 'grey.300' }} />
                </TimelineSeparator>
                
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      p: 2,
                      bgcolor: milestone.criticalPath ? alpha(theme.palette.error.main, 0.05) : 'background.paper',
                      borderColor: milestone.criticalPath ? 'error.main' : 'divider'
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box flex={1}>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {milestone.name}
                          </Typography>
                          {milestone.criticalPath && (
                            <Tooltip title="Critical Path">
                              <Flag sx={{ fontSize: 16, color: 'error.main' }} />
                            </Tooltip>
                          )}
                        </Stack>
                        
                        <Stack direction="row" spacing={1} mb={1}>
                          <Chip
                            label={milestone.status.replace('-', ' ')}
                            size="small"
                            color={getMilestoneChipColor(milestone.status)}
                            variant="filled"
                          />
                          <Chip
                            label={`${milestone.id}`}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>

                        {milestone.status === 'in-progress' && (
                          <Box mb={1}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                              <Typography variant="caption" color="text.secondary">
                                Progress
                              </Typography>
                              <Typography variant="caption" fontWeight={600}>
                                {milestone.progress}%
                              </Typography>
                            </Stack>
                            <LinearProgress
                              variant="determinate"
                              value={milestone.progress}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                        )}
                      </Box>
                      
                      <IconButton
                        size="small"
                        onClick={() => toggleExpanded(milestone.id)}
                        sx={{ ml: 1 }}
                      >
                        {isExpanded ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Stack>

                    <Collapse in={isExpanded}>
                      <Box mt={2} pt={2} borderTop={1} borderColor="divider">
                        <Box display="flex" flexWrap="wrap" gap={2}>
                          <Box flex="1 1 150px">
                            <Typography variant="caption" fontWeight={600} color="text.secondary">
                              Deliverables
                            </Typography>
                            <Stack spacing={0.5} mt={1}>
                              {milestone.deliverables.map((deliverable, idx) => (
                                <Stack key={idx} direction="row" spacing={0.5} alignItems="center">
                                  <Description sx={{ fontSize: 14, color: 'text.secondary' }} />
                                  <Typography variant="caption">
                                    {deliverable}
                                  </Typography>
                                </Stack>
                              ))}
                            </Stack>
                          </Box>
                          
                          <Box flex="1 1 150px">
                            <Typography variant="caption" fontWeight={600} color="text.secondary">
                              Dependencies
                            </Typography>
                            <Stack spacing={0.5} mt={1}>
                              {milestone.dependencies.length > 0 ? (
                                milestone.dependencies.map((dep, idx) => (
                                  <Typography key={idx} variant="caption">
                                    Depends on {dep}
                                  </Typography>
                                ))
                              ) : (
                                <Typography variant="caption" color="text.secondary">
                                  No dependencies
                                </Typography>
                              )}
                            </Stack>
                          </Box>
                        </Box>
                      </Box>
                    </Collapse>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>

        {/* Summary Stats */}
        <Box mt={3} p={2} bgcolor={alpha(theme.palette.background.default, 0.5)} borderRadius={1}>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <Box flex="1 1 150px">
              <Stack alignItems="center">
                <Typography variant="h6" fontWeight={600} color="success.main">
                  {milestones.filter(m => m.status === 'completed').length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Completed
                </Typography>
              </Stack>
            </Box>
            <Box flex="1 1 150px">
              <Stack alignItems="center">
                <Typography variant="h6" fontWeight={600} color="primary.main">
                  {milestones.filter(m => m.status === 'in-progress').length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  In Progress
                </Typography>
              </Stack>
            </Box>
            <Box flex="1 1 150px">
              <Stack alignItems="center">
                <Typography variant="h6" fontWeight={600} color="warning.main">
                  {milestones.filter(m => calculateDelayDays(m) > 0).length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Delayed
                </Typography>
              </Stack>
            </Box>
            <Box flex="1 1 150px">
              <Stack alignItems="center">
                <Typography variant="h6" fontWeight={600}>
                  {milestones.filter(m => m.criticalPath).length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Critical Path
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MilestoneTracker;