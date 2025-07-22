import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { HMDAProject } from '../../../../../types/Project';

interface DPRDocumentScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

const DPRDocumentScreen: React.FC<DPRDocumentScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        DPR Document Assembly Interface
      </Typography>
      <Alert severity="info">
        DPR document assembly and generation system - implementation in progress
      </Alert>
    </Box>
  );
};

export default DPRDocumentScreen;