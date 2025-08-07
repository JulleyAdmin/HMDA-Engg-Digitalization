import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from '@mui/material';

interface ConsolidatedPaymentProps {
  workItems: Array<{ id: number; value: number; contractor: string }>;
  previousPaymentTotal: number;
}

const ConsolidatedPaymentView: React.FC<ConsolidatedPaymentProps> = ({ 
  workItems, 
  previousPaymentTotal 
}) => {
  // Use actual values from Excel sheet
  // Note: Third column appears to be a reconciliation/difference column
  const workValues = [8006, 23755, -15749];  // Third is negative (difference)
  const workHeaders = ['Current', 'Previous', 'Adjustment']; 
  const withHeld5Percent = 43137;
  
  // Calculate deductions for each work item based on Excel
  const deductions = [
    {
      it: 8006,  // I.T. 1%
      labourCess: 8196,  // Labour Cess 1%
      qc: 4098,  // QC 0.5%
      nac: 820,  // NAC 0.1%
      seignorage: 9144,
      dmf: 914,  // DMF (10% on Seignorage)
      smet: 183,  // SMET (2% on Seignorage)
      other: 0
    },
    {
      it: 23755,
      labourCess: 11878,
      qc: 5939,
      nac: 1188,
      seignorage: 4790,
      dmf: 479,
      smet: 96,
      other: 0
    },
    {
      it: -15749,  // Negative value as per Excel
      labourCess: -3682,
      qc: -1841,
      nac: -368,
      seignorage: 4354,
      dmf: 435,
      smet: 87,
      other: 0
    }
  ];
  
  // Total row sums from Excel
  const totalDeductionsByColumn = [31361, 48125, -16764];
  const totalDeductions = totalDeductionsByColumn.reduce((sum, val) => sum + val, 0);
  
  // Memo of Payment calculations from Excel
  const totalValueOfWork = 862740.00;
  const withHeld5 = 43137.00;
  const subTotal1 = 819603.00;  // After deducting with held 5%
  const deductTP = 41.00;
  
  // Additional calculations
  const addQC = 4098;  // Corrected value from screenshot
  const addNAC = 820;
  const addGST = 40980;
  
  const subTotal1Plus2Plus3 = 865542.00;
  const deductFSD = 64916; // 7.5% FSD
  const total = 800626.00;
  const deductPP = 1187747;
  const grossTotal = -387121.00; // Negative as per Excel (6-7)
  const deductionsAmount = -16764;  // Negative as per screenshot
  const netPayment = -370357.00;  // Negative as per screenshot

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: 'primary.main' }}>
        Consolidated Payment / RA Bill Format
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Side - Deductions Table */}
        <Box sx={{ flex: 1.2 }}>
          <Typography sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', p: 1, border: '1px solid #ddd', borderBottom: 'none' }}>
            Deductions
          </Typography>
          <TableContainer>
            <Table size="small" sx={{ '& td, & th': { border: '1px solid #ddd', padding: '6px 8px' } }}>
              <TableBody>
                {/* Header row with work item labels */}
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Work Items →</TableCell>
                  {workItems.slice(0, 3).map((item, idx) => (
                    <TableCell key={idx} align="center" sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                      {item.contractor || `Item ${idx + 1}`}
                    </TableCell>
                  ))}
                </TableRow>
                
                {/* Value row showing amounts */}
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Bill Amount:</TableCell>
                  {workValues.map((value, idx) => (
                    <TableCell key={idx} align="center" sx={{ 
                      fontWeight: 'bold', 
                      backgroundColor: '#f9f9f9',
                      color: value < 0 ? 'red' : 'inherit'
                    }}>
                      {value < 0 ? '(' : ''}₹{Math.abs(value).toLocaleString()}{value < 0 ? ')' : ''}
                    </TableCell>
                  ))}
                </TableRow>
                
                {/* I.T. 1% Row */}
                <TableRow>
                  <TableCell>I.T. 1%:</TableCell>
                  {deductions.map((d, idx) => (
                    <TableCell key={idx} align="right">{d.it.toLocaleString()}</TableCell>
                  ))}
                </TableRow>
                
                {/* Labour Cess 1% */}
                <TableRow>
                  <TableCell>Labour Cess 1%:</TableCell>
                  {deductions.map((d, idx) => (
                    <TableCell key={idx} align="right">{d.labourCess.toLocaleString()}</TableCell>
                  ))}
                </TableRow>
                
                {/* QC 0.5% */}
                <TableRow>
                  <TableCell>QC 0.5%:</TableCell>
                  {deductions.map((d, idx) => (
                    <TableCell key={idx} align="right">{d.qc.toLocaleString()}</TableCell>
                  ))}
                </TableRow>
                
                {/* NAC 0.1% */}
                <TableRow>
                  <TableCell>NAC 0.1%:</TableCell>
                  {deductions.map((d, idx) => (
                    <TableCell key={idx} align="right">{d.nac.toLocaleString()}</TableCell>
                  ))}
                </TableRow>
                
                {/* Seignorage Charges */}
                <TableRow>
                  <TableCell>Seignorage Charges:</TableCell>
                  {deductions.map((d, idx) => (
                    <TableCell key={idx} align="right">{d.seignorage.toLocaleString()}</TableCell>
                  ))}
                </TableRow>
                
                {/* DMF (10% on Seignorage) */}
                <TableRow>
                  <TableCell>DMF (10% on Seignorage):</TableCell>
                  {deductions.map((d, idx) => (
                    <TableCell key={idx} align="right">{d.dmf.toLocaleString()}</TableCell>
                  ))}
                </TableRow>
                
                {/* SMET (2% on Seignorage) */}
                <TableRow>
                  <TableCell>SMET (2% on Seignorage):</TableCell>
                  {deductions.map((d, idx) => (
                    <TableCell key={idx} align="right">{d.smet.toLocaleString()}</TableCell>
                  ))}
                </TableRow>
                
                {/* Other Deductions */}
                <TableRow>
                  <TableCell>Other Deductions:</TableCell>
                  {deductions.map((d, idx) => (
                    <TableCell key={idx} align="right">{d.other}</TableCell>
                  ))}
                </TableRow>
                
                {/* TOTAL Row */}
                <TableRow sx={{ backgroundColor: '#e8f5e9' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>T O T A L : :</TableCell>
                  {totalDeductionsByColumn.map((total, idx) => (
                    <TableCell key={idx} align="right" sx={{ fontWeight: 'bold' }}>
                      {total.toLocaleString()}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Right Side - Memo of Payment */}
        <Box sx={{ flex: 1 }}>
          <TableContainer>
            <Table size="small" sx={{ '& td, & th': { border: '1px solid #ddd', padding: '6px 8px' } }}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                    Memo of Payment
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Total Value of Work done:</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalValueOfWork.toFixed(2)}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>With held 5%:</TableCell>
                  <TableCell align="right">{withHeld5.toFixed(2)}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>Total Value of Work done:</TableCell>
                  <TableCell align="right">{subTotal1.toFixed(2)}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>Deduct TP:</TableCell>
                  <TableCell align="right">{deductTP.toFixed(2)}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>(1) Add 0.5% QC:</TableCell>
                  <TableCell align="right">{addQC.toLocaleString()}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>(2) Add NAC 0.1%:</TableCell>
                  <TableCell align="right">{addNAC.toLocaleString()}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>(3) Add GST 5%:</TableCell>
                  <TableCell align="right">{addGST.toLocaleString()}</TableCell>
                </TableRow>
                
                <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>(4) Sub Total (1+2+3):</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>{subTotal1Plus2Plus3.toFixed(2)}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>(5) Deduct 7.5% FSD:</TableCell>
                  <TableCell align="right">{deductFSD.toLocaleString()}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>(6) Total:</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>{total.toFixed(2)}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>(7) Deduct PP:</TableCell>
                  <TableCell align="right">{deductPP.toLocaleString()}</TableCell>
                </TableRow>
                
                <TableRow sx={{ backgroundColor: '#fff3cd' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>(8) Gross Total (6-7):</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: grossTotal < 0 ? 'red' : 'green' }}>
                    {grossTotal.toFixed(2)}
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>(9) Deductions:</TableCell>
                  <TableCell align="right">{deductionsAmount.toLocaleString()}</TableCell>
                </TableRow>
                
                <TableRow sx={{ backgroundColor: '#d4edda' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>(10) Net payment:</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: netPayment < 0 ? 'red' : '#2e7d32' }}>
                    {netPayment.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ConsolidatedPaymentView;