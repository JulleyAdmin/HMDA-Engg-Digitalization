import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Stack,
  Button,
  Chip,
  Tab,
  Tabs,
  IconButton,
  LinearProgress,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Badge,
  Tooltip,
  List,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from '@mui/material';
import {
  Architecture,
  Draw,
  ThreeDRotation,
  Straighten,
  AccountTree,
  CloudUpload,
  Download,
  Edit,
  Delete,
  CheckCircle,
  Warning,
  Schedule,
  Visibility,
  Comment,
  Share,
  History,
  Lock,
  LockOpen,
  Add,
  FolderOpen,
  PictureAsPdf,
  Image,
  VideoLibrary,
  CompareArrows,
  Layers,
  Print,
  ZoomIn
} from '@mui/icons-material';
import { HMDAProject } from '../../../../../types/Project';

interface DesignDrawingScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

interface DrawingItem {
  id: string;
  name: string;
  type: 'architectural' | 'structural' | 'mep' | 'landscape' | 'elevation' | '3d';
  version: string;
  status: 'draft' | 'review' | 'approved' | 'revision';
  lastModified: string;
  modifiedBy: string;
  size: string;
  locked: boolean;
  comments: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
  </div>
);

const DesignDrawingScreen: React.FC<DesignDrawingScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDrawing, setSelectedDrawing] = useState<DrawingItem | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [compareMode, setCompareMode] = useState(false);

  // Mock drawing data
  const drawings: DrawingItem[] = [
    {
      id: '1',
      name: 'Master Plan Layout',
      type: 'architectural',
      version: 'v3.2',
      status: 'approved',
      lastModified: '2024-12-10',
      modifiedBy: 'Arch. Sharma',
      size: '12.5 MB',
      locked: false,
      comments: 5
    },
    {
      id: '2',
      name: 'Structural Design - Foundation',
      type: 'structural',
      version: 'v2.1',
      status: 'review',
      lastModified: '2024-12-12',
      modifiedBy: 'Eng. Patel',
      size: '8.3 MB',
      locked: true,
      comments: 12
    },
    {
      id: '3',
      name: 'Electrical Layout Plan',
      type: 'mep',
      version: 'v1.5',
      status: 'revision',
      lastModified: '2024-12-11',
      modifiedBy: 'Eng. Kumar',
      size: '6.7 MB',
      locked: false,
      comments: 8
    },
    {
      id: '4',
      name: '3D Visualization - Main Building',
      type: '3d',
      version: 'v4.0',
      status: 'approved',
      lastModified: '2024-12-09',
      modifiedBy: '3D Team',
      size: '45.2 MB',
      locked: false,
      comments: 2
    },
    {
      id: '5',
      name: 'Landscape Design',
      type: 'landscape',
      version: 'v1.8',
      status: 'draft',
      lastModified: '2024-12-13',
      modifiedBy: 'Landscape Arch.',
      size: '15.8 MB',
      locked: false,
      comments: 3
    }
  ];

  const drawingCategories = [
    { type: 'architectural', label: 'Architectural', icon: <Architecture />, color: '#2196f3' },
    { type: 'structural', label: 'Structural', icon: <AccountTree />, color: '#ff9800' },
    { type: 'mep', label: 'MEP', icon: <Straighten />, color: '#4caf50' },
    { type: 'landscape', label: 'Landscape', icon: <Draw />, color: '#8bc34a' },
    { type: 'elevation', label: 'Elevation', icon: <Layers />, color: '#9c27b0' },
    { type: '3d', label: '3D Models', icon: <ThreeDRotation />, color: '#e91e63' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'review': return 'warning';
      case 'revision': return 'error';
      case 'draft': return 'default';
      default: return 'default';
    }
  };

  const getDrawingIcon = (type: string) => {
    const category = drawingCategories.find(c => c.type === type);
    return category ? category.icon : <Architecture />;
  };

  const getDrawingColor = (type: string) => {
    const category = drawingCategories.find(c => c.type === type);
    return category ? category.color : theme.palette.primary.main;
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Design & Drawing Management
      </Typography>

      {/* Drawing Statistics */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        {drawingCategories.map((category, index) => (
          <Box key={index} flex="1 1 150px">
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: alpha(category.color, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    color: category.color
                  }}
                >
                  {category.icon}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {category.label}
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {drawings.filter(d => d.type === category.type).length}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Main Content Area */}
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" px={2}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
              <Tab label="All Drawings" icon={<Badge badgeContent={drawings.length} color="primary"><FolderOpen /></Badge>} />
              <Tab label="Under Review" icon={<Badge badgeContent={drawings.filter(d => d.status === 'review').length} color="warning"><Schedule /></Badge>} />
              <Tab label="Approved" icon={<Badge badgeContent={drawings.filter(d => d.status === 'approved').length} color="success"><CheckCircle /></Badge>} />
              <Tab label="3D Models" icon={<Badge badgeContent={drawings.filter(d => d.type === '3d').length} color="secondary"><ThreeDRotation /></Badge>} />
            </Tabs>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<CompareArrows />}
                onClick={() => setCompareMode(!compareMode)}
                color={compareMode ? 'primary' : 'inherit'}
              >
                Compare
              </Button>
              <Button
                variant="contained"
                startIcon={<CloudUpload />}
                onClick={() => setUploadDialog(true)}
              >
                Upload
              </Button>
            </Stack>
          </Stack>
        </Box>

        <TabPanel value={activeTab} index={0}>
          {/* All Drawings */}
          <List>
            {drawings.map((drawing, index) => (
              <React.Fragment key={drawing.id}>
                <ListItem>
                  <ListItemIcon>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        bgcolor: alpha(getDrawingColor(drawing.type), 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: getDrawingColor(drawing.type)
                      }}
                    >
                      {getDrawingIcon(drawing.type)}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="subtitle1" fontWeight={500}>
                          {drawing.name}
                        </Typography>
                        <Chip 
                          label={drawing.version} 
                          size="small" 
                          variant="outlined"
                        />
                        <Chip 
                          label={drawing.status.toUpperCase()} 
                          size="small"
                          color={getStatusColor(drawing.status) as any}
                        />
                        {drawing.locked && <Lock sx={{ fontSize: 16, color: 'text.secondary' }} />}
                      </Stack>
                    }
                    secondary={
                      <Stack direction="row" spacing={2} mt={0.5}>
                        <Typography variant="caption" color="text.secondary">
                          Modified: {new Date(drawing.lastModified).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          By: {drawing.modifiedBy}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Size: {drawing.size}
                        </Typography>
                        {drawing.comments > 0 && (
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Comment sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {drawing.comments}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Stack direction="row" spacing={0.5}>
                      {compareMode && (
                        <Checkbox />
                      )}
                      <Tooltip title="View">
                        <IconButton 
                          size="small"
                          onClick={() => {
                            setSelectedDrawing(drawing);
                            setViewerOpen(true);
                          }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download">
                        <IconButton size="small">
                          <Download fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <IconButton size="small">
                          <Share fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Version History">
                        <IconButton size="small">
                          <History fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < drawings.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          {compareMode && (
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderTop: 1, borderColor: 'divider' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">
                  Select 2 drawings to compare
                </Typography>
                <Button variant="contained" size="small">
                  Compare Selected
                </Button>
              </Stack>
            </Box>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {/* Under Review */}
          <Alert severity="warning" sx={{ mb: 2 }}>
            {drawings.filter(d => d.status === 'review').length} drawings are pending review and approval.
          </Alert>
          
          <Box display="flex" flexWrap="wrap" gap={3}>
            {drawings.filter(d => d.status === 'review').map((drawing) => (
              <Box key={drawing.id} flex="1 1 350px">
                <Card>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {getDrawingIcon(drawing.type)}
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {drawing.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Version {drawing.version}
                          </Typography>
                        </Box>
                      </Stack>
                      <Schedule sx={{ color: 'warning.main' }} />
                    </Stack>

                    <Stack spacing={1} mb={2}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Submitted By
                        </Typography>
                        <Typography variant="body2">
                          {drawing.modifiedBy}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Review Status
                        </Typography>
                        <Typography variant="body2" color="warning.main" fontWeight={500}>
                          Pending (2 days)
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Comments
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Comment sx={{ fontSize: 16 }} />
                          <Typography variant="body2">
                            {drawing.comments}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                      <Button size="small" variant="outlined" fullWidth>
                        View Drawing
                      </Button>
                      <Button size="small" variant="contained" color="success" fullWidth>
                        Approve
                      </Button>
                      <Button size="small" variant="contained" color="error" fullWidth>
                        Reject
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {/* Approved Drawings */}
          <Alert severity="success" sx={{ mb: 2 }}>
            All approved drawings are locked for edits. Request unlock for modifications.
          </Alert>
          
          <Box display="flex" flexWrap="wrap" gap={2}>
            {drawings.filter(d => d.status === 'approved').map((drawing) => (
              <Box key={drawing.id} flex="1 1 300px">
                <Card sx={{ bgcolor: 'success.50' }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {getDrawingIcon(drawing.type)}
                        <Typography variant="subtitle1" fontWeight={600}>
                          {drawing.name}
                        </Typography>
                      </Stack>
                      <CheckCircle sx={{ color: 'success.main' }} />
                    </Stack>

                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Approved on {new Date(drawing.lastModified).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Version: {drawing.version}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} mt={2}>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        startIcon={<Download />}
                        fullWidth
                      >
                        Download
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        startIcon={<Print />}
                        fullWidth
                      >
                        Print
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          {/* 3D Models */}
          <Box display="flex" flexWrap="wrap" gap={3}>
            {drawings.filter(d => d.type === '3d').map((drawing) => (
              <Box key={drawing.id} flex="1 1 400px">
                <Card>
                  <Box
                    sx={{
                      height: 200,
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    <ThreeDRotation sx={{ fontSize: 60, color: 'grey.400' }} />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper'
                      }}
                      onClick={() => {
                        setSelectedDrawing(drawing);
                        setViewerOpen(true);
                      }}
                    >
                      <ZoomIn />
                    </IconButton>
                  </Box>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {drawing.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {drawing.size} • Last updated {new Date(drawing.lastModified).toLocaleDateString()}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button size="small" variant="outlined" fullWidth>
                        View in 3D
                      </Button>
                      <Button size="small" variant="outlined" fullWidth>
                        Download Model
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </TabPanel>
      </Paper>

      {/* Design Progress Summary */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Design Progress Overview
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={3}>
          <Box flex="1 1 250px">
            <Stack spacing={1}>
              <Typography variant="subtitle2">Architectural Drawings</Typography>
              <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4 }} />
              <Typography variant="caption" color="text.secondary">85% Complete</Typography>
            </Stack>
          </Box>
          <Box flex="1 1 250px">
            <Stack spacing={1}>
              <Typography variant="subtitle2">Structural Drawings</Typography>
              <LinearProgress variant="determinate" value={70} sx={{ height: 8, borderRadius: 4 }} />
              <Typography variant="caption" color="text.secondary">70% Complete</Typography>
            </Stack>
          </Box>
          <Box flex="1 1 250px">
            <Stack spacing={1}>
              <Typography variant="subtitle2">MEP Drawings</Typography>
              <LinearProgress variant="determinate" value={60} sx={{ height: 8, borderRadius: 4 }} />
              <Typography variant="caption" color="text.secondary">60% Complete</Typography>
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* Floating Action Button */}
      <SpeedDial
        ariaLabel="Drawing actions"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<CloudUpload />}
          tooltipTitle="Upload Drawing"
          onClick={() => setUploadDialog(true)}
        />
        <SpeedDialAction
          icon={<Add />}
          tooltipTitle="Create New"
        />
        <SpeedDialAction
          icon={<Image />}
          tooltipTitle="Import from Gallery"
        />
      </SpeedDial>

      {/* Viewer Dialog */}
      <Dialog
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {selectedDrawing?.name}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small">
                <Download />
              </IconButton>
              <IconButton size="small">
                <Print />
              </IconButton>
              <IconButton size="small">
                <Share />
              </IconButton>
            </Stack>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              height: 500,
              bgcolor: 'grey.100',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography color="text.secondary">
              CAD/Drawing viewer would be displayed here
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewerOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialog}
        onClose={() => setUploadDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Upload Drawing</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Drawing Type</InputLabel>
              <Select defaultValue="">
                {drawingCategories.map((cat) => (
                  <MenuItem key={cat.type} value={cat.type}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {cat.icon}
                      <span>{cat.label}</span>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Drawing Name"
              placeholder="Enter drawing name"
            />
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover'
                }
              }}
            >
              <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                Drop files here or click to browse
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supported formats: DWG, DXF, PDF, PNG, JPG (Max 100MB)
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)}>Cancel</Button>
          <Button variant="contained">Upload</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DesignDrawingScreen;