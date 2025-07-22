import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { HMDAProject } from '../../../../../types/Project';

interface QualityCheckpointsProps {
  project: HMDAProject;
  compactMode?: boolean;
}

const QualityCheckpoints: React.FC<QualityCheckpointsProps> = ({ project, compactMode = false }) => {
  return (
    <Box>
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quality Control Checkpoints
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quality control checkpoints and inspection results will be displayed here.
        </Typography>
      </Card>
    </Box>
  );
};

export default QualityCheckpoints;