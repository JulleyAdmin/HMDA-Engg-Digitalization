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
  useTheme,
  alpha,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Avatar,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Description,
  Folder,
  PictureAsPdf,
  Image,
  VideoLibrary,
  TableChart,
  CloudUpload,
  Download,
  Visibility,
  Edit,
  Delete,
  Share,
  MoreVert,
  Search,
  FilterList,
  Add,
  FolderOpen,
  Security,
  History,
  CheckCircle,
  Schedule,
  ExpandMore,
  Engineering
} from '@mui/icons-material';
import { HMDAProject } from '../../../types/Project';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'video' | 'excel' | 'word' | 'cad' | 'other';
  category: 'technical' | 'legal' | 'financial' | 'quality' | 'safety' | 'progress';
  folder: string;
  size: number;
  uploadedBy: string;
  uploadedDate: Date;
  lastModified: Date;
  version: string;
  status: 'draft' | 'review' | 'approved' | 'archived';
  tags: string[];
  approvedBy?: string;
  description: string;
  isConfidential: boolean;
}

interface DocumentsViewProps {
  project: HMDAProject;
}

const DocumentsView: React.FC<DocumentsViewProps> = ({ project }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  // Mock documents data
  const documents: Document[] = [
    {
      id: 'DOC-001',
      name: 'Detailed Project Report (DPR) - Bridge Construction',
      type: 'pdf',
      category: 'technical',
      folder: 'Project Reports',
      size: 15728640, // 15 MB
      uploadedBy: 'Project Engineer',
      uploadedDate: new Date('2023-12-15'),
      lastModified: new Date('2024-01-10'),
      version: '2.1',
      status: 'approved',
      tags: ['dpr', 'bridge', 'technical'],
      approvedBy: 'Chief Engineer',
      description: 'Comprehensive project report including technical specifications, cost estimates, and timelines.',
      isConfidential: false
    },
    {
      id: 'DOC-002',
      name: 'Structural Drawings - Foundation Details',
      type: 'cad',
      category: 'technical',
      folder: 'Drawings',
      size: 8945152, // 8.5 MB
      uploadedBy: 'Design Engineer',
      uploadedDate: new Date('2024-01-05'),
      lastModified: new Date('2024-01-18'),
      version: '1.3',
      status: 'review',
      tags: ['structural', 'foundation', 'cad'],
      description: 'Detailed structural drawings for pier foundation design.',
      isConfidential: false
    },
    {
      id: 'DOC-003',
      name: 'Environmental Impact Assessment Report',
      type: 'pdf',
      category: 'legal',
      folder: 'Approvals',
      size: 12582912, // 12 MB
      uploadedBy: 'Environmental Consultant',
      uploadedDate: new Date('2023-11-20'),
      lastModified: new Date('2023-12-05'),
      version: '1.0',
      status: 'approved',
      tags: ['environment', 'assessment', 'legal'],
      approvedBy: 'Environmental Officer',
      description: 'Comprehensive environmental impact assessment as per regulatory requirements.',
      isConfidential: true
    },
    {
      id: 'DOC-004',
      name: 'Progress Photos - Week 12',
      type: 'image',
      category: 'progress',
      folder: 'Progress Reports',
      size: 45678912, // 43.5 MB
      uploadedBy: 'Site Engineer',
      uploadedDate: new Date('2024-01-20'),
      lastModified: new Date('2024-01-20'),
      version: '1.0',
      status: 'approved',
      tags: ['progress', 'photos', 'construction'],
      description: 'Weekly progress documentation with photographs from all work fronts.',
      isConfidential: false
    },
    {
      id: 'DOC-005',
      name: 'Quality Test Reports - Concrete & Steel',
      type: 'excel',
      category: 'quality',
      folder: 'Quality Reports',
      size: 2097152, // 2 MB
      uploadedBy: 'Quality Engineer',
      uploadedDate: new Date('2024-01-19'),
      lastModified: new Date('2024-01-21'),
      version: '1.2',
      status: 'draft',
      tags: ['quality', 'testing', 'concrete', 'steel'],
      description: 'Compilation of all quality test results for materials used in construction.',
      isConfidential: false
    },
    {
      id: 'DOC-006',
      name: 'Financial Audit Report - Q3 2023',
      type: 'pdf',
      category: 'financial',
      folder: 'Financial Documents',
      size: 3145728, // 3 MB
      uploadedBy: 'Finance Manager',
      uploadedDate: new Date('2024-01-15'),
      lastModified: new Date('2024-01-15'),
      version: '1.0',
      status: 'review',
      tags: ['finance', 'audit', 'quarterly'],
      description: 'Third quarter financial audit report with expenditure analysis.',
      isConfidential: true
    },
    {
      id: 'DOC-007',
      name: 'Safety Compliance Certificate',
      type: 'pdf',
      category: 'safety',
      folder: 'Safety Documents',
      size: 1048576, // 1 MB
      uploadedBy: 'Safety Officer',
      uploadedDate: new Date('2024-01-17'),
      lastModified: new Date('2024-01-17'),
      version: '1.0',
      status: 'approved',
      tags: ['safety', 'compliance', 'certificate'],
      approvedBy: 'Safety Manager',
      description: 'Safety compliance certificate from authorized inspection agency.',
      isConfidential: false
    }
  ];

  const folders = [
    'Project Reports',
    'Drawings',
    'Approvals',
    'Progress Reports',
    'Quality Reports',
    'Financial Documents',
    'Safety Documents',
    'Contracts',
    'Correspondence'
  ];

  const filteredDocuments = useMemo(() => {
    let filtered = documents;

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedFolder) {
      filtered = filtered.filter(doc => doc.folder === selectedFolder);
    }

    const statusFilters = ['all', 'draft', 'review', 'approved'];
    if (activeTab > 0) {
      const status = statusFilters[activeTab];
      if (status !== 'all') {
        filtered = filtered.filter(doc => doc.status === status);
      }
    }

    return filtered;
  }, [documents, searchTerm, selectedFolder, activeTab]);

  const documentStats = useMemo(() => {
    return {
      total: documents.length,
      draft: documents.filter(d => d.status === 'draft').length,
      review: documents.filter(d => d.status === 'review').length,
      approved: documents.filter(d => d.status === 'approved').length,
      confidential: documents.filter(d => d.isConfidential).length,
      totalSize: documents.reduce((sum, d) => sum + d.size, 0)
    };
  }, [documents]);

  const getFileIcon = (type: string, size: number = 24) => {
    const iconProps = { style: { fontSize: size } };
    switch (type) {
      case 'pdf': return <PictureAsPdf color="error" {...iconProps} />;
      case 'image': return <Image color="primary" {...iconProps} />;
      case 'video': return <VideoLibrary color="secondary" {...iconProps} />;
      case 'excel': return <TableChart color="success" {...iconProps} />;
      case 'cad': return <Engineering color="primary" {...iconProps} />;
      default: return <Description color="action" {...iconProps} />;
    }
  };

  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' => {
    switch (status) {
      case 'draft': return 'default';
      case 'review': return 'warning';
      case 'approved': return 'success';
      case 'archived': return 'info';
      default: return 'default';
    }
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

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
          Document Repository
        </Typography>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<CloudUpload />}
          onClick={() => setUploadDialog(true)}
        >
          Upload Document
        </Button>
      </Stack>

      {/* Stats Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 120 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack alignItems="center" spacing={1}>
              <Typography variant="h4" fontWeight={600} color="primary.main">
                {documentStats.total}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Documents
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 120 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack alignItems="center" spacing={1}>
              <Typography variant="h4" fontWeight={600} color="success.main">
                {documentStats.approved}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Approved
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 120 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack alignItems="center" spacing={1}>
              <Typography variant="h4" fontWeight={600} color="warning.main">
                {documentStats.review}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Under Review
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 120 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack alignItems="center" spacing={1}>
              <Typography variant="h4" fontWeight={600}>
                {formatFileSize(documentStats.totalSize)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Storage
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Search and Filters */}
      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={(e) => setMenuAnchor(e.currentTarget)}
        >
          Filter
        </Button>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem onClick={() => { setSelectedFolder(null); setMenuAnchor(null); }}>
            All Folders
          </MenuItem>
          <Divider />
          {folders.map(folder => (
            <MenuItem key={folder} onClick={() => { setSelectedFolder(folder); setMenuAnchor(null); }}>
              {folder}
            </MenuItem>
          ))}
        </Menu>
      </Stack>

      {/* Status Tabs */}
      <Tabs 
        value={activeTab} 
        onChange={(_, value) => setActiveTab(value)}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        <Tab label={`All (${documentStats.total})`} />
        <Tab label={`Draft (${documentStats.draft})`} />
        <Tab label={`Review (${documentStats.review})`} />
        <Tab label={`Approved (${documentStats.approved})`} />
      </Tabs>

      {/* Documents List */}
      <Box display="flex" flexWrap="wrap" gap={3}>
        {/* Folder Structure */}
        <Card sx={{ flex: '0 0 280px' }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Folders
            </Typography>
            <List dense>
              <ListItem 
                component="div"
                sx={{ cursor: 'pointer', bgcolor: selectedFolder === null ? 'action.selected' : 'transparent' }}
                onClick={() => setSelectedFolder(null)}
              >
                <ListItemIcon>
                  <FolderOpen />
                </ListItemIcon>
                <ListItemText primary="All Documents" />
              </ListItem>
              {folders.map((folder) => (
                <ListItem
                  key={folder}
                  component="div"
                  sx={{ cursor: 'pointer', bgcolor: selectedFolder === folder ? 'action.selected' : 'transparent' }}
                  onClick={() => setSelectedFolder(folder)}
                >
                  <ListItemIcon>
                    <Folder />
                  </ListItemIcon>
                  <ListItemText 
                    primary={folder}
                    secondary={`${documents.filter(d => d.folder === folder).length} files`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {filteredDocuments.length > 0 ? (
            <Box display="flex" flexDirection="column" gap={1}>
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} variant="outlined">
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
                        {getFileIcon(doc.type, 20)}
                      </Avatar>
                      
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                          <Typography variant="subtitle1" fontWeight={600} noWrap>
                            {doc.name}
                            {doc.isConfidential && (
                              <Security sx={{ ml: 1, fontSize: 16, color: 'warning.main' }} />
                            )}
                          </Typography>
                          <IconButton size="small">
                            <MoreVert />
                          </IconButton>
                        </Stack>
                        
                        <Typography variant="body2" color="text.secondary" mb={1} noWrap>
                          {doc.description}
                        </Typography>
                        
                        <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                          <Chip 
                            label={doc.status.toUpperCase()} 
                            color={getStatusColor(doc.status)}
                            size="small"
                          />
                          <Chip 
                            label={doc.category} 
                            variant="outlined" 
                            size="small"
                          />
                          <Chip 
                            label={`v${doc.version}`} 
                            variant="outlined" 
                            size="small"
                          />
                          {doc.tags.map((tag) => (
                            <Chip 
                              key={tag}
                              label={tag} 
                              variant="outlined" 
                              size="small"
                              sx={{ fontSize: '0.7rem', height: 20 }}
                            />
                          ))}
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="caption" color="text.secondary">
                              {formatFileSize(doc.size)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(doc.lastModified)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              by {doc.uploadedBy}
                            </Typography>
                          </Stack>
                          
                          <Stack direction="row" spacing={1}>
                            <IconButton size="small">
                              <Visibility />
                            </IconButton>
                            <IconButton size="small">
                              <Download />
                            </IconButton>
                            <IconButton size="small">
                              <Share />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Card>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No documents found matching your criteria.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>

      {/* Upload Dialog */}
      <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload New Document</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Document Name"
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
            />
            <Stack direction="row" spacing={2}>
              <TextField
                select
                label="Category"
                fullWidth
                defaultValue="technical"
              >
                <MenuItem value="technical">Technical</MenuItem>
                <MenuItem value="legal">Legal</MenuItem>
                <MenuItem value="financial">Financial</MenuItem>
                <MenuItem value="quality">Quality</MenuItem>
                <MenuItem value="safety">Safety</MenuItem>
                <MenuItem value="progress">Progress</MenuItem>
              </TextField>
              <TextField
                select
                label="Folder"
                fullWidth
                defaultValue="Project Reports"
              >
                {folders.map((folder) => (
                  <MenuItem key={folder} value={folder}>
                    {folder}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
              sx={{ p: 3, border: '2px dashed', borderColor: 'primary.main' }}
            >
              Choose File to Upload
              <input type="file" hidden />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setUploadDialog(false)}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentsView;