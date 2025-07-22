import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Paper,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Chip,
  Divider
} from '@mui/material';
import {
  Calculate,
  AttachMoney,
  TrendingUp,
  Assignment,
  Edit
} from '@mui/icons-material';
import { HMDAProject } from '../../../../../types/Project';

interface PreliminaryCostEstimateScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

const PreliminaryCostEstimateScreen: React.FC<PreliminaryCostEstimateScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Preliminary Cost Estimate
        </Typography>
        <Button variant="contained" startIcon={<Calculate />}>
          Calculate Estimate
        </Button>
      </Stack>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Cost estimation based on DSR rates, site conditions, and project specifications.
      </Alert>

      <Box display="flex" flexWrap="wrap" gap={3}>
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <AttachMoney sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700} color="primary.main">
                ₹45.2 Cr
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Project Cost
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700} color="success.main">
                ±15%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Accuracy Range
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Assignment sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700} color="warning.main">
                Draft
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estimate Status
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 250px">
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Cost Breakdown (DSR Based)
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Unit Rate (₹)</TableCell>
                    <TableCell align="right">Amount (₹ Cr)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Earthwork & Excavation</TableCell>
                    <TableCell align="right">25,000 Cu.M</TableCell>
                    <TableCell align="right">450</TableCell>
                    <TableCell align="right">1.13</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Concrete Works</TableCell>
                    <TableCell align="right">8,500 Cu.M</TableCell>
                    <TableCell align="right">8,500</TableCell>
                    <TableCell align="right">7.23</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Steel & Reinforcement</TableCell>
                    <TableCell align="right">1,200 MT</TableCell>
                    <TableCell align="right">75,000</TableCell>
                    <TableCell align="right">9.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bituminous Work</TableCell>
                    <TableCell align="right">45,000 Sq.M</TableCell>
                    <TableCell align="right">650</TableCell>
                    <TableCell align="right">2.93</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Subtotal (Civil Works)</strong></TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right"><strong>20.29</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Electrical & Utilities</TableCell>
                    <TableCell align="right">1 LS</TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">5.50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Land Acquisition</TableCell>
                    <TableCell align="right">2.5 Acres</TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">12.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contingency (15%)</TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">5.67</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Total Project Cost</strong></TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right"><strong>43.46</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default PreliminaryCostEstimateScreen;