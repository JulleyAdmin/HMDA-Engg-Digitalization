import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  CalendarToday,
  Receipt,
  Assessment,
  GetApp,
  Print,
  BarChart
} from '@mui/icons-material';
import { HMDAProject } from '../../types/Project';
import { PaymentTransaction, PaymentSummaryMetrics, DepartmentExpenditure } from '../../types/Finance';

interface MISReportsProps {
  payments: PaymentTransaction[];
  projects: HMDAProject[];
  summaryMetrics: PaymentSummaryMetrics;
}

const MISReports: React.FC<MISReportsProps> = ({ payments, projects, summaryMetrics }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock department data
  const departments: DepartmentExpenditure[] = [
    {
      departmentName: 'Infrastructure',
      budgetAllocated: 500000000,
      actualSpent: 350000000,
      utilizationPercentage: 70,
      pendingBills: 15000000,
      projectedSpend: 450000000
    },
    {
      departmentName: 'Parks & Playgrounds',
      budgetAllocated: 200000000,
      actualSpent: 180000000,
      utilizationPercentage: 90,
      pendingBills: 5000000,
      projectedSpend: 195000000
    },
    {
      departmentName: 'Water Supply',
      budgetAllocated: 300000000,
      actualSpent: 210000000,
      utilizationPercentage: 70,
      pendingBills: 25000000,
      projectedSpend: 280000000
    },
    {
      departmentName: 'Roads & Transport',
      budgetAllocated: 400000000,
      actualSpent: 320000000,
      utilizationPercentage: 80,
      pendingBills: 30000000,
      projectedSpend: 380000000
    }
  ];

  // Mock contractor performance data
  const contractorPerformance = [
    { name: 'M/s Krishna Constructions', projects: 5, payments: 23456780, rating: 4.5, delay: 2 },
    { name: 'Sai Infra Projects', projects: 3, payments: 18976540, rating: 4.2, delay: 5 },
    { name: 'Telangana Builders', projects: 7, payments: 45678900, rating: 4.8, delay: 0 },
    { name: 'Metro Infrastructure', projects: 4, payments: 34567890, rating: 4.0, delay: 8 },
    { name: 'Capital Works Ltd', projects: 6, payments: 29876540, rating: 4.6, delay: 3 }
  ];

  const handleExport = (format: string) => {
    alert(`Exporting report in ${format} format...`);
  };

  return (
    <Box>
      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ flex: '1 1 250px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Total Processed
                </Typography>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                  ₹{(summaryMetrics.totalAmount / 100000).toFixed(1)}L
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUp sx={{ fontSize: 16, color: '#4ade80', mr: 0.5 }} />
                  <Typography variant="caption" sx={{ color: '#4ade80' }}>
                    12% vs last week
                  </Typography>
                </Box>
              </Box>
              <AttachMoney sx={{ fontSize: 40, color: 'rgba(255,255,255,0.3)' }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 250px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Peak Day
                </Typography>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {summaryMetrics.peakDay}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  ₹{(summaryMetrics.peakAmount / 100000).toFixed(1)}L processed
                </Typography>
              </Box>
              <CalendarToday sx={{ fontSize: 40, color: 'rgba(255,255,255,0.3)' }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 250px', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  Avg Daily
                </Typography>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                  ₹{(summaryMetrics.averageDaily / 100000).toFixed(1)}L
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  5 days average
                </Typography>
              </Box>
              <Assessment sx={{ fontSize: 40, color: 'rgba(255,255,255,0.3)' }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 250px', background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)' }}>
                  Transactions
                </Typography>
                <Typography variant="h4" sx={{ color: '#1e3a8a', fontWeight: 'bold' }}>
                  {summaryMetrics.totalTransactions}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                  This week
                </Typography>
              </Box>
              <Receipt sx={{ fontSize: 40, color: 'rgba(0,0,0,0.2)' }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Trend Indicator */}
      <Paper sx={{ p: 2, mb: 3, background: 'linear-gradient(90deg, #f0fdf4 0%, #dcfce7 100%)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">Weekly Trend:</Typography>
            <Typography variant="h6" sx={{ color: '#059669', fontWeight: 'bold' }}>
              ↗ Upward
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">Next Week Projection:</Typography>
            <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 'bold' }}>
              ₹{(summaryMetrics.projectedNextWeek / 100000).toFixed(1)}L
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Department-wise Expenditure */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Department-wise Expenditure</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Period</InputLabel>
              <Select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                label="Period"
              >
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<GetApp />}
              onClick={() => handleExport('excel')}
            >
              Export
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell align="right">Budget</TableCell>
                <TableCell align="right">Spent</TableCell>
                <TableCell>Utilization</TableCell>
                <TableCell align="right">Pending Bills</TableCell>
                <TableCell align="right">Projected</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.departmentName}>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {dept.departmentName}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    ₹{(dept.budgetAllocated / 10000000).toFixed(1)}Cr
                  </TableCell>
                  <TableCell align="right">
                    ₹{(dept.actualSpent / 10000000).toFixed(1)}Cr
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={dept.utilizationPercentage}
                        sx={{ width: 100, height: 6, borderRadius: 3 }}
                        color={dept.utilizationPercentage > 85 ? 'warning' : 'primary'}
                      />
                      <Typography variant="caption">
                        {dept.utilizationPercentage}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    ₹{(dept.pendingBills / 100000).toFixed(1)}L
                  </TableCell>
                  <TableCell align="right">
                    ₹{(dept.projectedSpend / 10000000).toFixed(1)}Cr
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Contractor Performance */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Contractor Performance</Typography>
          <Button variant="outlined" startIcon={<Print />}>
            Print Report
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contractor</TableCell>
                <TableCell align="center">Projects</TableCell>
                <TableCell align="right">Total Payments</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Avg Delay</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contractorPerformance.map((contractor) => (
                <TableRow key={contractor.name}>
                  <TableCell>
                    <Typography variant="body2">{contractor.name}</Typography>
                  </TableCell>
                  <TableCell align="center">{contractor.projects}</TableCell>
                  <TableCell align="right">
                    ₹{(contractor.payments / 100000).toFixed(1)}L
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={contractor.rating}
                      size="small"
                      color={contractor.rating >= 4.5 ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      color={contractor.delay > 5 ? 'error' : 'text.primary'}
                    >
                      {contractor.delay} days
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label="Active"
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default MISReports;