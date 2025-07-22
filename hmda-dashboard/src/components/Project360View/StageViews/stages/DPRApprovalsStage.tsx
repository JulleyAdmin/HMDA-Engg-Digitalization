import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
  Card,
  useTheme,
  alpha,
  Tabs,
  Tab,
  Badge,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  Dashboard,
  Assignment,
  Search,
  Architecture,
  Calculate,
  Business,
  CheckBox,
  Gavel,
  FolderSpecial,
  Description,
  Warning,
  CheckCircle,
  Schedule,
  TrendingUp,
  Engineering,
  AttachMoney
} from '@mui/icons-material';
import { HMDAProject, ProjectStage } from '../../../../types/Project';
import { 
  StageInsights
} from '../base';
import type { InsightItem } from '../base';

// Import Stage 2 screen components
import Stage2DashboardScreen from './components/Stage2DashboardScreen';
import DPRModeSelectionScreen from './components/DPRModeSelectionScreen';
import TechnicalSurveyScreen from './components/TechnicalSurveyScreen';
import DesignDrawingScreen from './components/DesignDrawingScreen';
import BOQEstimatesScreen from './components/BOQEstimatesScreen';
import ConsultantManagementScreen from './components/ConsultantManagementScreen';
import ClearanceNOCScreen from './components/ClearanceNOCScreen';
import TechnicalSanctionScreen from './components/TechnicalSanctionScreen';
import DPRDocumentScreen from './components/DPRDocumentScreen';

interface DPRApprovalsStageProps {
  project: HMDAProject;
  compactMode?: boolean;
  onUpdate?: (updates: Partial<HMDAProject>) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`stage2-tabpanel-${index}`}
    aria-labelledby={`stage2-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

// Executive Summary for Stage 2
const DPRApprovalsSummary: React.FC<{ project: HMDAProject }> = ({ project }) => {
  const theme = useTheme();
  
  const metrics = [
    { 
      label: 'DPR Progress', 
      value: '72%', 
      change: 8.3, 
      icon: <Assignment />,
      status: 'ontrack',
      subtitle: '5 of 7 sections complete'
    },
    { 
      label: 'Survey Status', 
      value: '100%', 
      change: 0, 
      icon: <Search />,
      status: 'good',
      subtitle: 'All surveys completed'
    },
    { 
      label: 'Design Status', 
      value: '85%', 
      change: 12.5, 
      icon: <Architecture />,
      status: 'ontrack',
      subtitle: 'Final drawings in progress'
    },
    { 
      label: 'Clearances', 
      value: '4/9', 
      change: -20, 
      icon: <CheckBox />,
      status: 'delayed',
      subtitle: '5 pending NOCs'
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
        DPR & Approvals Executive Summary
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
              
              {metric.change !== 0 && (
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

      {/* Progress Overview */}
      <Box mt={3}>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Overall DPR Timeline
        </Typography>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Days Elapsed: 65 of 120
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              54% Complete
            </Typography>
          </Stack>
          <LinearProgress 
            variant="determinate" 
            value={54} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)'
              }
            }}
          />
        </Stack>
      </Box>
    </Card>
  );
};

// Critical Actions Panel
const CriticalActionsPanel: React.FC = () => {
  const theme = useTheme();
  
  const criticalActions = [
    {
      id: 1,
      type: 'clearance',
      title: 'TSSPDCL NOC Pending',
      description: 'Electrical clearance required urgently',
      daysOverdue: 5,
      severity: 'high'
    },
    {
      id: 2,
      type: 'design',
      title: 'Structural Design Review',
      description: 'Consultant feedback incorporation pending',
      daysOverdue: 2,
      severity: 'medium'
    },
    {
      id: 3,
      type: 'estimate',
      title: 'Rate Analysis Update',
      description: 'DSR 2024 rates to be applied',
      daysOverdue: 0,
      severity: 'low'
    }
  ];
  
  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.warning.main, 0.05)} 100%)`,
        border: `1px solid ${theme.palette.warning.main}`,
        borderRadius: 2
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Warning sx={{ color: 'warning.main', fontSize: 24 }} />
        <Typography variant="subtitle1" fontWeight={700} color="warning.dark">
          {criticalActions.length} Critical Actions Required
        </Typography>
      </Stack>
      
      <Stack spacing={1}>
        {criticalActions.map((action) => (
          <Box
            key={action.id}
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: action.severity === 'high' ? 'error.light' : 
                          action.severity === 'medium' ? 'warning.light' : 'grey.300'
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box flex={1}>
                <Typography variant="body2" fontWeight={600}>
                  {action.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {action.description}
                </Typography>
              </Box>
              {action.daysOverdue > 0 && (
                <Chip
                  label={`${action.daysOverdue}d overdue`}
                  size="small"
                  color="error"
                  sx={{ height: 20, fontSize: '0.7rem' }}
                />
              )}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

const DPRApprovalsStage: React.FC<DPRApprovalsStageProps> = ({ 
  project, 
  compactMode = false,
  onUpdate 
}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleProjectUpdate = (updates: Partial<HMDAProject>) => {
    if (onUpdate) {
      onUpdate(updates);
    }
  };

  // Stage 2 tabs configuration
  const tabs = [
    { label: 'Dashboard', icon: <Dashboard />, badge: 0 },
    { label: 'DPR Mode', icon: <Assignment />, badge: 0 },
    { label: 'Technical Survey', icon: <Search />, badge: 0 },
    { label: 'Design & Drawings', icon: <Architecture />, badge: 2 },
    { label: 'BOQ & Estimates', icon: <Calculate />, badge: 1 },
    { label: 'Consultant Mgmt', icon: <Business />, badge: 0 },
    { label: 'Clearances/NOC', icon: <CheckBox />, badge: 5 },
    { label: 'Tech Sanction', icon: <Gavel />, badge: 1 },
    { label: 'DPR Document', icon: <FolderSpecial />, badge: 0 }
  ];

  // Stage 2 specific insights
  const stage2Insights: InsightItem[] = [
    {
      id: '1',
      type: 'warning',
      message: 'TSSPDCL clearance delay may impact project timeline by 2 weeks',
      priority: 'high',
      category: 'time'
    },
    {
      id: '2', 
      type: 'info',
      message: 'Consultant performance above average - consider for future projects',
      priority: 'medium',
      category: 'quality'
    },
    {
      id: '3',
      type: 'success',
      message: 'Survey completed 15 days ahead of schedule',
      priority: 'low',
      category: 'time'
    },
    {
      id: '4',
      type: 'info',
      message: 'Cost estimate within 5% of preliminary estimate - good accuracy',
      priority: 'medium',
      category: 'cost'
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
              STAGE 2: DPR PREPARATION & APPROVALS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Duration: 4-8 months • Day 65 of 120 • Progress: 72%
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Chip label="IN PROGRESS" color="primary" />
            <Chip 
              label="5 PENDING CLEARANCES" 
              color="warning"
              icon={<Warning />}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Critical Actions Panel */}
      <CriticalActionsPanel />

      {/* Executive Summary */}
      <Box mb={3}>
        <DPRApprovalsSummary project={project} />
      </Box>

      {/* Main Content Tabs */}
      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Stage 2 screens"
            sx={{
              '& .MuiTab-root': {
                minWidth: 120,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem'
              }
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={
                  tab.badge > 0 ? (
                    <Badge badgeContent={tab.badge} color="error">
                      {tab.icon}
                    </Badge>
                  ) : tab.icon
                }
                iconPosition="start"
                label={tab.label}
                id={`stage2-tab-${index}`}
                aria-controls={`stage2-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <TabPanel value={activeTab} index={0}>
          <Stage2DashboardScreen 
            project={project} 
            onUpdate={handleProjectUpdate}
            compactMode={compactMode}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <DPRModeSelectionScreen 
            project={project} 
            onUpdate={handleProjectUpdate}
            compactMode={compactMode}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <TechnicalSurveyScreen 
            project={project} 
            onUpdate={handleProjectUpdate}
            compactMode={compactMode}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <DesignDrawingScreen 
            project={project} 
            onUpdate={handleProjectUpdate}
            compactMode={compactMode}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <BOQEstimatesScreen 
            project={project} 
            onUpdate={handleProjectUpdate}
            compactMode={compactMode}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={5}>
          <ConsultantManagementScreen 
            project={project} 
            onUpdate={handleProjectUpdate}
            compactMode={compactMode}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={6}>
          <ClearanceNOCScreen 
            project={project} 
            onUpdate={handleProjectUpdate}
            compactMode={compactMode}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={7}>
          <TechnicalSanctionScreen 
            project={project} 
            onUpdate={handleProjectUpdate}
            compactMode={compactMode}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={8}>
          <DPRDocumentScreen 
            project={project} 
            onUpdate={handleProjectUpdate}
            compactMode={compactMode}
          />
        </TabPanel>
      </Paper>

      {/* Additional Insights Section */}
      <Box mt={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Stage 2 Insights & Recommendations
          </Typography>
          <StageInsights
            insights={stage2Insights}
            compactMode={compactMode}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default DPRApprovalsStage;