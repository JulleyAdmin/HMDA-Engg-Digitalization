import React from 'react';
import {
  Box,
  Card,
  Typography,
  Stack,
  Chip,
  IconButton,
  Button,
  useTheme,
  alpha,
  Collapse
} from '@mui/material';
import {
  SmartToy,
  Warning,
  Lightbulb,
  TrendingUp,
  Recommend,
  ExpandMore,
  ExpandLess,
  Cloud,
  Speed,
  AttachMoney,
  Engineering
} from '@mui/icons-material';
import { HMDAProject, ProjectStage } from '../../types/Project';

interface PredictiveInsightsProps {
  project: HMDAProject;
}

interface Insight {
  id: string;
  type: 'warning' | 'suggestion' | 'prediction' | 'recommendation';
  icon: React.ReactNode;
  title: string;
  description: string;
  impact?: string;
  confidence?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const PredictiveInsights: React.FC<PredictiveInsightsProps> = ({ project }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(true);

  // Helper functions
  const getCompletionDate = (): string => {
    // Mock calculation
    const today = new Date();
    const remainingDays = project.timeline?.remainingDays || 358;
    const completionDate = new Date(today.getTime() + remainingDays * 24 * 60 * 60 * 1000);
    return completionDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
  };

  const getKeyRisk = (): string => {
    // Mock risk identification
    switch (project.currentStage) {
      case ProjectStage.CONSTRUCTION:
        return 'Land acquisition resolution';
      case ProjectStage.DPR_APPROVALS:
        return 'Clearance delays';
      case ProjectStage.TENDERING:
        return 'Low bidder participation';
      default:
        return 'Timeline adherence';
    }
  };

  const getStageRecommendation = (): string => {
    switch (project.currentStage) {
      case ProjectStage.CONSTRUCTION:
        return 'Fast-track P19-20 work before monsoon. Critical for maintaining schedule.';
      case ProjectStage.DPR_APPROVALS:
        return 'Parallel processing of NOCs can save 15 days. Initiate TSSPDCL clearance immediately.';
      case ProjectStage.TENDERING:
        return 'Consider pre-bid meeting rescheduling to maximize bidder participation.';
      default:
        return 'Focus on critical path activities to optimize timeline.';
    }
  };

  // Generate insights based on project data and stage
  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];

    // Weather-based insights
    if (project.currentStage === ProjectStage.CONSTRUCTION) {
      insights.push({
        id: 'weather-1',
        type: 'warning',
        icon: <Cloud />,
        title: 'Monsoon Impact Alert',
        description: 'Based on weather data: 15-20 rain days expected in Jun-Jul. Plan accordingly',
        impact: '15 days potential delay',
        confidence: 85
      });
    }

    // Cost insights
    insights.push({
      id: 'cost-1',
      type: 'suggestion',
      icon: <AttachMoney />,
      title: 'Cost Performance Analysis',
      description: `Similar flyovers: Avg 18% cost overrun. Current trend: ${((project.financial?.budgetUtilization || 62.5) - 62.5).toFixed(1)}% - Better than average!`,
      impact: '₹2.3 Cr potential savings',
      confidence: 78
    });

    // Schedule prediction
    const delayDays = project.timeline?.delayDays || 0;
    if (delayDays > 0) {
      insights.push({
        id: 'schedule-1',
        type: 'prediction',
        icon: <Speed />,
        title: 'Completion Forecast',
        description: `ML Prediction: 85% chance of completion by ${getCompletionDate()}`,
        impact: `Key risk: ${getKeyRisk()}`,
        confidence: 85
      });
    }

    // Stage-specific recommendations
    insights.push({
      id: 'recommend-1',
      type: 'recommendation',
      icon: <Engineering />,
      title: 'Optimization Opportunity',
      description: getStageRecommendation(),
      action: {
        label: 'View Details',
        onClick: () => console.log('View recommendation details')
      }
    });

    // Resource optimization
    if (project.currentStage === ProjectStage.CONSTRUCTION) {
      insights.push({
        id: 'resource-1',
        type: 'suggestion',
        icon: <Lightbulb />,
        title: 'Resource Optimization',
        description: 'Shift 2 crews from P15 to P19 to maintain critical path',
        impact: 'Save 5 days on schedule',
        confidence: 72
      });
    }

    return insights;
  };

  const insights = generateInsights();

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning': return theme.palette.warning.main;
      case 'suggestion': return theme.palette.info.main;
      case 'prediction': return theme.palette.primary.main;
      case 'recommendation': return theme.palette.success.main;
      default: return theme.palette.grey[600];
    }
  };

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
      }}
    >
      {/* Header */}
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between"
        sx={{ 
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <SmartToy color="primary" />
          <Typography variant="h6" fontWeight={600} fontSize="0.95rem">
            SMART INSIGHTS FOR PROJECT
          </Typography>
          <Chip 
            label="AI Powered" 
            size="small" 
            color="primary"
            sx={{ fontSize: '0.65rem', height: 20 }}
          />
        </Stack>
        
        <IconButton 
          size="small" 
          onClick={() => setExpanded(!expanded)}
          sx={{ 
            transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.3s'
          }}
        >
          <ExpandMore />
        </IconButton>
      </Stack>

      {/* Insights Content */}
      <Collapse in={expanded}>
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            {insights.map((insight, index) => (
              <Stack 
                key={insight.id}
                direction="row" 
                spacing={2}
                sx={{
                  pb: index < insights.length - 1 ? 2 : 0,
                  borderBottom: index < insights.length - 1 ? 1 : 0,
                  borderColor: 'divider'
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(getInsightColor(insight.type), 0.1),
                    color: getInsightColor(insight.type),
                    flexShrink: 0
                  }}
                >
                  {insight.icon}
                </Box>

                {/* Content */}
                <Box flex={1}>
                  <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {insight.title}
                    </Typography>
                    {insight.confidence && (
                      <Chip 
                        label={`${insight.confidence}% confidence`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.65rem', height: 18 }}
                      />
                    )}
                  </Stack>
                  
                  <Typography variant="body2" color="text.secondary" mb={0.5}>
                    {insight.description}
                  </Typography>
                  
                  {insight.impact && (
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      {insight.impact}
                    </Typography>
                  )}
                  
                  {insight.action && (
                    <Button
                      size="small"
                      variant="text"
                      onClick={insight.action.onClick}
                      sx={{ 
                        mt: 0.5, 
                        p: 0,
                        fontSize: '0.75rem',
                        justifyContent: 'flex-start'
                      }}
                    >
                      {insight.action.label} →
                    </Button>
                  )}
                </Box>
              </Stack>
            ))}
          </Stack>

          {/* Actions */}
          <Stack direction="row" spacing={1} mt={3}>
            <Button 
              size="small" 
              variant="outlined"
              startIcon={<TrendingUp />}
              sx={{ fontSize: '0.75rem' }}
            >
              View All Analytics
            </Button>
            <Button 
              size="small" 
              variant="outlined"
              startIcon={<Recommend />}
              sx={{ fontSize: '0.75rem' }}
            >
              Generate Report
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Card>
  );
};

export default PredictiveInsights;