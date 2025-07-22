import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { HMDAProject } from '../../../../../types/Project';

interface ClearanceNOCScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

const ClearanceNOCScreen: React.FC<ClearanceNOCScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Clearance & NOC Tracking System
      </Typography>
      <Alert severity="info">
        Comprehensive clearance and NOC tracking system - implementation in progress
      </Alert>
    </Box>
  );
};

export default ClearanceNOCScreen;