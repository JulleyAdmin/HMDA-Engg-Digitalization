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
  Area,
  ComposedChart,
  ReferenceLine
} from 'recharts';
import { Box, useTheme, Typography } from '@mui/material';
import { HMDAProject } from '../../../../types/Project';

interface SCurveChartProps {
  project: HMDAProject;
  timeRange: 'all' | '3m' | '6m' | '1y';
}

const SCurveChart: React.FC<SCurveChartProps> = ({ project, timeRange }) => {
  const theme = useTheme();

  const chartData = useMemo(() => {
    // Generate S-curve data based on project timeline
    const totalDays = project.timeline?.totalDays || 900;
    const elapsedDays = project.timeline?.elapsedDays || 542;
    const currentProgress = project.physicalProgress;
    
    // Create data points for the S-curve
    const dataPoints = [];
    const intervals = 20; // Number of data points
    
    for (let i = 0; i <= intervals; i++) {
      const day = (totalDays / intervals) * i;
      const monthNum = Math.floor(day / 30);
      
      // S-curve formula for planned progress
      const x = i / intervals;
      const plannedProgress = 100 * (1 / (1 + Math.exp(-10 * (x - 0.5))));
      
      // Actual progress calculation (simulated with some variance)
      let actualProgress = 0;
      if (day <= elapsedDays) {
        const actualX = day / elapsedDays;
        actualProgress = currentProgress * (1 / (1 + Math.exp(-10 * (actualX - 0.5))));
        // Add some realistic variance
        actualProgress += (Math.random() - 0.5) * 5;
        actualProgress = Math.max(0, Math.min(100, actualProgress));
      }
      
      // Earned value (based on actual progress and budget)
      const earnedValue = actualProgress * project.totalBudget / 100;
      const plannedValue = plannedProgress * project.totalBudget / 100;
      const actualCost = day <= elapsedDays ? 
        (project.financial?.paidTillDate || earnedValue * 1.1) : 0;
      
      dataPoints.push({
        month: `Month ${monthNum}`,
        day: Math.round(day),
        planned: Math.round(plannedProgress * 10) / 10,
        actual: day <= elapsedDays ? Math.round(actualProgress * 10) / 10 : null,
        earnedValue: day <= elapsedDays ? earnedValue / 10000000 : null, // Convert to Crores
        plannedValue: plannedValue / 10000000,
        actualCost: day <= elapsedDays ? actualCost / 10000000 : null
      });
    }
    
    // Filter based on time range
    if (timeRange !== 'all') {
      const months = timeRange === '3m' ? 3 : timeRange === '6m' ? 6 : 12;
      const startIndex = Math.max(0, dataPoints.length - months);
      return dataPoints.slice(startIndex);
    }
    
    return dataPoints;
  }, [project, timeRange]);

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
          <Typography variant="subtitle2" fontWeight={600}>
            {label} (Day {payload[0]?.payload?.day})
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color, mt: 0.5 }}
            >
              {entry.name}: {entry.value !== null ? 
                (entry.name.includes('Value') || entry.name.includes('Cost') ? 
                  `₹${entry.value.toFixed(1)} Cr` : 
                  `${entry.value}%`) : 
                'N/A'}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart 
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis 
          dataKey="month" 
          stroke={theme.palette.text.secondary}
          style={{ fontSize: '0.75rem' }}
        />
        <YAxis 
          yAxisId="left"
          stroke={theme.palette.text.secondary}
          style={{ fontSize: '0.75rem' }}
          label={{ 
            value: 'Progress (%)', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle' }
          }}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          stroke={theme.palette.text.secondary}
          style={{ fontSize: '0.75rem' }}
          label={{ 
            value: 'Value (₹ Crores)', 
            angle: 90, 
            position: 'insideRight',
            style: { textAnchor: 'middle' }
          }}
        />
        <Tooltip content={customTooltip} />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="line"
        />
        
        {/* Reference line for current day */}
        <ReferenceLine
          x={`Month ${Math.floor((project.timeline?.elapsedDays || 542) / 30)}`}
          stroke={theme.palette.warning.main}
          strokeDasharray="5 5"
          label={{ value: "Today", position: "top" }}
        />
        
        {/* Progress Lines */}
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="planned"
          stroke={theme.palette.primary.main}
          strokeWidth={3}
          name="Planned Progress"
          dot={false}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="actual"
          stroke={theme.palette.success.main}
          strokeWidth={3}
          name="Actual Progress"
          dot={false}
          connectNulls={false}
        />
        
        {/* Value Lines */}
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="plannedValue"
          stroke={theme.palette.info.main}
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Planned Value"
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="earnedValue"
          stroke={theme.palette.success.dark}
          strokeWidth={2}
          name="Earned Value"
          dot={false}
          connectNulls={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="actualCost"
          stroke={theme.palette.error.main}
          strokeWidth={2}
          name="Actual Cost"
          dot={false}
          connectNulls={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default SCurveChart;