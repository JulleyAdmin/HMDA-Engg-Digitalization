import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import {
  Lightbulb,
  Warning,
  TrendingUp,
  Info,
  Schedule,
  MonetizationOn
} from '@mui/icons-material';

export interface InsightItem {
  id: string;
  type: 'info' | 'warning' | 'success' | 'tip' | 'trend';
  icon?: React.ReactNode;
  title?: string;
  message: string;
  value?: string | number;
  change?: number;
  priority: 'high' | 'medium' | 'low';
  category?: 'cost' | 'time' | 'quality' | 'risk' | 'general';
}

interface StageInsightsProps {
  insights: InsightItem[];
  title?: string;
  compactMode?: boolean;
  maxItems?: number;
}

const StageInsights: React.FC<StageInsightsProps> = ({
  insights,
  title = "STAGE INSIGHTS & ALERTS",
  compactMode = false,
  maxItems = 5
}) => {
  const theme = useTheme();

  const getInsightIcon = (type: InsightItem['type'], category?: string) => {
    if (category === 'cost') return <MonetizationOn />;
    if (category === 'time') return <Schedule />;
    
    switch (type) {
      case 'warning':
        return <Warning />;
      case 'success':
        return <TrendingUp />;
      case 'tip':
        return <Lightbulb />;
      case 'trend':
        return <TrendingUp />;
      default:
        return <Info />;
    }
  };

  const getInsightColor = (type: InsightItem['type'], priority: InsightItem['priority']) => {
    if (priority === 'high') {
      switch (type) {
        case 'warning': return theme.palette.error.main;
        case 'info': return theme.palette.error.main;
        default: return theme.palette.error.main;
      }
    }
    
    switch (type) {
      case 'warning': return theme.palette.warning.main;
      case 'success': return theme.palette.success.main;
      case 'tip': return theme.palette.info.main;
      case 'trend': return theme.palette.primary.main;
      default: return theme.palette.info.main;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'success': return '📈';
      case 'tip': return '💡';
      case 'trend': return '📊';
      default: return 'ℹ️';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'cost': return theme.palette.success.main;
      case 'time': return theme.palette.warning.main;
      case 'quality': return theme.palette.info.main;
      case 'risk': return theme.palette.error.main;
      default: return theme.palette.grey[600];
    }
  };

  // Sort insights by priority
  const sortedInsights = [...insights]
    .sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    })
    .slice(0, maxItems);

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          p: compactMode ? 2 : 2.5,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.05)} 0%, ${alpha(theme.palette.warning.main, 0.02)} 100%)`,
          border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
          mb: 2,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${theme.palette.warning.main} 0%, ${alpha(theme.palette.warning.main, 0.7)} 100%)`
          }
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography 
            variant="h6" 
            fontWeight={600}
            sx={{ 
              fontSize: compactMode ? '0.9rem' : '1rem',
              color: theme.palette.warning.main
            }}
          >
            {title}
          </Typography>
          
          <Stack direction="row" spacing={0.5}>
            <Chip
              label={`${sortedInsights.length} insights`}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                color: theme.palette.warning.main,
                fontWeight: 600,
                fontSize: '0.7rem'
              }}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Insights List */}
      <Stack spacing={compactMode ? 1 : 1.5}>
        {sortedInsights.map((insight, index) => {
          const insightColor = getInsightColor(insight.type, insight.priority);
          
          return (
            <Box
              key={insight.id}
              sx={{
                p: compactMode ? 1.5 : 2,
                borderRadius: 1.5,
                background: `linear-gradient(135deg, ${alpha(insightColor, 0.03)} 0%, transparent 100%)`,
                border: `1px solid ${alpha(insightColor, 0.2)}`,
                position: 'relative',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: insightColor,
                  transform: 'translateY(-1px)',
                  boxShadow: `0 4px 12px ${alpha(insightColor, 0.15)}`
                },
                '&::before': insight.priority === 'high' ? {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: insightColor
                } : undefined
              }}
            >
              <Stack direction="row" spacing={2} alignItems="flex-start">
                {/* Icon */}
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(insightColor, 0.1),
                    color: insightColor,
                    fontSize: compactMode ? '0.9rem' : '1rem',
                    flexShrink: 0
                  }}
                >
                  {insight.icon ? (
                    <Box sx={{ fontSize: 16 }}>
                      {insight.icon}
                    </Box>
                  ) : (
                    getTypeIcon(insight.type)
                  )}
                </Box>

                {/* Content */}
                <Box flex={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                    <Box flex={1}>
                      {insight.title && (
                        <Typography 
                          variant="subtitle2" 
                          fontWeight={600}
                          sx={{ 
                            mb: 0.5,
                            fontSize: compactMode ? '0.8rem' : '0.85rem',
                            color: 'text.primary'
                          }}
                        >
                          {insight.title}
                        </Typography>
                      )}
                      
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: compactMode ? '0.75rem' : '0.8rem',
                          lineHeight: 1.4
                        }}
                      >
                        {insight.message}
                      </Typography>
                    </Box>

                    {/* Value/Change Display */}
                    {(insight.value || insight.change !== undefined) && (
                      <Box sx={{ textAlign: 'right', ml: 2, flexShrink: 0 }}>
                        {insight.value && (
                          <Typography 
                            variant="h6" 
                            fontWeight={700}
                            sx={{ 
                              color: insightColor,
                              fontSize: compactMode ? '0.9rem' : '1rem',
                              lineHeight: 1
                            }}
                          >
                            {insight.value}
                          </Typography>
                        )}
                        
                        {insight.change !== undefined && (
                          <Typography 
                            variant="caption"
                            sx={{ 
                              color: insight.change > 0 ? theme.palette.success.main : theme.palette.error.main,
                              fontWeight: 600,
                              fontSize: '0.7rem'
                            }}
                          >
                            {insight.change > 0 ? '+' : ''}{insight.change}%
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Stack>

                  {/* Tags */}
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    {/* Priority Badge */}
                    <Chip
                      label={insight.priority.toUpperCase()}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        bgcolor: alpha(insightColor, 0.1),
                        color: insightColor,
                        '& .MuiChip-label': {
                          px: 0.75
                        }
                      }}
                    />

                    {/* Category Badge */}
                    {insight.category && (
                      <Chip
                        label={insight.category.toUpperCase()}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.6rem',
                          fontWeight: 500,
                          bgcolor: alpha(getCategoryColor(insight.category), 0.1),
                          color: getCategoryColor(insight.category),
                          '& .MuiChip-label': {
                            px: 0.75
                          }
                        }}
                      />
                    )}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Stack>

      {/* Summary Stats */}
      {!compactMode && insights.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack alignItems="center">
              <Typography variant="h6" color="error.main" fontWeight={700}>
                {insights.filter(i => i.priority === 'high').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                High Priority
              </Typography>
            </Stack>
            
            <Stack alignItems="center">
              <Typography variant="h6" color="warning.main" fontWeight={700}>
                {insights.filter(i => i.type === 'warning').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Warnings
              </Typography>
            </Stack>
            
            <Stack alignItems="center">
              <Typography variant="h6" color="info.main" fontWeight={700}>
                {insights.filter(i => i.type === 'tip').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Tips
              </Typography>
            </Stack>
            
            <Stack alignItems="center">
              <Typography variant="h6" color="success.main" fontWeight={700}>
                {insights.filter(i => i.type === 'success').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Positive
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default StageInsights;