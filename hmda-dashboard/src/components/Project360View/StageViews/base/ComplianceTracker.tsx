import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Checkbox,
  Button,
  Chip,
  useTheme,
  alpha,
  LinearProgress,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  Warning,
  Schedule,
  Info,
  Launch,
  Phone,
  Web
} from '@mui/icons-material';
import { ProjectStage } from '../../../../types/Project';

export interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'not_applicable';
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  completedDate?: string;
  responsible?: string;
  actions?: {
    label: string;
    type: 'link' | 'phone' | 'form' | 'document';
    action: () => void;
  }[];
  dependencies?: string[];
  govOrder?: string;
  remarks?: string;
}

interface ComplianceTrackerProps {
  stage: ProjectStage;
  items: ComplianceItem[];
  title?: string;
  compactMode?: boolean;
  onStatusChange?: (itemId: string, status: ComplianceItem['status']) => void;
}

const ComplianceTracker: React.FC<ComplianceTrackerProps> = ({
  stage,
  items,
  title = "COMPLIANCE & CLEARANCES CHECKLIST",
  compactMode = false,
  onStatusChange
}) => {
  const theme = useTheme();

  const getStatusIcon = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 20 }} />;
      case 'in_progress':
        return <Schedule sx={{ color: theme.palette.warning.main, fontSize: 20 }} />;
      case 'pending':
        return <RadioButtonUnchecked sx={{ color: theme.palette.grey[400], fontSize: 20 }} />;
      case 'not_applicable':
        return <Info sx={{ color: theme.palette.info.main, fontSize: 20 }} />;
      default:
        return <RadioButtonUnchecked sx={{ color: theme.palette.grey[400], fontSize: 20 }} />;
    }
  };

  const getStatusColor = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'completed': return theme.palette.success.main;
      case 'in_progress': return theme.palette.warning.main;
      case 'pending': return theme.palette.grey[500];
      case 'not_applicable': return theme.palette.info.main;
      default: return theme.palette.grey[400];
    }
  };

  const getPriorityColor = (priority: ComplianceItem['priority']) => {
    switch (priority) {
      case 'high': return theme.palette.error.main;
      case 'medium': return theme.palette.warning.main;
      case 'low': return theme.palette.success.main;
      default: return theme.palette.grey[400];
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'link': return <Launch sx={{ fontSize: 16 }} />;
      case 'phone': return <Phone sx={{ fontSize: 16 }} />;
      case 'form': return <Web sx={{ fontSize: 16 }} />;
      case 'document': return <Info sx={{ fontSize: 16 }} />;
      default: return <Launch sx={{ fontSize: 16 }} />;
    }
  };

  // Calculate completion stats
  const completedItems = items.filter(item => item.status === 'completed').length;
  const totalItems = items.filter(item => item.status !== 'not_applicable').length;
  const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <Box>
      {/* Header with Progress */}
      <Box
        sx={{
          p: compactMode ? 2 : 2.5,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.05)} 0%, ${alpha(theme.palette.info.main, 0.02)} 100%)`,
          border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
          mb: 2,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${theme.palette.info.main} 0%, ${alpha(theme.palette.info.main, 0.7)} 100%)`
          }
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography 
            variant="h6" 
            fontWeight={600}
            sx={{ 
              fontSize: compactMode ? '0.9rem' : '1rem',
              color: theme.palette.info.main
            }}
          >
            {title}
          </Typography>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {completedItems}/{totalItems} completed
            </Typography>
            <Chip
              label={`${Math.round(completionPercentage)}%`}
              size="small"
              color={completionPercentage === 100 ? 'success' : completionPercentage > 50 ? 'warning' : 'error'}
              sx={{ fontWeight: 600 }}
            />
          </Stack>
        </Stack>

        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: alpha(theme.palette.info.main, 0.1),
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
              bgcolor: completionPercentage === 100 ? theme.palette.success.main : theme.palette.info.main
            }
          }}
        />
      </Box>

      {/* Compliance Items */}
      <Stack spacing={1.5}>
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              p: compactMode ? 1.5 : 2,
              border: `1px solid ${alpha(getStatusColor(item.status), 0.3)}`,
              borderRadius: 1.5,
              background: `linear-gradient(135deg, ${alpha(getStatusColor(item.status), 0.03)} 0%, transparent 100%)`,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: getStatusColor(item.status),
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 12px ${alpha(getStatusColor(item.status), 0.15)}`
              }
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              {/* Status Icon/Checkbox */}
              <Box sx={{ mt: 0.5 }}>
                {onStatusChange ? (
                  <Checkbox
                    checked={item.status === 'completed'}
                    indeterminate={item.status === 'in_progress'}
                    onChange={(e) => {
                      const newStatus = e.target.checked ? 'completed' : 'pending';
                      onStatusChange(item.id, newStatus);
                    }}
                    sx={{ p: 0 }}
                  />
                ) : (
                  getStatusIcon(item.status)
                )}
              </Box>

              {/* Content */}
              <Box flex={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                  <Typography 
                    variant="subtitle2" 
                    fontWeight={600}
                    sx={{ 
                      color: item.status === 'completed' ? 'text.secondary' : 'text.primary',
                      textDecoration: item.status === 'completed' ? 'line-through' : 'none'
                    }}
                  >
                    {item.title}
                  </Typography>
                  
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    {/* Priority Indicator */}
                    <Chip
                      label={item.priority.toUpperCase()}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        bgcolor: alpha(getPriorityColor(item.priority), 0.1),
                        color: getPriorityColor(item.priority),
                        border: `1px solid ${alpha(getPriorityColor(item.priority), 0.3)}`
                      }}
                    />
                  </Stack>
                </Stack>

                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 1, fontSize: '0.8rem' }}
                >
                  {item.description}
                </Typography>

                {/* Meta Information */}
                <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                  {item.dueDate && (
                    <Typography variant="caption" color="text.secondary">
                      Due: {item.dueDate}
                    </Typography>
                  )}
                  {item.responsible && (
                    <Typography variant="caption" color="text.secondary">
                      Responsible: {item.responsible}
                    </Typography>
                  )}
                  {item.govOrder && (
                    <Tooltip title={`Government Order: ${item.govOrder}`}>
                      <Chip
                        label="GO"
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: '0.6rem',
                          bgcolor: alpha(theme.palette.secondary.main, 0.1),
                          color: theme.palette.secondary.main
                        }}
                      />
                    </Tooltip>
                  )}
                </Stack>

                {/* Action Buttons */}
                {item.actions && item.actions.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {item.actions.map((action, index) => (
                      <Button
                        key={index}
                        size="small"
                        variant="outlined"
                        startIcon={getActionIcon(action.type)}
                        onClick={action.action}
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          textTransform: 'none',
                          minWidth: 'auto',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1
                        }}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </Stack>
                )}

                {/* Remarks */}
                {item.remarks && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      mt: 1,
                      p: 1,
                      bgcolor: alpha(theme.palette.info.main, 0.05),
                      borderRadius: 1,
                      border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                      display: 'block',
                      fontStyle: 'italic'
                    }}
                  >
                    Note: {item.remarks}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* Summary Stats */}
      {!compactMode && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.02),
            borderRadius: 1,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}
        >
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack alignItems="center">
              <Typography variant="h6" color="success.main" fontWeight={700}>
                {completedItems}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Completed
              </Typography>
            </Stack>
            
            <Stack alignItems="center">
              <Typography variant="h6" color="warning.main" fontWeight={700}>
                {items.filter(item => item.status === 'in_progress').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                In Progress
              </Typography>
            </Stack>
            
            <Stack alignItems="center">
              <Typography variant="h6" color="error.main" fontWeight={700}>
                {items.filter(item => item.status === 'pending').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Pending
              </Typography>
            </Stack>
            
            <Stack alignItems="center">
              <Typography variant="h6" color="info.main" fontWeight={700}>
                {items.filter(item => item.status === 'not_applicable').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                N/A
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ComplianceTracker;