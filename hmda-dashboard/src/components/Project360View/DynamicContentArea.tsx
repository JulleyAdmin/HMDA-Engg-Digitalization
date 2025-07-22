import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Stack,
  Card,
  Chip,
  LinearProgress,
  Button,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
// Grid2 removed - using Box with flex instead
import {
  Dashboard,
  Analytics,
  ReportProblem,
  AccountBalance,
  HighQuality,
  People,
  Description,
  Timeline,
  CameraAlt,
  Videocam,
  WhatsApp,
  Phone
} from '@mui/icons-material';
import { HMDAProject, ProjectStage } from '../../types/Project';
import dataService from '../../services/dataService';
import ConstructionStageV2 from './StageViews/stages/ConstructionStageV2';
import ConceptualizationStage from './StageViews/stages/ConceptualizationStage';
// import DPRApprovalsStage from './StageViews/stages/DPRApprovalsStage';
import MetricsView from './tabs/MetricsView';
import IssuesView from './tabs/IssuesView';
import FinanceView from './tabs/FinanceView';
import QualityView from './tabs/QualityView';
import DocumentsView from './tabs/DocumentsView';
import StakeholderView from './tabs/StakeholderView';
import TimelineView from './tabs/TimelineView';
import { FullscreenableCard } from '../FullscreenableCard';
import { MinimizableCard, CollapsibleSection } from '../MinimizableCard';

interface DynamicContentAreaProps {
  project: HMDAProject;
  selectedTab: number;
  onTabChange: (value: number) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const DynamicContentArea: React.FC<DynamicContentAreaProps> = ({ 
  project, 
  selectedTab, 
  onTabChange 
}) => {
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  // Tab configuration
  const tabs = [
    { label: 'Live View', icon: <Dashboard /> },
    { label: 'Metrics', icon: <Analytics /> },
    { label: 'Issues', icon: <ReportProblem /> },
    { label: 'Finance', icon: <AccountBalance /> },
    { label: 'Quality', icon: <HighQuality /> },
    { label: 'Stakeholder', icon: <People /> },
    { label: 'Docs', icon: <Description /> },
    { label: 'Timeline', icon: <Timeline /> },
  ];

  // Render stage-specific content based on current stage
  const renderStageSpecificContent = () => {
    switch (project.currentStage) {
      case ProjectStage.CONCEPTUALIZATION:
        return <ConceptualizationStage project={project} compactMode={false} />;
      case ProjectStage.CONSTRUCTION:
        return <ConstructionStageV2 project={project} compactMode={false} />;
      case ProjectStage.DPR_APPROVALS:
        return <DefaultStageView project={project} stageName="DPR Approvals" />;
      default:
        return <DefaultStageView project={project} stageName="General Project View" />;
    }
  };

  return (
    <Box>
      {/* Stage Title */}
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Current Stage: {dataService.getStageLabel(project.currentStage)} (Stage {project.currentStage})
      </Typography>

      {/* Progress Overview */}
      <Box display="flex" flexWrap="wrap" gap={2} sx={{ mb: 3 }}>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 30%' } }}>
          <MinimizableCard
            title={<Typography variant="subtitle2" fontWeight={600}>Progress</Typography>}
            icon={<Analytics />}
            persistKey={`progress-${project.projectId}`}
            sx={{ height: '100%' }}
            contentSx={{ p: 2 }}
            minimizedContent={
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">Physical: {project.physicalProgress}%</Typography>
                <Typography variant="body2" color="text.secondary">|</Typography>
                <Typography variant="body2">Financial: {project.financialProgress}%</Typography>
              </Stack>
            }
          >
            <Stack spacing={1}>
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Physical: {project.physicalProgress}%</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Target: {project.plannedProgress || 70}%
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={project.physicalProgress} 
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Financial: {project.financialProgress}%</Typography>
                  <Typography variant="caption" color="text.secondary">
                    ₹{((project.financialProgress / 100) * project.totalBudget / 10000000).toFixed(1)} Cr
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={project.financialProgress} 
                  color="secondary"
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>
              <Typography variant="caption">
                Milestone: 4/7 completed
              </Typography>
            </Stack>
          </MinimizableCard>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 30%' } }}>
          <MinimizableCard
            title={<Typography variant="subtitle2" fontWeight={600}>Timeline</Typography>}
            icon={<Timeline />}
            persistKey={`timeline-${project.projectId}`}
            badge={project.timeline?.delayDays > 0 ? `${project.timeline.delayDays}d` : undefined}
            badgeColor="warning"
            sx={{ height: '100%' }}
            contentSx={{ p: 2 }}
            minimizedContent={
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">Day {project.timeline?.elapsedDays || 542}/{project.timeline?.totalDays || 900}</Typography>
                {project.timeline?.delayDays > 0 && (
                  <Chip label={`${project.timeline.delayDays}d delay`} size="small" color="warning" />
                )}
              </Stack>
            }
          >
            <Stack spacing={1}>
              <Typography variant="body2">
                Day {project.timeline?.elapsedDays || 542} of {project.timeline?.totalDays || 900}
              </Typography>
              <Typography variant="body2">
                {project.timeline?.remainingDays || 358} days left
              </Typography>
              {project.timeline?.delayDays > 0 && (
                <Chip 
                  label={`${project.timeline.delayDays} days delay`}
                  color="warning"
                  size="small"
                  sx={{ width: 'fit-content' }}
                />
              )}
            </Stack>
          </MinimizableCard>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 30%' } }}>
          <MinimizableCard
            title={<Typography variant="subtitle2" fontWeight={600}>Budget</Typography>}
            icon={<AccountBalance />}
            persistKey={`budget-${project.projectId}`}
            sx={{ height: '100%' }}
            contentSx={{ p: 2 }}
            minimizedContent={
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">Used: {project.financial?.budgetUtilization || 62.5}%</Typography>
                <Typography variant="body2" color="text.secondary">|</Typography>
                <Typography variant="body2">{dataService.formatCurrency((project.financial?.budgetUtilization || 62.5) * project.totalBudget / 100)}</Typography>
              </Stack>
            }
          >
            <Stack spacing={1}>
              <Typography variant="body2">
                Used: {project.financial?.budgetUtilization || 62.5}%
              </Typography>
              <Typography variant="body2">
                {dataService.formatCurrency((project.financial?.budgetUtilization || 62.5) * project.totalBudget / 100)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Available: {dataService.formatCurrency(project.totalBudget * (100 - (project.financial?.budgetUtilization || 62.5)) / 100)}
              </Typography>
            </Stack>
          </MinimizableCard>
        </Box>
      </Box>

      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs 
          value={selectedTab} 
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 48,
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
            }
          }}
        >
          {tabs.map((tab, index) => (
            <Tab 
              key={index}
              icon={tab.icon} 
              iconPosition="start"
              label={tab.label} 
              id={`project-tab-${index}`}
              aria-controls={`project-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <TabPanel value={selectedTab} index={0}>
        <FullscreenableCard 
          title={<Typography variant="h6">Live View</Typography>}
          sx={{ bgcolor: 'transparent', boxShadow: 'none' }}
          contentSx={{ p: 0 }}
        >
          {renderStageSpecificContent()}
        </FullscreenableCard>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <FullscreenableCard 
          title={<Typography variant="h6">Project Metrics & Analytics</Typography>}
          sx={{ bgcolor: 'transparent', boxShadow: 'none' }}
          contentSx={{ p: 0 }}
        >
          <MetricsView project={project} />
        </FullscreenableCard>
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <FullscreenableCard 
          title={<Typography variant="h6">Issues & Risk Management</Typography>}
          sx={{ bgcolor: 'transparent', boxShadow: 'none' }}
          contentSx={{ p: 0 }}
        >
          <IssuesView project={project} />
        </FullscreenableCard>
      </TabPanel>

      <TabPanel value={selectedTab} index={3}>
        <FullscreenableCard 
          title={<Typography variant="h6">Financial Overview</Typography>}
          sx={{ bgcolor: 'transparent', boxShadow: 'none' }}
          contentSx={{ p: 0 }}
        >
          <FinanceView project={project} />
        </FullscreenableCard>
      </TabPanel>

      <TabPanel value={selectedTab} index={4}>
        <FullscreenableCard 
          title={<Typography variant="h6">Quality Control & Compliance</Typography>}
          sx={{ bgcolor: 'transparent', boxShadow: 'none' }}
          contentSx={{ p: 0 }}
        >
          <QualityView project={project} />
        </FullscreenableCard>
      </TabPanel>

      <TabPanel value={selectedTab} index={5}>
        <FullscreenableCard 
          title={<Typography variant="h6">Stakeholder Management</Typography>}
          sx={{ bgcolor: 'transparent', boxShadow: 'none' }}
          contentSx={{ p: 0 }}
        >
          <StakeholderView project={project} />
        </FullscreenableCard>
      </TabPanel>

      <TabPanel value={selectedTab} index={6}>
        <FullscreenableCard 
          title={<Typography variant="h6">Project Documents</Typography>}
          sx={{ bgcolor: 'transparent', boxShadow: 'none' }}
          contentSx={{ p: 0 }}
        >
          <DocumentsView project={project} />
        </FullscreenableCard>
      </TabPanel>

      <TabPanel value={selectedTab} index={7}>
        <FullscreenableCard 
          title={<Typography variant="h6">Project Timeline</Typography>}
          sx={{ bgcolor: 'transparent', boxShadow: 'none' }}
          contentSx={{ p: 0 }}
        >
          <TimelineView project={project} />
        </FullscreenableCard>
      </TabPanel>
    </Box>
  );
};

// Construction Stage View Component
const ConstructionStageView: React.FC<{ project: HMDAProject }> = ({ project }) => {
  const theme = useTheme();
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Construction Progress Matrix
      </Typography>
      
      <Card variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 45%' } }}>
            <Typography variant="subtitle2" gutterBottom>Component Progress</Typography>
            <Stack spacing={1}>
              <ProgressItem label="Piers (P1-P24)" progress={75} detail="18/24 completed" />
              <ProgressItem label="Pier Caps" progress={50} detail="12/24 completed" />
              <ProgressItem label="Girders" progress={25} detail="6/24 completed" />
              <ProgressItem label="Deck Slab" progress={0} detail="Scheduled from July 2023" />
            </Stack>
          </Box>
          
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 45%' } }}>
            <Typography variant="subtitle2" gutterBottom>Today's Activities</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">🏗️ P21 pile cap concrete pour - 180 m³</Typography>
              <Typography variant="body2">🔧 P15-P16 girder launching preparation</Typography>
              <Typography variant="body2">📊 Weekly progress meeting at 3:00 PM</Typography>
              <Typography variant="body2">👷 Workforce: 125 (Target: 120) ✓</Typography>
            </Stack>
            
            <Stack direction="row" spacing={1} mt={2}>
              <Button 
                size="small" 
                variant="outlined" 
                startIcon={<CameraAlt />}
              >
                Site Photos
              </Button>
              <Button 
                size="small" 
                variant="outlined" 
                startIcon={<Videocam />}
              >
                Live Camera
              </Button>
            </Stack>
          </Box>
        </Box>
      </Card>

      {/* CE Action Buttons */}
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Button variant="contained" size="small">
          View Detailed Progress Report
        </Button>
        <Button variant="outlined" size="small" startIcon={<WhatsApp />}>
          WhatsApp Site Engineer
        </Button>
        <Button variant="outlined" size="small" startIcon={<Phone />}>
          Video Call PM
        </Button>
      </Stack>
    </Box>
  );
};

// DPR Stage View Component
const DPRStageView: React.FC<{ project: HMDAProject }> = ({ project }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        DPR Preparation Status
      </Typography>
      
      <Card variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 45%' } }}>
            <Typography variant="subtitle2" gutterBottom>DPR Components Status</Typography>
            <Stack spacing={1}>
              <StatusItem label="Topographic Survey" status="completed" date="5-May" />
              <StatusItem label="Geo-technical Report" status="completed" date="12-May" />
              <StatusItem label="Traffic Analysis" status="completed" date="18-May" />
              <StatusItem label="Structural Design" status="in-progress" detail="70% done" />
              <StatusItem label="Hydraulic Design" status="in-review" />
              <StatusItem label="Electrical Design" status="pending" />
            </Stack>
          </Box>
          
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 45%' } }}>
            <Typography variant="subtitle2" gutterBottom>Clearances & NOCs</Typography>
            <Stack spacing={1}>
              <StatusItem label="HMWSSB (Water/Sewer)" status="completed" />
              <StatusItem label="TSSPDCL (Electrical)" status="pending" />
              <StatusItem label="Traffic Police" status="completed" />
              <StatusItem label="Forest Dept (Trees)" status="in-progress" detail="Site inspection on 30-May" />
              <StatusItem label="Revenue (Land)" status="completed" />
              <StatusItem label="Environment" status="pending" detail="EIA Required" />
            </Stack>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

// Default Stage View Component
const DefaultStageView: React.FC<{ project: HMDAProject; stageName?: string }> = ({ project, stageName }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {stageName || dataService.getStageLabel(project.currentStage)} Overview
      </Typography>
      
      <Card variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Detailed stage-specific view for {dataService.getStageLabel(project.currentStage)} will be displayed here.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This view adapts based on the current project stage to show relevant information and actions.
        </Typography>
      </Card>
    </Box>
  );
};

// Other Tab Views (simplified for now)

// IssuesView is now imported from tabs/IssuesView

// FinanceView is now imported from tabs/FinanceView

// QualityView is now imported from tabs/QualityView


// Helper Components
const ProgressItem: React.FC<{ label: string; progress: number; detail: string }> = ({ 
  label, 
  progress, 
  detail 
}) => (
  <Box>
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
      <Typography variant="body2">{label}</Typography>
      <Typography variant="caption" color="text.secondary">{detail}</Typography>
    </Stack>
    <LinearProgress 
      variant="determinate" 
      value={progress} 
      sx={{ 
        height: 6, 
        borderRadius: 3,
        bgcolor: 'grey.200',
        '& .MuiLinearProgress-bar': {
          borderRadius: 3,
          background: progress < 30 ? '#ef4444' : progress < 70 ? '#f59e0b' : '#10b981'
        }
      }}
    />
  </Box>
);

const StatusItem: React.FC<{ 
  label: string; 
  status: 'completed' | 'in-progress' | 'in-review' | 'pending';
  date?: string;
  detail?: string;
}> = ({ label, status, date, detail }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'in-review': return 'warning';
      case 'pending': return 'default';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'completed': return '✅ Completed';
      case 'in-progress': return '⏳ In Progress';
      case 'in-review': return '⏳ In Review';
      case 'pending': return '❌ Pending';
    }
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2">{label}</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        {date && <Typography variant="caption" color="text.secondary">{date}</Typography>}
        {detail && <Typography variant="caption" color="text.secondary">{detail}</Typography>}
        <Chip 
          label={getStatusLabel()} 
          size="small" 
          color={getStatusColor()}
          sx={{ height: 20, fontSize: '0.7rem' }}
        />
      </Stack>
    </Stack>
  );
};

export default DynamicContentArea;