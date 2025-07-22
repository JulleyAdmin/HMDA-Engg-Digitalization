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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  IconButton,
  TextField,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Alert,
  AlertTitle,
  Tooltip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  LinearProgress
} from '@mui/material';
import {
  Calculate,
  ExpandMore,
  ExpandLess,
  Add,
  Remove,
  Edit,
  Delete,
  FileDownload,
  Upload,
  TrendingUp,
  TrendingDown,
  AttachMoney,
  Assignment,
  Assessment,
  Warning,
  CheckCircle,
  Info,
  Refresh,
  Print,
  Share,
  History,
  CompareArrows
} from '@mui/icons-material';
import { HMDAProject } from '../../../../../types/Project';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface BOQEstimatesScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

interface BOQItem {
  id: string;
  category: string;
  subCategory: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
  variance: number;
  items?: BOQItem[];
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

const BOQEstimatesScreen: React.FC<BOQEstimatesScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BOQItem | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  // Mock BOQ data
  const boqData: BOQItem[] = [
    {
      id: '1',
      category: 'Civil Works',
      subCategory: '',
      description: 'All civil construction works',
      unit: 'LS',
      quantity: 1,
      rate: 0,
      amount: 125000000,
      variance: 5.2,
      items: [
        {
          id: '1.1',
          category: 'Civil Works',
          subCategory: 'Earthwork',
          description: 'Excavation in all types of soil',
          unit: 'CUM',
          quantity: 15000,
          rate: 450,
          amount: 6750000,
          variance: 3.5
        },
        {
          id: '1.2',
          category: 'Civil Works',
          subCategory: 'Concrete',
          description: 'M30 Grade RCC for structures',
          unit: 'CUM',
          quantity: 8500,
          rate: 6500,
          amount: 55250000,
          variance: 7.2
        },
        {
          id: '1.3',
          category: 'Civil Works',
          subCategory: 'Steel',
          description: 'HYSD Steel reinforcement Fe500',
          unit: 'MT',
          quantity: 850,
          rate: 75000,
          amount: 63750000,
          variance: 4.8
        }
      ]
    },
    {
      id: '2',
      category: 'Electrical Works',
      subCategory: '',
      description: 'Complete electrical installations',
      unit: 'LS',
      quantity: 1,
      rate: 0,
      amount: 35000000,
      variance: -2.1,
      items: [
        {
          id: '2.1',
          category: 'Electrical Works',
          subCategory: 'HT Works',
          description: '11KV Substation and equipment',
          unit: 'LS',
          quantity: 1,
          rate: 15000000,
          amount: 15000000,
          variance: -1.5
        },
        {
          id: '2.2',
          category: 'Electrical Works',
          subCategory: 'LT Distribution',
          description: 'LT panels and distribution',
          unit: 'LS',
          quantity: 1,
          rate: 12000000,
          amount: 12000000,
          variance: -3.2
        },
        {
          id: '2.3',
          category: 'Electrical Works',
          subCategory: 'Lighting',
          description: 'Street lighting and fixtures',
          unit: 'NO',
          quantity: 250,
          rate: 32000,
          amount: 8000000,
          variance: -1.8
        }
      ]
    },
    {
      id: '3',
      category: 'Plumbing & Sanitation',
      subCategory: '',
      description: 'Water supply and sanitation works',
      unit: 'LS',
      quantity: 1,
      rate: 0,
      amount: 28000000,
      variance: 1.8,
      items: []
    },
    {
      id: '4',
      category: 'Roads & Pavements',
      subCategory: '',
      description: 'Internal roads and pathways',
      unit: 'LS',
      quantity: 1,
      rate: 0,
      amount: 42000000,
      variance: 6.5,
      items: []
    },
    {
      id: '5',
      category: 'Landscaping',
      subCategory: '',
      description: 'Gardens and green areas',
      unit: 'LS',
      quantity: 1,
      rate: 0,
      amount: 15000000,
      variance: -0.5,
      items: []
    }
  ];

  // Cost breakdown for pie chart
  const costBreakdown = boqData.map(item => ({
    name: item.category,
    value: item.amount,
    percentage: (item.amount / project.totalBudget * 100).toFixed(1)
  }));

  const COLORS = ['#1e3a8a', '#3b82f6', '#059669', '#f59e0b', '#ef4444', '#8b5cf6'];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const calculateTotals = () => {
    const subtotal = boqData.reduce((sum, item) => sum + item.amount, 0);
    const contingency = subtotal * 0.05; // 5% contingency
    const gst = subtotal * 0.18; // 18% GST
    const total = subtotal + contingency + gst;
    
    return { subtotal, contingency, gst, total };
  };

  const totals = calculateTotals();

  const handleEditItem = (item: BOQItem) => {
    setSelectedItem(item);
    setEditDialog(true);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Bill of Quantities (BOQ) & Detailed Estimates
      </Typography>

      {/* Summary Cards */}
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Box flex="1 1 200px">
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Total Estimate
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="primary.main">
                    ₹{(totals.total / 10000000).toFixed(2)} Cr
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Including 18% GST
                  </Typography>
                </Box>
                <AttachMoney sx={{ fontSize: 32, color: 'primary.main' }} />
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box flex="1 1 200px">
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Budget Variance
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    +3.8%
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="caption" color="success.main">
                      Within budget
                    </Typography>
                  </Stack>
                </Box>
                <Assessment sx={{ fontSize: 32, color: 'success.main' }} />
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box flex="1 1 200px">
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Items Count
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    127
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Across 5 categories
                  </Typography>
                </Box>
                <Assignment sx={{ fontSize: 32, color: 'secondary.main' }} />
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box flex="1 1 200px">
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    2 days ago
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    DSR 2024 rates
                  </Typography>
                </Box>
                <History sx={{ fontSize: 32, color: 'warning.main' }} />
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Main Content */}
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" px={2}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
              <Tab label="BOQ Details" />
              <Tab label="Cost Analysis" />
              <Tab label="Rate Analysis" />
              <Tab label="Comparison" />
            </Tabs>
            <Stack direction="row" spacing={1}>
              <Button startIcon={<Refresh />} onClick={() => {}}>
                Update Rates
              </Button>
              <Button variant="outlined" startIcon={<FileDownload />}>
                Export
              </Button>
              <Button variant="contained" startIcon={<Upload />}>
                Import
              </Button>
            </Stack>
          </Stack>
        </Box>

        <TabPanel value={activeTab} index={0}>
          {/* BOQ Details Table */}
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell width={40}></TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Unit</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Rate (₹)</TableCell>
                  <TableCell align="right">Amount (₹)</TableCell>
                  <TableCell align="center">Variance</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {boqData.map((item) => (
                  <React.Fragment key={item.id}>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell>
                        {item.items && item.items.length > 0 && (
                          <IconButton
                            size="small"
                            onClick={() => toggleCategory(item.id)}
                          >
                            {expandedCategories.includes(item.id) ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {item.category}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.description}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{item.unit}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">-</TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>
                          {(item.amount / 100000).toFixed(2)} L
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`${item.variance > 0 ? '+' : ''}${item.variance}%`}
                          size="small"
                          color={item.variance > 5 ? 'error' : item.variance < -5 ? 'warning' : 'success'}
                          icon={item.variance > 0 ? <TrendingUp /> : <TrendingDown />}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" justifyContent="center" spacing={0.5}>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleEditItem(item)}>
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Add Item">
                            <IconButton size="small">
                              <Add fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                    {item.items && (
                      <TableRow>
                        <TableCell colSpan={8} sx={{ p: 0 }}>
                          <Collapse in={expandedCategories.includes(item.id)}>
                            <Table size="small">
                              <TableBody>
                                {item.items.map((subItem) => (
                                  <TableRow key={subItem.id}>
                                    <TableCell width={40}></TableCell>
                                    <TableCell sx={{ pl: 4 }}>
                                      <Typography variant="body2">
                                        {subItem.description}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        {subItem.subCategory}
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="center">{subItem.unit}</TableCell>
                                    <TableCell align="right">{subItem.quantity.toLocaleString()}</TableCell>
                                    <TableCell align="right">{subItem.rate.toLocaleString()}</TableCell>
                                    <TableCell align="right">
                                      {(subItem.amount / 100000).toFixed(2)} L
                                    </TableCell>
                                    <TableCell align="center">
                                      <Chip
                                        label={`${subItem.variance > 0 ? '+' : ''}${subItem.variance}%`}
                                        size="small"
                                        color={subItem.variance > 5 ? 'error' : subItem.variance < -5 ? 'warning' : 'success'}
                                      />
                                    </TableCell>
                                    <TableCell align="center">
                                      <Stack direction="row" justifyContent="center" spacing={0.5}>
                                        <IconButton size="small">
                                          <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small">
                                          <Delete fontSize="small" />
                                        </IconButton>
                                      </Stack>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography fontWeight={600}>Subtotal</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight={600}>
                      ₹{(totals.subtotal / 10000000).toFixed(2)} Cr
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography>Contingency (5%)</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>
                      ₹{(totals.contingency / 10000000).toFixed(2)} Cr
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography>GST (18%)</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>
                      ₹{(totals.gst / 10000000).toFixed(2)} Cr
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Typography variant="h6" fontWeight={700}>
                      Total Project Cost
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" fontWeight={700} color="primary">
                      ₹{(totals.total / 10000000).toFixed(2)} Cr
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          {/* Cost Analysis */}
          <Box display="flex" flexWrap="wrap" gap={3}>
            <Box flex="1 1 400px">
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Cost Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name} (${entry.percentage}%)`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip formatter={(value: number) => `₹${(value / 10000000).toFixed(2)} Cr`} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Box>

            <Box flex="1 1 400px">
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Budget vs Estimate Comparison
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'Sanctioned Budget', value: project.totalBudget / 10000000 },
                    { name: 'Current Estimate', value: totals.total / 10000000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip formatter={(value: number) => `₹${value.toFixed(2)} Cr`} />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Box>

            <Box flex="1 1 100%">
              <Alert severity="info">
                <AlertTitle>Cost Optimization Opportunities</AlertTitle>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    • Bulk procurement of steel can save ₹42.5 Lakhs (0.7% reduction)
                  </Typography>
                  <Typography variant="body2">
                    • Alternative concrete mix design can reduce cost by ₹35 Lakhs
                  </Typography>
                  <Typography variant="body2">
                    • Value engineering in electrical works can save ₹28 Lakhs
                  </Typography>
                </Stack>
              </Alert>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {/* Rate Analysis */}
          <Alert severity="warning" sx={{ mb: 2 }}>
            Rates are based on DSR 2024. Market rates may vary by ±5-10%.
          </Alert>
          
          <Box display="flex" flexWrap="wrap" gap={3}>
            <Box flex="1 1 100%">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">DSR Rate</TableCell>
                      <TableCell align="right">Market Rate</TableCell>
                      <TableCell align="right">Applied Rate</TableCell>
                      <TableCell align="center">Variance</TableCell>
                      <TableCell align="center">Justification</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Cement (OPC 53 Grade)</TableCell>
                      <TableCell align="right">₹380/bag</TableCell>
                      <TableCell align="right">₹410/bag</TableCell>
                      <TableCell align="right">₹395/bag</TableCell>
                      <TableCell align="center">
                        <Chip label="+3.9%" size="small" color="warning" />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="caption">Bulk purchase discount</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Steel (Fe500)</TableCell>
                      <TableCell align="right">₹68,000/MT</TableCell>
                      <TableCell align="right">₹75,000/MT</TableCell>
                      <TableCell align="right">₹72,000/MT</TableCell>
                      <TableCell align="center">
                        <Chip label="+5.9%" size="small" color="error" />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="caption">Current market conditions</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sand (River)</TableCell>
                      <TableCell align="right">₹1,800/cum</TableCell>
                      <TableCell align="right">₹2,200/cum</TableCell>
                      <TableCell align="right">₹2,000/cum</TableCell>
                      <TableCell align="center">
                        <Chip label="+11.1%" size="small" color="error" />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="caption">Scarcity & transport</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          {/* Comparison */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={600}>
              Estimate Comparison with Similar Projects
            </Typography>
            <Button
              variant="outlined"
              startIcon={<CompareArrows />}
              onClick={() => setShowComparison(!showComparison)}
            >
              Toggle Comparison
            </Button>
          </Stack>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell align="right">Total Cost</TableCell>
                  <TableCell align="right">Cost/sqft</TableCell>
                  <TableCell align="right">Civil %</TableCell>
                  <TableCell align="right">MEP %</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ bgcolor: 'primary.50' }}>
                  <TableCell>
                    <Typography fontWeight={600}>Current Project</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {project.projectName}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">₹{(totals.total / 10000000).toFixed(2)} Cr</TableCell>
                  <TableCell align="right">₹4,250/sqft</TableCell>
                  <TableCell align="right">52%</TableCell>
                  <TableCell align="right">28%</TableCell>
                  <TableCell align="center">
                    <Chip label="In Progress" color="primary" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    IT Corridor Phase-1
                    <Typography variant="caption" color="text.secondary" display="block">
                      Similar scope, completed 2023
                    </Typography>
                  </TableCell>
                  <TableCell align="right">₹238.5 Cr</TableCell>
                  <TableCell align="right">₹4,120/sqft</TableCell>
                  <TableCell align="right">50%</TableCell>
                  <TableCell align="right">30%</TableCell>
                  <TableCell align="center">
                    <Chip label="Completed" color="success" size="small" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Commercial Hub Development
                    <Typography variant="caption" color="text.secondary" display="block">
                      80% similar specifications
                    </Typography>
                  </TableCell>
                  <TableCell align="right">₹195.8 Cr</TableCell>
                  <TableCell align="right">₹4,380/sqft</TableCell>
                  <TableCell align="right">54%</TableCell>
                  <TableCell align="right">26%</TableCell>
                  <TableCell align="center">
                    <Chip label="Completed" color="success" size="small" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Alert severity="success" sx={{ mt: 2 }}>
            <AlertTitle>Comparison Result</AlertTitle>
            Your estimate is within 3.1% of similar projects average, indicating good accuracy.
          </Alert>
        </TabPanel>
      </Paper>

      {/* Actions */}
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Estimate Status
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <CheckCircle sx={{ color: 'success.main' }} />
              <Typography variant="body2" color="success.main">
                Ready for technical sanction
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<Print />}>
              Print Estimate
            </Button>
            <Button variant="outlined" startIcon={<Share />}>
              Share for Review
            </Button>
            <Button variant="contained" color="success" startIcon={<CheckCircle />}>
              Submit for Approval
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit BOQ Item</DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Description"
                defaultValue={selectedItem.description}
                multiline
                rows={2}
              />
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  defaultValue={selectedItem.quantity}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{selectedItem.unit}</InputAdornment>
                  }}
                />
                <TextField
                  fullWidth
                  label="Rate"
                  type="number"
                  defaultValue={selectedItem.rate}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>
                  }}
                />
              </Stack>
              <TextField
                fullWidth
                label="Amount"
                value={(selectedItem.quantity * selectedItem.rate).toLocaleString()}
                disabled
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>
                }}
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setEditDialog(false)}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BOQEstimatesScreen;