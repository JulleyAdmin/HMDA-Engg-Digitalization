// Dashboard Overview Component - Executive Summary for CE
import React, { useState, useEffect } from 'react';
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
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import dataService from '../services/dataService';
import { ChartContainer } from './ChartContainer';

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
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: '4px',
                  backgroundColor: trend.value > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                }}
              >
                <TrendingUp 
                  sx={{ 
                    fontSize: 14,
                    color: trend.value > 0 ? 'success.main' : 'error.main',
                    transform: trend.value < 0 ? 'rotate(180deg)' : 'none'
                  }} 
                />
              </Box>
              <Typography 
                variant="caption" 
                sx={{
                  color: trend.value > 0 ? 'success.main' : 'error.main',
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              >
                {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
              </Typography>
            </Box>
          )}
        </Box>
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '12px',
            backgroundColor: `${color}.main`,
            background: `linear-gradient(135deg, ${color === 'primary' ? '#1e3a8a' : color === 'secondary' ? '#059669' : color === 'success' ? '#10b981' : color === 'warning' ? '#f59e0b' : '#ef4444'} 0%, ${color === 'primary' ? '#3b82f6' : color === 'secondary' ? '#10b981' : color === 'success' ? '#34d399' : color === 'warning' ? '#fbbf24' : '#f87171'} 100%)`,
            color: 'white',
            boxShadow: `0 4px 12px 0 rgba(${color === 'primary' ? '30, 58, 138' : color === 'secondary' ? '5, 150, 105' : color === 'success' ? '16, 185, 129' : color === 'warning' ? '245, 158, 11' : '239, 68, 68'}, 0.4)`,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export const DashboardOverview: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🏗️ DashboardOverview: Starting data load...');
        await dataService.loadDataset();
        const projectData = dataService.getProjects();
        const statistics = dataService.getStatistics();
        
        console.log('🏗️ DashboardOverview: Got projects:', projectData?.length);
        console.log('🏗️ DashboardOverview: Got statistics:', !!statistics);
        
        setProjects(projectData);
        setStats(statistics);
      } catch (error) {
        console.error('🏗️ DashboardOverview: Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <Typography>No data available</Typography>
      </Box>
    );
  }

  // Calculate derived metrics
  const totalBudget = stats.overview.totalBudget;
  const avgProgress = stats.overview.avgProgress;
  const totalProjects = stats.overview.totalProjects;
  
  const criticalProjects = dataService.getCriticalProjects();
  const delayedProjects = dataService.getDelayedProjects();
  const highValueProjects = dataService.getHighValueProjects();
  
  const completedProjects = projects.filter(p => p.physicalProgress >= 95).length;

  // Chart data
  const categoryData = Object.entries(stats.distribution.byCategory).map(([key, value]) => ({
    name: dataService.getCategoryLabel(key),
    value,
    color: dataService.getCategoryColor(key)
  }));

  const stageData = Object.entries(stats.distribution.byStage).map(([key, value]) => ({
    name: dataService.getStageLabel(parseInt(key)),
    value,
    projects: value
  }));

  const riskData = Object.entries(stats.distribution.byRisk).map(([key, value]) => ({
    name: key,
    value,
    color: dataService.getRiskColor(key)
  }));

  const budgetDistribution = dataService.getBudgetDistribution();

  return (
    <Box sx={{ padding: '0 4px' }}>
      {/* Key Performance Indicators */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Box flex="1 1 300px">
          <StatCard
            title="Total Portfolio"
            value={dataService.formatCurrency(totalBudget)}
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
            subtitle={`${completedProjects} Completed`}
            icon={<Assessment sx={{ fontSize: 24 }} />}
            color="success"
            trend={{ value: 8.2, label: 'this month' }}
          />
        </Box>
        <Box flex="1 1 300px">
          <StatCard
            title="Critical Issues"
            value={criticalProjects.length.toString()}
            subtitle={`${delayedProjects.length} Delayed Projects`}
            icon={<Warning sx={{ fontSize: 24 }} />}
            color="warning"
          />
        </Box>
        <Box flex="1 1 300px">
          <StatCard
            title="High Value Projects"
            value={highValueProjects.length.toString()}
            subtitle="₹50+ Cr Projects"
            icon={<Engineering sx={{ fontSize: 24 }} />}
            color="secondary"
          />
        </Box>
      </Box>

      {/* Charts Section */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        {/* Project Categories */}
        <Box flex="1 1 500px">
          <FullscreenableCard 
            sx={{ height: '100%' }} 
            contentSx={{ padding: '20px !important', height: '100%', display: 'flex', flexDirection: 'column' }}
            title={
              <Box display="flex" alignItems="center">
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    backgroundColor: 'primary.main',
                    mr: 2
                  }}
                >
                  <TrendingUp sx={{ fontSize: 18, color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
                    Project Distribution by Category
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    Active projects across all categories
                  </Typography>
                </Box>
              </Box>
            }
          >
            <Box flex={1}>
              <ChartContainer height={280}>
                <PieChart>
                  <Pie
                    data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${value} (${((percent || 0) * 100).toFixed(0)}%)`}
                      outerRadius={85}
                      innerRadius={35}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend 
                      wrapperStyle={{ 
                        fontSize: '12px',
                        paddingTop: '10px'
                      }}
                    />
                  </PieChart>
              </ChartContainer>
            </Box>
          </FullscreenableCard>
        </Box>

        {/* Risk Distribution */}
        <Box flex="1 1 500px">
          <FullscreenableCard
            title={
              <Typography variant="h6" display="flex" alignItems="center">
                <Warning color="warning" sx={{ mr: 1 }} />
                Risk Level Distribution
              </Typography>
            }
          >
            <ChartContainer height={300}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${((percent || 0) * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
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

        {/* Project Stages */}
        <Box flex="1 1 500px">
          <FullscreenableCard
            title={
              <Typography variant="h6" display="flex" alignItems="center">
                <Schedule color="secondary" sx={{ mr: 1 }} />
                Projects by Stage
              </Typography>
            }
          >
            <ChartContainer height={300}>
                <BarChart data={stageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Legend />
                  <Bar dataKey="value" fill="#1976d2" name="Projects" label />
                </BarChart>
            </ChartContainer>
          </FullscreenableCard>
        </Box>

        {/* Budget Distribution */}
        <Box flex="1 1 500px">
          <FullscreenableCard
            title={
              <Typography variant="h6" display="flex" alignItems="center">
                <AccountBalance color="success" sx={{ mr: 1 }} />
                Budget Distribution
              </Typography>
            }
          >
            <ChartContainer height={300}>
                <BarChart data={budgetDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Legend />
                  <Bar dataKey="value" fill="#388e3c" name="Projects" />
                </BarChart>
            </ChartContainer>
          </FullscreenableCard>
        </Box>
      </Box>

      {/* Quick Actions & Alerts */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box flex="1 1 500px">
          <FullscreenableCard
            title={
              <Typography variant="h6" color="error">
                <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
                Requires Immediate Attention
              </Typography>
            }
          >
            <Stack spacing={2}>
                {criticalProjects.slice(0, 5).map((project, index) => (
                  <Box key={index} display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {project.projectName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {project.location.locality} | Delay: {project.timeline.delayDays} days
                      </Typography>
                    </Box>
                    <Chip 
                      label={project.riskLevel} 
                      size="small" 
                      color="error"
                    />
                  </Box>
                ))}
            </Stack>
          </FullscreenableCard>
        </Box>

        <Box flex="1 1 500px">
          <FullscreenableCard
            title={
              <Typography variant="h6" color="success.main">
                <CheckCircle sx={{ mr: 1, verticalAlign: 'middle' }} />
                Recent Achievements
              </Typography>
            }
          >
            <Stack spacing={2}>
                {projects
                  .filter(p => p.physicalProgress >= 90)
                  .slice(0, 5)
                  .map((project, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {project.projectName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {project.location.locality} | Progress: {project.physicalProgress}%
                        </Typography>
                      </Box>
                      <Chip 
                        label="Near Completion" 
                        size="small" 
                        color="success"
                      />
                    </Box>
                  ))}
            </Stack>
          </FullscreenableCard>
        </Box>
      </Box>
    </Box>
  );
};