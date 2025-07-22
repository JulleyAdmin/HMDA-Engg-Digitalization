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
  Avatar,
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
  LinearProgress,
  Badge,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  People,
  Person,
  Business,
  Group,
  Phone,
  Email,
  WhatsApp,
  VideoCall,
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentVerySatisfied,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle,
  Schedule,
  Notifications,
  Assignment,
  ExpandMore,
  Download,
  Forum
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { HMDAProject } from '../../../types/Project';

interface Stakeholder {
  id: string;
  name: string;
  designation: string;
  organization: string;
  type: 'internal' | 'external' | 'contractor' | 'consultant' | 'regulatory';
  role: 'decision-maker' | 'influencer' | 'implementer' | 'beneficiary';
  influence: 'high' | 'medium' | 'low';
  interest: 'high' | 'medium' | 'low';
  sentiment: 'very-positive' | 'positive' | 'neutral' | 'negative' | 'very-negative';
  lastContact: Date;
  nextEngagement: Date;
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  concerns: string[];
  expectations: string[];
  engagementFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  communicationPreference: 'meeting' | 'call' | 'email' | 'whatsapp';
}

interface Engagement {
  id: string;
  stakeholderId: string;
  type: 'meeting' | 'call' | 'email' | 'site-visit' | 'presentation' | 'report';
  title: string;
  date: Date;
  duration?: number;
  outcome: 'positive' | 'neutral' | 'concerning';
  actionItems: string[];
  followUp?: Date;
  notes: string;
}

interface StakeholderViewProps {
  project: HMDAProject;
}

const StakeholderView: React.FC<StakeholderViewProps> = ({ project }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  // Mock stakeholder data
  const stakeholders: Stakeholder[] = [
    {
      id: 'STK-001',
      name: 'B. Ravinder',
      designation: 'Chief Engineer',
      organization: 'HMDA',
      type: 'internal',
      role: 'decision-maker',
      influence: 'high',
      interest: 'high',
      sentiment: 'positive',
      lastContact: new Date('2024-01-20'),
      nextEngagement: new Date('2024-01-25'),
      contact: {
        phone: '9849909792',
        email: 'ce@hmda.gov.in',
        whatsapp: '9849909792'
      },
      concerns: ['Timeline adherence', 'Quality standards', 'Budget overruns'],
      expectations: ['Monthly progress reviews', 'Quality assurance reports', 'Timely completion'],
      engagementFrequency: 'weekly',
      communicationPreference: 'meeting'
    },
    {
      id: 'STK-002',
      name: 'Rajesh Kumar',
      designation: 'Deputy Chief Engineer',
      organization: 'HMDA - Roads Division',
      type: 'internal',
      role: 'implementer',
      influence: 'high',
      interest: 'high',
      sentiment: 'very-positive',
      lastContact: new Date('2024-01-21'),
      nextEngagement: new Date('2024-01-24'),
      contact: {
        phone: '9876543210',
        email: 'dce.roads@hmda.gov.in'
      },
      concerns: ['Technical compliance', 'Resource allocation'],
      expectations: ['Technical support', 'Regular coordination'],
      engagementFrequency: 'weekly',
      communicationPreference: 'call'
    },
    {
      id: 'STK-003',
      name: 'Dr. Priya Sharma',
      designation: 'Metropolitan Commissioner',
      organization: 'HMDA',
      type: 'internal',
      role: 'decision-maker',
      influence: 'high',
      interest: 'medium',
      sentiment: 'neutral',
      lastContact: new Date('2024-01-10'),
      nextEngagement: new Date('2024-02-01'),
      contact: {
        phone: '9123456789',
        email: 'commissioner@hmda.gov.in'
      },
      concerns: ['Public impact', 'Financial oversight', 'Policy compliance'],
      expectations: ['Quarterly reviews', 'Public consultation reports'],
      engagementFrequency: 'monthly',
      communicationPreference: 'meeting'
    },
    {
      id: 'STK-004',
      name: 'M/s ABC Construction Ltd',
      designation: 'Project Contractor',
      organization: 'ABC Construction Ltd',
      type: 'contractor',
      role: 'implementer',
      influence: 'medium',
      interest: 'high',
      sentiment: 'positive',
      lastContact: new Date('2024-01-22'),
      nextEngagement: new Date('2024-01-23'),
      contact: {
        phone: '9988776655',
        email: 'pm@abcconstruction.com',
        whatsapp: '9988776655'
      },
      concerns: ['Payment delays', 'Material availability', 'Weather conditions'],
      expectations: ['Timely payments', 'Clear specifications', 'Site support'],
      engagementFrequency: 'daily',
      communicationPreference: 'whatsapp'
    },
    {
      id: 'STK-005',
      name: 'Citizens Forum - Kondapur',
      designation: 'Community Representatives',
      organization: 'Local Community',
      type: 'external',
      role: 'beneficiary',
      influence: 'medium',
      interest: 'high',
      sentiment: 'negative',
      lastContact: new Date('2024-01-15'),
      nextEngagement: new Date('2024-01-30'),
      contact: {
        phone: '9876543211',
        email: 'kondapurforum@gmail.com'
      },
      concerns: ['Traffic disruption', 'Noise pollution', 'Dust control', 'Timeline'],
      expectations: ['Regular updates', 'Grievance redressal', 'Compensation for inconvenience'],
      engagementFrequency: 'monthly',
      communicationPreference: 'meeting'
    }
  ];

  const engagements: Engagement[] = [
    {
      id: 'ENG-001',
      stakeholderId: 'STK-001',
      type: 'meeting',
      title: 'Monthly Progress Review',
      date: new Date('2024-01-20'),
      duration: 120,
      outcome: 'positive',
      actionItems: ['Accelerate pier construction', 'Submit updated timeline'],
      followUp: new Date('2024-01-25'),
      notes: 'CE satisfied with overall progress. Emphasized quality over speed.'
    },
    {
      id: 'ENG-002',
      stakeholderId: 'STK-004',
      type: 'site-visit',
      title: 'Weekly Site Coordination',
      date: new Date('2024-01-22'),
      duration: 60,
      outcome: 'concerning',
      actionItems: ['Address material quality issues', 'Provide additional QC support'],
      followUp: new Date('2024-01-23'),
      notes: 'Contractor raised concerns about steel quality approval delays.'
    },
    {
      id: 'ENG-003',
      stakeholderId: 'STK-005',
      type: 'meeting',
      title: 'Community Grievance Session',
      date: new Date('2024-01-15'),
      duration: 90,
      outcome: 'concerning',
      actionItems: ['Implement dust control measures', 'Provide traffic management plan'],
      followUp: new Date('2024-01-30'),
      notes: 'Community expressed frustration with traffic disruption. Need better communication.'
    }
  ];

  const stakeholderMetrics = useMemo(() => {
    const totalStakeholders = stakeholders.length;
    const highInfluence = stakeholders.filter(s => s.influence === 'high').length;
    const satisfiedStakeholders = stakeholders.filter(s => 
      s.sentiment === 'positive' || s.sentiment === 'very-positive'
    ).length;
    const concernedStakeholders = stakeholders.filter(s => 
      s.sentiment === 'negative' || s.sentiment === 'very-negative'
    ).length;
    
    const engagementScore = Math.round((satisfiedStakeholders / totalStakeholders) * 100);
    const overdueEngagements = stakeholders.filter(s => 
      new Date() > s.nextEngagement
    ).length;

    const typeDistribution = stakeholders.reduce((acc, s) => {
      acc[s.type] = (acc[s.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sentimentDistribution = stakeholders.reduce((acc, s) => {
      acc[s.sentiment] = (acc[s.sentiment] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalStakeholders,
      highInfluence,
      satisfiedStakeholders,
      concernedStakeholders,
      engagementScore,
      overdueEngagements,
      typeDistribution,
      sentimentDistribution
    };
  }, [stakeholders]);

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'very-positive': return <SentimentVerySatisfied color="success" />;
      case 'positive': return <SentimentSatisfied color="success" />;
      case 'neutral': return <SentimentNeutral color="warning" />;
      case 'negative': return <SentimentDissatisfied color="error" />;
      case 'very-negative': return <SentimentVeryDissatisfied color="error" />;
      default: return <SentimentNeutral />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'very-positive':
      case 'positive': return theme.palette.success.main;
      case 'neutral': return theme.palette.warning.main;
      case 'negative':
      case 'very-negative': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'high': return theme.palette.error.main;
      case 'medium': return theme.palette.warning.main;
      case 'low': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };

  const getInterestColor = (interest: string) => {
    switch (interest) {
      case 'high': return theme.palette.primary.main;
      case 'medium': return theme.palette.info.main;
      case 'low': return theme.palette.grey[500];
      default: return theme.palette.grey[500];
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    });
  };

  const pieData = Object.entries(stakeholderMetrics.sentimentDistribution).map(([sentiment, count]) => ({
    name: sentiment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    value: count,
    color: getSentimentColor(sentiment)
  }));

  const engagementTrendData = [
    { month: 'Oct', satisfaction: 78, concerns: 22 },
    { month: 'Nov', satisfaction: 82, concerns: 18 },
    { month: 'Dec', satisfaction: 75, concerns: 25 },
    { month: 'Jan', satisfaction: stakeholderMetrics.engagementScore, concerns: Math.round((stakeholderMetrics.concernedStakeholders / stakeholderMetrics.totalStakeholders) * 100) }
  ];

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight={600}>
          Stakeholder Engagement Matrix
        </Typography>
        <Button variant="contained" size="small" startIcon={<Download />}>
          Engagement Report
        </Button>
      </Stack>

      {/* Overview Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 140 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Total Stakeholders
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', width: 32, height: 32 }}>
                  <People sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600}>
                {stakeholderMetrics.totalStakeholders}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 140 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Engagement Score
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', width: 32, height: 32 }}>
                  <TrendingUp sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600} color="success.main">
                {stakeholderMetrics.engagementScore}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={stakeholderMetrics.engagementScore}
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
                  High Influence
                </Typography>
                <Avatar sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: 'error.main', width: 32, height: 32 }}>
                  <Badge badgeContent={stakeholderMetrics.highInfluence} color="error">
                    <Group sx={{ fontSize: 18 }} />
                  </Badge>
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600}>
                {stakeholderMetrics.highInfluence}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: '1 1 150px', minWidth: 140 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Overdue Follow-ups
                </Typography>
                <Avatar sx={{ 
                  bgcolor: alpha(stakeholderMetrics.overdueEngagements > 0 ? theme.palette.warning.main : theme.palette.success.main, 0.1), 
                  color: stakeholderMetrics.overdueEngagements > 0 ? 'warning.main' : 'success.main', 
                  width: 32, 
                  height: 32 
                }}>
                  <Schedule sx={{ fontSize: 18 }} />
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={600} color={stakeholderMetrics.overdueEngagements > 0 ? 'warning.main' : 'success.main'}>
                {stakeholderMetrics.overdueEngagements}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tab label="Matrix" />
        <Tab label="Directory" />
        <Tab label="Engagements" />
        <Tab label="Analysis" />
      </Tabs>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box display="flex" flexWrap="wrap" gap={3}>
          {/* Stakeholder Matrix */}
          <Card sx={{ flex: '1 1 600px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Influence vs Interest Matrix
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {stakeholders.map((stakeholder) => (
                  <Box key={stakeholder.id}>
                    <Tooltip title={`${stakeholder.name} - ${stakeholder.designation}`}>
                      <Card 
                        sx={{ 
                          p: 1, 
                          minWidth: 120,
                          borderColor: getInfluenceColor(stakeholder.influence),
                          bgcolor: alpha(getInterestColor(stakeholder.interest), 0.1)
                        }}
                        variant="outlined"
                      >
                        <Stack alignItems="center" spacing={1}>
                          <Avatar sx={{ bgcolor: getSentimentColor(stakeholder.sentiment), width: 32, height: 32 }}>
                            {stakeholder.type === 'internal' ? <Person /> : <Business />}
                          </Avatar>
                          <Typography variant="caption" textAlign="center" fontWeight={600}>
                            {stakeholder.name.split(' ')[0]}
                          </Typography>
                          <Stack direction="row" spacing={0.5}>
                            <Chip 
                              label={stakeholder.influence[0].toUpperCase()} 
                              size="small" 
                              sx={{ 
                                bgcolor: getInfluenceColor(stakeholder.influence),
                                color: 'white',
                                fontSize: '0.6rem',
                                height: 16
                              }}
                            />
                            <Chip 
                              label={stakeholder.interest[0].toUpperCase()} 
                              size="small" 
                              sx={{ 
                                bgcolor: getInterestColor(stakeholder.interest),
                                color: 'white',
                                fontSize: '0.6rem',
                                height: 16
                              }}
                            />
                          </Stack>
                        </Stack>
                      </Card>
                    </Tooltip>
                  </Box>
                ))}
              </Box>
              <Box mt={2}>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 12, height: 12, bgcolor: theme.palette.error.main, borderRadius: '50%' }} />
                    <Typography variant="caption">High Influence</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 12, height: 12, bgcolor: theme.palette.warning.main, borderRadius: '50%' }} />
                    <Typography variant="caption">Medium Influence</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 12, height: 12, bgcolor: theme.palette.success.main, borderRadius: '50%' }} />
                    <Typography variant="caption">Low Influence</Typography>
                  </Stack>
                </Stack>
              </Box>
            </CardContent>
          </Card>

          {/* Sentiment Distribution */}
          <Card sx={{ flex: '1 1 300px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Sentiment Distribution
              </Typography>
              <Box height={250}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Stakeholder Directory
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Stakeholder</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Influence/Interest</TableCell>
                    <TableCell>Sentiment</TableCell>
                    <TableCell>Last Contact</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stakeholders.map((stakeholder) => (
                    <TableRow key={stakeholder.id}>
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar sx={{ bgcolor: getSentimentColor(stakeholder.sentiment) }}>
                            {stakeholder.type === 'internal' ? <Person /> : <Business />}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {stakeholder.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {stakeholder.designation}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                              {stakeholder.organization}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack spacing={0.5}>
                          <Chip 
                            label={stakeholder.role.replace('-', ' ')} 
                            size="small" 
                            variant="outlined"
                          />
                          <Chip 
                            label={stakeholder.type} 
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Chip 
                            label={`${stakeholder.influence} influence`}
                            size="small"
                            sx={{ bgcolor: alpha(getInfluenceColor(stakeholder.influence), 0.1) }}
                          />
                          <Chip 
                            label={`${stakeholder.interest} interest`}
                            size="small"
                            sx={{ bgcolor: alpha(getInterestColor(stakeholder.interest), 0.1) }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {getSentimentIcon(stakeholder.sentiment)}
                          <Typography variant="caption">
                            {stakeholder.sentiment.replace('-', ' ')}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack>
                          <Typography variant="body2">
                            {formatDate(stakeholder.lastContact)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Next: {formatDate(stakeholder.nextEngagement)}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small">
                            <Phone />
                          </IconButton>
                          <IconButton size="small">
                            <Email />
                          </IconButton>
                          {stakeholder.contact.whatsapp && (
                            <IconButton size="small">
                              <WhatsApp />
                            </IconButton>
                          )}
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
          {engagements.map((engagement) => {
            const stakeholder = stakeholders.find(s => s.id === engagement.stakeholderId);
            return (
              <Accordion key={engagement.id} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', mr: 2 }}>
                    <Typography variant="body1" fontWeight={600} sx={{ flex: 1 }}>
                      {engagement.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        {stakeholder?.name}
                      </Typography>
                      <Chip 
                        label={engagement.outcome} 
                        size="small"
                        color={engagement.outcome === 'positive' ? 'success' : engagement.outcome === 'concerning' ? 'warning' : 'default'}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(engagement.date)}
                      </Typography>
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
                          <strong>Type:</strong> {engagement.type}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Duration:</strong> {engagement.duration} minutes
                        </Typography>
                        <Typography variant="body2">
                          <strong>Follow-up:</strong> {engagement.followUp ? formatDate(engagement.followUp) : 'None scheduled'}
                        </Typography>
                      </Stack>
                    </Box>
                    <Box flex="1 1 300px">
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Notes & Action Items
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {engagement.notes}
                      </Typography>
                      {engagement.actionItems.length > 0 && (
                        <>
                          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                            Action Items
                          </Typography>
                          <List dense>
                            {engagement.actionItems.map((item, idx) => (
                              <ListItem key={idx}>
                                <ListItemIcon>
                                  <Assignment sx={{ fontSize: 16 }} />
                                </ListItemIcon>
                                <ListItemText primary={item} />
                              </ListItem>
                            ))}
                          </List>
                        </>
                      )}
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      )}

      {activeTab === 3 && (
        <Box display="flex" flexWrap="wrap" gap={3}>
          <Card sx={{ flex: '1 1 400px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Engagement Trends
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="satisfaction" 
                      stroke={theme.palette.success.main} 
                      strokeWidth={3}
                      name="Satisfaction %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="concerns" 
                      stroke={theme.palette.error.main} 
                      strokeWidth={3}
                      name="Concerns %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: '1 1 300px' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Key Insights
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="success.main" fontWeight={600}>
                    Strong Internal Support
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    80% of internal stakeholders show positive sentiment
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="warning.main" fontWeight={600}>
                    Community Concerns
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Local community sentiment needs attention - focus on communication
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="info.main" fontWeight={600}>
                    Contractor Relationship
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Positive but requires regular engagement on technical issues
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default StakeholderView;