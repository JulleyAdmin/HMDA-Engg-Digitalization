import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { HMDAProject } from '../../../../../types/Project';

interface TechnicalSanctionScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

const TechnicalSanctionScreen: React.FC<TechnicalSanctionScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Technical Sanction Approval Workflow
      </Typography>
      <Alert severity="info">
        Technical sanction approval workflow system - implementation in progress
      </Alert>
    </Box>
  );
};

export default TechnicalSanctionScreen;