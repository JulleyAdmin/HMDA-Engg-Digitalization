import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Stack,
  Button,
  Chip,
  IconButton,
  Divider,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
  alpha,
  Tooltip,
  Collapse,
  Fade
} from '@mui/material';
import {
  Warning,
  CheckCircle,
  Error,
  TrendingUp,
  ArrowBack,
  Visibility,
  ThumbUp,
  Schedule,
  Engineering,
  HighQuality,
  Security,
  People,
  ChevronLeft,
  ChevronRight,
  Notifications,
  Assessment
} from '@mui/icons-material';
import { HMDAProject, ProjectStage } from '../../types/Project';
import dataService from '../../services/dataService';

interface SmartSidebarProps {
  project: HMDAProject;
  currentStage: ProjectStage;
  onCollapsedChange?: (collapsed: boolean) => void;
}

interface ApprovalItem {
  id: string;
  title: string;
  amount?: number;
  waitingDays: number;
  priority: 'critical' | 'high' | 'medium';
  type: 'variation' | 'bill' | 'eot' | 'other';
}

interface RiskItem {
  id: string;
  title: string;
  impact: string;
  severity: 'high' | 'medium' | 'low';
}

const SmartSidebar: React.FC<SmartSidebarProps> = ({ project, currentStage, onCollapsedChange }) => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  // Mock data for pending approvals
  const pendingApprovals: ApprovalItem[] = [
    {
      id: '1',
      title: 'Variation Order #12',
      amount: 23000000, // ₹2.3 Cr
      waitingDays: 3,
      priority: 'critical',
      type: 'variation'
    },
    {
      id: '2',
      title: 'RA Bill 17',
      amount: 42000000, // ₹4.2 Cr
      waitingDays: 2,
      priority: 'high',
      type: 'bill'
    },
    {
      id: '3',
      title: 'EOT Request - 45 days',
      waitingDays: 5,
      priority: 'high',
      type: 'eot'
    }
  ];

  // Mock data for risks
  const risks: RiskItem[] = [
    {
      id: '1',
      title: 'Monsoon preparedness',
      impact: 'Impact: 60 days',
      severity: 'high'
    },
    {
      id: '2',
      title: 'P19-20 soil condition',
      impact: 'Cost impact: ₹3.5 Cr',
      severity: 'high'
    },
    {
      id: '3',
      title: 'Material price escalation',
      impact: 'Budget variance: 8%',
      severity: 'medium'
    },
    {
      id: '4',
      title: 'Skilled labor shortage',
      impact: 'Productivity: -15%',
      severity: 'medium'
    },
    {
      id: '5',
      title: 'Utility shifting delays',
      impact: 'Schedule impact: 10 days',
      severity: 'medium'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return theme.palette.error.main;
      case 'high': return theme.palette.warning.main;
      case 'medium': return theme.palette.info.main;
      default: return theme.palette.grey[500];
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <Error sx={{ color: theme.palette.error.main, fontSize: 20 }} />;
      case 'medium': return <Warning sx={{ color: theme.palette.warning.main, fontSize: 20 }} />;
      case 'low': return <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 20 }} />;
    }
  };

  // Calculate stats based on project data
  const contractorRating = project.contractor?.performanceRating || 4.5;
  const qualityScore = project.quality?.overallScore || 96;
  const safetyDays = 142; // Mock data
  const complaints = 2; // Mock data

  // Save collapsed state and notify parent
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(isCollapsed));
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Minimized view
  if (isCollapsed) {
    return (
      <Box
        sx={{
          width: '100%',
          position: 'sticky',
          top: 80,
          height: 'fit-content'
        }}
      >
        <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
          {/* Expand button */}
          <Tooltip title="Expand sidebar" placement="left">
            <IconButton
              onClick={toggleCollapse}
              sx={{
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateX(-2px)',
                  boxShadow: 2
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronLeft />
            </IconButton>
          </Tooltip>

          {/* CE Attention indicator */}
          <Tooltip title={`${pendingApprovals.length} pending approvals`} placement="left">
            <Badge badgeContent={pendingApprovals.length} color="error">
              <IconButton
                sx={{
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                  color: 'error.main',
                  boxShadow: 1,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.error.main, 0.08),
                    transform: 'translateX(-2px)',
                    boxShadow: 2
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <Schedule />
              </IconButton>
            </Badge>
          </Tooltip>

          {/* Risk indicator */}
          <Tooltip title={`${risks.filter(r => r.severity === 'high').length} high risks`} placement="left">
            <Badge badgeContent={risks.filter(r => r.severity === 'high').length} color="warning">
              <IconButton
                sx={{
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                  color: 'warning.main',
                  boxShadow: 1,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.warning.main, 0.08),
                    transform: 'translateX(-2px)',
                    boxShadow: 2
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <Warning />
              </IconButton>
            </Badge>
          </Tooltip>

          {/* Stats indicator */}
          <Tooltip title="View stats" placement="left">
            <IconButton
              sx={{
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                color: 'primary.main',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  transform: 'translateX(-2px)',
                  boxShadow: 2
                },
                transition: 'all 0.2s ease'
              }}
            >
              <Assessment />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    );
  }

  // Expanded view
  return (
    <Stack spacing={2} sx={{ position: 'sticky', top: 80 }}>
      {/* Collapse button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: -1 }}>
        <Tooltip title="Collapse sidebar">
          <IconButton
            onClick={toggleCollapse}
            size="small"
            sx={{
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              boxShadow: 1,
              '&:hover': {
                bgcolor: 'action.hover',
                transform: 'translateX(2px)',
                boxShadow: 2
              },
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronRight />
          </IconButton>
        </Tooltip>
      </Box>

      {/* CE Attention Section */}
      <Card 
        sx={{ 
          p: 2,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)'
          }
        }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight={600} fontSize="0.9rem">
            CE ATTENTION
          </Typography>
          <Badge badgeContent={pendingApprovals.length} color="error">
            <Schedule />
          </Badge>
        </Stack>

        <Stack spacing={2}>
          {pendingApprovals.map((approval) => (
            <Box 
              key={approval.id}
              sx={{ 
                p: 1.5,
                borderRadius: 1,
                border: 2,
                borderColor: getPriorityColor(approval.priority),
                bgcolor: alpha(getPriorityColor(approval.priority), 0.05),
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: getPriorityColor(approval.priority)
                },
                '&:hover': {
                  borderColor: getPriorityColor(approval.priority),
                  background: alpha(getPriorityColor(approval.priority), 0.1),
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Stack spacing={1}>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                  <Box flex={1}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {approval.priority === 'critical' && '🔴 '}
                      {approval.priority === 'high' && '🟡 '}
                      {approval.title}
                    </Typography>
                    {approval.amount && (
                      <Typography variant="body2">
                        Amount: {dataService.formatCurrency(approval.amount)}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary">
                      Waiting: {approval.waitingDays} days
                    </Typography>
                  </Box>
                </Stack>
                
                <Stack direction="row" spacing={0.5}>
                  <Button size="small" variant="text" sx={{ fontSize: '0.7rem', py: 0 }}>
                    View
                  </Button>
                  <Button 
                    size="small" 
                    variant="text" 
                    color="success"
                    sx={{ fontSize: '0.7rem', py: 0 }}
                  >
                    Approve
                  </Button>
                  <Button 
                    size="small" 
                    variant="text" 
                    color="warning"
                    sx={{ fontSize: '0.7rem', py: 0 }}
                  >
                    Query
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>

        {/* Table Position */}
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="caption" color="text.secondary">
            TABLE POSITION
          </Typography>
          <Typography variant="body2">
            Project: 3 of 45
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Filtered by:
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" mt={0.5}>
            <Chip label={`Stage ${currentStage}`} size="small" />
            <Chip label="Risk > Medium" size="small" />
            <Chip label="Circle I" size="small" />
          </Stack>
        </Box>
      </Card>

      {/* Risk Radar */}
      <Card 
        sx={{ 
          p: 2,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
          }
        }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight={600} fontSize="0.9rem">
            RISK RADAR
          </Typography>
          <Warning color="warning" />
        </Stack>

        <Stack spacing={1.5}>
          {/* Risk Summary */}
          <Stack direction="row" spacing={1}>
            <Chip 
              label={`High: ${risks.filter(r => r.severity === 'high').length}`}
              size="small"
              color="error"
              sx={{ fontSize: '0.7rem' }}
            />
            <Chip 
              label={`Med: ${risks.filter(r => r.severity === 'medium').length}`}
              size="small"
              color="warning"
              sx={{ fontSize: '0.7rem' }}
            />
            <Chip 
              label={`Low: ${risks.filter(r => r.severity === 'low').length}`}
              size="small"
              color="success"
              sx={{ fontSize: '0.7rem' }}
            />
          </Stack>

          {/* High Risks */}
          <Box>
            <Typography variant="subtitle2" color="error" gutterBottom>
              🔴 HIGH RISKS ({risks.filter(r => r.severity === 'high').length})
            </Typography>
            <Stack spacing={1}>
              {risks
                .filter(r => r.severity === 'high')
                .map(risk => (
                  <Box key={risk.id}>
                    <Typography variant="body2" fontWeight={500}>
                      • {risk.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                      {risk.impact}
                    </Typography>
                  </Box>
                ))}
            </Stack>
          </Box>

          {/* Medium Risks */}
          <Box>
            <Typography variant="subtitle2" color="warning.main" gutterBottom>
              🟡 MEDIUM RISKS ({risks.filter(r => r.severity === 'medium').length})
            </Typography>
            <Stack spacing={0.5}>
              {risks
                .filter(r => r.severity === 'medium')
                .slice(0, 2)
                .map(risk => (
                  <Typography key={risk.id} variant="body2">
                    • {risk.title}
                  </Typography>
                ))}
            </Stack>
            {risks.filter(r => r.severity === 'medium').length > 2 && (
              <Button size="small" sx={{ fontSize: '0.7rem', py: 0 }}>
                Show all...
              </Button>
            )}
          </Box>
        </Stack>
      </Card>

      {/* Quick Stats */}
      <Card 
        sx={{ 
          p: 2,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #059669 0%, #10b981 100%)'
          }
        }}>
        <Typography variant="h6" fontWeight={600} fontSize="0.9rem" mb={2}>
          QUICK STATS
        </Typography>

        <Stack spacing={1.5}>
          <StatItem
            icon={<Engineering />}
            label="Contractor"
            value={`${project.contractor?.grade || 'A'}+`}
            subValue={`Rating: ${contractorRating.toFixed(1)}`}
            color="primary"
          />
          
          <StatItem
            icon={<HighQuality />}
            label="Quality"
            value={`${qualityScore}%`}
            subValue="Last audit: 4.3/5"
            color="success"
          />
          
          <StatItem
            icon={<Security />}
            label="Safety"
            value={`${safetyDays}d`}
            subValue="Accident free"
            color="info"
          />
          
          <StatItem
            icon={<People />}
            label="Complaints"
            value={complaints.toString()}
            subValue="1 resolved"
            color={complaints > 0 ? "warning" : "success"}
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Quick Actions */}
        <Stack spacing={1}>
          <Button 
            fullWidth 
            variant="outlined" 
            size="small"
            startIcon={<Visibility />}
            sx={{ justifyContent: 'flex-start' }}
          >
            View Full Details
          </Button>
          <Button 
            fullWidth 
            variant="outlined" 
            size="small"
            startIcon={<TrendingUp />}
            sx={{ justifyContent: 'flex-start' }}
          >
            Performance Trends
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
};

// Helper component for stats
const StatItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}> = ({ icon, label, value, subValue, color = 'primary' }) => {
  const theme = useTheme();
  
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: alpha(theme.palette[color].main, 0.1),
          color: theme.palette[color].main,
        }}
      >
        {icon}
      </Box>
      <Box flex={1}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {value}
          {subValue && (
            <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              {subValue}
            </Typography>
          )}
        </Typography>
      </Box>
    </Stack>
  );
};

export default SmartSidebar;