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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  Grid as BoxGrid
} from '@mui/material';
import {
  Terrain,
  LocationOn,
  Assessment,
  Engineering,
  WaterDrop,
  ElectricBolt,
  LocalFlorist,
  Traffic,
  CloudUpload,
  Download,
  Add,
  Edit,
  Delete,
  CheckCircle,
  Warning,
  Schedule,
  Map,
  CameraAlt,
  PictureAsPdf,
  Visibility,
  Timeline,
  Science
} from '@mui/icons-material';
import { HMDAProject } from '../../../../../types/Project';

interface TechnicalSurveyScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

interface SurveyItem {
  id: string;
  type: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'review';
  progress: number;
  assignedTo: string;
  startDate: string;
  endDate: string;
  documents: number;
  issues: number;
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

const TechnicalSurveyScreen: React.FC<TechnicalSurveyScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyItem | null>(null);

  // Mock survey data
  const surveys: SurveyItem[] = [
    {
      id: '1',
      type: 'topographical',
      name: 'Topographical Survey',
      status: 'completed',
      progress: 100,
      assignedTo: 'Survey Team A',
      startDate: '2024-11-15',
      endDate: '2024-11-22',
      documents: 12,
      issues: 0
    },
    {
      id: '2',
      type: 'geotechnical',
      name: 'Geotechnical Investigation',
      status: 'in_progress',
      progress: 75,
      assignedTo: 'GeoTech Consultants',
      startDate: '2024-11-20',
      endDate: '2024-12-05',
      documents: 8,
      issues: 2
    },
    {
      id: '3',
      type: 'hydrological',
      name: 'Hydrological Study',
      status: 'in_progress',
      progress: 60,
      assignedTo: 'Water Resources Team',
      startDate: '2024-11-25',
      endDate: '2024-12-10',
      documents: 5,
      issues: 1
    },
    {
      id: '4',
      type: 'environmental',
      name: 'Environmental Impact Assessment',
      status: 'review',
      progress: 90,
      assignedTo: 'Environmental Consultants',
      startDate: '2024-11-10',
      endDate: '2024-11-30',
      documents: 15,
      issues: 3
    },
    {
      id: '5',
      type: 'traffic',
      name: 'Traffic Impact Study',
      status: 'pending',
      progress: 0,
      assignedTo: 'Traffic Engineering Dept',
      startDate: '2024-12-01',
      endDate: '2024-12-15',
      documents: 0,
      issues: 0
    }
  ];

  const surveyTypes = [
    { icon: <Terrain />, label: 'Topographical', color: '#4caf50' },
    { icon: <Science />, label: 'Geotechnical', color: '#ff9800' },
    { icon: <WaterDrop />, label: 'Hydrological', color: '#2196f3' },
    { icon: <LocalFlorist />, label: 'Environmental', color: '#8bc34a' },
    { icon: <Traffic />, label: 'Traffic Impact', color: '#9c27b0' },
    { icon: <ElectricBolt />, label: 'Electrical Load', color: '#ffc107' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'primary';
      case 'review': return 'warning';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const getSurveyIcon = (type: string) => {
    switch (type) {
      case 'topographical': return <Terrain />;
      case 'geotechnical': return <Science />;
      case 'hydrological': return <WaterDrop />;
      case 'environmental': return <LocalFlorist />;
      case 'traffic': return <Traffic />;
      case 'electrical': return <ElectricBolt />;
      default: return <Assessment />;
    }
  };

  const handleEditSurvey = (survey: SurveyItem) => {
    setSelectedSurvey(survey);
    setOpenDialog(true);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Technical Survey & Investigation Management
      </Typography>

      {/* Survey Overview Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        {surveyTypes.map((type, index) => (
          <Box key={index} flex="1 1 150px">
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: alpha(type.color, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                    color: type.color
                  }}
                >
                  {type.icon}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {type.label}
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {surveys.filter(s => s.type === type.label.toLowerCase().replace(' ', '')).length}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Main Content Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          <Tab label="All Surveys" icon={<Badge badgeContent={surveys.length} color="primary"><Assessment /></Badge>} />
          <Tab label="In Progress" icon={<Badge badgeContent={surveys.filter(s => s.status === 'in_progress').length} color="warning"><Schedule /></Badge>} />
          <Tab label="Completed" icon={<Badge badgeContent={surveys.filter(s => s.status === 'completed').length} color="success"><CheckCircle /></Badge>} />
          <Tab label="Documents" icon={<Badge badgeContent={surveys.reduce((acc, s) => acc + s.documents, 0)} color="info"><PictureAsPdf /></Badge>} />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          {/* All Surveys Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Survey Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Timeline</TableCell>
                  <TableCell>Documents</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {surveys.map((survey) => (
                  <TableRow key={survey.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {getSurveyIcon(survey.type)}
                        <Typography variant="body2" fontWeight={500}>
                          {survey.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={survey.status.replace('_', ' ').toUpperCase()} 
                        size="small"
                        color={getStatusColor(survey.status) as any}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: 100 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <LinearProgress 
                            variant="determinate" 
                            value={survey.progress} 
                            sx={{ flex: 1, height: 6, borderRadius: 3 }}
                          />
                          <Typography variant="caption" fontWeight={600}>
                            {survey.progress}%
                          </Typography>
                        </Stack>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{survey.assignedTo}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0}>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(survey.startDate).toLocaleDateString()} -
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(survey.endDate).toLocaleDateString()}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <PictureAsPdf sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">{survey.documents}</Typography>
                        {survey.issues > 0 && (
                          <Chip 
                            label={`${survey.issues} issues`}
                            size="small"
                            color="error"
                            sx={{ height: 20 }}
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" justifyContent="center" spacing={0.5}>
                        <Tooltip title="View Details">
                          <IconButton size="small">
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleEditSurvey(survey)}>
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Report">
                          <IconButton size="small">
                            <Download fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<Add />}>
              Add New Survey
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {/* In Progress Surveys */}
          <Box display="flex" flexWrap="wrap" gap={3}>
            {surveys.filter(s => s.status === 'in_progress').map((survey) => (
              <Box key={survey.id} flex="1 1 350px">
                <Card>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {getSurveyIcon(survey.type)}
                        <Typography variant="h6" fontWeight={600}>
                          {survey.name}
                        </Typography>
                      </Stack>
                      <Chip 
                        label={`${survey.progress}%`} 
                        color="primary"
                        size="small"
                      />
                    </Stack>

                    <LinearProgress 
                      variant="determinate" 
                      value={survey.progress} 
                      sx={{ mb: 2, height: 8, borderRadius: 4 }}
                    />

                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Assigned To
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {survey.assignedTo}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Expected Completion
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {new Date(survey.endDate).toLocaleDateString()}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Documents
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="body2" fontWeight={500}>
                            {survey.documents}
                          </Typography>
                          {survey.issues > 0 && (
                            <Warning sx={{ fontSize: 16, color: 'error.main' }} />
                          )}
                        </Stack>
                      </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1} mt={2}>
                      <Button size="small" variant="outlined" fullWidth>
                        View Progress
                      </Button>
                      <Button size="small" variant="contained" fullWidth>
                        Update Status
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {/* Completed Surveys */}
          <Alert severity="success" sx={{ mb: 2 }}>
            All completed surveys have been verified and approved. Reports are available for download.
          </Alert>
          
          <Box display="flex" flexWrap="wrap" gap={2}>
            {surveys.filter(s => s.status === 'completed').map((survey) => (
              <Box key={survey.id} flex="1 1 300px">
                <Card sx={{ bgcolor: 'success.50' }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {getSurveyIcon(survey.type)}
                        <Typography variant="subtitle1" fontWeight={600}>
                          {survey.name}
                        </Typography>
                      </Stack>
                      <CheckCircle sx={{ color: 'success.main' }} />
                    </Stack>

                    <Stack spacing={1}>
                      <Typography variant="body2" color="text.secondary">
                        Completed on {new Date(survey.endDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        By {survey.assignedTo}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} mt={2}>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        startIcon={<Download />}
                        fullWidth
                      >
                        Download Report
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        startIcon={<Visibility />}
                        fullWidth
                      >
                        View Results
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          {/* Documents Section */}
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight={600}>
                Survey Documents Repository
              </Typography>
              <Button variant="outlined" startIcon={<CloudUpload />}>
                Upload Document
              </Button>
            </Stack>

            <Box display="flex" flexWrap="wrap" gap={2}>
              <Box flex="1 1 250px">
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                      <Map sx={{ fontSize: 40, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Survey Maps
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          12 documents
                        </Typography>
                      </Box>
                    </Stack>
                    <Button size="small" variant="text" fullWidth>
                      View All
                    </Button>
                  </CardContent>
                </Card>
              </Box>

              <Box flex="1 1 250px">
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                      <CameraAlt sx={{ fontSize: 40, color: 'secondary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Site Photos
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          48 photos
                        </Typography>
                      </Box>
                    </Stack>
                    <Button size="small" variant="text" fullWidth>
                      View Gallery
                    </Button>
                  </CardContent>
                </Card>
              </Box>

              <Box flex="1 1 250px">
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                      <PictureAsPdf sx={{ fontSize: 40, color: 'error.main' }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Technical Reports
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          8 reports
                        </Typography>
                      </Box>
                    </Stack>
                    <Button size="small" variant="text" fullWidth>
                      View Reports
                    </Button>
                  </CardContent>
                </Card>
              </Box>

              <Box flex="1 1 250px">
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                      <Timeline sx={{ fontSize: 40, color: 'warning.main' }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Data Sheets
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          23 files
                        </Typography>
                      </Box>
                    </Stack>
                    <Button size="small" variant="text" fullWidth>
                      View Data
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Paper>
        </TabPanel>
      </Paper>

      {/* Survey Status Summary */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Survey Completion Timeline
        </Typography>
        <Box sx={{ position: 'relative', height: 200 }}>
          {/* Timeline visualization would go here */}
          <Alert severity="info">
            Interactive timeline visualization showing survey progress over time
          </Alert>
        </Box>
      </Paper>

      {/* Edit Survey Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Survey Details
        </DialogTitle>
        <DialogContent>
          {selectedSurvey && (
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Survey Name"
                defaultValue={selectedSurvey.name}
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select defaultValue={selectedSurvey.status}>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="review">Under Review</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Assigned To"
                defaultValue={selectedSurvey.assignedTo}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  defaultValue={selectedSurvey.startDate}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  defaultValue={selectedSurvey.endDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TechnicalSurveyScreen;