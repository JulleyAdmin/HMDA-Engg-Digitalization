// Project Map Component for Geographic Visualization
import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup,
  Paper
} from '@mui/material';
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  MyLocation as CenterIcon,
  Layers as LayersIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface ProjectMapProps {
  projects: any[];
  onProjectSelect?: (project: any) => void;
  height?: number;
}

// Mock map data - in real implementation, this would use actual map libraries like Leaflet or Google Maps
const HMDA_CIRCLES = {
  'C1': { name: 'Hyderabad Core', center: [17.3850, 78.4867], color: '#1976d2' },
  'C2': { name: 'Rangareddy', center: [17.2403, 78.1418], color: '#388e3c' },
  'C3': { name: 'Medchal-Malkajgiri', center: [17.6243, 78.4816], color: '#f57c00' },
  'C4': { name: 'Sangareddy', center: [17.6186, 78.0816], color: '#7b1fa2' },
  'C5': { name: 'Vikarabad', center: [17.3372, 77.9019], color: '#c62828' }
};

const ProjectMap: React.FC<ProjectMapProps> = ({
  projects,
  onProjectSelect,
  height = 600
}) => {
  const theme = useTheme();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [mapView, setMapView] = useState<'satellite' | 'terrain' | 'roads'>('terrain');
  const [showClusters, setShowClusters] = useState(true);
  const [zoom, setZoom] = useState(10);

  // Group projects by circle for clustering
  const projectsByCircle = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    projects.forEach(project => {
      const circle = project.location?.circle || 'Unknown';
      if (!grouped[circle]) {
        grouped[circle] = [];
      }
      grouped[circle].push(project);
    });
    return grouped;
  }, [projects]);

  // Get marker color based on project status
  const getMarkerColor = (project: any): string => {
    if (project.riskLevel === 'CRITICAL') return theme.palette.error.main;
    if (project.riskLevel === 'HIGH') return theme.palette.warning.main;
    if (project.currentStage === 'Completion') return theme.palette.success.main;
    if (project.timeline?.delayDays > 30) return theme.palette.error.light;
    return theme.palette.primary.main;
  };

  // Handle project selection
  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    onProjectSelect?.(project);
  };

  // Mock map component (in real implementation, use actual map library)
  const MapContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box
      sx={{
        width: '100%',
        height,
        position: 'relative',
        backgroundColor: mapView === 'satellite' ? '#2e4c3e' : '#f5f5f5',
        borderRadius: 1,
        overflow: 'hidden',
        backgroundImage: mapView === 'terrain' 
          ? 'linear-gradient(45deg, #e8f5e8 25%, transparent 25%, transparent 75%, #e8f5e8 75%), linear-gradient(45deg, #e8f5e8 25%, transparent 25%, transparent 75%, #e8f5e8 75%)'
          : mapView === 'satellite'
          ? 'radial-gradient(circle at 30% 20%, #1a4d3a, #2e4c3e)'
          : 'none',
        backgroundSize: mapView === 'terrain' ? '20px 20px' : 'auto',
        backgroundPosition: mapView === 'terrain' ? '0 0, 10px 10px' : 'auto'
      }}
    >
      {children}
    </Box>
  );

  // Mock map controls
  const MapControls = () => (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        zIndex: 1000
      }}
    >
      <Paper sx={{ p: 1 }}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Tooltip title="Zoom In">
            <IconButton size="small" onClick={() => setZoom(prev => Math.min(prev + 1, 18))}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Zoom Out">
            <IconButton size="small" onClick={() => setZoom(prev => Math.max(prev - 1, 1))}>
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Center Map">
            <IconButton size="small">
              <CenterIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );

  // Render circle clusters or individual markers
  const renderProjectMarkers = () => {
    if (showClusters) {
      return Object.entries(projectsByCircle).map(([circle, circleProjects]) => {
        const circleInfo = HMDA_CIRCLES[circle as keyof typeof HMDA_CIRCLES];
        if (!circleInfo || circleProjects.length === 0) return null;

        const criticalCount = circleProjects.filter(p => p.riskLevel === 'CRITICAL').length;
        const delayedCount = circleProjects.filter(p => p.timeline?.delayDays > 0).length;

        return (
          <Box
            key={circle}
            sx={{
              position: 'absolute',
              left: `${20 + (circleInfo.center[1] - 77.9) * 200}px`,
              top: `${50 + (17.7 - circleInfo.center[0]) * 200}px`,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer'
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 1,
                minWidth: 120,
                textAlign: 'center',
                backgroundColor: circleInfo.color,
                color: 'white',
                '&:hover': {
                  elevation: 6,
                  transform: 'scale(1.05)'
                }
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {circle}
              </Typography>
              <Typography variant="body2">
                {circleProjects.length} projects
              </Typography>
              {criticalCount > 0 && (
                <Chip
                  label={`${criticalCount} critical`}
                  size="small"
                  sx={{
                    mt: 0.5,
                    backgroundColor: theme.palette.error.main,
                    color: 'white'
                  }}
                />
              )}
              {delayedCount > 0 && (
                <Chip
                  label={`${delayedCount} delayed`}
                  size="small"
                  sx={{
                    mt: 0.5,
                    ml: 0.5,
                    backgroundColor: theme.palette.warning.main,
                    color: 'white'
                  }}
                />
              )}
            </Paper>
          </Box>
        );
      });
    } else {
      return projects.map((project, index) => {
        const circle = project.location?.circle;
        const circleInfo = HMDA_CIRCLES[circle as keyof typeof HMDA_CIRCLES];
        if (!circleInfo) return null;

        // Add some random offset for individual markers
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 60;

        return (
          <Box
            key={project.projectId}
            sx={{
              position: 'absolute',
              left: `${20 + (circleInfo.center[1] - 77.9) * 200 + offsetX}px`,
              top: `${50 + (17.7 - circleInfo.center[0]) * 200 + offsetY}px`,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              zIndex: selectedProject?.projectId === project.projectId ? 1000 : 1
            }}
            onClick={() => handleProjectClick(project)}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: getMarkerColor(project),
                border: 2,
                borderColor: 'white',
                boxShadow: theme.shadows[2],
                '&:hover': {
                  transform: 'scale(1.5)',
                  zIndex: 999
                }
              }}
            />
          </Box>
        );
      });
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Map Controls */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <ToggleButtonGroup
          value={mapView}
          exclusive
          onChange={(_, newView) => newView && setMapView(newView)}
          size="small"
        >
          <ToggleButton value="terrain">Terrain</ToggleButton>
          <ToggleButton value="satellite">Satellite</ToggleButton>
          <ToggleButton value="roads">Roads</ToggleButton>
        </ToggleButtonGroup>

        <FormControlLabel
          control={
            <Switch
              checked={showClusters}
              onChange={(e) => setShowClusters(e.target.checked)}
              size="small"
            />
          }
          label="Cluster by Circle"
        />

        <Typography variant="body2" color="text.secondary">
          Zoom: {zoom}x | {projects.length} projects
        </Typography>
      </Box>

      {/* Main Map */}
      <MapContainer>
        <MapControls />
        {renderProjectMarkers()}

        {/* Map Legend */}
        <Paper
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            p: 2,
            minWidth: 200,
            zIndex: 1000
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Legend
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {[
              { label: 'Critical Risk', color: theme.palette.error.main },
              { label: 'High Risk', color: theme.palette.warning.main },
              { label: 'Completed', color: theme.palette.success.main },
              { label: 'Delayed', color: theme.palette.error.light },
              { label: 'Normal', color: theme.palette.primary.main }
            ].map((item) => (
              <Box key={item.label} display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    border: 1,
                    borderColor: 'white'
                  }}
                />
                <Typography variant="caption">{item.label}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Circle Labels */}
        {Object.entries(HMDA_CIRCLES).map(([circle, info]) => (
          <Typography
            key={circle}
            variant="caption"
            sx={{
              position: 'absolute',
              left: `${20 + (info.center[1] - 77.9) * 200}px`,
              top: `${20 + (17.7 - info.center[0]) * 200}px`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 'bold',
              color: info.color,
              pointerEvents: 'none'
            }}
          >
            {info.name}
          </Typography>
        ))}
      </MapContainer>

      {/* Selected Project Info */}
      {selectedProject && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="flex-start" justifyContent="space-between">
              <Box flexGrow={1}>
                <Typography variant="h6" gutterBottom>
                  {selectedProject.projectName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {selectedProject.projectId}
                </Typography>
                
                <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                  <Chip
                    label={selectedProject.category}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label={selectedProject.currentStage}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={selectedProject.riskLevel}
                    size="small"
                    sx={{
                      backgroundColor: getMarkerColor(selectedProject),
                      color: 'white'
                    }}
                  />
                </Box>

                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Budget
                    </Typography>
                    <Typography variant="body2">
                      ₹{(selectedProject.totalBudget / 10000000).toFixed(2)} Cr
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="body2">
                      {selectedProject.physicalProgress}%
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body2">
                      {selectedProject.location?.circle} - {selectedProject.location?.mandal}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Contractor
                    </Typography>
                    <Typography variant="body2">
                      {selectedProject.contractor?.name || 'Not assigned'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <IconButton
                onClick={() => setSelectedProject(null)}
                sx={{ ml: 1 }}
              >
                <InfoIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ProjectMap;