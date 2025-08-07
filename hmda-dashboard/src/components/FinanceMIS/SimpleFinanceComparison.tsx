import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  AccessTime,
  TrendingDown,
  Error,
  Speed,
  Security,
  Visibility
} from '@mui/icons-material';
import { ProcessComparison } from '../../types/Finance';

const FinanceComparison: React.FC = () => {
  const processComparisons: ProcessComparison[] = [
    {
      metric: 'Bill Processing Time',
      currentProcess: { value: '2-3 hours', time: 'per bill' },
      digitalProcess: { value: '2-3 minutes', time: 'per bill' },
      improvement: '98% faster',
      impactLevel: 'high'
    },
    {
      metric: 'Payment Approval',
      currentProcess: { value: '15-20 days', time: 'average' },
      digitalProcess: { value: '2-3 days', time: 'average' },
      improvement: '85% reduction',
      impactLevel: 'high'
    },
    {
      metric: 'Error Rate',
      currentProcess: { value: '5-8%', accuracy: 'manual errors' },
      digitalProcess: { value: '0%', accuracy: 'automated validation' },
      improvement: '100% accuracy',
      impactLevel: 'high'
    },
    {
      metric: 'Tally Entry',
      currentProcess: { value: 'Manual', time: '15 min/entry' },
      digitalProcess: { value: 'Automatic', time: 'instant sync' },
      improvement: '100% automated',
      impactLevel: 'medium'
    },
    {
      metric: 'MIS Report Generation',
      currentProcess: { value: '7-10 days', time: 'monthly' },
      digitalProcess: { value: 'Real-time', time: 'on-demand' },
      improvement: 'Instant access',
      impactLevel: 'high'
    }
  ];

  const impactMetrics = {
    timeSaved: 85,
    errorReduction: 100,
    costSavings: 2.2,
    productivityGain: 40
  };

  const getImpactColor = (level: string) => {
    switch(level) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Digital Transformation Impact Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive comparison of current manual processes vs. digitalized system
        </Typography>
      </Box>

      {/* Impact Summary Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Card sx={{ flex: '1 1 300px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccessTime sx={{ color: 'white', mr: 1 }} />
              <Typography variant="h6" sx={{ color: 'white' }}>
                Time Saved
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
              {impactMetrics.timeSaved}%
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
              Processing time reduction
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 300px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Security sx={{ color: 'white', mr: 1 }} />
              <Typography variant="h6" sx={{ color: 'white' }}>
                Error Elimination
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
              {impactMetrics.errorReduction}%
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
              Zero manual errors
            </Typography>
          </CardContent>
        </Card>

      </Box>

      {/* Process Comparison Table */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Process-by-Process Comparison
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Process Area</strong></TableCell>
                <TableCell align="center"><strong>Current Process</strong></TableCell>
                <TableCell align="center"><strong>Digital Process</strong></TableCell>
                <TableCell align="center"><strong>Improvement</strong></TableCell>
                <TableCell align="center"><strong>Impact</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processComparisons.map((comparison, index) => (
                <TableRow key={index}>
                  <TableCell>{comparison.metric}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Cancel sx={{ color: 'error.main', fontSize: 20, mb: 0.5 }} />
                      <Typography variant="body2">{comparison.currentProcess.value}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <CheckCircle sx={{ color: 'success.main', fontSize: 20, mb: 0.5 }} />
                      <Typography variant="body2">{comparison.digitalProcess.value}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={comparison.improvement}
                      color="success"
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={comparison.impactLevel.toUpperCase()}
                      color={getImpactColor(comparison.impactLevel) as any}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Benefits and Pain Points */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Paper sx={{ p: 3, flex: '1 1 400px' }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
            Key Benefits Achieved
          </Typography>
          <List>
            {[
              { text: 'Real-time financial visibility', icon: <Visibility /> },
              { text: 'Zero calculation errors', icon: <Security /> },
              { text: 'Instant MIS reports', icon: <Speed /> },
              { text: 'Complete audit trail', icon: <CheckCircle /> }
            ].map((benefit, index) => (
              <ListItem key={index}>
                <ListItemIcon sx={{ color: 'success.main' }}>
                  {benefit.icon}
                </ListItemIcon>
                <ListItemText primary={benefit.text} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper sx={{ p: 3, flex: '1 1 400px' }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'error.main' }}>
            Pain Points Eliminated
          </Typography>
          <List>
            {[
              { text: 'Manual data entry', icon: <Cancel /> },
              { text: 'Delayed payments', icon: <AccessTime /> },
              { text: 'Calculation errors', icon: <Error /> },
              { text: 'Paper workflows', icon: <Cancel /> }
            ].map((pain, index) => (
              <ListItem key={index}>
                <ListItemIcon sx={{ color: 'error.main' }}>
                  {pain.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={pain.text}
                  sx={{ '& .MuiListItemText-primary': { textDecoration: 'line-through' } }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

    </Box>
  );
};

export default FinanceComparison;