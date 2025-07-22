import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { HMDAProject } from '../../../../../types/Project';

interface ConsultantManagementScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

const ConsultantManagementScreen: React.FC<ConsultantManagementScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Consultant Management Portal
      </Typography>
      <Alert severity="info">
        Comprehensive consultant management system - implementation in progress
      </Alert>
    </Box>
  );
};

export default ConsultantManagementScreen;