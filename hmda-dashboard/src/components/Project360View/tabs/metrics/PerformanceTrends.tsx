import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area,
  ComposedChart
} from 'recharts';
import { Box, useTheme, Typography, Stack, Chip, alpha } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { HMDAProject } from '../../../../types/Project';

interface PerformanceTrendsProps {
  project: HMDAProject;
  timeRange: 'all' | '3m' | '6m' | '1y';
}

const PerformanceTrends: React.FC<PerformanceTrendsProps> = ({ project, timeRange }) => {
  const theme = useTheme();

  const trendData = useMemo(() => {
    // Generate trend data based on time range
    const months = timeRange === '3m' ? 3 : timeRange === '6m' ? 6 : timeRange === '1y' ? 12 : 18;
    const data = [];
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    for (let i = months - 1; i >= 0; i--) {
      const month = new Date(currentYear, currentMonth - i, 1);
      const monthName = month.toLocaleDateString('en-US', { month: 'short' });
      
      // Simulate SPI and CPI trends with some variance
      const baseProgress = (1 - (i / months)) * project.physicalProgress;
      const spiBase = 0.85 + (i < months / 2 ? 0.1 : 0.15) * Math.random();
      const cpiBase = 0.90 + (i < months / 2 ? 0.08 : 0.12) * Math.random();
      
      // Add realistic variance
      const spi = Math.max(0.7, Math.min(1.2, spiBase + (Math.random() - 0.5) * 0.1));
      const cpi = Math.max(0.75, Math.min(1.15, cpiBase + (Math.random() - 0.5) * 0.08));
      
      // Health score is weighted average of SPI and CPI
      const healthScore = (spi * 0.5 + cpi * 0.5) * 100;
      
      data.push({
        month: monthName,
        spi: parseFloat(spi.toFixed(2)),
        cpi: parseFloat(cpi.toFixed(2)),
        healthScore: Math.round(healthScore),
        target: 1.0,
        criticalThreshold: 0.85
      });
    }
    
    return data;
  }, [project, timeRange]);

  const latestMetrics = trendData[trendData.length - 1];
  const previousMetrics = trendData[trendData.length - 2];
  
  const spiTrend = latestMetrics.spi - previousMetrics.spi;
  const cpiTrend = latestMetrics.cpi - previousMetrics.cpi;

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 1.5,
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            boxShadow: 2
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => {
            if (entry.dataKey === 'target' || entry.dataKey === 'criticalThreshold') return null;
            return (
              <Stack key={index} direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: entry.color
                  }}
                />
                <Typography variant="body2">
                  {entry.name}: {entry.dataKey === 'healthScore' ? `${entry.value}%` : entry.value}
                </Typography>
              </Stack>
            );
          })}
        </Box>
      );
    }
    return null;
  };

  const getPerformanceChip = (value: number, type: 'SPI' | 'CPI') => {
    const trend = type === 'SPI' ? spiTrend : cpiTrend;
    const color = value >= 0.95 ? 'success' : value >= 0.85 ? 'warning' : 'error';
    const icon = trend > 0 ? <TrendingUp sx={{ fontSize: 16 }} /> : <TrendingDown sx={{ fontSize: 16 }} />;
    
    return (
      <Chip
        label={`${type}: ${value}`}
        color={color}
        size="small"
        icon={icon}
        sx={{ fontWeight: 600 }}
      />
    );
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Current Performance Indicators */}
      <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
        {getPerformanceChip(latestMetrics.spi, 'SPI')}
        {getPerformanceChip(latestMetrics.cpi, 'CPI')}
        <Chip
          label={`Health: ${latestMetrics.healthScore}%`}
          color={latestMetrics.healthScore >= 90 ? 'success' : latestMetrics.healthScore >= 80 ? 'warning' : 'error'}
          size="small"
          sx={{ fontWeight: 600 }}
        />
      </Stack>

      {/* Trend Chart */}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={trendData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme.palette.divider} 
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              stroke={theme.palette.text.secondary}
              style={{ fontSize: '0.75rem' }}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <YAxis 
              domain={[0.6, 1.2]}
              ticks={[0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1.0, 1.1, 1.2]}
              stroke={theme.palette.text.secondary}
              style={{ fontSize: '0.75rem' }}
              tick={{ fill: theme.palette.text.secondary }}
            />
            <Tooltip content={customTooltip} />
            <Legend 
              wrapperStyle={{ paddingTop: '10px' }}
              iconType="line"
              iconSize={18}
            />
            
            {/* Reference Lines */}
            <ReferenceLine 
              y={1} 
              stroke={theme.palette.success.main}
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{ value: "Target", position: "right", fill: theme.palette.success.main }}
            />
            <ReferenceLine 
              y={0.85} 
              stroke={theme.palette.warning.main}
              strokeDasharray="3 3"
              label={{ value: "Critical", position: "right", fill: theme.palette.warning.main }}
            />
            
            {/* Performance Areas */}
            <Area
              dataKey="spi"
              fill={alpha(theme.palette.primary.main, 0.1)}
              stroke="none"
            />
            <Area
              dataKey="cpi"
              fill={alpha(theme.palette.secondary.main, 0.1)}
              stroke="none"
            />
            
            {/* Performance Lines */}
            <Line
              type="monotone"
              dataKey="spi"
              stroke={theme.palette.primary.main}
              strokeWidth={3}
              name="SPI"
              dot={{ fill: theme.palette.primary.main, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="cpi"
              stroke={theme.palette.secondary.main}
              strokeWidth={3}
              name="CPI"
              dot={{ fill: theme.palette.secondary.main, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      {/* Trend Summary */}
      <Box 
        sx={{ 
          mt: 2, 
          p: 1.5, 
          bgcolor: alpha(theme.palette.background.default, 0.5), 
          borderRadius: 1,
          border: 1,
          borderColor: 'divider'
        }}
      >
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              Schedule Performance Trend
            </Typography>
            <Typography 
              variant="caption" 
              fontWeight={600}
              color={spiTrend > 0 ? 'success.main' : 'error.main'}
            >
              {spiTrend > 0 ? '+' : ''}{(spiTrend * 100).toFixed(1)}%
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              Cost Performance Trend
            </Typography>
            <Typography 
              variant="caption" 
              fontWeight={600}
              color={cpiTrend > 0 ? 'success.main' : 'error.main'}
            >
              {cpiTrend > 0 ? '+' : ''}{(cpiTrend * 100).toFixed(1)}%
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              Average Performance
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              {((latestMetrics.spi + latestMetrics.cpi) / 2).toFixed(2)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default PerformanceTrends;