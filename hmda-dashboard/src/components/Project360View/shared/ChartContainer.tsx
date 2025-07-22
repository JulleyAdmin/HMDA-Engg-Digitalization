import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  CircularProgress,
  Typography,
  alpha
} from '@mui/material';
import {
  MoreVert,
  Download,
  Fullscreen,
  Refresh,
  Info
} from '@mui/icons-material';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string;
  onRefresh?: () => void;
  onExport?: (format: 'png' | 'csv' | 'pdf') => void;
  onFullscreen?: () => void;
  info?: string;
  height?: number | string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children,
  loading = false,
  error,
  onRefresh,
  onExport,
  onFullscreen,
  info,
  height = 400
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (format: 'png' | 'csv' | 'pdf') => {
    if (onExport) {
      onExport(format);
    }
    handleMenuClose();
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
        subheader={subtitle}
        action={
          <Box>
            {onRefresh && (
              <IconButton onClick={onRefresh} size="small">
                <Refresh />
              </IconButton>
            )}
            {onFullscreen && (
              <IconButton onClick={onFullscreen} size="small">
                <Fullscreen />
              </IconButton>
            )}
            <IconButton onClick={handleMenuOpen} size="small">
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {onExport && [
                <MenuItem key="png" onClick={() => handleExport('png')}>
                  <Download sx={{ mr: 1, fontSize: 20 }} />
                  Export as PNG
                </MenuItem>,
                <MenuItem key="csv" onClick={() => handleExport('csv')}>
                  <Download sx={{ mr: 1, fontSize: 20 }} />
                  Export as CSV
                </MenuItem>,
                <MenuItem key="pdf" onClick={() => handleExport('pdf')}>
                  <Download sx={{ mr: 1, fontSize: 20 }} />
                  Export as PDF
                </MenuItem>
              ]}
            </Menu>
          </Box>
        }
      />
      <CardContent sx={{ flex: 1, position: 'relative', height: height }}>
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              zIndex: 1
            }}
          >
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'error.main'
            }}
          >
            <Typography variant="body1">{error}</Typography>
          </Box>
        )}
        
        {!loading && !error && (
          <Box sx={{ height: '100%', width: '100%' }}>
            {children}
          </Box>
        )}
        
        {info && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              fontSize: '0.75rem'
            }}
          >
            <Info sx={{ fontSize: 14 }} />
            <Typography variant="caption">{info}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartContainer;