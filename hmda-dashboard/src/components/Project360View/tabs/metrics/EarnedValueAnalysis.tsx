import React, { useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  useTheme,
  alpha,
  LinearProgress,
  Tooltip,
  IconButton
} from '@mui/material';
import { Info, TrendingUp, TrendingDown } from '@mui/icons-material';
import { HMDAProject } from '../../../../types/Project';

interface EarnedValueAnalysisProps {
  project: HMDAProject;
}

const EarnedValueAnalysis: React.FC<EarnedValueAnalysisProps> = ({ project }) => {
  const theme = useTheme();

  const evmMetrics = useMemo(() => {
    // Calculate EVM metrics
    const budgetAtCompletion = project.totalBudget;
    const plannedDuration = project.timeline?.totalDays || 900;
    const elapsedDays = project.timeline?.elapsedDays || 542;
    const plannedProgress = (elapsedDays / plannedDuration) * 100;
    
    // Basic EVM calculations
    const plannedValue = (plannedProgress / 100) * budgetAtCompletion;
    const earnedValue = (project.physicalProgress / 100) * budgetAtCompletion;
    const actualCost = project.financial?.paidTillDate || (plannedValue * 1.1); // Simulate if not available
    
    // Performance indices
    const spi = earnedValue / plannedValue;
    const cpi = earnedValue / actualCost;
    
    // Variances
    const scheduleVariance = earnedValue - plannedValue;
    const costVariance = earnedValue - actualCost;
    const scheduleVariancePercent = (scheduleVariance / plannedValue) * 100;
    const costVariancePercent = (costVariance / earnedValue) * 100;
    
    // Forecasting
    const estimateAtCompletion = budgetAtCompletion / cpi;
    const estimateToComplete = estimateAtCompletion - actualCost;
    const varianceAtCompletion = budgetAtCompletion - estimateAtCompletion;
    const tcpi = (budgetAtCompletion - earnedValue) / (budgetAtCompletion - actualCost);
    
    // Time forecasting
    const timeEstimateAtCompletion = plannedDuration / spi;
    const timeVariance = timeEstimateAtCompletion - plannedDuration;
    
    return {
      budgetAtCompletion,
      plannedValue,
      earnedValue,
      actualCost,
      spi,
      cpi,
      scheduleVariance,
      costVariance,
      scheduleVariancePercent,
      costVariancePercent,
      estimateAtCompletion,
      estimateToComplete,
      varianceAtCompletion,
      tcpi,
      timeEstimateAtCompletion,
      timeVariance
    };
  }, [project]);

  const formatCurrency = (value: number) => {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  };

  const getPerformanceStatus = (value: number) => {
    if (value >= 0.95) return { color: 'success', label: 'Good' };
    if (value >= 0.85) return { color: 'warning', label: 'At Risk' };
    return { color: 'error', label: 'Critical' };
  };

  const getVarianceStatus = (value: number) => {
    if (value >= 0) return { color: 'success', label: 'Favorable' };
    if (value >= -5) return { color: 'warning', label: 'Caution' };
    return { color: 'error', label: 'Unfavorable' };
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Earned Value Management Analysis
          </Typography>
          <Tooltip title="EVM helps measure project performance and progress in an objective manner">
            <IconButton size="small">
              <Info />
            </IconButton>
          </Tooltip>
        </Stack>

        <Box display="flex" flexWrap="wrap" gap={3}>
          {/* Current Values */}
          <Box flex="1 1 45%">
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Current Performance Metrics
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>Budget at Completion (BAC)</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      {formatCurrency(evmMetrics.budgetAtCompletion)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Planned Value (PV)</TableCell>
                    <TableCell align="right">
                      {formatCurrency(evmMetrics.plannedValue)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Earned Value (EV)</TableCell>
                    <TableCell align="right">
                      {formatCurrency(evmMetrics.earnedValue)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Actual Cost (AC)</TableCell>
                    <TableCell align="right">
                      {formatCurrency(evmMetrics.actualCost)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Performance Indices */}
          <Box flex="1 1 45%">
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Performance Indices
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Schedule Performance Index (SPI)</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" fontWeight={600}>
                      {evmMetrics.spi.toFixed(2)}
                    </Typography>
                    <Chip
                      label={getPerformanceStatus(evmMetrics.spi).label}
                      color={getPerformanceStatus(evmMetrics.spi).color as any}
                      size="small"
                    />
                  </Stack>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(evmMetrics.spi * 100, 100)}
                  sx={{ 
                    mt: 1, 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getPerformanceStatus(evmMetrics.spi).color === 'success' 
                        ? theme.palette.success.main 
                        : getPerformanceStatus(evmMetrics.spi).color === 'warning'
                        ? theme.palette.warning.main
                        : theme.palette.error.main
                    }
                  }}
                />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Cost Performance Index (CPI)</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" fontWeight={600}>
                      {evmMetrics.cpi.toFixed(2)}
                    </Typography>
                    <Chip
                      label={getPerformanceStatus(evmMetrics.cpi).label}
                      color={getPerformanceStatus(evmMetrics.cpi).color as any}
                      size="small"
                    />
                  </Stack>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(evmMetrics.cpi * 100, 100)}
                  sx={{ 
                    mt: 1, 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getPerformanceStatus(evmMetrics.cpi).color === 'success' 
                        ? theme.palette.success.main 
                        : getPerformanceStatus(evmMetrics.cpi).color === 'warning'
                        ? theme.palette.warning.main
                        : theme.palette.error.main
                    }
                  }}
                />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">To-Complete Performance Index (TCPI)</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {evmMetrics.tcpi.toFixed(2)}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  Required CPI to complete within budget
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Variances */}
          <Box flex="1 1 45%">
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Variance Analysis
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ p: 2, bgcolor: alpha(theme.palette.background.default, 0.5), borderRadius: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Schedule Variance (SV)</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {evmMetrics.scheduleVariance > 0 ? <TrendingUp color="success" /> : <TrendingDown color="error" />}
                    <Typography 
                      variant="body2" 
                      fontWeight={600}
                      color={evmMetrics.scheduleVariance >= 0 ? 'success.main' : 'error.main'}
                    >
                      {formatCurrency(Math.abs(evmMetrics.scheduleVariance))}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {evmMetrics.scheduleVariancePercent.toFixed(1)}% {evmMetrics.scheduleVariance >= 0 ? 'ahead' : 'behind'} schedule
                </Typography>
              </Box>

              <Box sx={{ p: 2, bgcolor: alpha(theme.palette.background.default, 0.5), borderRadius: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Cost Variance (CV)</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {evmMetrics.costVariance > 0 ? <TrendingUp color="success" /> : <TrendingDown color="error" />}
                    <Typography 
                      variant="body2" 
                      fontWeight={600}
                      color={evmMetrics.costVariance >= 0 ? 'success.main' : 'error.main'}
                    >
                      {formatCurrency(Math.abs(evmMetrics.costVariance))}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {evmMetrics.costVariancePercent.toFixed(1)}% {evmMetrics.costVariance >= 0 ? 'under' : 'over'} budget
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Forecasting */}
          <Box flex="1 1 45%">
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Forecasting
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Estimate at Completion (EAC)</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(evmMetrics.estimateAtCompletion)}
                  </Typography>
                </Stack>
                <Typography variant="caption" color={evmMetrics.varianceAtCompletion < 0 ? 'error.main' : 'success.main'}>
                  {evmMetrics.varianceAtCompletion >= 0 ? 'Savings' : 'Overrun'}: {formatCurrency(Math.abs(evmMetrics.varianceAtCompletion))}
                </Typography>
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Estimate to Complete (ETC)</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(evmMetrics.estimateToComplete)}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  Additional funds needed to complete
                </Typography>
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Time Estimate at Completion</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {Math.round(evmMetrics.timeEstimateAtCompletion)} days
                  </Typography>
                </Stack>
                <Typography variant="caption" color={evmMetrics.timeVariance > 0 ? 'error.main' : 'success.main'}>
                  {evmMetrics.timeVariance > 0 ? 'Delay' : 'Early completion'}: {Math.abs(Math.round(evmMetrics.timeVariance))} days
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* Summary Insights */}
        <Box mt={3} p={2} bgcolor={alpha(theme.palette.primary.main, 0.05)} borderRadius={1}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            EVM Analysis Summary
          </Typography>
          <Stack spacing={1}>
            {evmMetrics.spi < 0.9 && (
              <Typography variant="body2" color="warning.main">
                ⚠️ Schedule performance is below acceptable threshold. Consider resource augmentation.
              </Typography>
            )}
            {evmMetrics.cpi < 0.95 && (
              <Typography variant="body2" color="error.main">
                ⚠️ Cost performance indicates potential budget overrun. Review cost control measures.
              </Typography>
            )}
            {evmMetrics.tcpi > 1.1 && (
              <Typography variant="body2" color="warning.main">
                ⚠️ High TCPI indicates challenging cost recovery requirement.
              </Typography>
            )}
            {evmMetrics.spi >= 0.95 && evmMetrics.cpi >= 0.95 && (
              <Typography variant="body2" color="success.main">
                ✅ Project is performing within acceptable parameters.
              </Typography>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EarnedValueAnalysis;