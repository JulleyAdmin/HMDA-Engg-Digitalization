import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Stack,
  LinearProgress,
  Chip,
  Avatar,
  AvatarGroup,
  Button,
  useTheme,
  alpha,
  CircularProgress
} from '@mui/material';
import {
  Analytics,
  TrendingUp,
  Schedule,
  CheckCircle,
  Warning,
  Assignment,
  Architecture,
  Engineering,
  Speed,
  Groups,
  AttachMoney,
  Timeline,
  Task
} from '@mui/icons-material';
import { HMDAProject } from '../../../../../types/Project';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface Stage2DashboardScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

const Stage2DashboardScreen: React.FC<Stage2DashboardScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  const theme = useTheme();

  // Mock data for visualizations
  const progressData = [
    { week: 'W1', planned: 10, actual: 8 },
    { week: 'W2', planned: 20, actual: 18 },
    { week: 'W3', planned: 35, actual: 32 },
    { week: 'W4', planned: 45, actual: 44 },
    { week: 'W5', planned: 60, actual: 56 },
    { week: 'W6', planned: 75, actual: 72 },
    { week: 'W7', planned: 85, actual: 72 },
    { week: 'W8', planned: 95, actual: 72 }
  ];

  const sectionStatus = [
    { name: 'Executive Summary', value: 100, color: '#10b981' },
    { name: 'Site Analysis', value: 100, color: '#10b981' },
    { name: 'Technical Studies', value: 100, color: '#10b981' },
    { name: 'Design & Drawings', value: 85, color: '#3b82f6' },
    { name: 'Cost Estimates', value: 70, color: '#f59e0b' },
    { name: 'Implementation Plan', value: 50, color: '#f59e0b' },
    { name: 'Clearances', value: 44, color: '#ef4444' }
  ];

  const clearanceStatus = [
    { name: 'HMWSSB', status: 'Obtained', days: 0 },
    { name: 'TSSPDCL', status: 'Pending', days: 15 },
    { name: 'Forest Dept', status: 'Obtained', days: 0 },
    { name: 'Traffic Police', status: 'In Progress', days: 5 },
    { name: 'Revenue Dept', status: 'Obtained', days: 0 },
    { name: 'TSPCB', status: 'Pending', days: 20 },
    { name: 'Fire Dept', status: 'Not Started', days: 30 },
    { name: 'Aviation', status: 'N/A', days: 0 },
    { name: 'Railways', status: 'Obtained', days: 0 }
  ];

  const performanceMetrics = [
    { metric: 'Timeliness', A: 85, fullMark: 100 },
    { metric: 'Quality', A: 92, fullMark: 100 },
    { metric: 'Completeness', A: 72, fullMark: 100 },
    { metric: 'Compliance', A: 78, fullMark: 100 },
    { metric: 'Coordination', A: 88, fullMark: 100 }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Obtained': return 'success';
      case 'In Progress': return 'warning';
      case 'Pending': return 'error';
      case 'Not Started': return 'default';
      case 'N/A': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        DPR Stage Command Center
      </Typography>

      {/* Key Metrics Cards */}
      <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
        <Box flex="1 1 220px">
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Overall Progress
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="primary.main">
                    72%
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
                    <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="caption" color="success.main" fontWeight={600}>
                      +8.3% this week
                    </Typography>
                  </Stack>
                </Box>
                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                  <Analytics color="primary" />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box flex="1 1 220px">
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Time Remaining
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="warning.main">
                    55 days
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Target: March 15, 2024
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1) }}>
                  <Schedule color="warning" />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box flex="1 1 220px">
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Clearances
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    4/9
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    5 pending approvals
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1) }}>
                  <CheckCircle color="success" />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box flex="1 1 220px">
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    DPR Cost
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="secondary.main">
                    ₹2.8 Cr
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Budget: ₹3.0 Cr
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: alpha(theme.palette.secondary.main, 0.1) }}>
                  <AttachMoney color="secondary" />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={3}>
        {/* Progress Tracking Chart */}
        <Box flex="1 1 500px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              DPR Progress Tracking
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="planned" 
                  stroke="#94a3b8" 
                  fill={alpha(theme.palette.grey[400], 0.2)}
                  name="Planned"
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3b82f6" 
                  fill={alpha(theme.palette.primary.main, 0.3)}
                  name="Actual"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* Section-wise Completion */}
        <Box flex="1 1 400px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              DPR Section Status
            </Typography>
            <Stack spacing={2}>
              {sectionStatus.map((section, index) => (
                <Box key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                    <Typography variant="body2">{section.name}</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {section.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={section.value} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        bgcolor: section.color
                      }
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Box>

        {/* Clearance Status */}
        <Box flex="1 1 100%">
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={600}>
                Clearance & NOC Status
              </Typography>
              <Button variant="outlined" size="small">
                View All
              </Button>
            </Stack>
            
            <Box sx={{ overflowX: 'auto' }}>
              <Stack direction="row" spacing={2} sx={{ minWidth: 800 }}>
                {clearanceStatus.map((clearance, index) => (
                  <Card 
                    key={index}
                    sx={{ 
                      minWidth: 150,
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle2" fontWeight={600} mb={1}>
                        {clearance.name}
                      </Typography>
                      <Chip
                        label={clearance.status}
                        size="small"
                        color={getStatusColor(clearance.status) as any}
                        sx={{ mb: 1 }}
                      />
                      {clearance.days > 0 && (
                        <Typography variant="caption" display="block" color="text.secondary">
                          ETA: {clearance.days} days
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Box>

        {/* Performance Radar */}
        <Box flex="1 1 400px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              DPR Performance Metrics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar 
                  name="Performance" 
                  dataKey="A" 
                  stroke="#3b82f6" 
                  fill={alpha(theme.palette.primary.main, 0.3)} 
                  fillOpacity={0.6} 
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* Team Activity */}
        <Box flex="1 1 400px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Active Teams & Resources
            </Typography>
            
            <Stack spacing={2}>
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Engineering sx={{ fontSize: 20, color: 'primary.main' }} />
                    <Typography variant="body2" fontWeight={600}>
                      Technical Team
                    </Typography>
                  </Stack>
                  <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.75rem' } }}>
                    <Avatar>RK</Avatar>
                    <Avatar>PS</Avatar>
                    <Avatar>MA</Avatar>
                    <Avatar>+3</Avatar>
                  </AvatarGroup>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  Working on structural design finalization
                </Typography>
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Groups sx={{ fontSize: 20, color: 'secondary.main' }} />
                    <Typography variant="body2" fontWeight={600}>
                      Consultant Team
                    </Typography>
                  </Stack>
                  <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.75rem' } }}>
                    <Avatar>AB</Avatar>
                    <Avatar>CD</Avatar>
                    <Avatar>+2</Avatar>
                  </AvatarGroup>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  BOQ preparation and rate analysis
                </Typography>
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Task sx={{ fontSize: 20, color: 'warning.main' }} />
                    <Typography variant="body2" fontWeight={600}>
                      Clearance Team
                    </Typography>
                  </Stack>
                  <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.75rem' } }}>
                    <Avatar>XY</Avatar>
                    <Avatar>PQ</Avatar>
                  </AvatarGroup>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  Following up on pending NOCs
                </Typography>
              </Box>
            </Stack>
            
            <Box mt={3} p={2} bgcolor="grey.50" borderRadius={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Total Active Resources
                </Typography>
                <Typography variant="subtitle2" fontWeight={700} color="primary.main">
                  15 members
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Box>

        {/* Recent Activities */}
        <Box flex="1 1 100%">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Recent Activities & Milestones
            </Typography>
            
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar sx={{ bgcolor: 'success.light', width: 32, height: 32 }}>
                  <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
                </Avatar>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight={600}>
                    Topographic Survey Completed
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    All survey data validated and integrated into design • 2 days ago
                  </Typography>
                </Box>
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar sx={{ bgcolor: 'info.light', width: 32, height: 32 }}>
                  <Architecture sx={{ fontSize: 18, color: 'info.main' }} />
                </Avatar>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight={600}>
                    60% Structural Design Complete
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Foundation and superstructure designs approved • 5 days ago
                  </Typography>
                </Box>
              </Stack>
              
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar sx={{ bgcolor: 'warning.light', width: 32, height: 32 }}>
                  <Warning sx={{ fontSize: 18, color: 'warning.main' }} />
                </Avatar>
                <Box flex={1}>
                  <Typography variant="body2" fontWeight={600}>
                    TSSPDCL Clearance Delayed
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Additional documentation requested • 7 days ago
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Stage2DashboardScreen;