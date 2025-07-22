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
  Badge,
  LinearProgress,
  useTheme,
  alpha,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Avatar,
  Divider,
  Menu,
  MenuItem
} from '@mui/material';
import {
  ReportProblem,
  Warning,
  Error,
  CheckCircle,
  Schedule,
  Person,
  Search,
  FilterList,
  MoreVert,
  Add,
  Assignment,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';
import { HMDAProject } from '../../../types/Project';

interface Issue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category: 'technical' | 'financial' | 'regulatory' | 'resource' | 'environmental' | 'other';
  assignee: string;
  reporter: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags: string[];
  impact: 'blocking' | 'major' | 'minor';
}

interface IssuesViewProps {
  project: HMDAProject;
}

const IssuesView: React.FC<IssuesViewProps> = ({ project }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);

  // Mock issues data - in real app this would come from API
  const issues: Issue[] = [
    {
      id: 'ISS-001',
      title: 'Delayed approval from Environment Department',
      description: 'Environmental clearance is pending for 15 days beyond the expected timeline. This is blocking the foundation work.',
      severity: 'critical',
      status: 'open',
      category: 'regulatory',
      assignee: 'Rajesh Kumar',
      reporter: 'Site Engineer',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      dueDate: new Date('2024-01-25'),
      tags: ['environment', 'approval', 'blocking'],
      impact: 'blocking'
    },
    {
      id: 'ISS-002',
      title: 'Concrete quality issues in Pier P-15',
      description: 'Concrete compressive strength test failed for Pier P-15. Cube test results show 20% lower strength than specified.',
      severity: 'high',
      status: 'in-progress',
      category: 'technical',
      assignee: 'Quality Engineer',
      reporter: 'Lab Technician',
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-21'),
      dueDate: new Date('2024-01-28'),
      tags: ['quality', 'concrete', 'pier'],
      impact: 'major'
    },
    {
      id: 'ISS-003',
      title: 'Budget variance in steel procurement',
      description: 'Steel prices have increased by 12% compared to DPR estimates. Additional budget approval required.',
      severity: 'medium',
      status: 'open',
      category: 'financial',
      assignee: 'Project Manager',
      reporter: 'Procurement Team',
      createdAt: new Date('2024-01-19'),
      updatedAt: new Date('2024-01-19'),
      tags: ['budget', 'steel', 'procurement'],
      impact: 'major'
    },
    {
      id: 'ISS-004',
      title: 'Safety incident near crane operation',
      description: 'Minor safety incident reported. Worker safety protocols need to be reinforced.',
      severity: 'medium',
      status: 'resolved',
      category: 'other',
      assignee: 'Safety Officer',
      reporter: 'Site Supervisor',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-17'),
      tags: ['safety', 'crane', 'incident'],
      impact: 'minor'
    },
    {
      id: 'ISS-005',
      title: 'Shortage of skilled welders',
      description: 'Need 8 additional certified welders for girder installation work. Current team insufficient.',
      severity: 'high',
      status: 'open',
      category: 'resource',
      assignee: 'HR Manager',
      reporter: 'Construction Manager',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-20'),
      dueDate: new Date('2024-02-01'),
      tags: ['welders', 'resource', 'girder'],
      impact: 'major'
    }
  ];

  const filteredIssues = useMemo(() => {
    let filtered = issues;
    
    if (searchTerm) {
      filtered = filtered.filter(issue =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    const statusFilters = ['all', 'open', 'in-progress', 'resolved'];
    if (activeTab > 0) {
      const status = statusFilters[activeTab];
      if (status !== 'all') {
        filtered = filtered.filter(issue => issue.status === status);
      }
    }

    return filtered;
  }, [issues, searchTerm, activeTab]);

  const issueStats = useMemo(() => {
    const stats = {
      total: issues.length,
      open: issues.filter(i => i.status === 'open').length,
      inProgress: issues.filter(i => i.status === 'in-progress').length,
      resolved: issues.filter(i => i.status === 'resolved').length,
      critical: issues.filter(i => i.severity === 'critical').length,
      overdue: issues.filter(i => i.dueDate && new Date() > i.dueDate && i.status !== 'resolved').length
    };
    return stats;
  }, [issues]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return theme.palette.error.main;
      case 'high': return theme.palette.warning.main;
      case 'medium': return theme.palette.info.main;
      case 'low': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };

  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' => {
    switch (status) {
      case 'open': return 'error';
      case 'in-progress': return 'primary';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <Error />;
      case 'high': return <Warning />;
      case 'medium': return <ReportProblem />;
      case 'low': return <CheckCircle />;
      default: return <ReportProblem />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
  };

  const isOverdue = (issue: Issue) => {
    return issue.dueDate && new Date() > issue.dueDate && issue.status !== 'resolved';
  };

  return (
    <Box>
      {/* Header with Stats */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight={600}>
          Issues & Impediments
        </Typography>
        <Button variant="contained" size="small" startIcon={<Add />}>
          New Issue
        </Button>
      </Stack>

      {/* Stats Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 120 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack alignItems="center" spacing={1}>
              <Typography variant="h4" fontWeight={600} color="primary.main">
                {issueStats.total}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Issues
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 120 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack alignItems="center" spacing={1}>
              <Badge badgeContent={issueStats.critical} color="error">
                <Typography variant="h4" fontWeight={600} color="error.main">
                  {issueStats.open}
                </Typography>
              </Badge>
              <Typography variant="caption" color="text.secondary">
                Open Issues
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 120 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack alignItems="center" spacing={1}>
              <Typography variant="h4" fontWeight={600} color="primary.main">
                {issueStats.inProgress}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                In Progress
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 120 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack alignItems="center" spacing={1}>
              <Typography variant="h4" fontWeight={600} color="success.main">
                {issueStats.resolved}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Resolved
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        {issueStats.overdue > 0 && (
          <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 120, borderColor: 'warning.main' }}>
            <CardContent sx={{ p: 2 }}>
              <Stack alignItems="center" spacing={1}>
                <Typography variant="h4" fontWeight={600} color="warning.main">
                  {issueStats.overdue}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Overdue
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Search and Filters */}
      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          placeholder="Search issues..."
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
          onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
        >
          Filter
        </Button>
        <Menu
          anchorEl={filterMenuAnchor}
          open={Boolean(filterMenuAnchor)}
          onClose={() => setFilterMenuAnchor(null)}
        >
          <MenuItem>By Severity</MenuItem>
          <MenuItem>By Category</MenuItem>
          <MenuItem>By Assignee</MenuItem>
          <MenuItem>By Due Date</MenuItem>
        </Menu>
      </Stack>

      {/* Status Tabs */}
      <Tabs 
        value={activeTab} 
        onChange={(_, value) => setActiveTab(value)}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        <Tab label={`All (${issueStats.total})`} />
        <Tab label={`Open (${issueStats.open})`} />
        <Tab label={`In Progress (${issueStats.inProgress})`} />
        <Tab label={`Resolved (${issueStats.resolved})`} />
      </Tabs>

      {/* Issues List */}
      <Card>
        <List>
          {filteredIssues.map((issue, index) => (
            <React.Fragment key={issue.id}>
              <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                <ListItemIcon>
                  <Avatar 
                    sx={{ 
                      bgcolor: alpha(getSeverityColor(issue.severity), 0.1),
                      color: getSeverityColor(issue.severity),
                      width: 40,
                      height: 40
                    }}
                  >
                    {getSeverityIcon(issue.severity)}
                  </Avatar>
                </ListItemIcon>
                
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={2} alignItems="flex-start" mb={1}>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ flex: 1 }}>
                        {issue.title}
                        {isOverdue(issue) && (
                          <Chip 
                            label="OVERDUE" 
                            color="error" 
                            size="small" 
                            sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                          />
                        )}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {issue.id}
                      </Typography>
                    </Stack>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        {issue.description}
                      </Typography>
                      
                      <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center" mb={1}>
                        <Chip 
                          label={issue.severity.toUpperCase()} 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha(getSeverityColor(issue.severity), 0.1),
                            color: getSeverityColor(issue.severity),
                            fontWeight: 600
                          }}
                        />
                        <Chip 
                          label={issue.status.replace('-', ' ').toUpperCase()} 
                          color={getStatusColor(issue.status)}
                          size="small" 
                        />
                        <Chip 
                          label={issue.category} 
                          variant="outlined" 
                          size="small" 
                        />
                        {issue.tags.map((tag) => (
                          <Chip 
                            key={tag}
                            label={tag} 
                            variant="outlined" 
                            size="small"
                            sx={{ fontSize: '0.7rem', height: 20 }}
                          />
                        ))}
                      </Stack>

                      <Stack direction="row" spacing={3} alignItems="center">
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {issue.assignee}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            Created: {formatDate(issue.createdAt)}
                          </Typography>
                        </Stack>
                        {issue.dueDate && (
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Assignment sx={{ fontSize: 16, color: isOverdue(issue) ? 'error.main' : 'text.secondary' }} />
                            <Typography 
                              variant="caption" 
                              color={isOverdue(issue) ? 'error.main' : 'text.secondary'}
                            >
                              Due: {formatDate(issue.dueDate)}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Box>
                  }
                />

                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <MoreVert />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < filteredIssues.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        {filteredIssues.length === 0 && (
          <Box p={4} textAlign="center">
            <Typography variant="body1" color="text.secondary">
              No issues found matching your criteria.
            </Typography>
          </Box>
        )}
      </Card>

      {/* Resolution Rate Progress */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={600}>
              Resolution Progress
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
              <Typography variant="caption" color="success.main" fontWeight={600}>
                +12% this month
              </Typography>
            </Stack>
          </Stack>
          
          <Box mb={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2">
                Issues Resolved
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {issueStats.resolved} / {issueStats.total} ({Math.round((issueStats.resolved / issueStats.total) * 100)}%)
              </Typography>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={(issueStats.resolved / issueStats.total) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          <Typography variant="caption" color="text.secondary">
            Target: 85% resolution rate within 30 days
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default IssuesView;