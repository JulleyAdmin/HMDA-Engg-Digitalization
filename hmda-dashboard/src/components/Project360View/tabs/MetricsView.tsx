import React, { useState, useMemo } from 'react';
import {
  Box,
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import {
  CalendarToday,
  ShowChart,
  Assessment,
  TrendingUp,
  Download
} from '@mui/icons-material';
import { HMDAProject } from '../../../types/Project';
import MetricCard from '../shared/MetricCard';
import ChartContainer from '../shared/ChartContainer';
import SCurveChart from './metrics/SCurveChart';
import EarnedValueAnalysis from './metrics/EarnedValueAnalysis';
import MilestoneTracker from './metrics/MilestoneTracker';
import PerformanceTrends from './metrics/PerformanceTrends';

interface MetricsViewProps {
  project: HMDAProject;
}

const MetricsView: React.FC<MetricsViewProps> = ({ project }) => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState<'all' | '3m' | '6m' | '1y'>('all');
  const [view, setView] = useState<'overview' | 'detailed'>('overview');

  // Calculate key metrics
  const metrics = useMemo(() => {
    const plannedDuration = project.timeline?.totalDays || 900;
    const elapsedDays = project.timeline?.elapsedDays || 542;
    const plannedProgress = (elapsedDays / plannedDuration) * 100;
    
    // Schedule Performance Index (SPI)
    const spi = project.physicalProgress / plannedProgress;
    
    // Cost Performance Index (CPI)
    const budgetSpent = (project.financial?.paidTillDate || 0) / project.totalBudget * 100;
    const cpi = project.financialProgress / budgetSpent;
    
    // Schedule Variance
    const scheduleVariance = project.physicalProgress - plannedProgress;
    
    // Cost Variance
    const costVariance = project.financialProgress - budgetSpent;
    
    // Estimate at Completion (EAC)
    const eac = project.totalBudget / (cpi || 1);
    
    // Variance at Completion (VAC)
    const vac = project.totalBudget - eac;
    
    return {
      spi: isNaN(spi) ? 1 : spi,
      cpi: isNaN(cpi) ? 1 : cpi,
      scheduleVariance: isNaN(scheduleVariance) ? 0 : scheduleVariance,
      costVariance: isNaN(costVariance) ? 0 : costVariance,
      eac,
      vac,
      plannedProgress,
      actualProgress: project.physicalProgress,
      delayDays: project.timeline?.delayDays || 0,
      daysRemaining: project.timeline?.remainingDays || 358
    };
  }, [project]);

  const getMetricStatus = (value: number, type: 'spi' | 'cpi') => {
    if (value >= 0.95) return 'good';
    if (value >= 0.85) return 'warning';
    return 'critical';
  };

  const handleExport = (format: 'png' | 'csv' | 'pdf') => {
    console.log(`Exporting metrics as ${format}`);
    // Implementation would go here
  };

  return (
    <Box>
      {/* Header Controls */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        mb={3}
      >
        <Typography variant="h6" fontWeight={600}>
          Project Performance Metrics
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={(e, value) => value && setTimeRange(value)}
            size="small"
          >
            <ToggleButton value="3m">3M</ToggleButton>
            <ToggleButton value="6m">6M</ToggleButton>
            <ToggleButton value="1y">1Y</ToggleButton>
            <ToggleButton value="all">All</ToggleButton>
          </ToggleButtonGroup>
          
          <Button
            variant="outlined"
            size="small"
            startIcon={<Download />}
            onClick={() => handleExport('pdf')}
          >
            Export Report
          </Button>
        </Stack>
      </Stack>

      {/* Key Performance Indicators */}
      <Box display="flex" flexWrap="wrap" gap={3} mb={3}>
        <Box flex="1 1 250px">
          <MetricCard
            title="Schedule Performance Index"
            value={metrics.spi.toFixed(2)}
            target={1.0}
            status={getMetricStatus(metrics.spi, 'spi')}
            trend={{
              value: 5.2,
              direction: metrics.spi > 1 ? 'up' : 'down'
            }}
            info="SPI = Earned Value / Planned Value"
          />
        </Box>
        
        <Box flex="1 1 250px">
          <MetricCard
            title="Cost Performance Index"
            value={metrics.cpi.toFixed(2)}
            target={1.0}
            status={getMetricStatus(metrics.cpi, 'cpi')}
            trend={{
              value: 3.1,
              direction: metrics.cpi > 1 ? 'up' : 'down'
            }}
            info="CPI = Earned Value / Actual Cost"
          />
        </Box>
        
        <Box flex="1 1 250px">
          <MetricCard
            title="Schedule Variance"
            value={`${metrics.scheduleVariance > 0 ? '+' : ''}${metrics.scheduleVariance.toFixed(1)}`}
            unit="%"
            status={metrics.scheduleVariance >= 0 ? 'good' : 'warning'}
            trend={{
              value: Math.abs(metrics.scheduleVariance),
              direction: metrics.scheduleVariance > 0 ? 'up' : 'down'
            }}
          />
        </Box>
        
        <Box flex="1 1 250px">
          <MetricCard
            title="Days to Completion"
            value={metrics.daysRemaining}
            unit="days"
            status={metrics.delayDays > 30 ? 'critical' : metrics.delayDays > 0 ? 'warning' : 'good'}
            info={metrics.delayDays > 0 ? `${metrics.delayDays} days delayed` : 'On schedule'}
          />
        </Box>
      </Box>

      {/* Financial Metrics */}
      <Box display="flex" flexWrap="wrap" gap={3} mb={3}>
        <Box flex="1 1 250px">
          <MetricCard
            title="Estimate at Completion"
            value={`₹${(metrics.eac / 10000000).toFixed(1)}`}
            unit="Cr"
            target={`₹${(project.totalBudget / 10000000).toFixed(1)}`}
            status={metrics.eac > project.totalBudget * 1.1 ? 'critical' : 
                    metrics.eac > project.totalBudget ? 'warning' : 'good'}
          />
        </Box>
        
        <Box flex="1 1 250px">
          <MetricCard
            title="Variance at Completion"
            value={`${metrics.vac > 0 ? '+' : ''}₹${Math.abs(metrics.vac / 10000000).toFixed(1)}`}
            unit="Cr"
            status={metrics.vac < 0 ? 'critical' : 'good'}
            info={metrics.vac < 0 ? 'Cost overrun expected' : 'Cost savings expected'}
          />
        </Box>
        
        <Box flex="1 1 250px">
          <MetricCard
            title="Budget Utilization"
            value={`${project.financial?.budgetUtilization || 62.5}`}
            unit="%"
            target="As per plan"
            status={project.financial?.budgetUtilization > 80 ? 'warning' : 'good'}
          />
        </Box>
        
        <Box flex="1 1 250px">
          <MetricCard
            title="Milestone Achievement"
            value="4/7"
            unit="completed"
            status="good"
            info="57% milestones achieved"
          />
        </Box>
      </Box>

      {/* Charts Section */}
      <Box display="flex" flexWrap="wrap" gap={3}>
        {/* S-Curve Chart */}
        <Box flex="1 1 250px">
          <ChartContainer
            title="Project S-Curve Analysis"
            subtitle="Planned vs Actual vs Earned Value"
            height={400}
            onExport={handleExport}
            onRefresh={() => console.log('Refresh S-curve')}
            info="Updated daily at 6:00 AM"
          >
            <SCurveChart project={project} timeRange={timeRange} />
          </ChartContainer>
        </Box>

        {/* Performance Trends */}
        <Box flex="1 1 250px">
          <ChartContainer
            title="Performance Trends"
            subtitle="SPI & CPI over time"
            height={400}
            onExport={handleExport}
          >
            <PerformanceTrends project={project} timeRange={timeRange} />
          </ChartContainer>
        </Box>

        {/* Earned Value Analysis */}
        <Box flex="1 1 250px">
          <EarnedValueAnalysis project={project} />
        </Box>

        {/* Milestone Tracker */}
        <Box flex="1 1 250px">
          <MilestoneTracker project={project} />
        </Box>
      </Box>

      {/* Quick Insights */}
      <Box mt={3} p={2} bgcolor={alpha(theme.palette.primary.main, 0.05)} borderRadius={1}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Key Insights & Recommendations
        </Typography>
        <Stack spacing={1} mt={1}>
          {metrics.spi < 0.9 && (
            <Chip
              icon={<TrendingUp />}
              label="Schedule recovery plan needed - Consider resource augmentation"
              color="warning"
              variant="outlined"
              sx={{ justifyContent: 'flex-start' }}
            />
          )}
          {metrics.cpi < 0.95 && (
            <Chip
              icon={<Assessment />}
              label="Cost overrun risk - Review variation orders and optimize resources"
              color="error"
              variant="outlined"
              sx={{ justifyContent: 'flex-start' }}
            />
          )}
          {metrics.delayDays > 30 && (
            <Chip
              icon={<CalendarToday />}
              label={`Project delayed by ${metrics.delayDays} days - Fast-track critical activities`}
              color="warning"
              variant="outlined"
              sx={{ justifyContent: 'flex-start' }}
            />
          )}
          {metrics.spi >= 0.95 && metrics.cpi >= 0.95 && (
            <Chip
              icon={<ShowChart />}
              label="Project performing well - Maintain current momentum"
              color="success"
              variant="outlined"
              sx={{ justifyContent: 'flex-start' }}
            />
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default MetricsView;