import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Tabs,
  Tab,
  useTheme,
  alpha
} from '@mui/material';
import { HMDAProject, ProjectStage } from '../../../../types/Project';
import { 
  StageOverview, 
  ActionPanel, 
  ComplianceTracker, 
  ApprovalWorkflow, 
  StageInsights,
  getStageActions 
} from '../base';
import type { 
  ActionItem, 
  ComplianceItem, 
  WorkflowStep, 
  InsightItem 
} from '../base';
import ConstructionDashboard from './components/ConstructionDashboard';
import WorkPackageTracker from './components/WorkPackageTracker';
import QualityCheckpoints from './components/QualityCheckpoints';
import ResourceAllocation from './components/ResourceAllocation';
import IssueEscalation from './components/IssueEscalation';

interface ConstructionStageProps {
  project: HMDAProject;
  compactMode?: boolean;
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
      id={`construction-tabpanel-${index}`}
      aria-labelledby={`construction-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const ConstructionStage: React.FC<ConstructionStageProps> = ({ project, compactMode = false }) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Construction-specific compliance items
  const constructionCompliance: ComplianceItem[] = [
    {
      id: 'safety-clearance',
      title: 'Site Safety Clearance (Labor Department)',
      description: 'Safety officer appointment and emergency protocols',
      status: 'completed',
      priority: 'high',
      completedDate: '15-Jan-2024',
      responsible: 'Safety Officer',
      govOrder: 'GO Ms No. 45, Labour Dept',
      actions: [
        { label: 'View Certificate', type: 'document', action: () => console.log('View safety cert') }
      ]
    },
    {
      id: 'environmental-monitor',
      title: 'Environmental Monitoring Compliance',
      description: 'Dust, noise, and water quality monitoring as per TSPCB',
      status: 'in_progress',
      priority: 'high',
      responsible: 'Environmental Consultant',
      actions: [
        { label: 'Upload Report', type: 'form', action: () => console.log('Upload env report') },
        { label: 'TSPCB Portal', type: 'link', action: () => console.log('TSPCB portal') }
      ]
    },
    {
      id: 'traffic-management',
      title: 'Traffic Management Plan Approval',
      description: 'Alternate routes and traffic diversion during construction',
      status: 'completed',
      priority: 'medium',
      completedDate: '10-Jan-2024',
      responsible: 'Traffic Police',
      actions: [
        { label: 'View Plan', type: 'document', action: () => console.log('View traffic plan') }
      ]
    },
    {
      id: 'utility-shifting',
      title: 'Utility Lines Shifting Coordination',
      description: 'TSSPDCL, HMWSSB, Gas, Telecom line shifting',
      status: 'in_progress',
      priority: 'high',
      responsible: 'Utilities Coordinator',
      remarks: '40% power lines shifted, water lines pending',
      actions: [
        { label: 'TSSPDCL Status', type: 'link', action: () => console.log('TSSPDCL') },
        { label: 'HMWSSB Status', type: 'link', action: () => console.log('HMWSSB') }
      ]
    },
    {
      id: 'materials-testing',
      title: 'Construction Materials Testing (IS Standards)',
      description: 'Cement, aggregates, steel testing as per IS codes',
      status: 'in_progress',
      priority: 'high',
      responsible: 'Quality Control Lab',
      actions: [
        { label: 'Test Reports', type: 'document', action: () => console.log('Test reports') },
        { label: 'IS Compliance', type: 'document', action: () => console.log('IS compliance') }
      ]
    }
  ];

  // Construction workflow steps
  const constructionWorkflow: WorkflowStep[] = [
    {
      id: 'contractor-mobilization',
      title: 'Contractor Mobilization',
      position: 'EE (Project)',
      status: 'completed',
      completedDate: '05-Jan-2024',
      delegationLimit: 'As per agreement',
      remarks: 'Equipment and manpower mobilized successfully'
    },
    {
      id: 'site-handover',
      title: 'Site Handover & Survey',
      position: 'AE (Survey)',
      status: 'completed',
      completedDate: '08-Jan-2024',
      delegationLimit: 'Technical approval',
      actualDays: 3,
      estimatedDays: 2
    },
    {
      id: 'foundation-work',
      title: 'Foundation Work Approval',
      position: 'DCE (Technical)',
      status: 'completed',
      completedDate: '20-Jan-2024',
      delegationLimit: '₹10 Cr technical',
      actualDays: 12,
      estimatedDays: 10
    },
    {
      id: 'progress-milestone-1',
      title: '25% Progress Milestone',
      position: 'CE',
      status: 'active',
      pendingSince: '25-Jan-2024',
      actualDays: 5,
      delegationLimit: '₹50 Cr technical',
      remarks: 'Physical verification scheduled for tomorrow'
    },
    {
      id: 'mid-term-review',
      title: '50% Progress Review',
      position: 'CE',
      status: 'pending',
      estimatedDays: 7,
      delegationLimit: '₹50 Cr technical'
    },
    {
      id: 'final-inspection',
      title: 'Final Quality Inspection',
      position: 'CE + Third Party',
      status: 'pending',
      estimatedDays: 10,
      delegationLimit: 'Final approval'
    }
  ];

  // Construction insights
  const constructionInsights: InsightItem[] = [
    {
      id: 'weather-impact',
      type: 'warning',
      title: 'Monsoon Impact Alert',
      message: 'Based on weather data: 15-20 rain days expected in Jun-Jul. Consider accelerating critical path activities.',
      priority: 'high',
      category: 'time',
      value: '15 days',
      change: -8
    },
    {
      id: 'cost-savings',
      type: 'success',
      title: 'Material Cost Optimization',
      message: 'Local aggregate sourcing has reduced material costs by 12%. Continue this strategy for remaining work.',
      priority: 'medium',
      category: 'cost',
      value: '₹2.3 Cr',
      change: 12
    },
    {
      id: 'quality-trend',
      type: 'tip',
      title: 'Quality Performance Trend',
      message: 'Quality scores improving consistently. Last 3 inspections averaged 92%. Maintain current protocols.',
      priority: 'low',
      category: 'quality',
      value: '92%',
      change: 5
    },
    {
      id: 'resource-optimization',
      type: 'info',
      title: 'Resource Optimization Opportunity',
      message: 'Shift 2 crews from P15 to P19 to maintain critical path. This can save 5 days on overall schedule.',
      priority: 'medium',
      category: 'time',
      value: '5 days'
    },
    {
      id: 'safety-record',
      type: 'success',
      title: 'Safety Performance',
      message: 'Zero accidents for 45 consecutive days. Safety training effectiveness showing good results.',
      priority: 'low',
      category: 'quality',
      value: '45 days',
      change: 0
    }
  ];

  // Construction-specific actions
  const constructionActions: ActionItem[] = [
    {
      id: 'progress-update',
      label: 'Update Progress',
      icon: <Box>📊</Box>,
      variant: 'contained',
      color: 'primary',
      action: () => console.log('Update progress'),
      tooltip: 'Update physical and financial progress'
    },
    {
      id: 'quality-inspection',
      label: 'Schedule Inspection',
      icon: <Box>🔍</Box>,
      variant: 'outlined',
      color: 'warning',
      action: () => console.log('Schedule inspection'),
      tooltip: 'Schedule quality control inspection'
    },
    {
      id: 'issue-escalation',
      label: 'Escalate Issues',
      icon: <Box>⚠️</Box>,
      variant: 'contained',
      color: 'error',
      action: () => console.log('Escalate issues'),
      badge: '2',
      tooltip: 'Escalate critical issues to higher authority'
    },
    {
      id: 'payment-approval',
      label: 'Approve Payment',
      icon: <Box>💰</Box>,
      variant: 'contained',
      color: 'success',
      action: () => console.log('Approve payment'),
      badge: '1',
      tooltip: 'Approve contractor payment'
    },
    {
      id: 'safety-audit',
      label: 'Safety Audit',
      icon: <Box>🛡️</Box>,
      variant: 'outlined',
      color: 'secondary',
      action: () => console.log('Safety audit'),
      tooltip: 'Initiate safety compliance audit'
    },
    {
      id: 'site-visit',
      label: 'Site Visit',
      icon: <Box>🏗️</Box>,
      variant: 'outlined',
      color: 'primary',
      action: () => console.log('Site visit'),
      tooltip: 'Schedule CE site inspection'
    }
  ];

  return (
    <StageOverview
      project={project}
      stageTitle="Construction/Execution Phase"
      stageNumber={5}
      duration="18-30 months"
      progress={65}
      status="active"
      compactMode={compactMode}
      showProgress={true}
    >
      {/* Construction Stage Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant={compactMode ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: compactMode ? '0.8rem' : '0.85rem'
            }
          }}
        >
          <Tab label="📊 Progress Dashboard" />
          <Tab label="📦 Work Packages" />
          <Tab label="✅ Quality Control" />
          <Tab label="👥 Resources" />
          <Tab label="🚨 Issues" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <TabPanel value={selectedTab} index={0}>
        <ConstructionDashboard project={project} compactMode={compactMode} />
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <WorkPackageTracker project={project} compactMode={compactMode} />
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <QualityCheckpoints project={project} compactMode={compactMode} />
      </TabPanel>

      <TabPanel value={selectedTab} index={3}>
        <ResourceAllocation project={project} compactMode={compactMode} />
      </TabPanel>

      <TabPanel value={selectedTab} index={4}>
        <IssueEscalation project={project} compactMode={compactMode} />
      </TabPanel>

      {/* Compliance Tracker */}
      <Box sx={{ mt: 4 }}>
        <ComplianceTracker
          stage={ProjectStage.CONSTRUCTION}
          items={constructionCompliance}
          compactMode={compactMode}
          onStatusChange={(itemId, status) => {
            console.log(`Compliance ${itemId} status changed to ${status}`);
          }}
        />
      </Box>

      {/* Approval Workflow */}
      <Box sx={{ mt: 4 }}>
        <ApprovalWorkflow
          steps={constructionWorkflow}
          currentStep="progress-milestone-1"
          title="CONSTRUCTION APPROVAL WORKFLOW"
          compactMode={compactMode}
        />
      </Box>

      {/* Stage Insights */}
      <Box sx={{ mt: 4 }}>
        <StageInsights
          insights={constructionInsights}
          title="CONSTRUCTION INSIGHTS & ALERTS"
          compactMode={compactMode}
          maxItems={compactMode ? 3 : 5}
        />
      </Box>

      {/* CE Action Panel */}
      <ActionPanel
        stage={ProjectStage.CONSTRUCTION}
        actions={constructionActions}
        title="CE CONSTRUCTION ACTIONS"
        compactMode={compactMode}
      />
    </StageOverview>
  );
};

export default ConstructionStage;