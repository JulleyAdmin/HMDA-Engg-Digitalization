import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Stack,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  Analytics,
  TrendingUp,
  Schedule,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import { HMDAProject } from '../../../../../types/Project';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface Stage1DashboardScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

const Stage1DashboardScreen: React.FC<Stage1DashboardScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  // Mock data for charts
  const progressData = [
    { name: 'Week 1', completed: 20, planned: 25 },
    { name: 'Week 2', completed: 40, planned: 45 },
    { name: 'Week 3', completed: 65, planned: 70 },
    { name: 'Week 4', completed: 78, planned: 85 }
  ];

  const phaseData = [
    { name: 'Need Identification', value: 100, color: '#22c55e' },
    { name: 'Site Assessment', value: 85, color: '#3b82f6' },
    { name: 'Cost Estimation', value: 90, color: '#f59e0b' },
    { name: 'Feasibility Study', value: 70, color: '#ef4444' }
  ];

  const timelineData = [
    { phase: 'Need ID', planned: 10, actual: 8 },
    { phase: 'Site Visit', planned: 15, actual: 12 },
    { phase: 'Cost Est.', planned: 12, actual: 14 },
    { phase: 'Feasibility', planned: 20, actual: 18 }
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Stage 1 Dashboard & Analytics
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={3}>
        {/* Key Metrics */}
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Analytics sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700} color="primary.main">
                78%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall Progress
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Schedule sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700} color="warning.main">
                23
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Days Elapsed
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700} color="success.main">
                6/8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Milestones
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Warning sx={{ fontSize: 48, color: 'error.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700} color="error.main">
                2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Issues
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Progress Trend */}
        <Box flex="1 1 250px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Progress Trend Analysis
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="planned" 
                  stroke="#94a3b8" 
                  strokeDasharray="5 5"
                  name="Planned Progress"
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Actual Progress"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* Phase Completion */}
        <Box flex="1 1 250px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Phase Completion Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={phaseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {phaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <Stack spacing={1} mt={2}>
              {phaseData.map((phase, index) => (
                <Stack key={index} direction="row" alignItems="center" spacing={1}>
                  <Box 
                    sx={{ 
                      width: 12, 
                      height: 12, 
                      bgcolor: COLORS[index], 
                      borderRadius: '50%' 
                    }} 
                  />
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {phase.name}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {phase.value}%
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Box>

        {/* Timeline Performance */}
        <Box flex="1 1 250px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Timeline Performance
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="phase" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="planned" fill="#94a3b8" name="Planned Days" />
                <Bar dataKey="actual" fill="#3b82f6" name="Actual Days" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* Risk Assessment */}
        <Box flex="1 1 250px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Risk Assessment Summary
            </Typography>
            <Stack gap={2}>
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">Technical Risk</Typography>
                  <Chip label="Low" color="success" size="small" />
                </Stack>
                <LinearProgress variant="determinate" value={25} color="success" />
              </Box>
              
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">Financial Risk</Typography>
                  <Chip label="Medium" color="warning" size="small" />
                </Stack>
                <LinearProgress variant="determinate" value={60} color="warning" />
              </Box>
              
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">Schedule Risk</Typography>
                  <Chip label="Low" color="success" size="small" />
                </Stack>
                <LinearProgress variant="determinate" value={30} color="success" />
              </Box>
              
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body2">Environmental Risk</Typography>
                  <Chip label="Medium" color="warning" size="small" />
                </Stack>
                <LinearProgress variant="determinate" value={55} color="warning" />
              </Box>
            </Stack>
          </Paper>
        </Box>

        {/* Key Performance Indicators */}
        <Box flex="1 1 250px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Key Performance Indicators
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={3}>
              <Box flex="1 1 250px">
                <Box textAlign="center">
                  <Typography variant="h4" fontWeight={700} color="primary.main">
                    12
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stakeholder Meetings
                  </Typography>
                </Box>
              </Box>
              <Box flex="1 1 250px">
                <Box textAlign="center">
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    95%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Documentation Complete
                  </Typography>
                </Box>
              </Box>
              <Box flex="1 1 250px">
                <Box textAlign="center">
                  <Typography variant="h4" fontWeight={700} color="info.main">
                    4.2/5
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quality Score
                  </Typography>
                </Box>
              </Box>
              <Box flex="1 1 250px">
                <Box textAlign="center">
                  <Typography variant="h4" fontWeight={700} color="warning.main">
                    ₹2.1L
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stage 1 Cost
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Stage1DashboardScreen;