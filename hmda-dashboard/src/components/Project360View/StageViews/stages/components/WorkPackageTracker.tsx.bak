import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { HMDAProject } from '../../../../../types/Project';

interface WorkPackageTrackerProps {
  project: HMDAProject;
  compactMode?: boolean;
}

const WorkPackageTracker: React.FC<WorkPackageTrackerProps> = ({ project, compactMode = false }) => {
  return (
    <Box>
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Work Package Tracker
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Construction work packages will be displayed here.
        </Typography>
      </Card>
    </Box>
  );
};

export default WorkPackageTracker;