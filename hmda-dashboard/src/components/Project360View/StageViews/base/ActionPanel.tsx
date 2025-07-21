import React from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
  alpha,
  Tooltip,
  Chip
} from '@mui/material';
import {
  Visibility,
  Edit,
  Send,
  ArrowBack,
  Flag,
  AttachFile,
  CalendarToday,
  Phone,
  Assignment,
  Warning,
  CheckCircle,
  Schedule
} from '@mui/icons-material';
import { ProjectStage } from '../../../../types/Project';

export interface ActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  variant: 'contained' | 'outlined' | 'text';
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  action: () => void;
  disabled?: boolean;
  tooltip?: string;
  badge?: string | number;
}

interface ActionPanelProps {
  stage: ProjectStage;
  actions: ActionItem[];
  title?: string;
  compactMode?: boolean;
}

const ActionPanel: React.FC<ActionPanelProps> = ({
  stage,
  actions,
  title = "CE ACTION PANEL",
  compactMode = false
}) => {
  const theme = useTheme();

  // Get stage-specific styling
  const getStageColor = () => {
    switch (stage) {
      case ProjectStage.CONCEPTUALIZATION: return theme.palette.info.main;
      case ProjectStage.DPR_APPROVALS: return theme.palette.warning.main;
      case ProjectStage.CONSTRUCTION: return theme.palette.primary.main;
      case ProjectStage.QUALITY_CONTROL: return theme.palette.success.main;
      default: return theme.palette.primary.main;
    }
  };

  const stageColor = getStageColor();

  return (
    <Box
      sx={{
        mt: 3,
        p: compactMode ? 2 : 3,
        border: `2px solid ${stageColor}`,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${alpha(stageColor, 0.05)} 0%, ${alpha(stageColor, 0.02)} 100%)`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${stageColor} 0%, ${alpha(stageColor, 0.7)} 100%)`
        }
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography 
          variant="h6" 
          fontWeight={700}
          sx={{ 
            color: stageColor,
            fontSize: compactMode ? '0.95rem' : '1rem',
            letterSpacing: '0.5px'
          }}
        >
          {title}
        </Typography>
        
        <Chip
          label={`Stage ${stage}`}
          size="small"
          sx={{
            bgcolor: alpha(stageColor, 0.1),
            color: stageColor,
            fontWeight: 600,
            border: `1px solid ${alpha(stageColor, 0.3)}`
          }}
        />
      </Stack>

      {/* Action Buttons */}
      <Stack 
        direction={compactMode ? "column" : "row"} 
        spacing={compactMode ? 1.5 : 2} 
        flexWrap="wrap"
        useFlexGap
      >
        {actions.map((action, index) => (
          <Tooltip key={action.id} title={action.tooltip || action.label}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <Button
                variant={action.variant}
                color={action.color}
                startIcon={action.icon}
                onClick={action.action}
                disabled={action.disabled}
                size={compactMode ? "small" : "medium"}
                sx={{
                  minWidth: compactMode ? 'auto' : 140,
                  fontWeight: 600,
                  fontSize: compactMode ? '0.75rem' : '0.8rem',
                  textTransform: 'none',
                  borderRadius: 1.5,
                  px: compactMode ? 1.5 : 2,
                  py: compactMode ? 0.5 : 0.75,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: `0 4px 12px ${alpha(theme.palette[action.color].main, 0.3)}`
                  },
                  '&:disabled': {
                    opacity: 0.6
                  }
                }}
              >
                {action.label}
              </Button>
              
              {/* Badge */}
              {action.badge && (
                <Chip
                  label={action.badge}
                  size="small"
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    height: 18,
                    minWidth: 18,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    '& .MuiChip-label': {
                      px: 0.5
                    }
                  }}
                />
              )}
            </Box>
          </Tooltip>
        ))}
      </Stack>

      {/* Quick Stats or Context Info */}
      <Box 
        sx={{ 
          mt: 2, 
          pt: 2, 
          borderTop: `1px solid ${alpha(stageColor, 0.2)}` 
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Last Action: 2 hours ago
            </Typography>
          </Stack>
          
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CheckCircle sx={{ fontSize: 16, color: theme.palette.success.main }} />
            <Typography variant="caption" color="text.secondary">
              3 actions completed today
            </Typography>
          </Stack>
          
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Warning sx={{ fontSize: 16, color: theme.palette.warning.main }} />
            <Typography variant="caption" color="text.secondary">
              1 pending approval
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

// Common action configurations for different stages
export const getStageActions = (stage: ProjectStage): ActionItem[] => {
  const commonActions: Record<ProjectStage, ActionItem[]> = {
    [ProjectStage.CONCEPTUALIZATION]: [
      {
        id: 'view-feasibility',
        label: 'View Feasibility Report',
        icon: <Assignment />,
        variant: 'outlined',
        color: 'primary',
        action: () => console.log('View feasibility report')
      },
      {
        id: 'site-location',
        label: 'Site Location Map',
        icon: <Visibility />,
        variant: 'outlined',
        color: 'primary',
        action: () => console.log('View site map')
      },
      {
        id: 'ce-remarks',
        label: 'Add CE Remarks',
        icon: <Edit />,
        variant: 'contained',
        color: 'primary',
        action: () => console.log('Add remarks')
      },
      {
        id: 'forward',
        label: 'Forward to Secretary',
        icon: <Send />,
        variant: 'contained',
        color: 'success',
        action: () => console.log('Forward project')
      },
      {
        id: 'return',
        label: 'Return with Observations',
        icon: <ArrowBack />,
        variant: 'outlined',
        color: 'warning',
        action: () => console.log('Return project')
      },
      {
        id: 'site-visit',
        label: 'Schedule Site Visit',
        icon: <CalendarToday />,
        variant: 'outlined',
        color: 'secondary',
        action: () => console.log('Schedule visit')
      },
      {
        id: 'priority',
        label: 'Mark as Priority',
        icon: <Flag />,
        variant: 'contained',
        color: 'error',
        action: () => console.log('Mark priority')
      },
      {
        id: 'attach-docs',
        label: 'Attach Documents',
        icon: <AttachFile />,
        variant: 'text',
        color: 'primary',
        action: () => console.log('Attach docs')
      }
    ],
    
    [ProjectStage.DPR_APPROVALS]: [
      {
        id: 'review-dpr',
        label: 'Review DPR',
        icon: <Assignment />,
        variant: 'contained',
        color: 'primary',
        action: () => console.log('Review DPR'),
        badge: '3'
      },
      {
        id: 'clearance-status',
        label: 'Clearance Status',
        icon: <CheckCircle />,
        variant: 'outlined',
        color: 'success',
        action: () => console.log('View clearances')
      },
      {
        id: 'technical-sanction',
        label: 'Technical Sanction',
        icon: <Send />,
        variant: 'contained',
        color: 'success',
        action: () => console.log('Grant sanction')
      }
    ],

    [ProjectStage.CONSTRUCTION]: [
      {
        id: 'progress-update',
        label: 'Progress Update',
        icon: <Edit />,
        variant: 'contained',
        color: 'primary',
        action: () => console.log('Update progress')
      },
      {
        id: 'quality-inspection',
        label: 'Schedule Inspection',
        icon: <CalendarToday />,
        variant: 'outlined',
        color: 'warning',
        action: () => console.log('Schedule inspection')
      },
      {
        id: 'issue-escalation',
        label: 'Escalate Issues',
        icon: <Warning />,
        variant: 'contained',
        color: 'error',
        action: () => console.log('Escalate issues'),
        badge: '2'
      }
    ],

    // Default actions for other stages
    [ProjectStage.TENDERING]: [],
    [ProjectStage.CONTRACT_AWARD]: [],
    [ProjectStage.QUALITY_CONTROL]: [],
    [ProjectStage.TESTING_COMMISSIONING]: [],
    [ProjectStage.HANDOVER]: [],
    [ProjectStage.DLP_OM]: []
  };

  return commonActions[stage] || [];
};

export default ActionPanel;