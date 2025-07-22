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
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
  alpha,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  AlertTitle,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormGroup
} from '@mui/material';
import {
  Business,
  Engineering,
  CompareArrows,
  CheckCircle,
  Cancel,
  Schedule,
  AttachMoney,
  Speed,
  School,
  Security,
  Assignment,
  Groups,
  Timeline,
  ExpandMore,
  Info,
  Calculate,
  Assessment,
  Warning,
  Lightbulb
} from '@mui/icons-material';
import { HMDAProject } from '../../../../../types/Project';

interface DPRModeSelectionScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

interface ModeComparisonItem {
  criteria: string;
  inhouse: string;
  consultant: string;
  winner: 'inhouse' | 'consultant' | 'neutral';
}

const DPRModeSelectionScreen: React.FC<DPRModeSelectionScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  const theme = useTheme();
  const [selectedMode, setSelectedMode] = useState<'inhouse' | 'consultant' | ''>('');
  const [showDetailedComparison, setShowDetailedComparison] = useState(false);
  const [consultantBudget, setConsultantBudget] = useState('');
  const [hybridOptions, setHybridOptions] = useState({
    technicalSurvey: 'consultant',
    designDrawing: 'inhouse',
    costEstimation: 'inhouse',
    clearances: 'consultant'
  });

  // Comparison data
  const comparisonData: ModeComparisonItem[] = [
    {
      criteria: 'Time to Complete',
      inhouse: '45-60 days',
      consultant: '30-45 days',
      winner: 'consultant'
    },
    {
      criteria: 'Cost',
      inhouse: '₹15-25 Lakhs',
      consultant: '₹40-60 Lakhs',
      winner: 'inhouse'
    },
    {
      criteria: 'Quality Control',
      inhouse: 'Direct control',
      consultant: 'Through contract terms',
      winner: 'inhouse'
    },
    {
      criteria: 'Expertise Level',
      inhouse: 'Department expertise',
      consultant: 'Specialized expertise',
      winner: 'consultant'
    },
    {
      criteria: 'Resource Availability',
      inhouse: 'Limited by staff',
      consultant: 'Scalable resources',
      winner: 'consultant'
    },
    {
      criteria: 'Accountability',
      inhouse: 'Direct accountability',
      consultant: 'Contract-based',
      winner: 'inhouse'
    }
  ];

  // Mode advantages
  const inhouseAdvantages = [
    'Complete control over DPR quality and timeline',
    'Cost-effective for routine projects',
    'Better understanding of HMDA requirements',
    'Direct coordination with internal teams',
    'No external dependency risks'
  ];

  const consultantAdvantages = [
    'Access to specialized technical expertise',
    'Faster completion with dedicated resources',
    'Risk transfer to external party',
    'Latest industry best practices',
    'Parallel processing capability'
  ];

  // Project suitability factors
  const projectFactors = {
    complexity: project.totalBudget > 50000000 ? 'High' : 'Medium',
    timeline: 'Moderate',
    specialization: 'Standard',
    resourceAvailability: 'Limited'
  };

  const getRecommendation = () => {
    if (project.totalBudget > 100000000) return 'consultant';
    if (project.totalBudget < 20000000) return 'inhouse';
    return 'hybrid';
  };

  const recommendation = getRecommendation();

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        DPR Preparation Mode Selection
      </Typography>

      {/* AI Recommendation Alert */}
      <Alert 
        severity="info" 
        sx={{ mb: 3 }}
        icon={<Lightbulb />}
      >
        <AlertTitle>AI Recommendation</AlertTitle>
        Based on project value of ₹{(project.totalBudget / 10000000).toFixed(1)} Cr and complexity factors, 
        we recommend <strong>{recommendation === 'consultant' ? 'Consultant' : recommendation === 'inhouse' ? 'In-house' : 'Hybrid'}</strong> mode 
        for optimal efficiency and quality.
      </Alert>

      {/* Mode Selection Cards */}
      <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
        <Box flex="1 1 300px">
          <Card 
            sx={{ 
              border: selectedMode === 'inhouse' ? `2px solid ${theme.palette.primary.main}` : '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': { 
                boxShadow: 4,
                borderColor: theme.palette.primary.light
              }
            }}
            onClick={() => setSelectedMode('inhouse')}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Engineering sx={{ fontSize: 40, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    In-house DPR
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    By HMDA Engineering Team
                  </Typography>
                </Box>
                {selectedMode === 'inhouse' && (
                  <CheckCircle sx={{ color: 'success.main', ml: 'auto' }} />
                )}
              </Stack>

              <Stack spacing={1} mb={2}>
                {inhouseAdvantages.slice(0, 3).map((advantage, index) => (
                  <Stack key={index} direction="row" alignItems="center" spacing={1}>
                    <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="body2">{advantage}</Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Timeline</Typography>
                  <Typography variant="caption" fontWeight={600}>45-60 days</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Est. Cost</Typography>
                  <Typography variant="caption" fontWeight={600}>₹15-25 Lakhs</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Resources</Typography>
                  <Typography variant="caption" fontWeight={600}>8-12 staff</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box flex="1 1 300px">
          <Card 
            sx={{ 
              border: selectedMode === 'consultant' ? `2px solid ${theme.palette.secondary.main}` : '1px solid #e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': { 
                boxShadow: 4,
                borderColor: theme.palette.secondary.light
              }
            }}
            onClick={() => setSelectedMode('consultant')}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Business sx={{ fontSize: 40, color: 'secondary.main' }} />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Consultant DPR
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    By External Consultants
                  </Typography>
                </Box>
                {selectedMode === 'consultant' && (
                  <CheckCircle sx={{ color: 'success.main', ml: 'auto' }} />
                )}
              </Stack>

              <Stack spacing={1} mb={2}>
                {consultantAdvantages.slice(0, 3).map((advantage, index) => (
                  <Stack key={index} direction="row" alignItems="center" spacing={1}>
                    <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="body2">{advantage}</Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Timeline</Typography>
                  <Typography variant="caption" fontWeight={600}>30-45 days</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Est. Cost</Typography>
                  <Typography variant="caption" fontWeight={600}>₹40-60 Lakhs</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">Resources</Typography>
                  <Typography variant="caption" fontWeight={600}>External team</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Detailed Comparison */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Mode Comparison Analysis
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<CompareArrows />}
            onClick={() => setShowDetailedComparison(!showDetailedComparison)}
          >
            {showDetailedComparison ? 'Hide' : 'Show'} Details
          </Button>
        </Stack>

        {showDetailedComparison && (
          <Box>
            <Stack spacing={2}>
              {comparisonData.map((item, index) => (
                <Box key={index}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body2" fontWeight={600} sx={{ width: 150 }}>
                      {item.criteria}
                    </Typography>
                    <Box
                      sx={{
                        flex: 1,
                        p: 1,
                        borderRadius: 1,
                        bgcolor: item.winner === 'inhouse' ? alpha(theme.palette.primary.main, 0.1) : 'grey.100',
                        border: item.winner === 'inhouse' ? `1px solid ${theme.palette.primary.main}` : '1px solid #e0e0e0'
                      }}
                    >
                      <Typography variant="body2">{item.inhouse}</Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        p: 1,
                        borderRadius: 1,
                        bgcolor: item.winner === 'consultant' ? alpha(theme.palette.secondary.main, 0.1) : 'grey.100',
                        border: item.winner === 'consultant' ? `1px solid ${theme.palette.secondary.main}` : '1px solid #e0e0e0'
                      }}
                    >
                      <Typography variant="body2">{item.consultant}</Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Paper>

      {/* Hybrid Mode Option */}
      <Accordion defaultExpanded={recommendation === 'hybrid'}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Assessment sx={{ color: 'warning.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Hybrid Mode Configuration
            </Typography>
            {recommendation === 'hybrid' && (
              <Chip label="Recommended" color="warning" size="small" />
            )}
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Alert severity="info" sx={{ mb: 2 }}>
            Optimize by assigning specific DPR components to in-house or consultant teams based on expertise and availability.
          </Alert>

          <FormGroup>
            <Stack spacing={2}>
              {Object.entries(hybridOptions).map(([key, value]) => (
                <Stack key={key} direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" fontWeight={500}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="caption" color={value === 'inhouse' ? 'primary.main' : 'text.secondary'}>
                      In-house
                    </Typography>
                    <Switch
                      checked={value === 'consultant'}
                      onChange={(e) => setHybridOptions({
                        ...hybridOptions,
                        [key]: e.target.checked ? 'consultant' : 'inhouse'
                      })}
                      color="secondary"
                    />
                    <Typography variant="caption" color={value === 'consultant' ? 'secondary.main' : 'text.secondary'}>
                      Consultant
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </FormGroup>

          <Box mt={3} p={2} bgcolor="grey.50" borderRadius={1}>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>
              Hybrid Mode Summary
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">
                Estimated Timeline
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                35-50 days
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">
                Estimated Cost
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                ₹25-40 Lakhs
              </Typography>
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Action Section */}
      {selectedMode && (
        <Paper sx={{ p: 3, mt: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Next Steps for {selectedMode === 'inhouse' ? 'In-house' : 'Consultant'} DPR
          </Typography>

          {selectedMode === 'consultant' && (
            <TextField
              fullWidth
              label="Consultant Budget Allocation"
              value={consultantBudget}
              onChange={(e) => setConsultantBudget(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                endAdornment: <InputAdornment position="end">Lakhs</InputAdornment>,
              }}
            />
          )}

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckCircle />}
              onClick={() => {
                // Handle mode confirmation
                console.log('Mode confirmed:', selectedMode);
              }}
            >
              Confirm Selection
            </Button>
            <Button
              variant="outlined"
              startIcon={<Timeline />}
              onClick={() => {
                // Show timeline
                console.log('Show timeline');
              }}
            >
              View Timeline
            </Button>
            {selectedMode === 'consultant' && (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Business />}
                onClick={() => {
                  // Start consultant selection
                  console.log('Start consultant selection');
                }}
              >
                Select Consultants
              </Button>
            )}
          </Stack>

          {selectedMode === 'inhouse' && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <AlertTitle>Resource Check Required</AlertTitle>
              Please verify team availability before proceeding. Current workload: 87% capacity.
            </Alert>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default DPRModeSelectionScreen;