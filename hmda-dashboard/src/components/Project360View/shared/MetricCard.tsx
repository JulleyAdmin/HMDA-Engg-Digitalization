import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Info
} from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  target?: number | string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'flat';
  };
  status?: 'good' | 'warning' | 'critical' | 'neutral';
  info?: string;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  target,
  trend,
  status = 'neutral',
  info,
  onClick
}) => {
  const theme = useTheme();

  const getStatusColor = () => {
    switch (status) {
      case 'good': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      case 'critical': return theme.palette.error.main;
      default: return theme.palette.primary.main;
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend.direction) {
      case 'up': return <TrendingUp sx={{ fontSize: 16 }} />;
      case 'down': return <TrendingDown sx={{ fontSize: 16 }} />;
      default: return <TrendingFlat sx={{ fontSize: 16 }} />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return theme.palette.text.secondary;
    
    // For metrics where up is good (like progress)
    if (status === 'good' && trend.direction === 'up') return theme.palette.success.main;
    if (status === 'critical' && trend.direction === 'down') return theme.palette.error.main;
    
    // For metrics where down is good (like cost overrun)
    if (title.toLowerCase().includes('cost') && trend.direction === 'down') return theme.palette.success.main;
    
    return theme.palette.text.secondary;
  };

  return (
    <Card
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        borderTop: `4px solid ${getStatusColor()}`,
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4]
        } : {}
      }}
      onClick={onClick}
    >
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            {info && (
              <Info sx={{ fontSize: 16, color: 'text.secondary' }} />
            )}
          </Stack>

          <Box>
            <Typography variant="h4" fontWeight="bold" color={getStatusColor()}>
              {value}
              {unit && (
                <Typography component="span" variant="h6" color="text.secondary">
                  {' '}{unit}
                </Typography>
              )}
            </Typography>
          </Box>

          {target && (
            <Typography variant="body2" color="text.secondary">
              Target: {target}{unit ? ` ${unit}` : ''}
            </Typography>
          )}

          {trend && (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {getTrendIcon()}
              <Typography 
                variant="caption" 
                fontWeight="medium"
                color={getTrendColor()}
              >
                {Math.abs(trend.value)}% {trend.direction === 'up' ? 'increase' : 'decrease'}
              </Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MetricCard;