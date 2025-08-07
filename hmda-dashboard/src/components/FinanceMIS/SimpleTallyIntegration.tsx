import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  AlertTitle,
  LinearProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Sync as SyncIcon,
  CheckCircle,
  Error as ErrorIcon,
  Schedule,
  CloudUpload,
  CloudDownload,
  AccountBalance,
  Receipt,
  Warning,
  Settings,
  Refresh
} from '@mui/icons-material';
import { TallyIntegration as TallyIntegrationType, PaymentTransaction } from '../../types/Finance';

interface TallyIntegrationProps {
  tallyStatus: TallyIntegrationType;
  recentPayments: PaymentTransaction[];
  onSync: () => void;
}

const TallyIntegration: React.FC<TallyIntegrationProps> = ({
  tallyStatus,
  recentPayments,
  onSync
}) => {
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);

  const handleSync = () => {
    setSyncInProgress(true);
    setTimeout(() => {
      setSyncInProgress(false);
      onSync();
    }, 2000);
  };

  const mockVouchers = [
    { id: 'V001', type: 'Payment', amount: 234560, status: 'pending', date: new Date() },
    { id: 'V002', type: 'Receipt', amount: 456780, status: 'pending', date: new Date() },
    { id: 'V003', type: 'Journal', amount: 123450, status: 'pending', date: new Date() }
  ];

  const balances = [
    { account: 'Cash in Hand', balance: tallyStatus.cashBalance, icon: <AccountBalance />, color: '#10b981' },
    { account: 'Bank Balance', balance: tallyStatus.bankBalance, icon: <AccountBalance />, color: '#3b82f6' },
    { account: 'Advance', balance: tallyStatus.advanceBalance, icon: <Receipt />, color: '#f59e0b' },
    { account: 'Retention', balance: tallyStatus.retentionBalance, icon: <Receipt />, color: '#8b5cf6' }
  ];

  return (
    <Box>
      {/* Connection Status */}
      <Alert 
        severity={tallyStatus.connectionStatus === 'connected' ? 'success' : 'error'}
        sx={{ mb: 3 }}
        action={
          <Button color="inherit" size="small" onClick={handleSync}>
            Reconnect
          </Button>
        }
      >
        <AlertTitle>
          {tallyStatus.connectionStatus === 'connected' ? 'Tally Connected' : 'Tally Disconnected'}
        </AlertTitle>
        {tallyStatus.connectionStatus === 'connected' 
          ? `Last synced: ${tallyStatus.lastSyncTime.toLocaleTimeString()}`
          : 'Unable to connect to Tally. Please check if Tally is running.'}
      </Alert>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Card sx={{ flex: '1 1 200px', minWidth: 0 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Pending Sync
                </Typography>
                <Typography variant="h4" sx={{ color: tallyStatus.pendingVouchers > 0 ? '#ef4444' : '#10b981' }}>
                  {tallyStatus.pendingVouchers}
                </Typography>
              </Box>
              <CloudUpload sx={{ fontSize: 30, color: '#94a3b8' }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 200px', minWidth: 0 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Synced Today
                </Typography>
                <Typography variant="h4" sx={{ color: '#3b82f6' }}>
                  {tallyStatus.syncedToday}
                </Typography>
              </Box>
              <CloudDownload sx={{ fontSize: 30, color: '#94a3b8' }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 200px', minWidth: 0 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Failed Sync
                </Typography>
                <Typography variant="h4" sx={{ color: tallyStatus.failedSync > 0 ? '#ef4444' : '#10b981' }}>
                  {tallyStatus.failedSync}
                </Typography>
              </Box>
              <ErrorIcon sx={{ fontSize: 30, color: '#94a3b8' }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Left Section - Sync Operations */}
        <Box sx={{ flex: '1 1 500px', minWidth: 0 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Synchronization Control</Typography>
              <Tooltip title="Last sync time">
                <Chip 
                  icon={<Schedule />}
                  label={tallyStatus.lastSyncTime.toLocaleTimeString()}
                  size="small"
                  variant="outlined"
                />
              </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SyncIcon />}
                onClick={handleSync}
                disabled={syncInProgress}
                fullWidth
              >
                {syncInProgress ? 'Syncing...' : 'Sync Now'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Settings />}
                fullWidth
              >
                Configure
              </Button>
            </Box>

            {syncInProgress && (
              <Box sx={{ mb: 2 }}>
                <LinearProgress />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Synchronizing with Tally ERP...
                </Typography>
              </Box>
            )}

            {/* Pending Vouchers */}
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
              Pending Vouchers
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Voucher ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockVouchers.map((voucher) => (
                    <TableRow key={voucher.id}>
                      <TableCell>{voucher.id}</TableCell>
                      <TableCell>{voucher.type}</TableCell>
                      <TableCell align="right">₹{voucher.amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <Chip
                          label={voucher.status}
                          size="small"
                          color={voucher.status === 'pending' ? 'warning' : 'success'}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => setSelectedVoucher(voucher.id)}>
                          <SyncIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Sync History */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Sync History
            </Typography>
            <List dense>
              {[
                { time: '10:30 AM', status: 'success', count: 5, message: 'Successfully synced 5 vouchers' },
                { time: '09:45 AM', status: 'success', count: 3, message: 'Successfully synced 3 vouchers' },
                { time: '09:00 AM', status: 'error', count: 0, message: 'Connection timeout' },
                { time: '08:30 AM', status: 'success', count: 8, message: 'Successfully synced 8 vouchers' }
              ].map((history, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {history.status === 'success' ? (
                      <CheckCircle sx={{ color: '#10b981' }} />
                    ) : (
                      <ErrorIcon sx={{ color: '#ef4444' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={history.message}
                    secondary={history.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Right Section - Account Balances */}
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Balances (from Tally)
            </Typography>
            {balances.map((balance, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  mb: 1,
                  backgroundColor: '#f8fafc',
                  borderRadius: 1,
                  borderLeft: `4px solid ${balance.color}`
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ color: balance.color }}>
                    {balance.icon}
                  </Box>
                  <Typography variant="body2">{balance.account}</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  ₹{(balance.balance / 100000).toFixed(1)}L
                </Typography>
              </Box>
            ))}

            <Box sx={{ mt: 3, p: 2, backgroundColor: '#f0fdf4', borderRadius: 1 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Available
              </Typography>
              <Typography variant="h5" sx={{ color: '#059669', fontWeight: 'bold' }}>
                ₹{((tallyStatus.cashBalance + tallyStatus.bankBalance) / 10000000).toFixed(2)}Cr
              </Typography>
            </Box>
          </Paper>

          {/* Integration Settings */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Integration Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle sx={{ color: '#10b981' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Auto-sync enabled"
                  secondary="Every 30 minutes"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle sx={{ color: '#10b981' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Duplicate check"
                  secondary="Enabled"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Warning sx={{ color: '#f59e0b' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Error notifications"
                  secondary="Email & SMS"
                />
              </ListItem>
            </List>

            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              startIcon={<Settings />}
            >
              Advanced Settings
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default TallyIntegration;