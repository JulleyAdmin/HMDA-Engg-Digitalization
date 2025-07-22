import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  Stack,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  AccountBalance,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import { HMDAProject } from '../../../../../types/Project';

interface BudgetVerificationScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

const BudgetVerificationScreen: React.FC<BudgetVerificationScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Budget Availability & Verification
      </Typography>
      
      <Alert severity="warning" sx={{ mb: 3 }}>
        Budget verification pending from Finance Department. Estimated availability: 75%
      </Alert>

      <Box display="flex" flexWrap="wrap" gap={3}>
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <AccountBalance sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700} color="primary.main">
                ₹125 Cr
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available Budget
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700} color="success.main">
                75%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fund Allocation
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Warning sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700} color="warning.main">
                Pending
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Verification Status
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 100%">
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Budget Verification Progress
              </Typography>
              <Stack gap={2}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2">Finance Department Review</Typography>
                    <Chip label="In Progress" color="warning" size="small" />
                  </Stack>
                  <LinearProgress variant="determinate" value={60} />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2">Fund Allocation Approval</Typography>
                    <Chip label="Pending" color="default" size="small" />
                  </Stack>
                  <LinearProgress variant="determinate" value={0} />
                </Box>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2">Commissioner Approval</Typography>
                    <Chip label="Awaiting" color="default" size="small" />
                  </Stack>
                  <LinearProgress variant="determinate" value={0} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetVerificationScreen;