// Dashboard Overview Component - Executive Summary for CE
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  Chip
} from '@mui/material';
import { FullscreenableCard } from './FullscreenableCard';
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule,
  AccountBalance,
  Engineering,
  Assessment
} from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';
import { HMDAProject } from '../types/Project';

interface DashboardOverviewProps {
  projects: HMDAProject[];
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  trend?: {
    value: number;
    label: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, color, trend }) => (
  <Card 
    sx={{ 
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: `linear-gradient(90deg, ${color === 'primary' ? '#1e3a8a' : color === 'secondary' ? '#059669' : color === 'success' ? '#10b981' : color === 'warning' ? '#f59e0b' : '#ef4444'} 0%, ${color === 'primary' ? '#3b82f6' : color === 'secondary' ? '#10b981' : color === 'success' ? '#34d399' : color === 'warning' ? '#fbbf24' : '#f87171'} 100%)`,
      }
    }}
  >
    <CardContent sx={{ padding: '20px !important' }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: 'text.secondary', 
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              lineHeight: 1.2,
              marginBottom: '8px',
              display: 'block'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h3" 
            component="div" 
            sx={{ 
              color: `${color}.main`,
              fontWeight: 800,
              fontSize: '1.75rem',
              lineHeight: 1.1,
              marginBottom: '6px'
            }}
          >
            {value}
          </Typography>
          {subtitle && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.8125rem',
                fontWeight: 500,
                lineHeight: 1.3
              }}
            >
              {subtitle}
            </Typography>
          )}
          {trend && (
            <Box display="flex" alignItems="center" mt={1} gap={0.5}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  backgroundColor: trend.value > 0 ? 'success.light' : 'error.light',
                  borderRadius: '4px',
                  padding: '2px 6px',
                }}
              >
                <TrendingUp 
                  sx={{ 
                    fontSize: 14, 
                    color: trend.value > 0 ? 'success.dark' : 'error.dark',
                    transform: trend.value < 0 ? 'rotate(180deg)' : 'none'
                  }} 
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: trend.value > 0 ? 'success.dark' : 'error.dark',
                    fontWeight: 700,
                    fontSize: '0.6875rem',
                    marginLeft: '2px'
                  }}
                >
                  {Math.abs(trend.value)}%
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6875rem' }}>
                {trend.label}
              </Typography>
            </Box>
          )}
        </Box>
        <Box 
          sx={{ 
            width: 48, 
            height: 48, 
            borderRadius: '12px',
            background: `linear-gradient(135deg, ${color === 'primary' ? '#1e3a8a20' : color === 'secondary' ? '#05966920' : color === 'success' ? '#10b98120' : color === 'warning' ? '#f59e0b20' : '#ef444420'} 0%, ${color === 'primary' ? '#3b82f620' : color === 'secondary' ? '#10b98120' : color === 'success' ? '#34d39920' : color === 'warning' ? '#fbbf2420' : '#f8717120'} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ projects }) => {
  // Debug logging
  console.log('DashboardOverview - projects received:', projects.length);
  
  // Calculate statistics from filtered projects
  const totalProjects = projects.length;
  const totalBudget = projects.reduce((sum, p) => sum + p.totalBudget, 0);
  const avgProgress = totalProjects > 0 
    ? projects.reduce((sum, p) => sum + p.physicalProgress, 0) / totalProjects 
    : 0;
  
  const criticalProjects = projects.filter(p => p.riskLevel === 'CRITICAL');
  const delayedProjects = projects.filter(p => (p.timeline?.delayDays || 0) > 0);
  const highValueProjects = projects.filter(p => p.totalBudget > 100000000000); // > 1000 Cr
  const completedProjects = projects.filter(p => p.physicalProgress >= 95);

  // Calculate distributions
  const categoryDistribution = projects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stageDistribution = projects.reduce((acc, p) => {
    acc[p.currentStage] = (acc[p.currentStage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const riskDistribution = projects.reduce((acc, p) => {
    acc[p.riskLevel] = (acc[p.riskLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const budgetRanges = [
    { label: '< ₹10 Cr', min: 0, max: 1000000000 },
    { label: '₹10-50 Cr', min: 1000000000, max: 5000000000 },
    { label: '₹50-200 Cr', min: 5000000000, max: 20000000000 },
    { label: '₹200-1000 Cr', min: 20000000000, max: 100000000000 },
    { label: '> ₹1000 Cr', min: 100000000000, max: Infinity }
  ];

  const budgetDistribution = budgetRanges.map(range => ({
    label: range.label,
    value: projects.filter(p => p.totalBudget >= range.min && p.totalBudget < range.max).length
  }));

  // Chart data
  const categoryData = Object.entries(categoryDistribution).map(([key, value]) => ({
    name: key.replace('_', ' '),
    value,
    color: key === 'INFRASTRUCTURE' ? '#1e3a8a' : key === 'URBAN_DEVELOPMENT' ? '#059669' : key === 'ENVIRONMENTAL' ? '#10b981' : '#f59e0b'
  }));
  
  console.log('Category Data:', categoryData);
  console.log('Stage Data:', stageDistribution);

  const stageData = Object.entries(stageDistribution).map(([key, value]) => ({
    name: key,
    value,
    projects: value
  }));

  const riskData = Object.entries(riskDistribution).map(([key, value]) => ({
    name: key,
    value,
    color: key === 'LOW' ? '#10b981' : key === 'MEDIUM' ? '#f59e0b' : key === 'HIGH' ? '#ef4444' : '#dc2626'
  }));

  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000000) {
      return `₹${(amount / 10000000000).toFixed(1)}K Cr`;
    } else if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
  };

  return (
    <Box sx={{ padding: '0 4px' }}>
      {/* Key Performance Indicators */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Box flex="1 1 300px">
          <StatCard
            title="Total Portfolio"
            value={formatCurrency(totalBudget)}
            subtitle={`${totalProjects} Active Projects`}
            icon={<AccountBalance sx={{ fontSize: 24 }} />}
            color="primary"
            trend={{ value: 12.5, label: 'vs last quarter' }}
          />
        </Box>
        <Box flex="1 1 300px">
          <StatCard
            title="Average Progress"
            value={`${avgProgress.toFixed(1)}%`}
            subtitle={`${completedProjects.length} Completed`}
            icon={<Assessment sx={{ fontSize: 24 }} />}
            color="success"
            trend={{ value: 5.2, label: 'improvement' }}
          />
        </Box>
        <Box flex="1 1 300px">
          <StatCard
            title="Delayed Projects"
            value={delayedProjects.length.toString()}
            subtitle={`${((delayedProjects.length / totalProjects) * 100).toFixed(1)}% of portfolio`}
            icon={<Schedule sx={{ fontSize: 24 }} />}
            color="warning"
            trend={{ value: -8.3, label: 'reduction' }}
          />
        </Box>
        <Box flex="1 1 300px">
          <StatCard
            title="Critical Issues"
            value={criticalProjects.length.toString()}
            subtitle="Require immediate attention"
            icon={<Warning sx={{ fontSize: 24 }} />}
            color="error"
          />
        </Box>
      </Box>

      {/* Charts */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {/* Project Distribution by Category */}
        <Box flex="1 1 400px">
          <FullscreenableCard
            title={
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Projects by Category
              </Typography>
            }
          >
            <Box sx={{ width: '100%', height: 300 }}>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, value}) => `${name}: ${value}`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <Typography color="text.secondary">No data available</Typography>
                </Box>
              )}
            </Box>
          </FullscreenableCard>
        </Box>

        {/* Projects by Stage */}
        <Box flex="1 1 600px">
          <FullscreenableCard
            title={
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Projects by Stage
              </Typography>
            }
          >
            <Box sx={{ width: '100%', height: 300 }}>
              {stageData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stageData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Bar dataKey="value" fill="#1e3a8a" radius={[8, 8, 0, 0]}>
                      {stageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1e3a8a' : '#3b82f6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <Typography color="text.secondary">No data available</Typography>
                </Box>
              )}
            </Box>
          </FullscreenableCard>
        </Box>

        {/* Budget Distribution */}
        <Box flex="1 1 400px">
          <FullscreenableCard
            title={
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Budget Distribution
              </Typography>
            }
          >
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" angle={-45} textAnchor="end" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Bar dataKey="value" fill="#059669" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </FullscreenableCard>
        </Box>

        {/* Risk Level Distribution */}
        <Box flex="1 1 400px">
          <FullscreenableCard
            title={
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Risk Distribution
              </Typography>
            }
          >
            <ChartContainer height={300}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}`}
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
            </ChartContainer>
          </FullscreenableCard>
        </Box>
      </Box>

      {/* High Value Projects */}
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                High Value Projects (&gt; ₹1000 Cr)
              </Typography>
              <Chip label={`${highValueProjects.length} Projects`} size="small" color="primary" />
            </Box>
            <Stack spacing={1}>
              {highValueProjects.slice(0, 5).map((project) => (
                <Box 
                  key={project.projectId}
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center"
                  p={1.5}
                  bgcolor="grey.50"
                  borderRadius={1}
                >
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      {project.projectName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {project.projectId} • {project.location.locality}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="body2" fontWeight={700} color="primary.main">
                      {formatCurrency(project.totalBudget)}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={project.physicalProgress} 
                      sx={{ width: 80, mt: 0.5 }}
                    />
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};