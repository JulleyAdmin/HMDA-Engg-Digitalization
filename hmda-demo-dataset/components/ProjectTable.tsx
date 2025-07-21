// Project Table Component with Advanced Filtering
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Chip,
  LinearProgress,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Avatar,
  useTheme
} from '@mui/material';
import {
  Visibility as ViewIcon,
  LocationOn as LocationIcon,
  Business as ContractorIcon,
  Schedule as ScheduleIcon,
  AccountBalance as BudgetIcon
} from '@mui/icons-material';

interface ProjectTableProps {
  projects: any[];
  compact?: boolean;
  onRowClick?: (project: any) => void;
  onViewProject?: (project: any) => void;
}

type Order = 'asc' | 'desc';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  sortable?: boolean;
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  compact = false,
  onRowClick,
  onViewProject
}) => {
  const theme = useTheme();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('projectName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(compact ? 10 : 25);

  // Table columns configuration
  const columns: Column[] = [
    {
      id: 'projectId',
      label: 'Project ID',
      minWidth: 120,
      sortable: true
    },
    {
      id: 'projectName',
      label: 'Project Name',
      minWidth: 200,
      sortable: true
    },
    {
      id: 'category',
      label: 'Category',
      minWidth: 100,
      sortable: true
    },
    {
      id: 'currentStage',
      label: 'Stage',
      minWidth: 120,
      sortable: true
    },
    {
      id: 'totalBudget',
      label: 'Budget (₹ Cr)',
      minWidth: 120,
      align: 'right',
      format: (value: number) => (value / 10000000).toFixed(2),
      sortable: true
    },
    {
      id: 'physicalProgress',
      label: 'Physical Progress',
      minWidth: 150,
      align: 'center',
      sortable: true
    },
    {
      id: 'timeline',
      label: 'Timeline',
      minWidth: 120,
      align: 'center',
      sortable: true
    },
    {
      id: 'contractor',
      label: 'Contractor',
      minWidth: 180,
      sortable: true
    },
    {
      id: 'riskLevel',
      label: 'Risk',
      minWidth: 80,
      align: 'center',
      sortable: true
    },
    {
      id: 'location',
      label: 'Location',
      minWidth: 150,
      sortable: true
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 80,
      align: 'center',
      sortable: false
    }
  ];

  // Sorting function
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Get nested value for sorting
  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((value, key) => value?.[key], obj);
  };

  // Sort projects
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      let aValue = getNestedValue(a, orderBy);
      let bValue = getNestedValue(b, orderBy);

      // Handle special cases
      if (orderBy === 'contractor') {
        aValue = a.contractor?.name || '';
        bValue = b.contractor?.name || '';
      } else if (orderBy === 'timeline') {
        aValue = a.timeline?.delayDays || 0;
        bValue = b.timeline?.delayDays || 0;
      } else if (orderBy === 'location') {
        aValue = `${a.location?.circle || ''} ${a.location?.mandal || ''}`;
        bValue = `${b.location?.circle || ''} ${b.location?.mandal || ''}`;
      }

      // Convert to string for comparison if needed
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue?.toLowerCase() || '';
      }

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [projects, order, orderBy]);

  // Paginated projects
  const paginatedProjects = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedProjects.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedProjects, page, rowsPerPage]);

  // Get category color
  const getCategoryColor = (category: string): string => {
    const colors = {
      'INFRA': theme.palette.primary.main,
      'URBAN': theme.palette.secondary.main,
      'ENV': theme.palette.success.main,
      'SMART': theme.palette.info.main
    };
    return colors[category as keyof typeof colors] || theme.palette.grey[500];
  };

  // Get stage color
  const getStageColor = (stage: string): string => {
    const colors = {
      'Planning': theme.palette.grey[500],
      'Approval': theme.palette.info.main,
      'Pre-construction': theme.palette.warning.main,
      'Tender': theme.palette.primary.main,
      'Agreement': theme.palette.secondary.main,
      'Construction': theme.palette.success.main,
      'Quality Control': theme.palette.warning.main,
      'Testing': theme.palette.info.main,
      'Completion': theme.palette.success.dark
    };
    return colors[stage as keyof typeof colors] || theme.palette.grey[500];
  };

  // Get risk color
  const getRiskColor = (risk: string): string => {
    const colors = {
      'LOW': theme.palette.success.main,
      'MEDIUM': theme.palette.warning.main,
      'HIGH': theme.palette.error.main,
      'CRITICAL': theme.palette.error.dark
    };
    return colors[risk as keyof typeof colors] || theme.palette.grey[500];
  };

  // Render cell content
  const renderCell = (project: any, column: Column) => {
    const value = getNestedValue(project, column.id);

    switch (column.id) {
      case 'projectName':
        return (
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {project.projectName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {project.workType || 'General'}
            </Typography>
          </Box>
        );

      case 'category':
        return (
          <Chip
            label={project.category}
            size="small"
            sx={{
              backgroundColor: getCategoryColor(project.category),
              color: 'white',
              fontWeight: 500
            }}
          />
        );

      case 'currentStage':
        return (
          <Chip
            label={project.currentStage}
            size="small"
            variant="outlined"
            sx={{
              borderColor: getStageColor(project.currentStage),
              color: getStageColor(project.currentStage)
            }}
          />
        );

      case 'physicalProgress':
        return (
          <Box sx={{ width: '100%' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
              <Typography variant="body2">
                {project.physicalProgress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={project.physicalProgress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  backgroundColor: project.physicalProgress >= 75 
                    ? theme.palette.success.main 
                    : project.physicalProgress >= 50 
                    ? theme.palette.warning.main 
                    : theme.palette.error.main
                }
              }}
            />
          </Box>
        );

      case 'timeline':
        const delayDays = project.timeline?.delayDays || 0;
        return (
          <Box display="flex" alignItems="center" gap={0.5}>
            <ScheduleIcon 
              fontSize="small" 
              color={delayDays > 0 ? 'error' : 'success'} 
            />
            <Typography 
              variant="body2" 
              color={delayDays > 0 ? 'error' : 'success'}
            >
              {delayDays > 0 ? `+${delayDays}d` : 'On time'}
            </Typography>
          </Box>
        );

      case 'contractor':
        return project.contractor ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
              {project.contractor.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2">
                {project.contractor.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Grade: {project.contractor.grade}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Not assigned
          </Typography>
        );

      case 'riskLevel':
        return (
          <Chip
            label={project.riskLevel}
            size="small"
            sx={{
              backgroundColor: getRiskColor(project.riskLevel),
              color: 'white',
              fontWeight: 500
            }}
          />
        );

      case 'location':
        return (
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocationIcon fontSize="small" color="action" />
            <Box>
              <Typography variant="body2">
                {project.location?.circle || 'N/A'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {project.location?.mandal || 'N/A'}
              </Typography>
            </Box>
          </Box>
        );

      case 'actions':
        return (
          <Box>
            <Tooltip title="View Details">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProject?.(project);
                }}
              >
                <ViewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        );

      default:
        if (column.format && typeof value === 'number') {
          return column.format(value);
        }
        return value || 'N/A';
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: compact ? 600 : 800 }}>
        <Table stickyHeader size={compact ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProjects.map((project) => (
              <TableRow
                hover
                key={project.projectId}
                onClick={() => onRowClick?.(project)}
                sx={{ 
                  cursor: onRowClick ? 'pointer' : 'default',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {renderCell(project, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={sortedProjects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        }}
      />
    </Paper>
  );
};

export default ProjectTable;