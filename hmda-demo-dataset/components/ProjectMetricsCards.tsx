// Project Metrics Cards Component
import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Icon,
  LinearProgress,
  SxProps,
  Theme
} from '@mui/material';
import {
  AccountBalance as BudgetIcon,
  Construction as ProjectsIcon,
  Warning as DelayedIcon,
  Error as CriticalIcon,
  CheckCircle as CompletedIcon,
  TrendingUp as TrendIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface ProjectMetrics {
  totalProjects: number;
  totalValue: number; // in crores
  delayedProjects: number;
  criticalProjects: number;
  completedProjects: number;
  completionRate: number; // percentage
}

interface ProjectMetricsCardsProps {
  metrics: ProjectMetrics;
  totalProjects: number;
  sx?: SxProps<Theme>;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  progress?: number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  progress,
  trend,
  trendValue
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: theme.shadows[4]
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}
          >
            {icon}
          </Box>
          {trend && trendValue && (
            <Box display="flex" alignItems="center" gap={0.5}>
              <TrendIcon
                fontSize="small"
                sx={{
                  transform: trend === 'down' ? 'rotate(180deg)' : 'none',
                  color: trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary'
                }}
              />
              <Typography
                variant="body2"
                color={trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary'}
              >
                {trendValue}
              </Typography>
            </Box>
          )}
        </Box>
        
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {value}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        
        {progress !== undefined && (
          <Box mt={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {progress.toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color,
                  borderRadius: 3
                }
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const ProjectMetricsCards: React.FC<ProjectMetricsCardsProps> = ({
  metrics,
  totalProjects,
  sx
}) => {
  const theme = useTheme();

  // Calculate percentages
  const delayedPercentage = totalProjects > 0 ? (metrics.delayedProjects / totalProjects) * 100 : 0;
  const criticalPercentage = totalProjects > 0 ? (metrics.criticalProjects / totalProjects) * 100 : 0;

  const cards: MetricCardProps[] = [
    {
      title: 'Filtered Projects',
      value: metrics.totalProjects,
      subtitle: `of ${totalProjects} total projects`,
      icon: <ProjectsIcon />,
      color: theme.palette.primary.main,
      progress: totalProjects > 0 ? (metrics.totalProjects / totalProjects) * 100 : 0
    },
    {
      title: 'Total Contract Value',
      value: `₹${metrics.totalValue.toFixed(1)} Cr`,
      subtitle: 'Filtered projects value',
      icon: <BudgetIcon />,
      color: theme.palette.success.main,
      trend: 'up',
      trendValue: '+12.5%'
    },
    {
      title: 'Delayed Projects',
      value: metrics.delayedProjects,
      subtitle: `${delayedPercentage.toFixed(1)}% of filtered projects`,
      icon: <DelayedIcon />,
      color: theme.palette.warning.main,
      progress: delayedPercentage,
      trend: delayedPercentage > 20 ? 'up' : 'down',
      trendValue: delayedPercentage > 20 ? 'High' : 'Normal'
    },
    {
      title: 'Critical Issues',
      value: metrics.criticalProjects,
      subtitle: 'Requiring immediate attention',
      icon: <CriticalIcon />,
      color: theme.palette.error.main,
      progress: criticalPercentage,
      trend: criticalPercentage > 15 ? 'up' : 'down',
      trendValue: criticalPercentage > 15 ? 'Alert' : 'Good'
    },
    {
      title: 'Completed Projects',
      value: metrics.completedProjects,
      subtitle: `${metrics.completionRate.toFixed(1)}% completion rate`,
      icon: <CompletedIcon />,
      color: theme.palette.info.main,
      progress: metrics.completionRate,
      trend: 'up',
      trendValue: '+5.2%'
    }
  ];

  return (
    <Grid container spacing={3} sx={sx}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={12/5} key={index}>
          <MetricCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectMetricsCards;