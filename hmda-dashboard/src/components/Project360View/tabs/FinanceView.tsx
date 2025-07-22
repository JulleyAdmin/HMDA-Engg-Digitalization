import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  IconButton,
  LinearProgress,
  useTheme,
  alpha,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Avatar,
  Alert,
  AlertTitle
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle,
  Receipt,
  Payment,
  CurrencyRupee,
  Assessment,
  Download,
  Visibility,
  Schedule
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Area,
  ComposedChart
} from 'recharts';
import { HMDAProject } from '../../../types/Project';

interface Payment {
  id: string;
  invoiceNumber: string;
  amount: number;
  description: string;
  vendor: string;
  category: 'material' | 'labor' | 'equipment' | 'services' | 'utilities';
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  requestDate: Date;
  dueDate: Date;
  approvedBy?: string;
  paidDate?: Date;
  workPackage: string;
}

interface FinanceViewProps {
  project: HMDAProject;
}

const FinanceView: React.FC<FinanceViewProps> = ({ project }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  // Mock financial data - in real app this would come from API
  const payments: Payment[] = [
    {
      id: 'PAY-001',
      invoiceNumber: 'INV-2024-001',
      amount: 15000000,
      description: 'Steel reinforcement bars - Grade 500D',
      vendor: 'M/s Steel Industries Ltd',
      category: 'material',
      status: 'paid',
      requestDate: new Date('2024-01-15'),
      dueDate: new Date('2024-01-25'),
      approvedBy: 'Chief Engineer',
      paidDate: new Date('2024-01-22'),
      workPackage: 'Foundation Work'
    },
    {
      id: 'PAY-002',
      invoiceNumber: 'INV-2024-002',
      amount: 8500000,
      description: 'Concrete M30 grade - 500 cubic meters',
      vendor: 'M/s Concrete Solutions',
      category: 'material',
      status: 'approved',
      requestDate: new Date('2024-01-18'),
      dueDate: new Date('2024-01-28'),
      approvedBy: 'Project Manager',
      workPackage: 'Pier Construction'
    },
    {
      id: 'PAY-003',
      invoiceNumber: 'INV-2024-003',
      amount: 12000000,
      description: 'Skilled welders - 2 months contract',
      vendor: 'M/s Manpower Solutions',
      category: 'labor',
      status: 'pending',
      requestDate: new Date('2024-01-20'),
      dueDate: new Date('2024-02-05'),
      workPackage: 'Girder Installation'
    },
    {
      id: 'PAY-004',
      invoiceNumber: 'INV-2024-004',
      amount: 3200000,
      description: 'Crane rental - Mobile crane 100T',
      vendor: 'M/s Heavy Equipment Rentals',
      category: 'equipment',
      status: 'rejected',
      requestDate: new Date('2024-01-16'),
      dueDate: new Date('2024-01-26'),
      workPackage: 'General Construction'
    },
    {
      id: 'PAY-005',
      invoiceNumber: 'INV-2024-005',
      amount: 2800000,
      description: 'Quality testing services - Material testing',
      vendor: 'M/s Quality Labs',
      category: 'services',
      status: 'approved',
      requestDate: new Date('2024-01-19'),
      dueDate: new Date('2024-01-29'),
      approvedBy: 'Quality Engineer',
      workPackage: 'Quality Assurance'
    }
  ];

  const financialMetrics = useMemo(() => {
    const totalBudget = project.totalBudget;
    const paidAmount = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
    const approvedAmount = payments.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0);
    const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
    const rejectedAmount = payments.filter(p => p.status === 'rejected').reduce((sum, p) => sum + p.amount, 0);

    const totalCommitted = paidAmount + approvedAmount;
    const budgetUtilization = (totalCommitted / totalBudget) * 100;
    const availableBudget = totalBudget - totalCommitted;
    
    // Calculate category-wise spending
    const categorySpending = payments.reduce((acc, payment) => {
      if (payment.status === 'paid' || payment.status === 'approved') {
        acc[payment.category] = (acc[payment.category] || 0) + payment.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      totalBudget,
      paidAmount,
      approvedAmount,
      pendingAmount,
      rejectedAmount,
      totalCommitted,
      budgetUtilization,
      availableBudget,
      categorySpending,
      cashFlow: {
        monthly: [
          { month: 'Oct', planned: 8, actual: 6.5, forecast: 7.2 },
          { month: 'Nov', planned: 12, actual: 14.2, forecast: 13.8 },
          { month: 'Dec', planned: 18, actual: 15.8, forecast: 16.5 },
          { month: 'Jan', planned: 25, actual: 23.5, forecast: 24.2 },
          { month: 'Feb', planned: 32, actual: null, forecast: 31.8 },
          { month: 'Mar', planned: 38, actual: null, forecast: 37.5 }
        ]
      }
    };
  }, [project.totalBudget, payments]);

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'info' | 'error' => {
    switch (status) {
      case 'paid': return 'success';
      case 'approved': return 'info';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'info';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'material': return <Receipt />;
      case 'labor': return <Payment />;
      case 'equipment': return <Assessment />;
      case 'services': return <AccountBalance />;
      default: return <CurrencyRupee />;
    }
  };

  const pieData = Object.entries(financialMetrics.categorySpending).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: amount / 10000000,
    color: {
      material: theme.palette.primary.main,
      labor: theme.palette.secondary.main,
      equipment: theme.palette.warning.main,
      services: theme.palette.info.main,
      utilities: theme.palette.success.main
    }[category] || theme.palette.grey[500]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 1.5, border: 1, borderColor: 'divider' }}>
          {payload.map((entry: any, index: number) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? formatCurrency(entry.value * 10000000) : entry.value}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight={600}>
          Financial Management
        </Typography>
        <Button variant="contained" size="small" startIcon={<Download />}>
          Export Report
        </Button>
      </Stack>

      {/* Financial Overview Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Card variant="outlined" sx={{ flex: '1 1 200px', minWidth: 180 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Total Budget
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', width: 32, height: 32 }}>
                  <AccountBalance sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h5" fontWeight={600}>
                {formatCurrency(financialMetrics.totalBudget)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 200px', minWidth: 180 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Amount Paid
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', width: 32, height: 32 }}>
                  <CheckCircle sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h5" fontWeight={600} color="success.main">
                {formatCurrency(financialMetrics.paidAmount)}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(financialMetrics.paidAmount / financialMetrics.totalBudget) * 100}
                color="success"
                sx={{ height: 4, borderRadius: 2 }}
              />
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 200px', minWidth: 180 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Approved
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), color: 'info.main', width: 32, height: 32 }}>
                  <TrendingUp sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h5" fontWeight={600} color="info.main">
                {formatCurrency(financialMetrics.approvedAmount)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 200px', minWidth: 180 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Available Budget
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main', width: 32, height: 32 }}>
                  <CurrencyRupee sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h5" fontWeight={600}>
                {formatCurrency(financialMetrics.availableBudget)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {((financialMetrics.availableBudget / financialMetrics.totalBudget) * 100).toFixed(1)}% remaining
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Budget Utilization Alert */}
      {financialMetrics.budgetUtilization > 75 && (
        <Alert 
          severity={financialMetrics.budgetUtilization > 90 ? "error" : "warning"} 
          sx={{ mb: 3 }}
          icon={<Warning />}
        >
          <AlertTitle>Budget Alert</AlertTitle>
          {financialMetrics.budgetUtilization.toFixed(1)}% of budget has been committed. 
          {financialMetrics.budgetUtilization > 90 
            ? " Immediate budget review required."
            : " Monitor spending closely to avoid overruns."}
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tab label="Overview" />
        <Tab label="Payments" />
        <Tab label="Cash Flow" />
        <Tab label="Analysis" />
      </Tabs>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box display="flex" flexWrap="wrap" gap={3}>
          {/* Category-wise Spending */}
          <Card sx={{ flex: '1 1 400px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Category-wise Spending
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={CustomTooltip} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Budget Breakdown */}
          <Card sx={{ flex: '1 1 300px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Budget Status
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Paid Amount</Typography>
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      {formatCurrency(financialMetrics.paidAmount)}
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={(financialMetrics.paidAmount / financialMetrics.totalBudget) * 100}
                    color="success"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Approved (Pending Payment)</Typography>
                    <Typography variant="body2" fontWeight={600} color="info.main">
                      {formatCurrency(financialMetrics.approvedAmount)}
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={(financialMetrics.approvedAmount / financialMetrics.totalBudget) * 100}
                    color="info"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Under Review</Typography>
                    <Typography variant="body2" fontWeight={600} color="warning.main">
                      {formatCurrency(financialMetrics.pendingAmount)}
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={(financialMetrics.pendingAmount / financialMetrics.totalBudget) * 100}
                    color="warning"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Total Committed
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {formatCurrency(financialMetrics.totalCommitted)}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}

      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Recent Payments & Invoices
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <Stack>
                          <Typography variant="body2" fontWeight={600}>
                            {payment.invoiceNumber}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {payment.id}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {getCategoryIcon(payment.category)}
                          <Box>
                            <Typography variant="body2">
                              {payment.vendor}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {payment.category}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {payment.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {payment.workPackage}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {formatCurrency(payment.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={payment.status.toUpperCase()} 
                          color={getStatusColor(payment.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Stack spacing={0.5}>
                          <Typography variant="body2">
                            {payment.dueDate.toLocaleDateString('en-IN')}
                          </Typography>
                          {payment.paidDate && (
                            <Typography variant="caption" color="success.main">
                              Paid: {payment.paidDate.toLocaleDateString('en-IN')}
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                          <IconButton size="small">
                            <Download />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Cash Flow Analysis
            </Typography>
            <Box height={400}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={financialMetrics.cashFlow.monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Amount (₹ Crores)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={CustomTooltip} />
                  <Legend />
                  <Bar dataKey="planned" fill={theme.palette.primary.main} name="Planned Spending" />
                  <Line type="monotone" dataKey="actual" stroke={theme.palette.success.main} strokeWidth={3} name="Actual Spending" />
                  <Line type="monotone" dataKey="forecast" stroke={theme.palette.warning.main} strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
                </ComposedChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      )}

      {activeTab === 3 && (
        <Box display="flex" flexWrap="wrap" gap={3}>
          <Card sx={{ flex: '1 1 300px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Financial Health Score
              </Typography>
              <Stack spacing={2}>
                <Box textAlign="center">
                  <Typography variant="h3" fontWeight={600} color="success.main">
                    85
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Out of 100
                  </Typography>
                </Box>
                <Divider />
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Budget Adherence</Typography>
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      92/100
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Payment Timeliness</Typography>
                    <Typography variant="body2" fontWeight={600} color="warning.main">
                      78/100
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Cash Flow Management</Typography>
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      88/100
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ flex: '1 1 300px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Key Insights
              </Typography>
              <Stack spacing={2}>
                <Alert severity="success" variant="outlined">
                  <Typography variant="body2">
                    Project is 8.2% under budget compared to planned spending
                  </Typography>
                </Alert>
                <Alert severity="warning" variant="outlined">
                  <Typography variant="body2">
                    Material costs are 15% higher than estimated due to price inflation
                  </Typography>
                </Alert>
                <Alert severity="info" variant="outlined">
                  <Typography variant="body2">
                    Labor efficiency is 12% better than planned, saving ₹2.8 Cr
                  </Typography>
                </Alert>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default FinanceView;