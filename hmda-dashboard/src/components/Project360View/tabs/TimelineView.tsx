import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  IconButton,
  LinearProgress,
  useTheme,
  alpha,
  Tabs,
  Tab,
  Tooltip,
  Badge,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel
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
  Schedule,
  Event,
  Flag,
  CheckCircle,
  RadioButtonUnchecked,
  Warning,
  Construction,
  Assignment,
  Visibility,
  ExpandMore,
  FilterList,
  ZoomIn,
  ZoomOut,
  Today,
  CalendarMonth,
  TrendingUp,
  TrendingDown,
  PlayArrow,
  Pause,
  FastForward,
  SkipPrevious,
  Download,
  Share
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  ComposedChart
} from 'recharts';
import { HMDAProject } from '../../../types/Project';

interface TimelineActivity {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed' | 'cancelled';
  progress: number;
  category: 'planning' | 'design' | 'approval' | 'procurement' | 'construction' | 'quality' | 'handover';
  priority: 'critical' | 'high' | 'medium' | 'low';
  dependencies: string[];
  assignedTo: string;
  milestones: string[];
  deliverables: string[];
  resources: {
    manpower: number;
    equipment: string[];
    materials: string[];
  };
  budget: number;
  risks: string[];
  isOnCriticalPath: boolean;
  delayDays?: number;
  completionPercentage: number;
}

interface TimelineViewProps {
  project: HMDAProject;
}

const TimelineView: React.FC<TimelineViewProps> = ({ project }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [timelineZoom, setTimelineZoom] = useState('month');
  const [showCriticalPathOnly, setShowCriticalPathOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock timeline data
  const activities: TimelineActivity[] = [
    {
      id: 'ACT-001',
      title: 'Project Initiation & Feasibility',
      description: 'Project charter creation, feasibility study, and stakeholder identification',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-02-15'),
      actualStartDate: new Date('2023-01-01'),
      actualEndDate: new Date('2023-02-20'),
      status: 'completed',
      progress: 100,
      category: 'planning',
      priority: 'critical',
      dependencies: [],
      assignedTo: 'Project Management Office',
      milestones: ['Project Charter Approved', 'Feasibility Report Submitted'],
      deliverables: ['Project Charter', 'Feasibility Study Report', 'Stakeholder Matrix'],
      resources: {
        manpower: 8,
        equipment: ['Survey Equipment'],
        materials: []
      },
      budget: 2500000,
      risks: ['Stakeholder alignment delays'],
      isOnCriticalPath: true,
      completionPercentage: 100
    },
    {
      id: 'ACT-002',
      title: 'Detailed Project Report (DPR) Preparation',
      description: 'Technical design, cost estimation, and environmental impact assessment',
      startDate: new Date('2023-02-16'),
      endDate: new Date('2023-05-31'),
      actualStartDate: new Date('2023-02-20'),
      actualEndDate: new Date('2023-06-10'),
      status: 'completed',
      progress: 100,
      category: 'design',
      priority: 'critical',
      dependencies: ['ACT-001'],
      assignedTo: 'Design Consultant',
      milestones: ['Design 30% Complete', 'Design 60% Complete', 'DPR Finalized'],
      deliverables: ['Technical Drawings', 'Cost Estimates', 'BOQ', 'Environmental Clearance'],
      resources: {
        manpower: 15,
        equipment: ['CAD Workstations', 'Survey Equipment'],
        materials: []
      },
      budget: 8000000,
      risks: ['Design changes', 'Environmental clearance delays'],
      isOnCriticalPath: true,
      delayDays: 10,
      completionPercentage: 100
    },
    {
      id: 'ACT-003',
      title: 'Statutory Approvals & Clearances',
      description: 'Environmental, forest, railway, and other statutory clearances',
      startDate: new Date('2023-04-01'),
      endDate: new Date('2023-07-31'),
      actualStartDate: new Date('2023-04-05'),
      actualEndDate: new Date('2023-08-15'),
      status: 'completed',
      progress: 100,
      category: 'approval',
      priority: 'critical',
      dependencies: ['ACT-002'],
      assignedTo: 'Legal & Compliance Team',
      milestones: ['Environmental Clearance', 'Railway Clearance', 'All NOCs Obtained'],
      deliverables: ['Environmental Clearance Certificate', 'NOC Documents', 'Compliance Reports'],
      resources: {
        manpower: 5,
        equipment: [],
        materials: []
      },
      budget: 1500000,
      risks: ['Regulatory delays', 'Additional compliance requirements'],
      isOnCriticalPath: true,
      delayDays: 15,
      completionPercentage: 100
    },
    {
      id: 'ACT-004',
      title: 'Tendering & Contractor Selection',
      description: 'Tender preparation, bidding process, and contractor finalization',
      startDate: new Date('2023-08-01'),
      endDate: new Date('2023-10-15'),
      actualStartDate: new Date('2023-08-16'),
      actualEndDate: new Date('2023-10-25'),
      status: 'completed',
      progress: 100,
      category: 'procurement',
      priority: 'critical',
      dependencies: ['ACT-003'],
      assignedTo: 'Procurement Team',
      milestones: ['Tender Published', 'Bids Received', 'Contractor Selected'],
      deliverables: ['Tender Documents', 'Technical Evaluation Report', 'Work Order'],
      resources: {
        manpower: 8,
        equipment: [],
        materials: []
      },
      budget: 1000000,
      risks: ['Limited bidder response', 'Legal challenges'],
      isOnCriticalPath: true,
      delayDays: 10,
      completionPercentage: 100
    },
    {
      id: 'ACT-005',
      title: 'Foundation & Substructure Work',
      description: 'Pile foundation, pier construction up to ground level',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2024-05-31'),
      actualStartDate: new Date('2023-11-01'),
      actualEndDate: undefined,
      status: 'in-progress',
      progress: 85,
      category: 'construction',
      priority: 'critical',
      dependencies: ['ACT-004'],
      assignedTo: 'Main Contractor',
      milestones: ['Piling Complete', '50% Piers Complete', '100% Piers Complete'],
      deliverables: ['Foundation Completion Certificate', 'Quality Test Reports', 'As-built Drawings'],
      resources: {
        manpower: 120,
        equipment: ['Pile Boring Machine', 'Concrete Pumps', 'Cranes'],
        materials: ['Concrete', 'Steel', 'Cement']
      },
      budget: 180000000,
      risks: ['Monsoon delays', 'Material quality issues', 'Labor shortages'],
      isOnCriticalPath: true,
      completionPercentage: 85
    },
    {
      id: 'ACT-006',
      title: 'Superstructure Work',
      description: 'Girder installation, deck slab casting, parapet construction',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-12-31'),
      actualStartDate: new Date('2024-04-15'),
      actualEndDate: undefined,
      status: 'in-progress',
      progress: 35,
      category: 'construction',
      priority: 'critical',
      dependencies: ['ACT-005'],
      assignedTo: 'Main Contractor',
      milestones: ['Girder Launching Complete', 'Deck Slab 50% Complete', 'Parapet Complete'],
      deliverables: ['Structural Completion Certificate', 'Load Test Reports', 'Finishing Work'],
      resources: {
        manpower: 95,
        equipment: ['Launching Gantry', 'Concrete Pumps', 'Finishing Equipment'],
        materials: ['Precast Girders', 'Concrete', 'Reinforcement']
      },
      budget: 220000000,
      risks: ['Weather conditions', 'Equipment breakdowns', 'Quality deviations'],
      isOnCriticalPath: true,
      delayDays: 15,
      completionPercentage: 35
    },
    {
      id: 'ACT-007',
      title: 'Approach Roads & Utilities',
      description: 'Approach road construction, drainage, street lighting, and utilities',
      startDate: new Date('2024-08-01'),
      endDate: new Date('2025-02-28'),
      actualStartDate: undefined,
      actualEndDate: undefined,
      status: 'not-started',
      progress: 0,
      category: 'construction',
      priority: 'high',
      dependencies: ['ACT-006'],
      assignedTo: 'Roads Contractor',
      milestones: ['Earthwork Complete', 'Pavement 50% Complete', 'Utilities Installation Complete'],
      deliverables: ['Road Completion Certificate', 'Utility Connection Reports', 'Safety Installations'],
      resources: {
        manpower: 60,
        equipment: ['Road Construction Machinery', 'Compactors', 'Pavers'],
        materials: ['Bitumen', 'Aggregates', 'Concrete']
      },
      budget: 85000000,
      risks: ['Monsoon season impact', 'Utility coordination delays'],
      isOnCriticalPath: false,
      completionPercentage: 0
    },
    {
      id: 'ACT-008',
      title: 'Testing & Commissioning',
      description: 'Load testing, safety inspections, and final commissioning',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-04-30'),
      actualStartDate: undefined,
      actualEndDate: undefined,
      status: 'not-started',
      progress: 0,
      category: 'quality',
      priority: 'critical',
      dependencies: ['ACT-006'],
      assignedTo: 'Testing Agency',
      milestones: ['Load Test Complete', 'Safety Audit Complete', 'Commissioning Certificate'],
      deliverables: ['Load Test Report', 'Safety Certificate', 'O&M Manual', 'Warranty Documents'],
      resources: {
        manpower: 15,
        equipment: ['Load Testing Equipment', 'Survey Equipment'],
        materials: ['Testing Materials']
      },
      budget: 12000000,
      risks: ['Test failures', 'Rectification requirements'],
      isOnCriticalPath: true,
      completionPercentage: 0
    },
    {
      id: 'ACT-009',
      title: 'Project Handover & Closure',
      description: 'Final documentation, handover to operations team, project closure',
      startDate: new Date('2025-04-01'),
      endDate: new Date('2025-06-30'),
      actualStartDate: undefined,
      actualEndDate: undefined,
      status: 'not-started',
      progress: 0,
      category: 'handover',
      priority: 'high',
      dependencies: ['ACT-007', 'ACT-008'],
      assignedTo: 'Project Management Office',
      milestones: ['Documentation Complete', 'Operations Training Complete', 'Project Closure'],
      deliverables: ['As-built Drawings', 'Operations Manual', 'Training Records', 'Project Closure Report'],
      resources: {
        manpower: 10,
        equipment: [],
        materials: []
      },
      budget: 5000000,
      risks: ['Documentation gaps', 'Training delays'],
      isOnCriticalPath: false,
      completionPercentage: 0
    }
  ];

  const filteredActivities = useMemo(() => {
    let filtered = activities;
    
    if (showCriticalPathOnly) {
      filtered = filtered.filter(activity => activity.isOnCriticalPath);
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(activity => activity.category === selectedCategory);
    }
    
    return filtered.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [activities, showCriticalPathOnly, selectedCategory]);

  const timelineMetrics = useMemo(() => {
    const totalActivities = activities.length;
    const completedActivities = activities.filter(a => a.status === 'completed').length;
    const inProgressActivities = activities.filter(a => a.status === 'in-progress').length;
    const delayedActivities = activities.filter(a => a.delayDays && a.delayDays > 0).length;
    const criticalPathActivities = activities.filter(a => a.isOnCriticalPath).length;
    
    const overallProgress = Math.round(
      activities.reduce((sum, activity) => sum + activity.completionPercentage, 0) / totalActivities
    );
    
    const totalBudget = activities.reduce((sum, activity) => sum + activity.budget, 0);
    const spentBudget = activities.reduce((sum, activity) => 
      sum + (activity.budget * activity.completionPercentage / 100), 0
    );
    
    const totalDelayDays = activities.reduce((sum, activity) => 
      sum + (activity.delayDays || 0), 0
    );
    
    const schedulePerformanceIndex = overallProgress / (Date.now() > new Date('2024-01-22').getTime() ? 65 : 60); // Mock planned progress
    
    return {
      totalActivities,
      completedActivities,
      inProgressActivities,
      delayedActivities,
      criticalPathActivities,
      overallProgress,
      totalBudget,
      spentBudget,
      budgetUtilization: (spentBudget / totalBudget) * 100,
      totalDelayDays,
      schedulePerformanceIndex
    };
  }, [activities]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'in-progress': return <Construction color="primary" />;
      case 'delayed': return <Warning color="warning" />;
      case 'not-started': return <RadioButtonUnchecked color="action" />;
      default: return <Schedule />;
    }
  };

  const getStatusColor = (status: string): 'success' | 'primary' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'delayed': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      planning: '#9c27b0',
      design: '#2196f3', 
      approval: '#ff9800',
      procurement: '#00bcd4',
      construction: theme.palette.success.main,
      quality: theme.palette.error.main,
      handover: '#795548'
    };
    return colors[category as keyof typeof colors] || theme.palette.grey[500];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  };

  const progressData = activities.map(activity => ({
    name: activity.title.substring(0, 20) + '...',
    planned: 100,
    actual: activity.completionPercentage,
    category: activity.category
  }));

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight={600}>
          Project Timeline & Schedule
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" startIcon={<Share />}>
            Share Timeline
          </Button>
          <Button variant="contained" size="small" startIcon={<Download />}>
            Export Schedule
          </Button>
        </Stack>
      </Stack>

      {/* Timeline Overview Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 140 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Overall Progress
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', width: 32, height: 32 }}>
                  <TrendingUp sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600} color="primary.main">
                {timelineMetrics.overallProgress}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={timelineMetrics.overallProgress}
                sx={{ height: 4, borderRadius: 2 }}
              />
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 140 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Activities Complete
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', width: 32, height: 32 }}>
                  <CheckCircle sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600} color="success.main">
                {timelineMetrics.completedActivities}/{timelineMetrics.totalActivities}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 140 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Schedule Index
                </Typography>
                <Avatar sx={{ 
                  bgcolor: alpha(timelineMetrics.schedulePerformanceIndex >= 1 ? theme.palette.success.main : theme.palette.warning.main, 0.1), 
                  color: timelineMetrics.schedulePerformanceIndex >= 1 ? 'success.main' : 'warning.main', 
                  width: 32, 
                  height: 32 
                }}>
                  {timelineMetrics.schedulePerformanceIndex >= 1 ? <TrendingUp sx={{ fontSize: 18 }} /> : <TrendingDown sx={{ fontSize: 18 }} />}
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600} color={timelineMetrics.schedulePerformanceIndex >= 1 ? 'success.main' : 'warning.main'}>
                {timelineMetrics.schedulePerformanceIndex.toFixed(2)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 140 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Critical Path Items
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main', width: 32, height: 32 }}>
                  <Badge badgeContent={timelineMetrics.criticalPathActivities} color="error">
                    <Flag sx={{ fontSize: 18 }} />
                  </Badge>
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600}>
                {timelineMetrics.criticalPathActivities}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Controls */}
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <FormControlLabel
          control={
            <Switch
              checked={showCriticalPathOnly}
              onChange={(e) => setShowCriticalPathOnly(e.target.checked)}
            />
          }
          label="Critical Path Only"
        />
        <Button
          variant={selectedCategory ? "contained" : "outlined"}
          size="small"
          startIcon={<FilterList />}
          onClick={() => setSelectedCategory(selectedCategory ? null : 'construction')}
        >
          {selectedCategory ? `Filter: ${selectedCategory}` : 'All Categories'}
        </Button>
      </Stack>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tab label="Timeline View" />
        <Tab label="Gantt Chart" />
        <Tab label="Progress Analysis" />
        <Tab label="Critical Path" />
      </Tabs>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Timeline position="right">
              {filteredActivities.map((activity, index) => (
                <TimelineItem key={activity.id}>
                  <TimelineOppositeContent sx={{ flex: 0.3, m: 'auto 0' }}>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(activity.startDate)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      to {formatDate(activity.endDate)}
                    </Typography>
                    {activity.actualEndDate && (
                      <Typography variant="caption" color="success.main" display="block">
                        Completed: {formatDate(activity.actualEndDate)}
                      </Typography>
                    )}
                    {activity.delayDays && activity.delayDays > 0 && (
                      <Chip
                        label={`${activity.delayDays}d delay`}
                        size="small"
                        color="warning"
                        sx={{ mt: 0.5 }}
                      />
                    )}
                  </TimelineOppositeContent>

                  <TimelineSeparator>
                    <TimelineConnector sx={{ bgcolor: index === 0 ? 'transparent' : 'grey.300' }} />
                    <TimelineDot sx={{ bgcolor: getCategoryColor(activity.category) }}>
                      {getStatusIcon(activity.status)}
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: index === filteredActivities.length - 1 ? 'transparent' : 'grey.300' }} />
                  </TimelineSeparator>

                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Accordion>
                      <AccordionSummary 
                        expandIcon={<ExpandMore />}
                        sx={{ p: 0 }}
                      >
                        <Box sx={{ width: '100%' }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {activity.title}
                              {activity.isOnCriticalPath && (
                                <Tooltip title="Critical Path">
                                  <Flag sx={{ ml: 1, fontSize: 16, color: 'error.main' }} />
                                </Tooltip>
                              )}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              <Chip
                                label={activity.status.replace('-', ' ')}
                                size="small"
                                color={getStatusColor(activity.status)}
                              />
                              <Chip
                                label={activity.category}
                                size="small"
                                sx={{ bgcolor: alpha(getCategoryColor(activity.category), 0.1) }}
                              />
                            </Stack>
                          </Stack>

                          <Typography variant="body2" color="text.secondary" mb={1}>
                            {activity.description}
                          </Typography>

                          {activity.status === 'in-progress' && (
                            <Box mb={1}>
                              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                                <Typography variant="caption" color="text.secondary">
                                  Progress
                                </Typography>
                                <Typography variant="caption" fontWeight={600}>
                                  {activity.progress}%
                                </Typography>
                              </Stack>
                              <LinearProgress
                                variant="determinate"
                                value={activity.progress}
                                sx={{ height: 6, borderRadius: 3 }}
                              />
                            </Box>
                          )}
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Box display="flex" flexWrap="wrap" gap={3}>
                          <Box flex="1 1 250px">
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                              Details
                            </Typography>
                            <Stack spacing={1}>
                              <Typography variant="body2">
                                <strong>Assigned to:</strong> {activity.assignedTo}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Budget:</strong> {formatCurrency(activity.budget)}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Resources:</strong> {activity.resources.manpower} personnel
                              </Typography>
                              {activity.dependencies.length > 0 && (
                                <Typography variant="body2">
                                  <strong>Dependencies:</strong> {activity.dependencies.join(', ')}
                                </Typography>
                              )}
                            </Stack>
                          </Box>

                          <Box flex="1 1 250px">
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                              Milestones & Deliverables
                            </Typography>
                            <Stack spacing={1}>
                              {activity.milestones.map((milestone, idx) => (
                                <Typography key={idx} variant="caption" color="primary.main">
                                  • {milestone}
                                </Typography>
                              ))}
                              {activity.deliverables.map((deliverable, idx) => (
                                <Typography key={idx} variant="caption" color="text.secondary">
                                  📄 {deliverable}
                                </Typography>
                              ))}
                            </Stack>
                          </Box>

                          {activity.risks.length > 0 && (
                            <Box flex="1 1 250px">
                              <Typography variant="subtitle2" fontWeight={600} gutterBottom color="warning.main">
                                Risk Factors
                              </Typography>
                              <Stack spacing={0.5}>
                                {activity.risks.map((risk, idx) => (
                                  <Typography key={idx} variant="caption" color="warning.main">
                                    ⚠️ {risk}
                                  </Typography>
                                ))}
                              </Stack>
                            </Box>
                          )}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      )}

      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Gantt Chart View
            </Typography>
            <Box height={600} sx={{ overflowX: 'auto', overflowY: 'auto' }}>
              <GanttChart activities={filteredActivities} theme={theme} />
            </Box>
          </CardContent>
        </Card>
      )}

      {activeTab === 2 && (
        <Box display="flex" flexWrap="wrap" gap={3}>
          <Card sx={{ flex: '1 1 400px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Schedule Performance
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Overall Progress</Typography>
                    <Typography variant="body2" fontWeight={600} color="primary.main">
                      {timelineMetrics.overallProgress}%
                    </Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={timelineMetrics.overallProgress} sx={{ height: 8, borderRadius: 4 }} />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Budget Utilization</Typography>
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      {timelineMetrics.budgetUtilization.toFixed(1)}%
                    </Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={timelineMetrics.budgetUtilization} color="success" sx={{ height: 8, borderRadius: 4 }} />
                </Box>

                <Box>
                  <Typography variant="body2" gutterBottom>Schedule Performance Index</Typography>
                  <Typography variant="h3" fontWeight={600} color={timelineMetrics.schedulePerformanceIndex >= 1 ? 'success.main' : 'warning.main'}>
                    {timelineMetrics.schedulePerformanceIndex.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {timelineMetrics.schedulePerformanceIndex >= 1 ? 'Ahead of schedule' : 'Behind schedule'}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ flex: '1 1 300px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Key Performance Indicators
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Activities on Schedule</Typography>
                  <Typography variant="body2" fontWeight={600} color="success.main">
                    {timelineMetrics.totalActivities - timelineMetrics.delayedActivities}/{timelineMetrics.totalActivities}
                  </Typography>
                </Stack>
                
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Total Delay Days</Typography>
                  <Typography variant="body2" fontWeight={600} color="warning.main">
                    {timelineMetrics.totalDelayDays} days
                  </Typography>
                </Stack>
                
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Critical Path Health</Typography>
                  <Typography variant="body2" fontWeight={600} color="primary.main">
                    {Math.round((timelineMetrics.criticalPathActivities - timelineMetrics.delayedActivities) / timelineMetrics.criticalPathActivities * 100)}%
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}

      {activeTab === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Critical Path Analysis
            </Typography>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary" paragraph>
                The critical path represents the longest sequence of activities that determines the minimum project duration. 
                Any delay in critical path activities will delay the entire project.
              </Typography>
            </Box>
            
            {activities.filter(a => a.isOnCriticalPath).map((activity, index) => (
              <Card key={activity.id} variant="outlined" sx={{ mb: 2, borderLeft: 4, borderLeftColor: 'error.main' }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {activity.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        {activity.description}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={activity.status.replace('-', ' ')}
                          size="small"
                          color={getStatusColor(activity.status)}
                        />
                        {activity.delayDays && activity.delayDays > 0 && (
                          <Chip
                            label={`${activity.delayDays} days delay`}
                            size="small"
                            color="warning"
                          />
                        )}
                      </Stack>
                    </Box>
                    <Stack alignItems="flex-end" spacing={1}>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(activity.startDate)} - {formatDate(activity.endDate)}
                      </Typography>
                      <Typography variant="h6" fontWeight={600} color="primary.main">
                        {activity.completionPercentage}%
                      </Typography>
                      {activity.status === 'in-progress' && (
                        <LinearProgress
                          variant="determinate"
                          value={activity.completionPercentage}
                          sx={{ width: 100, height: 4, borderRadius: 2 }}
                        />
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

// Gantt Chart Component
const GanttChart: React.FC<{ activities: TimelineActivity[], theme: any }> = ({ activities, theme }) => {
  // Calculate date range
  const startDates = activities.map(a => a.startDate.getTime());
  const endDates = activities.map(a => (a.actualEndDate || a.endDate).getTime());
  const minDate = new Date(Math.min(...startDates));
  const maxDate = new Date(Math.max(...endDates));
  
  // Add padding to dates
  minDate.setMonth(minDate.getMonth() - 1);
  maxDate.setMonth(maxDate.getMonth() + 1);
  
  const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Generate month labels
  const monthLabels: { label: string; position: number }[] = [];
  const currentDate = new Date(minDate);
  while (currentDate <= maxDate) {
    const position = Math.ceil((currentDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    monthLabels.push({
      label: currentDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      position: (position / totalDays) * 100
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  const getDatePosition = (date: Date) => {
    const days = Math.ceil((date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    return (days / totalDays) * 100;
  };
  
  const getBarWidth = (start: Date, end: Date) => {
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return (days / totalDays) * 100;
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return theme.palette.success.main;
      case 'in-progress': return theme.palette.primary.main;
      case 'delayed': return theme.palette.warning.main;
      case 'not-started': return theme.palette.grey[400];
      default: return theme.palette.grey[500];
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      planning: '#9c27b0',
      design: '#2196f3',
      approval: '#ff9800',
      procurement: '#00bcd4',
      construction: theme.palette.success.main,
      quality: theme.palette.error.main,
      handover: '#795548'
    };
    return colors[category] || theme.palette.grey[500];
  };

  return (
    <Box sx={{ minWidth: 1200, position: 'relative' }}>
      {/* Month headers */}
      <Box sx={{ 
        display: 'flex', 
        height: 40, 
        borderBottom: 2, 
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        bgcolor: 'background.paper',
        zIndex: 2,
        ml: '300px'
      }}>
        {monthLabels.map((month, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              left: `${month.position}%`,
              px: 1,
              borderLeft: 1,
              borderColor: 'divider',
              height: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography variant="caption" fontWeight={600}>
              {month.label}
            </Typography>
          </Box>
        ))}
      </Box>
      
      {/* Today line */}
      <Box
        sx={{
          position: 'absolute',
          left: `calc(300px + ${getDatePosition(new Date())}%)`,
          top: 40,
          bottom: 0,
          width: 2,
          bgcolor: 'error.main',
          zIndex: 1,
          '&::before': {
            content: '"Today"',
            position: 'absolute',
            top: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: 'error.main',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 600
          }
        }}
      />
      
      {/* Activities */}
      {activities.map((activity, index) => (
        <Box
          key={activity.id}
          sx={{
            display: 'flex',
            height: 60,
            borderBottom: 1,
            borderColor: 'divider',
            position: 'relative',
            '&:hover': {
              bgcolor: alpha(theme.palette.action.hover, 0.04)
            }
          }}
        >
          {/* Activity name */}
          <Box
            sx={{
              width: 300,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              borderRight: 1,
              borderColor: 'divider',
              position: 'sticky',
              left: 0,
              bgcolor: 'background.paper',
              zIndex: 1
            }}
          >
            <Stack spacing={0.5} sx={{ width: '100%' }}>
              <Typography variant="body2" fontWeight={600} noWrap>
                {activity.title}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={activity.category}
                  size="small"
                  sx={{ 
                    height: 18,
                    fontSize: '0.7rem',
                    bgcolor: alpha(getCategoryColor(activity.category), 0.1)
                  }}
                />
                {activity.isOnCriticalPath && (
                  <Tooltip title="Critical Path">
                    <Flag sx={{ fontSize: 14, color: 'error.main' }} />
                  </Tooltip>
                )}
              </Stack>
            </Stack>
          </Box>
          
          {/* Gantt bar */}
          <Box sx={{ flex: 1, position: 'relative' }}>
            {/* Planned bar */}
            <Box
              sx={{
                position: 'absolute',
                left: `${getDatePosition(activity.startDate)}%`,
                width: `${getBarWidth(activity.startDate, activity.endDate)}%`,
                height: 24,
                top: 10,
                bgcolor: alpha(getStatusColor(activity.status), 0.3),
                borderRadius: 1,
                border: 1,
                borderColor: alpha(getStatusColor(activity.status), 0.5),
                display: 'flex',
                alignItems: 'center',
                px: 1,
                overflow: 'hidden'
              }}
            >
              <Typography variant="caption" noWrap sx={{ color: 'text.primary' }}>
                Planned
              </Typography>
            </Box>
            
            {/* Actual bar */}
            {activity.actualStartDate && (
              <Box
                sx={{
                  position: 'absolute',
                  left: `${getDatePosition(activity.actualStartDate)}%`,
                  width: activity.actualEndDate 
                    ? `${getBarWidth(activity.actualStartDate, activity.actualEndDate)}%`
                    : `${getBarWidth(activity.actualStartDate, new Date()) * (activity.progress / 100)}%`,
                  height: 20,
                  bottom: 10,
                  bgcolor: getStatusColor(activity.status),
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  px: 1,
                  overflow: 'hidden',
                  boxShadow: 1
                }}
              >
                <Typography 
                  variant="caption" 
                  noWrap 
                  sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.7rem'
                  }}
                >
                  {activity.progress}%
                </Typography>
              </Box>
            )}
            
            {/* Dependencies lines */}
            {activity.dependencies.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  width: `${getDatePosition(activity.startDate)}%`,
                  height: 1,
                  bgcolor: 'grey.400',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: -3,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'grey.400'
                  }
                }}
              />
            )}
          </Box>
        </Box>
      ))}
      
      {/* Legend */}
      <Box sx={{ 
        mt: 3, 
        p: 2, 
        bgcolor: 'background.paper',
        borderRadius: 1,
        display: 'flex',
        gap: 3,
        flexWrap: 'wrap'
      }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 40, height: 12, bgcolor: alpha(theme.palette.primary.main, 0.3), borderRadius: 0.5 }} />
          <Typography variant="caption">Planned Duration</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 40, height: 12, bgcolor: theme.palette.primary.main, borderRadius: 0.5 }} />
          <Typography variant="caption">Actual Progress</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Flag sx={{ fontSize: 14, color: 'error.main' }} />
          <Typography variant="caption">Critical Path</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ width: 2, height: 16, bgcolor: 'error.main' }} />
          <Typography variant="caption">Today</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default TimelineView;