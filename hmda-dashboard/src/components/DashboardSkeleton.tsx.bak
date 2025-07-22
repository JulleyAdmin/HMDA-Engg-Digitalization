import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack
} from '@mui/material';

const StatCardSkeleton: React.FC = () => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ padding: '20px !important' }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="80px" height={16} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="120px" height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="100px" height={20} />
        </Box>
        <Skeleton variant="rounded" width={48} height={48} />
      </Box>
    </CardContent>
  </Card>
);

const ChartCardSkeleton: React.FC = () => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ padding: '20px !important' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Skeleton variant="rounded" width={32} height={32} sx={{ mr: 2 }} />
        <Box>
          <Skeleton variant="text" width={180} height={24} />
          <Skeleton variant="text" width={140} height={16} />
        </Box>
      </Box>
      <Skeleton variant="rectangular" width="100%" height={280} sx={{ borderRadius: 1 }} />
    </CardContent>
  </Card>
);

const ListCardSkeleton: React.FC = () => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
        <Skeleton variant="text" width={200} height={24} />
      </Box>
      <Stack spacing={2}>
        {[1, 2, 3, 4, 5].map((index) => (
          <Box key={index} display="flex" justifyContent="space-between" alignItems="center">
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="40%" height={16} />
            </Box>
            <Skeleton variant="rounded" width={60} height={24} />
          </Box>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

export const DashboardSkeleton: React.FC = () => {
  return (
    <Box sx={{ padding: '0 4px' }}>
      {/* Key Performance Indicators */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        {[1, 2, 3, 4].map((index) => (
          <Box key={index} flex="1 1 300px">
            <StatCardSkeleton />
          </Box>
        ))}
      </Box>

      {/* Charts Section */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        {[1, 2, 3, 4].map((index) => (
          <Box key={index} flex="1 1 500px">
            <ChartCardSkeleton />
          </Box>
        ))}
      </Box>

      {/* Quick Actions & Alerts */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {[1, 2].map((index) => (
          <Box key={index} flex="1 1 500px">
            <ListCardSkeleton />
          </Box>
        ))}
      </Box>
    </Box>
  );
};