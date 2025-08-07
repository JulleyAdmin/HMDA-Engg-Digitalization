import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Chip,
  InputAdornment,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Send as SendIcon,
  Print as PrintIcon,
  Save as SaveIcon,
  Visibility as ViewIcon,
  GetApp as DownloadIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { HMDAProject } from '../../types/Project';
import { PaymentTransaction, DeductionRates } from '../../types/Finance';
import { hmdaRealPayments } from '../../data/hmdaRealPayments';

interface PaymentProcessingProps {
  projects: HMDAProject[];
  selectedProject?: HMDAProject | null;
  onPaymentSubmit: (payment: PaymentTransaction) => void;
  existingPayments: PaymentTransaction[];
}

const PaymentProcessing: React.FC<PaymentProcessingProps> = ({
  projects,
  selectedProject,
  onPaymentSubmit,
  existingPayments
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(selectedProject?.projectId || '');
  const [workValue, setWorkValue] = useState<number>(0);
  const [previousPayments, setPreviousPayments] = useState<number>(0);
  const [gstRate, setGstRate] = useState<number>(18);
  const [retentionRate, setRetentionRate] = useState<number>(10);
  const [remarks, setRemarks] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedPaymentForView, setSelectedPaymentForView] = useState<PaymentTransaction | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState<boolean>(false);
  
  const deductionRates: DeductionRates = {
    incomeTax: 2,
    labourCess: 1,
    gstTDS: 2,
    retentionRate: retentionRate
  };

  // Get unique categories from projects
  const categories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
  
  // Filter projects based on selected category
  const filteredProjects = categoryFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === categoryFilter);

  const numberToWords = (num: number): string => {
    if (num === 0) return 'Zero';
    const crores = Math.floor(num / 10000000);
    const lakhs = Math.floor((num % 10000000) / 100000);
    const thousands = Math.floor((num % 100000) / 1000);
    const remaining = Math.floor(num % 1000);
    
    let words = 'Rupees ';
    if (crores > 0) words += `${crores} Crore `;
    if (lakhs > 0) words += `${lakhs} Lakh `;
    if (thousands > 0) words += `${thousands} Thousand `;
    if (remaining > 0) words += `${remaining}`;
    
    return words.trim() + ' Only';
  };

  // Use only real HMDA payment data from finance sheets
  const recentPayments = hmdaRealPayments.sort((a, b) => b.paymentDate.getTime() - a.paymentDate.getTime());

  const calculatePayment = () => {
    const currentBill = Math.round((workValue - previousPayments) * 100) / 100;
    const gstAmount = Math.round((currentBill * gstRate) / 100 * 100) / 100;
    const grossAmount = Math.round((currentBill + gstAmount) * 100) / 100;
    
    const incomeTax = Math.round((currentBill * deductionRates.incomeTax) / 100 * 100) / 100;
    const labourCess = Math.round((currentBill * deductionRates.labourCess) / 100 * 100) / 100;
    const gstTDS = Math.round((currentBill * deductionRates.gstTDS) / 100 * 100) / 100;
    const retention = Math.round((grossAmount * deductionRates.retentionRate) / 100 * 100) / 100;
    
    const totalDeductions = Math.round((incomeTax + labourCess + gstTDS + retention) * 100) / 100;
    const netPayable = Math.round((grossAmount - totalDeductions) * 100) / 100;
    
    return {
      currentBill,
      gstAmount,
      grossAmount,
      incomeTax,
      labourCess,
      gstTDS,
      retention,
      totalDeductions,
      netPayable
    };
  };

  const payment = calculatePayment();

  const handleSubmit = () => {
    const project = projects.find(p => p.projectId === selectedProjectId);
    if (!project) return;
    
    const newPayment: PaymentTransaction = {
      id: `PAY-${Date.now()}`,
      projectId: selectedProjectId,
      projectTitle: project.projectName,
      contractorName: typeof project.contractor === 'string' ? project.contractor : project.contractor?.name || 'N/A',
      workOrderNumber: `WO-${selectedProjectId}`,
      totalWorkValue: workValue,
      previousPayments: previousPayments,
      currentBillAmount: payment.currentBill,
      gstRate: gstRate,
      gstAmount: payment.gstAmount,
      grossAmount: payment.grossAmount,
      incomeTax: payment.incomeTax,
      labourCess: payment.labourCess,
      gstTDS: payment.gstTDS,
      retentionMoney: payment.retention,
      otherRecoveries: 0,
      totalDeductions: payment.totalDeductions,
      netPayableAmount: payment.netPayable,
      amountInWords: numberToWords(Math.floor(payment.netPayable)),
      paymentDate: new Date(),
      paymentStatus: 'pending',
      approvalLevel: 'EE',
      remarks: remarks
    };
    
    onPaymentSubmit(newPayment);
    setWorkValue(0);
    setPreviousPayments(0);
    setRemarks('');
  };

  const handleViewPayment = (payment: PaymentTransaction) => {
    setSelectedPaymentForView(payment);
    setIsPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
    setSelectedPaymentForView(null);
  };

  const handlePrintPayment = () => {
    window.print();
  };

  const handleDownloadExcel = () => {
    // Create CSV content
    const headers = [
      'Payment ID', 'Date', 'Project', 'Contractor', 'Work Order', 
      'Total Work Value', 'Current Bill', 'GST Amount', 'Gross Amount',
      'Income Tax', 'Labour Cess', 'GST TDS', 'Retention', 'Net Payable', 'Status'
    ];
    
    const csvContent = [
      headers.join(','),
      ...recentPayments.map(payment => [
        payment.id,
        payment.paymentDate.toLocaleDateString(),
        `"${payment.projectTitle}"`,
        `"${payment.contractorName}"`,
        payment.workOrderNumber,
        payment.totalWorkValue,
        payment.currentBillAmount,
        payment.gstAmount,
        payment.grossAmount,
        payment.incomeTax,
        payment.labourCess,
        payment.gstTDS,
        payment.retentionMoney,
        payment.netPayableAmount,
        payment.paymentStatus
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HMDA_Payments_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      {/* Left Section - Payment Form */}
      <Paper sx={{ p: 3, flex: '1 1 500px', minWidth: 0 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
          Payment Order Processing
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Category Filter */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>
              Filter by Category:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={`All (${projects.length})`}
                onClick={() => setCategoryFilter('all')}
                color={categoryFilter === 'all' ? 'primary' : 'default'}
                variant={categoryFilter === 'all' ? 'filled' : 'outlined'}
                size="small"
              />
              {categories.map((category) => {
                const count = projects.filter(p => p.category === category).length;
                return (
                  <Chip
                    key={category}
                    label={`${category} (${count})`}
                    onClick={() => setCategoryFilter(category)}
                    color={categoryFilter === category ? 'primary' : 'default'}
                    variant={categoryFilter === category ? 'filled' : 'outlined'}
                    size="small"
                  />
                );
              })}
            </Box>
          </Box>
          
          <FormControl fullWidth>
            <InputLabel>Select Project ({filteredProjects.length} available)</InputLabel>
            <Select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              label="Select Project"
            >
              {filteredProjects.map((project) => (
                <MenuItem key={project.projectId} value={project.projectId}>
                  {project.projectName} - {project.projectId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Total Work Value"
              type="number"
              value={workValue}
              onChange={(e) => setWorkValue(Number(e.target.value))}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
            
            <TextField
              fullWidth
              label="Previous Payments"
              type="number"
              value={previousPayments}
              onChange={(e) => setPreviousPayments(Number(e.target.value))}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>GST Rate</InputLabel>
              <Select
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                label="GST Rate"
              >
                <MenuItem value={12}>12%</MenuItem>
                <MenuItem value={18}>18%</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Retention Rate</InputLabel>
              <Select
                value={retentionRate}
                onChange={(e) => setRetentionRate(Number(e.target.value))}
                label="Retention Rate"
              >
                <MenuItem value={5}>5%</MenuItem>
                <MenuItem value={10}>10%</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <TextField
            fullWidth
            label="Remarks"
            multiline
            rows={2}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </Box>
        
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            onClick={handleSubmit}
            disabled={!selectedProjectId || workValue === 0}
          >
            Send for Approval
          </Button>
          <Button variant="outlined" startIcon={<SaveIcon />}>
            Save Draft
          </Button>
          <Button variant="outlined" startIcon={<PrintIcon />}>
            Print
          </Button>
        </Box>
      </Paper>
      
      {/* Right Section - Payment Calculation */}
      <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            Payment Calculation
          </Typography>
          
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Total Work Value</TableCell>
                  <TableCell align="right">₹{workValue.toLocaleString('en-IN')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Less: Previous Payments</TableCell>
                  <TableCell align="right">₹{previousPayments.toLocaleString('en-IN')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Current Bill</strong></TableCell>
                  <TableCell align="right"><strong>₹{payment.currentBill.toLocaleString('en-IN')}</strong></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Add: GST @ {gstRate}%</TableCell>
                  <TableCell align="right">₹{payment.gstAmount.toLocaleString('en-IN')}</TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>Gross Amount</strong></TableCell>
                  <TableCell align="right"><strong>₹{payment.grossAmount.toLocaleString('en-IN')}</strong></TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      Deductions:
                    </Typography>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell sx={{ pl: 4 }}>Income Tax @ {deductionRates.incomeTax}%</TableCell>
                  <TableCell align="right">₹{payment.incomeTax.toLocaleString('en-IN')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ pl: 4 }}>Labour Cess @ {deductionRates.labourCess}%</TableCell>
                  <TableCell align="right">₹{payment.labourCess.toLocaleString('en-IN')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ pl: 4 }}>GST TDS @ {deductionRates.gstTDS}%</TableCell>
                  <TableCell align="right">₹{payment.gstTDS.toLocaleString('en-IN')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ pl: 4 }}>Retention @ {retentionRate}%</TableCell>
                  <TableCell align="right">₹{payment.retention.toLocaleString('en-IN')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Total Deductions</strong></TableCell>
                  <TableCell align="right"><strong>₹{payment.totalDeductions.toLocaleString('en-IN')}</strong></TableCell>
                </TableRow>
                
                <TableRow sx={{ backgroundColor: '#e8f5e9' }}>
                  <TableCell><Typography variant="h6">Net Payable</Typography></TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" color="primary">
                      ₹{payment.netPayable.toLocaleString('en-IN')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          {payment.netPayable > 0 && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Amount in Words:
              </Typography>
              <Typography variant="body2">
                {numberToWords(Math.floor(payment.netPayable))}
              </Typography>
            </Box>
          )}
        </Paper>
        
        {/* Recent Transactions */}
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Recent Transactions
          </Typography>
          {existingPayments.slice(-3).map((payment) => (
            <Box key={payment.id} sx={{ mb: 1, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2">{payment.projectTitle}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  ₹{payment.netPayableAmount.toLocaleString('en-IN')}
                </Typography>
                <Chip 
                  label={payment.paymentStatus} 
                  size="small" 
                  color={payment.paymentStatus === 'paid' ? 'success' : 'warning'}
                />
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>

      {/* Recent Payments Section */}
      <Box sx={{ mt: 4, width: '100%' }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              Recent Payments ({recentPayments.length})
            </Typography>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadExcel}
              size="small"
            >
              Export to Excel
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Payment ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Contractor</TableCell>
                  <TableCell align="right">Net Payable</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentPayments.slice(0, 10).map((payment) => (
                  <TableRow key={payment.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {payment.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {payment.paymentDate.toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {payment.projectTitle}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {payment.contractorName}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        ₹{payment.netPayableAmount.toLocaleString('en-IN')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={payment.paymentStatus}
                        size="small"
                        color={
                          payment.paymentStatus === 'approved' ? 'info' : 
                          payment.paymentStatus === 'pending' ? 'warning' : 'success'
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small" 
                          onClick={() => handleViewPayment(payment)}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {recentPayments.length > 10 && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Showing latest 10 payments. Use Export to Excel for complete list.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Payment Details Dialog */}
      <Dialog 
        open={isPaymentDialogOpen} 
        onClose={handleClosePaymentDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Payment Details - {selectedPaymentForView?.id}
            </Typography>
            <IconButton onClick={handleClosePaymentDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedPaymentForView && (
            <Box sx={{ mt: 1 }}>
              {/* Payment Header Info */}
              <Box sx={{ mb: 3, p: 2, backgroundColor: '#f8fafc', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {selectedPaymentForView.projectTitle}
                  </Typography>
                  <Chip
                    label={selectedPaymentForView.paymentStatus}
                    size="small"
                    color={
                      selectedPaymentForView.paymentStatus === 'approved' ? 'info' : 
                      selectedPaymentForView.paymentStatus === 'pending' ? 'warning' : 'success'
                    }
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Contractor: {selectedPaymentForView.contractorName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Work Order: {selectedPaymentForView.workOrderNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Payment Date: {selectedPaymentForView.paymentDate.toLocaleDateString()}
                </Typography>
              </Box>

              {/* Payment Breakdown */}
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Total Work Value</TableCell>
                      <TableCell align="right">₹{selectedPaymentForView.totalWorkValue.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Less: Previous Payments</TableCell>
                      <TableCell align="right">₹{selectedPaymentForView.previousPayments.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Current Bill</strong></TableCell>
                      <TableCell align="right"><strong>₹{selectedPaymentForView.currentBillAmount.toLocaleString('en-IN')}</strong></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Add: GST @ {selectedPaymentForView.gstRate}%</TableCell>
                      <TableCell align="right">₹{selectedPaymentForView.gstAmount.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell><strong>Gross Amount</strong></TableCell>
                      <TableCell align="right"><strong>₹{selectedPaymentForView.grossAmount.toLocaleString('en-IN')}</strong></TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Typography variant="subtitle2" sx={{ mt: 1 }}>
                          Deductions:
                        </Typography>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell sx={{ pl: 4 }}>Income Tax @ 2%</TableCell>
                      <TableCell align="right">₹{selectedPaymentForView.incomeTax.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ pl: 4 }}>Labour Cess @ 1%</TableCell>
                      <TableCell align="right">₹{selectedPaymentForView.labourCess.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ pl: 4 }}>GST TDS @ 2%</TableCell>
                      <TableCell align="right">₹{selectedPaymentForView.gstTDS.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ pl: 4 }}>Retention @ 10%</TableCell>
                      <TableCell align="right">₹{selectedPaymentForView.retentionMoney.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Total Deductions</strong></TableCell>
                      <TableCell align="right"><strong>₹{selectedPaymentForView.totalDeductions.toLocaleString('en-IN')}</strong></TableCell>
                    </TableRow>
                    
                    <TableRow sx={{ backgroundColor: '#e8f5e9' }}>
                      <TableCell><Typography variant="h6">Net Payable</Typography></TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" color="primary">
                          ₹{selectedPaymentForView.netPayableAmount.toLocaleString('en-IN')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Amount in Words */}
              <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Amount in Words:
                </Typography>
                <Typography variant="body2">
                  {selectedPaymentForView.amountInWords}
                </Typography>
              </Box>

              {/* Remarks */}
              {selectedPaymentForView.remarks && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Remarks:
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    {selectedPaymentForView.remarks}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button startIcon={<PrintIcon />} onClick={handlePrintPayment}>
            Print
          </Button>
          <Button onClick={handleClosePaymentDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentProcessing;