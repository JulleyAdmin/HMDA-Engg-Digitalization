import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Stack,
  Paper,
  Avatar,
  IconButton,
  Divider,
  FormControlLabel,
  RadioGroup,
  Radio,
  Rating,
  LinearProgress,
  Alert,
  Badge,
  useTheme,
  alpha
} from '@mui/material';
import {
  Person,
  AccountBalance,
  Map,
  Upload,
  Phone,
  Email,
  LocationOn,
  CalendarToday,
  Edit,
  Delete,
  Visibility,
  Add,
  Flag,
  Star,
  Group,
  TrendingUp,
  Assignment,
  AttachFile
} from '@mui/icons-material';
import { HMDAProject } from '../../../../../types/Project';

interface NeedIdentificationScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

interface NeedRequest {
  id: string;
  sourceType: 'citizen_request' | 'government_initiative' | 'master_plan' | 'mla_recommendation';
  category: 'road' | 'bridge' | 'building' | 'park' | 'water' | 'drainage' | 'other';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  location: {
    area: string;
    mandal: string;
    ward?: string;
    gps?: [number, number];
  };
  submittedBy: {
    name: string;
    role: string;
    contact: string;
    email?: string;
  };
  submissionDate: string;
  publicSupport: number; // 1-5 rating
  documents: string[];
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'merged';
}

const NeedIdentificationScreen: React.FC<NeedIdentificationScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  const theme = useTheme();
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);

  // Mock data for need requests
  const needRequests: NeedRequest[] = [
    {
      id: 'NR001',
      sourceType: 'citizen_request',
      category: 'road',
      priority: 'high',
      title: 'Road connectivity to Gachibowli IT Park',
      description: 'Need for 4-lane road connecting residential areas to IT corridor for better traffic flow and reduced commute times.',
      location: {
        area: 'Gachibowli',
        mandal: 'Serilingampally',
        ward: '150',
        gps: [17.4569, 78.3677]
      },
      submittedBy: {
        name: 'Residents Welfare Association',
        role: 'Community Group',
        contact: '+91 98765 43210',
        email: 'gachi.rwa@gmail.com'
      },
      submissionDate: '2024-01-15',
      publicSupport: 4.5,
      documents: ['petition.pdf', 'traffic_survey.pdf', 'photos.zip'],
      status: 'under_review'
    },
    {
      id: 'NR002',
      sourceType: 'mla_recommendation',
      category: 'bridge',
      priority: 'high',
      title: 'Bridge over Musi River at Nagole',
      description: 'Critical bridge infrastructure to connect eastern suburbs with main city, reducing travel time by 45 minutes.',
      location: {
        area: 'Nagole',
        mandal: 'LB Nagar',
        gps: [17.3616, 78.5506]
      },
      submittedBy: {
        name: 'MLA Rajesh Kumar',
        role: 'Elected Representative',
        contact: '+91 94567 89012',
        email: 'mla.rajesh@telangana.gov.in'
      },
      submissionDate: '2024-01-10',
      publicSupport: 4.8,
      documents: ['mla_letter.pdf', 'constituency_survey.pdf'],
      status: 'approved'
    },
    {
      id: 'NR003',
      sourceType: 'master_plan',
      category: 'park',
      priority: 'medium',
      title: 'Urban Park Development - Kukatpally',
      description: 'Development of 15-acre urban park as per HMDA Master Plan 2031 guidelines for green space enhancement.',
      location: {
        area: 'Kukatpally',
        mandal: 'Kukatpally',
        ward: '87'
      },
      submittedBy: {
        name: 'HMDA Planning Department',
        role: 'Government Department',
        contact: '+91 40-2312 4567'
      },
      submissionDate: '2024-01-08',
      publicSupport: 4.2,
      documents: ['master_plan_extract.pdf', 'land_survey.pdf'],
      status: 'submitted'
    }
  ];

  const getSourceTypeLabel = (type: string) => {
    const labels = {
      'citizen_request': 'Citizen Request',
      'government_initiative': 'Government Initiative',
      'master_plan': 'Master Plan',
      'mla_recommendation': 'MLA Recommendation'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getSourceTypeColor = (type: string) => {
    const colors = {
      'citizen_request': 'primary',
      'government_initiative': 'secondary',
      'master_plan': 'info',
      'mla_recommendation': 'warning'
    };
    return colors[type as keyof typeof colors] || 'default';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'road': '🛣️',
      'bridge': '🌉',
      'building': '🏢',
      'park': '🏞️',
      'water': '💧',
      'drainage': '🌊',
      'other': '📋'
    };
    return icons[category as keyof typeof icons] || '📋';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'error',
      'medium': 'warning',
      'low': 'info'
    };
    return colors[priority as keyof typeof colors] || 'default';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'submitted': 'info',
      'under_review': 'warning',
      'approved': 'success',
      'rejected': 'error',
      'merged': 'secondary'
    };
    return colors[status as keyof typeof colors] || 'default';
  };

  return (
    <Box>
      {/* Header Section */}
      <Box mb={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight={700}>
            Need Identification & Source Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowNewRequestForm(true)}
          >
            Add New Request
          </Button>
        </Stack>
        
        <Alert severity="info" sx={{ mb: 2 }}>
          Managing project needs from multiple sources. Current project consolidates {needRequests.length} related requests.
        </Alert>
      </Box>

      {/* Statistics Cards */}
      <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1 }}>
                <Person />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="primary">
                {needRequests.filter(r => r.sourceType === 'citizen_request').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Citizen Requests
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 1 }}>
                <Flag />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="warning.main">
                {needRequests.filter(r => r.sourceType === 'mla_recommendation').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                MLA Recommendations
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'info.main', mx: 'auto', mb: 1 }}>
                <Map />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="info.main">
                {needRequests.filter(r => r.sourceType === 'master_plan').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Master Plan Items
              </Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box flex="1 1 250px">
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 1 }}>
                <Star />
              </Avatar>
              <Typography variant="h4" fontWeight={700} color="success.main">
                4.5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Support Rating
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Need Requests List */}
      <Typography variant="h6" fontWeight={700} mb={2}>
        Related Need Requests
      </Typography>
      
      <Box display="flex" flexWrap="wrap" gap={3}>
        {needRequests.map((request) => (
          <Box flex="1 1 250px">
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[8]
                },
                border: selectedRequest === request.id ? `2px solid ${theme.palette.primary.main}` : '1px solid #e0e0e0'
              }}
              onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
            >
              <CardContent>
                <Stack gap={2}>
                  {/* Request Header */}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1}>
                      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                        <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
                          {getCategoryIcon(request.category)}
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                          {request.title}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {request.description}
                      </Typography>
                    </Box>
                    <IconButton size="small">
                      <Visibility />
                    </IconButton>
                  </Stack>

                  {/* Tags */}
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip 
                      label={getSourceTypeLabel(request.sourceType)}
                      color={getSourceTypeColor(request.sourceType) as any}
                      size="small"
                    />
                    <Chip 
                      label={request.priority.toUpperCase()}
                      color={getPriorityColor(request.priority) as any}
                      size="small"
                    />
                    <Chip 
                      label={request.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(request.status) as any}
                      size="small"
                    />
                  </Stack>

                  {/* Location & Contact */}
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {request.location.area}, {request.location.mandal}
                        {request.location.ward && ` (Ward ${request.location.ward})`}
                      </Typography>
                    </Stack>
                    
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <Group sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {request.submittedBy.name} ({request.submittedBy.role})
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Public Support */}
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        Public Support:
                      </Typography>
                      <Rating 
                        value={request.publicSupport} 
                        readOnly 
                        size="small" 
                        precision={0.1}
                      />
                      <Typography variant="body2" fontWeight={600}>
                        {request.publicSupport}/5
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Documents */}
                  {request.documents.length > 0 && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Documents ({request.documents.length}):
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {request.documents.map((doc, index) => (
                          <Chip
                            key={index}
                            label={doc}
                            size="small"
                            icon={<AttachFile />}
                            variant="outlined"
                            clickable
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/* Action Buttons */}
                  <Stack direction="row" spacing={1} pt={1}>
                    <Button size="small" startIcon={<Edit />}>
                      Edit
                    </Button>
                    <Button size="small" startIcon={<Assignment />}>
                      Merge
                    </Button>
                    {request.status === 'submitted' && (
                      <Button size="small" variant="contained" color="success">
                        Approve
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Selected Request Detail Panel */}
      {selectedRequest && (
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Request Details - {selectedRequest}
          </Typography>
          {/* Detailed view would go here */}
          <Alert severity="info">
            Detailed view for request {selectedRequest} would be implemented here with full form fields, 
            stakeholder consultation history, and approval workflow.
          </Alert>
        </Paper>
      )}
    </Box>
  );
};

export default NeedIdentificationScreen;