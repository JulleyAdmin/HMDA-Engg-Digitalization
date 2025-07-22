import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  IconButton,
  LinearProgress,
  useTheme,
  alpha,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Badge,
  Alert,
  AlertTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction
} from '@mui/material';
import {
  HighQuality,
  CheckCircle,
  Warning,
  Error,
  PendingActions,
  Science,
  Assignment,
  Camera,
  Download,
  ExpandMore,
  TrendingUp,
  TrendingDown,
  Engineering,
  BuildCircle,
  Security,
  Visibility
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { HMDAProject } from '../../../types/Project';

interface QualityTest {
  id: string;
  testType: string;
  component: string;
  sampleId: string;
  testDate: Date;
  result: 'pass' | 'fail' | 'pending' | 'conditional-pass';
  actualValue: number;
  requiredValue: number;
  unit: string;
  testedBy: string;
  certifiedBy?: string;
  remarks?: string;
  retestRequired?: boolean;
  location: string;
}

interface NCR {
  id: string;
  title: string;
  category: 'material' | 'workmanship' | 'dimension' | 'safety' | 'specification';
  severity: 'critical' | 'major' | 'minor';
  status: 'open' | 'under-review' | 'corrected' | 'closed' | 'waived';
  raisedBy: string;
  raisedDate: Date;
  targetCloseDate: Date;
  actualCloseDate?: Date;
  description: string;
  correctiveAction?: string;
  assignedTo: string;
  location: string;
  attachments: string[];
}

interface QualityViewProps {
  project: HMDAProject;
}

const QualityView: React.FC<QualityViewProps> = ({ project }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  // Mock quality data - in real app this would come from API
  const qualityTests: QualityTest[] = [
    {
      id: 'QT-001',
      testType: 'Concrete Compressive Strength',
      component: 'Pier P-15 Foundation',
      sampleId: 'CONC-2024-001',
      testDate: new Date('2024-01-20'),
      result: 'pass',
      actualValue: 32.5,
      requiredValue: 30.0,
      unit: 'MPa',
      testedBy: 'Quality Lab Technician',
      certifiedBy: 'Quality Engineer',
      location: 'Chainage 2+150',
      remarks: 'All test parameters within specified limits'
    },
    {
      id: 'QT-002',
      testType: 'Steel Tensile Test',
      component: 'Reinforcement Bars',
      sampleId: 'STEEL-2024-002',
      testDate: new Date('2024-01-18'),
      result: 'fail',
      actualValue: 485,
      requiredValue: 500,
      unit: 'MPa',
      testedBy: 'Material Testing Lab',
      location: 'Yard Storage',
      retestRequired: true,
      remarks: 'Below minimum yield strength. Batch rejected.'
    },
    {
      id: 'QT-003',
      testType: 'Weld Quality Inspection',
      component: 'Girder Connection G-12',
      sampleId: 'WELD-2024-003',
      testDate: new Date('2024-01-22'),
      result: 'conditional-pass',
      actualValue: 85,
      requiredValue: 90,
      unit: '%',
      testedBy: 'Welding Inspector',
      location: 'Pier P-12',
      remarks: 'Minor defects found. Rectification ongoing.'
    },
    {
      id: 'QT-004',
      testType: 'Dimensional Survey',
      component: 'Bridge Alignment',
      sampleId: 'SURV-2024-004',
      testDate: new Date('2024-01-21'),
      result: 'pending',
      actualValue: 0,
      requiredValue: 2,
      unit: 'mm',
      testedBy: 'Survey Team',
      location: 'Full Span',
      remarks: 'Survey in progress'
    }
  ];

  const ncrs: NCR[] = [
    {
      id: 'NCR-001',
      title: 'Concrete surface finish defects in Pier P-10',
      category: 'workmanship',
      severity: 'minor',
      status: 'corrected',
      raisedBy: 'Site Engineer',
      raisedDate: new Date('2024-01-15'),
      targetCloseDate: new Date('2024-01-25'),
      actualCloseDate: new Date('2024-01-20'),
      description: 'Surface honeycomb found in pier concrete. Affects aesthetic appearance.',
      correctiveAction: 'Grinding and polymer patching completed.',
      assignedTo: 'Construction Supervisor',
      location: 'Pier P-10',
      attachments: ['photo1.jpg', 'inspection_report.pdf']
    },
    {
      id: 'NCR-002',
      title: 'Rebar spacing non-conformity',
      category: 'specification',
      severity: 'major',
      status: 'under-review',
      raisedBy: 'Quality Engineer',
      raisedDate: new Date('2024-01-18'),
      targetCloseDate: new Date('2024-01-28'),
      description: 'Reinforcement spacing found to be 250mm instead of specified 200mm in deck slab.',
      assignedTo: 'Design Engineer',
      location: 'Deck Slab Section 2-3',
      attachments: ['measurement_report.pdf', 'photos.zip']
    },
    {
      id: 'NCR-003',
      title: 'Safety barrier height deviation',
      category: 'dimension',
      severity: 'critical',
      status: 'open',
      raisedBy: 'Safety Officer',
      raisedDate: new Date('2024-01-19'),
      targetCloseDate: new Date('2024-01-29'),
      description: 'Safety barrier height is 1.2m instead of required 1.4m as per IRC specifications.',
      assignedTo: 'Construction Manager',
      location: 'Approach Road',
      attachments: ['dimension_check.pdf']
    }
  ];

  const qualityMetrics = useMemo(() => {
    const totalTests = qualityTests.length;
    const passedTests = qualityTests.filter(t => t.result === 'pass').length;
    const failedTests = qualityTests.filter(t => t.result === 'fail').length;
    const pendingTests = qualityTests.filter(t => t.result === 'pending').length;
    const conditionalPasses = qualityTests.filter(t => t.result === 'conditional-pass').length;

    const totalNCRs = ncrs.length;
    const openNCRs = ncrs.filter(n => n.status === 'open' || n.status === 'under-review').length;
    const closedNCRs = ncrs.filter(n => n.status === 'corrected' || n.status === 'closed').length;
    const criticalNCRs = ncrs.filter(n => n.severity === 'critical').length;
    const overdueNCRs = ncrs.filter(n => 
      new Date() > n.targetCloseDate && (n.status === 'open' || n.status === 'under-review')
    ).length;

    const qualityScore = Math.round(((passedTests + conditionalPasses * 0.8) / totalTests) * 100);
    const ncrResolutionRate = totalNCRs > 0 ? Math.round((closedNCRs / totalNCRs) * 100) : 100;

    return {
      totalTests,
      passedTests,
      failedTests,
      pendingTests,
      conditionalPasses,
      qualityScore,
      totalNCRs,
      openNCRs,
      closedNCRs,
      criticalNCRs,
      overdueNCRs,
      ncrResolutionRate
    };
  }, [qualityTests, ncrs]);

  const getTestResultColor = (result: string): 'success' | 'error' | 'warning' | 'info' => {
    switch (result) {
      case 'pass': return 'success';
      case 'fail': return 'error';
      case 'conditional-pass': return 'warning';
      case 'pending': return 'info';
      default: return 'info';
    }
  };

  const getNCRStatusColor = (status: string): 'success' | 'error' | 'warning' | 'info' => {
    switch (status) {
      case 'corrected':
      case 'closed': return 'success';
      case 'open': return 'error';
      case 'under-review': return 'warning';
      case 'waived': return 'info';
      default: return 'info';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return theme.palette.error.main;
      case 'major': return theme.palette.warning.main;
      case 'minor': return theme.palette.info.main;
      default: return theme.palette.grey[500];
    }
  };

  const testResultData = [
    { name: 'Passed', value: qualityMetrics.passedTests, color: theme.palette.success.main },
    { name: 'Failed', value: qualityMetrics.failedTests, color: theme.palette.error.main },
    { name: 'Conditional', value: qualityMetrics.conditionalPasses, color: theme.palette.warning.main },
    { name: 'Pending', value: qualityMetrics.pendingTests, color: theme.palette.info.main }
  ];

  const qualityTrendData = [
    { month: 'Oct', score: 78, target: 85 },
    { month: 'Nov', score: 82, target: 85 },
    { month: 'Dec', score: 85, target: 85 },
    { month: 'Jan', score: qualityMetrics.qualityScore, target: 85 }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight={600}>
          Quality Control & Assurance
        </Typography>
        <Button variant="contained" size="small" startIcon={<Download />}>
          QC Report
        </Button>
      </Stack>

      {/* Quality Overview Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 140 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Quality Score
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', width: 32, height: 32 }}>
                  <HighQuality sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600} color="success.main">
                {qualityMetrics.qualityScore}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={qualityMetrics.qualityScore}
                color="success"
                sx={{ height: 4, borderRadius: 2 }}
              />
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 140 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Tests Passed
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', width: 32, height: 32 }}>
                  <CheckCircle sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600}>
                {qualityMetrics.passedTests}/{qualityMetrics.totalTests}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 140 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Open NCRs
                </Typography>
                <Avatar sx={{ 
                  bgcolor: alpha(qualityMetrics.openNCRs > 0 ? theme.palette.error.main : theme.palette.success.main, 0.1), 
                  color: qualityMetrics.openNCRs > 0 ? 'error.main' : 'success.main', 
                  width: 32, 
                  height: 32 
                }}>
                  <Badge badgeContent={qualityMetrics.criticalNCRs} color="error">
                    <Assignment sx={{ fontSize: 18 }} />
                  </Badge>
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600} color={qualityMetrics.openNCRs > 0 ? 'error.main' : 'success.main'}>
                {qualityMetrics.openNCRs}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 140 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Resolution Rate
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', width: 32, height: 32 }}>
                  <TrendingUp sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600}>
                {qualityMetrics.ncrResolutionRate}%
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Critical Alerts */}
      {(qualityMetrics.criticalNCRs > 0 || qualityMetrics.overdueNCRs > 0 || qualityMetrics.qualityScore < 80) && (
        <Alert severity="error" sx={{ mb: 3 }} icon={<Warning />}>
          <AlertTitle>Quality Alerts</AlertTitle>
          {qualityMetrics.criticalNCRs > 0 && `${qualityMetrics.criticalNCRs} critical NCR(s) require immediate attention. `}
          {qualityMetrics.overdueNCRs > 0 && `${qualityMetrics.overdueNCRs} overdue NCR(s) pending resolution. `}
          {qualityMetrics.qualityScore < 80 && `Quality score below acceptable threshold (${qualityMetrics.qualityScore}%).`}
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tab label="Overview" />
        <Tab label="Test Results" />
        <Tab label="NCRs" />
        <Tab label="Inspections" />
        <Tab label="Trends" />
      </Tabs>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box display="flex" flexWrap="wrap" gap={3}>
          {/* Test Results Distribution */}
          <Card sx={{ flex: '1 1 400px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Test Results Distribution
              </Typography>
              <Box height={250}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={testResultData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {testResultData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Quality Metrics Summary */}
          <Card sx={{ flex: '1 1 300px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Quality Metrics
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Concrete Tests</Typography>
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      95% Pass Rate
                    </Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={95} color="success" sx={{ height: 6, borderRadius: 3 }} />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Steel Tests</Typography>
                    <Typography variant="body2" fontWeight={600} color="warning.main">
                      78% Pass Rate
                    </Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={78} color="warning" sx={{ height: 6, borderRadius: 3 }} />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Welding Quality</Typography>
                    <Typography variant="body2" fontWeight={600} color="info.main">
                      88% Pass Rate
                    </Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={88} color="info" sx={{ height: 6, borderRadius: 3 }} />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Dimensional Accuracy</Typography>
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      92% Pass Rate
                    </Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={92} color="success" sx={{ height: 6, borderRadius: 3 }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}

      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Recent Quality Test Results
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Test Type</TableCell>
                    <TableCell>Component</TableCell>
                    <TableCell>Sample ID</TableCell>
                    <TableCell>Result</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {qualityTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell>
                        <Stack>
                          <Typography variant="body2" fontWeight={600}>
                            {test.testType}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {test.location}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {test.component}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {test.sampleId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack spacing={1}>
                          <Chip 
                            label={test.result.toUpperCase().replace('-', ' ')} 
                            color={getTestResultColor(test.result)}
                            size="small"
                          />
                          {test.retestRequired && (
                            <Chip label="RETEST REQUIRED" color="error" size="small" variant="outlined" />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack>
                          <Typography variant="body2" fontWeight={600}>
                            {test.actualValue} {test.unit}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Req: {test.requiredValue} {test.unit}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(test.testDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                          <IconButton size="small">
                            <Download />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {activeTab === 2 && (
        <Box>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Non-Conformance Reports (NCRs)
              </Typography>
              {ncrs.map((ncr, index) => (
                <Accordion key={ncr.id} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', mr: 2 }}>
                      <Typography variant="body1" fontWeight={600} sx={{ flex: 1 }}>
                        {ncr.title}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip 
                          label={ncr.severity.toUpperCase()} 
                          size="small"
                          sx={{ 
                            bgcolor: alpha(getSeverityColor(ncr.severity), 0.1),
                            color: getSeverityColor(ncr.severity),
                            fontWeight: 600
                          }}
                        />
                        <Chip 
                          label={ncr.status.toUpperCase().replace('-', ' ')} 
                          color={getNCRStatusColor(ncr.status)}
                          size="small"
                        />
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box display="flex" flexWrap="wrap" gap={3}>
                      <Box flex="1 1 300px">
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                          Details
                        </Typography>
                        <Stack spacing={1}>
                          <Typography variant="body2">
                            <strong>NCR ID:</strong> {ncr.id}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Location:</strong> {ncr.location}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Raised by:</strong> {ncr.raisedBy}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Assigned to:</strong> {ncr.assignedTo}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Target Close:</strong> {formatDate(ncr.targetCloseDate)}
                          </Typography>
                          {ncr.actualCloseDate && (
                            <Typography variant="body2">
                              <strong>Actual Close:</strong> {formatDate(ncr.actualCloseDate)}
                            </Typography>
                          )}
                        </Stack>
                      </Box>
                      <Box flex="1 1 300px">
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                          Description
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {ncr.description}
                        </Typography>
                        {ncr.correctiveAction && (
                          <>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                              Corrective Action
                            </Typography>
                            <Typography variant="body2" paragraph>
                              {ncr.correctiveAction}
                            </Typography>
                          </>
                        )}
                        {ncr.attachments.length > 0 && (
                          <>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                              Attachments
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                              {ncr.attachments.map((attachment, idx) => (
                                <Button key={idx} variant="outlined" size="small" startIcon={<Download />}>
                                  {attachment}
                                </Button>
                              ))}
                            </Stack>
                          </>
                        )}
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Box>
      )}

      {activeTab === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Quality Inspections Schedule
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Science color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Concrete Cube Test - Batch #205"
                  secondary="Pier P-16 Foundation | Due: Tomorrow"
                />
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small">
                    Schedule
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <Camera color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Visual Inspection - Deck Slab"
                  secondary="Section 3-4 | Due: Jan 25, 2024"
                />
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small">
                    Capture
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <Engineering color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Welding Quality Check"
                  secondary="Girder Connection G-15 | Overdue by 2 days"
                />
                <ListItemSecondaryAction>
                  <Button variant="contained" color="warning" size="small">
                    Urgent
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}

      {activeTab === 4 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Quality Trends Analysis
            </Typography>
            <Box height={350}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qualityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke={theme.palette.primary.main} 
                    strokeWidth={3}
                    name="Quality Score"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke={theme.palette.error.main} 
                    strokeDasharray="5 5"
                    name="Target (85%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default QualityView;