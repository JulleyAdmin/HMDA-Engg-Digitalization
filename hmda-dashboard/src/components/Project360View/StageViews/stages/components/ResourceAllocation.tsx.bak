import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { HMDAProject } from '../../../../../types/Project';

interface ResourceAllocationProps {
  project: HMDAProject;
  compactMode?: boolean;
}

const ResourceAllocation: React.FC<ResourceAllocationProps> = ({ project, compactMode = false }) => {
  return (
    <Box>
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Resource Allocation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manpower, equipment, and material allocation tracking will be displayed here.
        </Typography>
      </Card>
    </Box>
  );
};

export default ResourceAllocation;