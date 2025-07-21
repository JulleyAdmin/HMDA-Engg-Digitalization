// Project Charts Component for Data Visualization
import React, { useMemo } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  ResponsiveContainer
} from 'recharts';

interface ProjectChartsProps {
  projects: any[];
  compact?: boolean;
}

const ProjectCharts: React.FC<ProjectChartsProps> = ({
  projects,
  compact = false
}) => {
  const theme = useTheme();

  // Color palette
  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300'
  ];

  // Projects by Stage
  const stageData = useMemo(() => {
    const stages = [
      'Planning',
      'Approval',
      'Pre-construction',
      'Tender',
      'Agreement',
      'Construction',
      'Quality Control',
      'Testing',
      'Completion'
    ];

    return stages.map(stage => {
      const count = projects.filter(p => p.currentStage === stage).length;
      return {
        stage: stage.replace('Pre-construction', 'Pre-const'),
        count,
        percentage: projects.length > 0 ? (count / projects.length * 100).toFixed(1) : 0
      };
    });
  }, [projects]);

  // Projects by Category
  const categoryData = useMemo(() => {
    const categories = ['INFRA', 'URBAN', 'ENV', 'SMART'];
    const categoryMap = {
      'INFRA': 'Infrastructure',
      'URBAN': 'Urban Development',
      'ENV': 'Environmental',
      'SMART': 'Smart City'
    };

    return categories.map(cat => {
      const count = projects.filter(p => p.category === cat).length;
      const percentage = projects.length > 0 ? (count / projects.length * 100) : 0;
      return {
        category: categoryMap[cat as keyof typeof categoryMap],
        count,
        percentage: percentage.toFixed(1),
        value: percentage
      };
    });
  }, [projects]);

  // Budget vs Physical Progress
  const progressData = useMemo(() => {
    return projects
      .filter(p => p.physicalProgress && p.financial?.budgetUtilization)
      .map(p => ({
        name: p.projectId,
        physical: p.physicalProgress,
        financial: p.financial.budgetUtilization,
        budget: p.totalBudget / 10000000 // Convert to crores
      }))
      .sort((a, b) => b.budget - a.budget)
      .slice(0, 20); // Top 20 projects
  }, [projects]);

  // Timeline Performance
  const timelineData = useMemo(() => {
    const delays = [
      { range: 'On Time', min: -Infinity, max: 0, color: colors[2] },
      { range: '1-30 days', min: 1, max: 30, color: colors[3] },
      { range: '31-90 days', min: 31, max: 90, color: colors[4] },
      { range: '90+ days', min: 91, max: Infinity, color: colors[1] }
    ];

    return delays.map(delay => {
      const count = projects.filter(p => {
        const delayDays = p.timeline?.delayDays || 0;
        return delayDays >= delay.min && delayDays <= delay.max;
      }).length;
      
      return {
        range: delay.range,
        count,
        percentage: projects.length > 0 ? (count / projects.length * 100) : 0,
        color: delay.color
      };
    });
  }, [projects, colors]);

  // Risk Distribution
  const riskData = useMemo(() => {
    const risks = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const riskColors = [colors[2], colors[3], colors[4], colors[1]];

    return risks.map((risk, index) => {
      const count = projects.filter(p => p.riskLevel === risk).length;
      return {
        risk,
        count,
        percentage: projects.length > 0 ? (count / projects.length * 100) : 0,
        color: riskColors[index]
      };
    });
  }, [projects, colors]);

  const chartHeight = compact ? 250 : 300;

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            p: 1,
            boxShadow: 2
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color }}
            >
              {entry.name}: {entry.value}
              {entry.payload.percentage && ` (${entry.payload.percentage}%)`}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Grid container spacing={3}>
      {/* Projects by Stage */}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader
            title="Projects by Stage"
            subheader={`${projects.length} total projects`}
          />
          <CardContent>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={stageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="stage" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill={colors[0]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Projects by Category */}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader
            title="Projects by Category"
            subheader="Distribution across categories"
          />
          <CardContent>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Progress Comparison */}
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader
            title="Physical vs Financial Progress"
            subheader="Top 20 projects by budget"
          />
          <CardContent>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <AreaChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={10}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="physical"
                  stackId="1"
                  stroke={colors[2]}
                  fill={colors[2]}
                  fillOpacity={0.6}
                  name="Physical Progress (%)"
                />
                <Area
                  type="monotone"
                  dataKey="financial"
                  stackId="2"
                  stroke={colors[3]}
                  fill={colors[3]}
                  fillOpacity={0.6}
                  name="Financial Progress (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Timeline Performance */}
      <Grid item xs={12} lg={4}>
        <Card>
          <CardHeader
            title="Timeline Performance"
            subheader="Project delay distribution"
          />
          <CardContent>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={timelineData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="range" type="category" width={80} fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {timelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Risk Distribution */}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader
            title="Risk Distribution"
            subheader="Project risk levels"
          />
          <CardContent>
            <ResponsiveContainer width="100%" height={compact ? 200 : 250}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Project Summary Stats */}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader
            title="Summary Statistics"
            subheader="Key project metrics"
          />
          <CardContent>
            <Grid container spacing={2}>
              {[
                {
                  label: 'Average Physical Progress',
                  value: `${(projects.reduce((sum, p) => sum + (p.physicalProgress || 0), 0) / Math.max(projects.length, 1)).toFixed(1)}%`,
                  color: colors[2]
                },
                {
                  label: 'Average Budget Utilization',
                  value: `${(projects.reduce((sum, p) => sum + (p.financial?.budgetUtilization || 0), 0) / Math.max(projects.length, 1)).toFixed(1)}%`,
                  color: colors[3]
                },
                {
                  label: 'Projects on Schedule',
                  value: `${projects.filter(p => (p.timeline?.delayDays || 0) <= 0).length}`,
                  color: colors[2]
                },
                {
                  label: 'High Risk Projects',
                  value: `${projects.filter(p => p.riskLevel === 'HIGH' || p.riskLevel === 'CRITICAL').length}`,
                  color: colors[4]
                }
              ].map((stat, index) => (
                <Grid item xs={6} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: 'background.default',
                      textAlign: 'center'
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: stat.color }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProjectCharts;