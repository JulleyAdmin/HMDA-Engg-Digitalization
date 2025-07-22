import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  Button,
  IconButton,
  Collapse,
  Card,
  useTheme,
  alpha,
  Badge,
  Divider,
  Avatar,
  AvatarGroup
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Warning,
  CheckCircle,
  TrendingUp,
  Assignment,
  Engineering,
  Timer,
  AttachMoney,
  HighQuality,
  Group,
  Flag,
  Visibility,
  Phone,
  CalendarToday,
  ArrowForward
} from '@mui/icons-material';
import { HMDAProject, ProjectStage } from '../../../../types/Project';
import ConstructionDashboard from './components/ConstructionDashboard';
import { 
  ActionPanel, 
  ComplianceTracker, 
  ApprovalWorkflow, 
  StageInsights
} from '../base';
import type { ActionItem, ComplianceItem, WorkflowStep, InsightItem } from '../base';

interface ConstructionStageV2Props {
  project: HMDAProject;
  compactMode?: boolean;
}

// Critical Alert Component
const CriticalAlertBar: React.FC<{ alerts: any[] }> = ({ alerts }) => {
  const theme = useTheme();
  
  if (alerts.length === 0) return null;
  
  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`,
        border: `2px solid ${theme.palette.error.main}`,
        borderRadius: 2
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Warning sx={{ color: 'error.main', fontSize: 28 }} />
        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight={700} color="error.main">
            {alerts.length} Critical Issues Require Your Immediate Attention
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Land dispute at Ch 2+300 • Material testing backlog • TSSPDCL clearance pending
          </Typography>
        </Box>
        <Button variant="contained" color="error" size="small">
          View All Issues
        </Button>
      </Stack>
    </Paper>
  );
};

// Executive Summary Card
const ExecutiveSummary: React.FC<{ project: HMDAProject }> = ({ project }) => {
  const theme = useTheme();
  
  const metrics = [
    { 
      label: 'Physical Progress', 
      value: '65%', 
      change: 5.2, 
      icon: <Engineering />,
      status: 'ontrack' 
    },
    { 
      label: 'Financial Progress', 
      value: '62%', 
      change: 3.8, 
      icon: <AttachMoney />,
      status: 'ontrack' 
    },
    { 
      label: 'Quality Score', 
      value: '92%', 
      change: 2.1, 
      icon: <HighQuality />,
      status: 'good' 
    },
    { 
      label: 'Schedule Status', 
      value: '5 days', 
      change: -15, 
      icon: <Timer />,
      status: 'delayed',
      subtitle: 'behind schedule'
    }
  ];
  
  return (
    <Card
      sx={{
        p: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.7)} 100%)`
        }
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={3}>
        Construction Phase Executive Summary
      </Typography>
      
      <Box display="flex" flexWrap="wrap" gap={3}>
        {metrics.map((metric, index) => (
          <Box flex="1 1 200px" key={index}>
            <Box
              sx={{
                p: 2,
                borderRadius: 1.5,
                bgcolor: alpha(
                  metric.status === 'delayed' ? theme.palette.error.main : 
                  metric.status === 'good' ? theme.palette.success.main : 
                  theme.palette.primary.main, 
                  0.05
                ),
                border: `1px solid ${alpha(
                  metric.status === 'delayed' ? theme.palette.error.main : 
                  metric.status === 'good' ? theme.palette.success.main : 
                  theme.palette.primary.main, 
                  0.2
                )}`,
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: alpha(
                    metric.status === 'delayed' ? theme.palette.error.main : 
                    metric.status === 'good' ? theme.palette.success.main : 
                    theme.palette.primary.main, 
                    0.1
                  ),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 1,
                  color: metric.status === 'delayed' ? 'error.main' : 
                         metric.status === 'good' ? 'success.main' : 
                         'primary.main'
                }}
              >
                {metric.icon}
              </Box>
              
              <Typography variant="overline" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                {metric.label}
              </Typography>
              
              <Typography variant="h5" fontWeight={800} color={
                metric.status === 'delayed' ? 'error.main' : 
                metric.status === 'good' ? 'success.main' : 
                'primary.main'
              }>
                {metric.value}
              </Typography>
              
              {metric.subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {metric.subtitle}
                </Typography>
              )}
              
              {metric.change && (
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} mt={0.5}>
                  <TrendingUp 
                    sx={{ 
                      fontSize: 14, 
                      color: metric.change > 0 ? 'success.main' : 'error.main',
                      transform: metric.change < 0 ? 'rotate(180deg)' : 'none'
                    }} 
                  />
                  <Typography variant="caption" fontWeight={600} color={metric.change > 0 ? 'success.main' : 'error.main'}>
                    {Math.abs(metric.change)}%
                  </Typography>
                </Stack>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

// Quick Actions Panel
const QuickActionsPanel: React.FC<{ onActionClick: (action: string) => void }> = ({ onActionClick }) => {
  const theme = useTheme();
  
  const quickActions = [
    { id: 'progress', label: 'Update Progress', icon: <Assignment />, color: 'primary', badge: 1 },
    { id: 'inspection', label: 'Schedule Inspection', icon: <Visibility />, color: 'warning' },
    { id: 'issue', label: 'Report Issue', icon: <Warning />, color: 'error', badge: 2 },
    { id: 'payment', label: 'Approve Payment', icon: <AttachMoney />, color: 'success', badge: 1 },
    { id: 'call', label: 'Contact Team', icon: <Phone />, color: 'secondary' }
  ];
  
  return (
    <Card sx={{ p: 2, height: '100%' }}>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        Quick Actions
      </Typography>
      
      <Stack spacing={1}>
        {quickActions.map((action) => (
          <Button
            key={action.id}
            fullWidth
            variant="outlined"
            color={action.color as any}
            startIcon={action.icon}
            onClick={() => onActionClick(action.id)}
            sx={{
              justifyContent: 'flex-start',
              py: 1,
              fontWeight: 600,
              fontSize: '0.85rem',
              position: 'relative'
            }}
          >
            {action.label}
            {action.badge && (
              <Chip
                label={action.badge}
                size="small"
                color={action.color as any}
                sx={{
                  position: 'absolute',
                  right: 8,
                  height: 20,
                  minWidth: 20,
                  fontSize: '0.7rem'
                }}
              />
            )}
          </Button>
        ))}
      </Stack>
    </Card>
  );
};

// Team Status Widget
const TeamStatus: React.FC = () => {
  return (
    <Card sx={{ p: 2, height: '100%' }}>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        Active Teams
      </Typography>
      
      <Stack spacing={2}>
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="body2" fontWeight={600}>Foundation Team</Typography>
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.7rem' } }}>
              <Avatar>R</Avatar>
              <Avatar>S</Avatar>
              <Avatar>M</Avatar>
            </AvatarGroup>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            P1: Ch 0+000 to 0+500 • 25 workers
          </Typography>
        </Box>
        
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
            <Typography variant="body2" fontWeight={600}>Structure Team</Typography>
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.7rem' } }}>
              <Avatar>A</Avatar>
              <Avatar>K</Avatar>
              <Avatar>P</Avatar>
            </AvatarGroup>
          </Stack>
          <Typography variant="caption" color="text.secondary">
            P2: Superstructure • 35 workers
          </Typography>
        </Box>
        
        <Divider />
        
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">Total on-site</Typography>
          <Typography variant="subtitle2" fontWeight={700} color="primary.main">
            75 workers
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

// Main Component
const ConstructionStageV2: React.FC<ConstructionStageV2Props> = ({ project, compactMode = false }) => {
  const theme = useTheme();
  const [expandedSection, setExpandedSection] = useState<string | null>('details');
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Mock critical alerts
  const criticalAlerts = [
    { id: 1, type: 'land', message: 'Land dispute at Ch 2+300' },
    { id: 2, type: 'approval', message: 'TSSPDCL clearance pending' },
    { id: 3, type: 'material', message: 'Material testing backlog' }
  ];

  // Construction-specific compliance items (simplified)
  const constructionCompliance: ComplianceItem[] = [
    {
      id: 'safety-clearance',
      title: 'Site Safety Clearance',
      description: 'Labor Department approval',
      status: 'completed',
      priority: 'high',
      completedDate: '15-Jan-2024'
    },
    {
      id: 'environmental-monitor',
      title: 'Environmental Monitoring',
      description: 'TSPCB compliance',
      status: 'in_progress',
      priority: 'high'
    }
  ];

  return (
    <Box>
      {/* Stage Header */}
      <Box
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight={700}>
              STAGE 5: CONSTRUCTION/EXECUTION PHASE
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duration: 18-30 months • Day 165 of 540 • Progress: 65%
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Chip label="IN PROGRESS" color="primary" />
            <Chip label="5 DAYS BEHIND" color="error" />
          </Stack>
        </Stack>
      </Box>

      {/* Critical Alerts - Always Visible */}
      {criticalAlerts.length > 0 && <CriticalAlertBar alerts={criticalAlerts} />}

      {/* Executive Summary - Always Visible */}
      <Box mb={3}>
        <ExecutiveSummary project={project} />
      </Box>

      {/* Quick Actions & Team Status */}
      <Box display="flex" flexWrap="wrap" gap={3} mb={3}>
        <Box flex="2 1 400px">
          <QuickActionsPanel onActionClick={(action) => console.log('Action:', action)} />
        </Box>
        <Box flex="1 1 250px">
          <TeamStatus />
        </Box>
      </Box>

      {/* Collapsible Detailed Sections */}
      <Stack spacing={2}>
        {/* Construction Details */}
        <Paper sx={{ overflow: 'hidden' }}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.50',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'grey.100' }
            }}
            onClick={() => toggleSection('details')}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight={700}>
                Construction Progress & Analytics
              </Typography>
              <IconButton size="small">
                {expandedSection === 'details' ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Stack>
          </Box>
          <Collapse in={expandedSection === 'details'}>
            <Box sx={{ p: 3 }}>
              <ConstructionDashboard project={project} compactMode={compactMode} />
            </Box>
          </Collapse>
        </Paper>

        {/* Compliance & Approvals */}
        <Paper sx={{ overflow: 'hidden' }}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.50',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'grey.100' }
            }}
            onClick={() => toggleSection('compliance')}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="subtitle1" fontWeight={700}>
                  Compliance & Approvals
                </Typography>
                <Chip label="2/5 Pending" size="small" color="warning" />
              </Stack>
              <IconButton size="small">
                {expandedSection === 'compliance' ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Stack>
          </Box>
          <Collapse in={expandedSection === 'compliance'}>
            <Box sx={{ p: 3 }}>
              <ComplianceTracker
                stage={ProjectStage.CONSTRUCTION}
                items={constructionCompliance}
                compactMode={compactMode}
              />
            </Box>
          </Collapse>
        </Paper>

        {/* AI Insights */}
        <Paper sx={{ overflow: 'hidden' }}>
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.50',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'grey.100' }
            }}
            onClick={() => toggleSection('insights')}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="subtitle1" fontWeight={700}>
                  AI-Powered Insights & Recommendations
                </Typography>
                <Chip label="5 New" size="small" color="info" />
              </Stack>
              <IconButton size="small">
                {expandedSection === 'insights' ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Stack>
          </Box>
          <Collapse in={expandedSection === 'insights'}>
            <Box sx={{ p: 3 }}>
              <StageInsights
                insights={[
                  {
                    id: '1',
                    type: 'warning',
                    message: 'Monsoon preparation 85% complete - accelerate remaining work',
                    priority: 'high',
                    category: 'time'
                  },
                  {
                    id: '2', 
                    type: 'success',
                    message: 'Material cost optimization saved ₹2.3 Cr - continue strategy',
                    priority: 'medium',
                    category: 'cost'
                  }
                ]}
                compactMode={compactMode}
              />
            </Box>
          </Collapse>
        </Paper>
      </Stack>
    </Box>
  );
};

export default ConstructionStageV2;