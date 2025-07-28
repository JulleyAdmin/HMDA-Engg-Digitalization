import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Container,
  Alert,
  Fade
} from '@mui/material';
import {
  ArrowBack,
  OpenInNew,
  CheckCircle,
  RadioButtonUnchecked,
  Description,
  Timeline,
  Engineering,
  Assignment,
  Build,
  TaskAlt,
  Handshake
} from '@mui/icons-material';

interface StageInfo {
  id: number;
  title: string;
  description: string;
  fileName: string;
  icon: React.ElementType;
  color: string;
  requiredFields: number;
  estimatedTime: string;
  status?: 'completed' | 'in-progress' | 'pending';
}

const stages: StageInfo[] = [
  {
    id: 1,
    title: 'Conceptualization & Need Identification',
    description: 'Initial project ideation, need assessment, and preliminary planning',
    fileName: 'stage1-conceptualization.html',
    icon: Description,
    color: '#1e3a8a',
    requiredFields: 25,
    estimatedTime: '15-20 mins'
  },
  {
    id: 2,
    title: 'DPR Preparation & Approvals',
    description: 'Detailed Project Report preparation, review, and approval process',
    fileName: 'stage2-dpr-approvals.html',
    icon: Assignment,
    color: '#059669',
    requiredFields: 30,
    estimatedTime: '20-25 mins'
  },
  {
    id: 3,
    title: 'Tendering Process',
    description: 'Tender preparation, publication, evaluation, and contractor selection',
    fileName: 'stage3-tendering.html',
    icon: Timeline,
    color: '#7c3aed',
    requiredFields: 28,
    estimatedTime: '20-25 mins'
  },
  {
    id: 4,
    title: 'Contract Award & Agreement',
    description: 'Contract finalization, agreement signing, and work order issuance',
    fileName: 'stage4-contract-award.html',
    icon: Handshake,
    color: '#dc2626',
    requiredFields: 22,
    estimatedTime: '15-20 mins'
  },
  {
    id: 5,
    title: 'Execution & Implementation',
    description: 'Project execution, monitoring, and progress tracking',
    fileName: 'stage5-execution.html',
    icon: Build,
    color: '#f59e0b',
    requiredFields: 35,
    estimatedTime: '25-30 mins'
  },
  // Stage 6 and 7 removed per HMDA feedback - not needed
  {
    id: 8,
    title: 'Project Closure & Handover',
    description: 'Project completion, documentation, and handover procedures',
    fileName: 'stage8-project-closure.html',
    icon: TaskAlt,
    color: '#8b5cf6',
    requiredFields: 24,
    estimatedTime: '15-20 mins'
  },
  {
    id: 9,
    title: 'DLP & O&M Phase',
    description: 'Defect Liability Period and Operations & Maintenance management',
    fileName: 'stage9-dlp-om.html',
    icon: Engineering,
    color: '#ec4899',
    requiredFields: 28,
    estimatedTime: '20 mins'
  }
];

interface StageFormsViewProps {
  onBack?: () => void;
}

const StageFormsView: React.FC<StageFormsViewProps> = ({ onBack }) => {
  const [selectedStage, setSelectedStage] = useState<StageInfo | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    // Load completed stages from localStorage
    const saved = localStorage.getItem('hmda-completed-stages');
    if (saved) {
      setCompletedStages(JSON.parse(saved));
    }
  }, []);

  const handleStageSelect = (stage: StageInfo) => {
    setSelectedStage(stage);
    setIframeLoaded(false);
  };

  const handleBack = () => {
    setSelectedStage(null);
  };

  const handleMarkComplete = (stageId: number) => {
    const updated = [...completedStages, stageId];
    setCompletedStages(updated);
    localStorage.setItem('hmda-completed-stages', JSON.stringify(updated));
  };

  const handleOpenInNewTab = () => {
    if (selectedStage) {
      window.open(`/hmda-stage-forms/${selectedStage.fileName}`, '_blank');
    }
  };

  const getStageStatus = (stageId: number): 'completed' | 'in-progress' | 'pending' => {
    if (completedStages.includes(stageId)) return 'completed';
    // Find the next stage to complete
    const stageIds = stages.map(s => s.id).sort((a, b) => a - b);
    const nextStageIndex = stageIds.findIndex(id => !completedStages.includes(id));
    if (nextStageIndex !== -1 && stageIds[nextStageIndex] === stageId) return 'in-progress';
    return 'pending';
  };

  const completionPercentage = (completedStages.length / stages.length) * 100;

  if (selectedStage) {
    return (
      <Box sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={handleBack}>
                <ArrowBack />
              </IconButton>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Stage {selectedStage.id}: {selectedStage.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedStage.description}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<OpenInNew />}
                onClick={handleOpenInNewTab}
                size="small"
              >
                Open in New Tab
              </Button>
              {!completedStages.includes(selectedStage.id) && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircle />}
                  onClick={() => handleMarkComplete(selectedStage.id)}
                  size="small"
                >
                  Mark as Complete
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Loading indicator */}
        {!iframeLoaded && (
          <Box sx={{ width: '100%', mb: 2 }}>
            <LinearProgress />
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Loading form...
            </Typography>
          </Box>
        )}

        {/* Iframe */}
        <Box sx={{ flex: 1, bgcolor: 'background.default', borderRadius: 2, overflow: 'hidden' }}>
          <iframe
            src={`/hmda-stage-forms/${selectedStage.fileName}`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: iframeLoaded ? 'block' : 'none'
            }}
            onLoad={() => setIframeLoaded(true)}
            title={selectedStage.title}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Project Stage Input Forms
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Complete comprehensive data input forms for each stage of the project lifecycle. 
          These forms capture all essential information required for HMDA project management.
        </Typography>
        
        {/* Progress Overview */}
        <Paper sx={{ p: 3, mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Overall Progress
            </Typography>
            <Chip 
              label={`${completedStages.length} of ${stages.length} Stages Completed`}
              color={completionPercentage === 100 ? 'success' : 'primary'}
              icon={completionPercentage === 100 ? <CheckCircle /> : <RadioButtonUnchecked />}
            />
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={completionPercentage} 
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {completionPercentage.toFixed(0)}% Complete
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estimated total time: 2-3 hours
            </Typography>
          </Box>
        </Paper>

        {/* Info Alert */}
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            Each form includes an integrated feedback system. You can provide feedback on individual fields, 
            suggest improvements, or report issues directly within the forms.
          </Typography>
        </Alert>
      </Box>

      {/* Stage Cards Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
        {stages.map((stage) => {
          const status = getStageStatus(stage.id);
          const StageIcon = stage.icon;
          
          return (
            <Box key={stage.id}>
              <Fade in timeout={300 + stage.id * 100}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: status === 'in-progress' ? 2 : 1,
                    borderColor: status === 'in-progress' ? 'primary.main' : 'divider',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    }
                  }}
                  onClick={() => handleStageSelect(stage)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: 48, 
                          height: 48, 
                          borderRadius: 2,
                          bgcolor: `${stage.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <StageIcon sx={{ color: stage.color, fontSize: 28 }} />
                      </Box>
                      <Chip 
                        label={`Stage ${stage.id}`}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {stage.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {stage.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        📋 {stage.requiredFields} fields
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ⏱️ {stage.estimatedTime}
                      </Typography>
                    </Box>
                  </CardContent>
                  
                  <CardActions>
                    <Box sx={{ width: '100%', px: 1, pb: 1 }}>
                      {status === 'completed' && (
                        <Chip 
                          label="Completed" 
                          color="success" 
                          size="small" 
                          icon={<CheckCircle />}
                          sx={{ width: '100%' }}
                        />
                      )}
                      {status === 'in-progress' && (
                        <Chip 
                          label="Start Here" 
                          color="primary" 
                          size="small" 
                          sx={{ width: '100%' }}
                        />
                      )}
                      {status === 'pending' && (
                        <Chip 
                          label="Pending" 
                          variant="outlined" 
                          size="small" 
                          sx={{ width: '100%' }}
                        />
                      )}
                    </Box>
                  </CardActions>
                </Card>
              </Fade>
            </Box>
          );
        })}
      </Box>

      {/* Help Section */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          How to Use Stage Forms
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              1. Sequential Completion
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Complete forms in order from Stage 1 to Stage 9 for best results. Each stage builds upon the previous one.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              2. Save Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Forms automatically save your progress locally. You can return to any form later to complete or update it.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              3. Provide Feedback
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use the integrated feedback system to suggest improvements or report issues with any field in the forms.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default StageFormsView;