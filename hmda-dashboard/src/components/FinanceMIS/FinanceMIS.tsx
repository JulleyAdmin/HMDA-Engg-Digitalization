import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Container,
  Alert,
  AlertTitle,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Payment as PaymentIcon,
  AccountBalance as TallyIcon,
  Dashboard as DashboardIcon,
  CompareArrows as CompareIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { HMDAProject } from '../../types/Project';
import PaymentProcessing from './SimplePaymentProcessing';
import TallyIntegration from './SimpleTallyIntegration';
import MISReports from './SimpleMISReports';
import FinanceComparison from './SimpleFinanceComparison';
import { PaymentTransaction, TallyIntegration as TallyIntegrationType, PaymentSummaryMetrics } from '../../types/Finance';

interface FinanceMISProps {
  projects?: HMDAProject[];
  selectedProject?: HMDAProject | null;
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
      id={`finance-tabpanel-${index}`}
      aria-labelledby={`finance-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const FinanceMIS: React.FC<FinanceMISProps> = ({ projects = [], selectedProject }) => {
  const [tabValue, setTabValue] = useState(0);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [tallyStatus, setTallyStatus] = useState<TallyIntegrationType>({
    connectionStatus: 'connected',
    lastSyncTime: new Date(),
    pendingVouchers: 3,
    syncedToday: 12,
    failedSync: 0,
    cashBalance: 45678900,
    bankBalance: 234567890,
    advanceBalance: 12345670,
    retentionBalance: 56789000
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setLastRefresh(new Date());
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handlePaymentSubmit = (payment: PaymentTransaction) => {
    setPayments([...payments, payment]);
    // Here you would typically send to backend
    console.log('Payment submitted:', payment);
  };

  const handleTallySync = () => {
    setTallyStatus(prev => ({
      ...prev,
      lastSyncTime: new Date(),
      syncedToday: prev.syncedToday + prev.pendingVouchers,
      pendingVouchers: 0
    }));
  };

  // Calculate summary metrics
  const summaryMetrics: PaymentSummaryMetrics = {
    totalProcessed: payments.length,
    totalAmount: payments.reduce((sum, p) => sum + p.netPayableAmount, 0),
    averageDaily: payments.length > 0 ? payments.reduce((sum, p) => sum + p.netPayableAmount, 0) / 7 : 0,
    peakDay: 'Thursday',
    peakAmount: 1670000,
    totalTransactions: payments.length,
    weeklyTrend: 'up',
    projectedNextWeek: 6850000
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              Integrated Finance MIS
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Complete financial management system integrated with Tally ERP
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Chip 
              label={tallyStatus.connectionStatus === 'connected' ? 'Tally Connected' : 'Tally Offline'}
              color={tallyStatus.connectionStatus === 'connected' ? 'success' : 'error'}
              size="small"
            />
            <Tooltip title="Last refreshed">
              <Typography variant="caption" color="text.secondary">
                {lastRefresh.toLocaleTimeString()}
              </Typography>
            </Tooltip>
            <Tooltip title="Refresh data">
              <IconButton onClick={handleRefresh} disabled={isLoading}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Info Alert */}
        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Finance Module Features</AlertTitle>
          Process payments, integrate with Tally, generate MIS reports, and track financial metrics - all in one place.
        </Alert>
      </Box>

      {/* Main Content */}
      <Paper elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="finance tabs">
            <Tab 
              icon={<PaymentIcon />} 
              label="Payment Processing" 
              id="finance-tab-0"
              aria-controls="finance-tabpanel-0"
            />
            <Tab 
              icon={<TallyIcon />} 
              label="Tally Integration" 
              id="finance-tab-1"
              aria-controls="finance-tabpanel-1"
            />
            <Tab 
              icon={<DashboardIcon />} 
              label="MIS Reports" 
              id="finance-tab-2"
              aria-controls="finance-tabpanel-2"
            />
            <Tab 
              icon={<CompareIcon />} 
              label="Process Comparison" 
              id="finance-tab-3"
              aria-controls="finance-tabpanel-3"
            />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          <TabPanel value={tabValue} index={0}>
            <PaymentProcessing 
              projects={projects}
              selectedProject={selectedProject}
              onPaymentSubmit={handlePaymentSubmit}
              existingPayments={payments}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TallyIntegration 
              tallyStatus={tallyStatus}
              recentPayments={payments}
              onSync={handleTallySync}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <MISReports 
              payments={payments}
              projects={projects}
              summaryMetrics={summaryMetrics}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <FinanceComparison />
          </TabPanel>
        </Box>
      </Paper>

      {/* Footer Stats */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Chip 
          label={`${payments.length} Payments Processed`}
          color="primary"
          variant="outlined"
        />
        <Chip 
          label={`₹${(summaryMetrics.totalAmount / 100000).toFixed(1)}L Total Value`}
          color="secondary"
          variant="outlined"
        />
        <Chip 
          label={`${tallyStatus.pendingVouchers} Pending Sync`}
          color={tallyStatus.pendingVouchers > 0 ? 'warning' : 'default'}
          variant="outlined"
        />
      </Box>
    </Container>
  );
};

export default FinanceMIS;