// Enhanced Projects Table Component - CE Dashboard
import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Chip,
  Button,
  Typography,
  Tooltip,
  IconButton,
  Stack,
  LinearProgress
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridToolbar
} from '@mui/x-data-grid';
import {
  Search,
  FilterList,
  Visibility,
  GetApp,
  Warning,
  TrendingUp,
  Assignment,
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext
} from '@mui/icons-material';
import { HMDAProject, ProjectStage } from '../types/Project';
import dataService from '../services/dataService';

interface ProjectsTableProps {
  projects: HMDAProject[];
  onProjectSelect?: (project: HMDAProject) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects, onProjectSelect }) => {
  const [searchText, setSearchText] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  // Apply local search filter - Updated for HMDA fields
  const displayedProjects = useMemo(() => {
    if (!searchText) return projects;
    
    const searchLower = searchText.toLowerCase();
    return projects.filter(project => 
      project.nameOfProject?.toLowerCase().includes(searchLower) ||
      project.nameOfWork?.toLowerCase().includes(searchLower) ||
      project.projectName?.toLowerCase().includes(searchLower) ||
      project.projectId.toLowerCase().includes(searchLower) ||
      project.location.locality.toLowerCase().includes(searchLower) ||
      project.contractor?.nameOfAgency?.toLowerCase().includes(searchLower) ||
      project.contractor?.name?.toLowerCase().includes(searchLower) ||
      project.typeOfWork?.toLowerCase().includes(searchLower) ||
      project.asFileNumber?.toLowerCase().includes(searchLower)
    );
  }, [projects, searchText]);

  // Reset pagination when search changes
  React.useEffect(() => {
    setPaginationModel(prev => ({ ...prev, page: 0 }));
  }, [searchText]);

  // Dynamic columns based on stage - HMDA Master Data Aligned
  const getColumnsForStage = (stage?: ProjectStage): GridColDef[] => {
    const baseColumns: GridColDef[] = [
      {
        field: 'serialNumber',
        headerName: 'S. No',
        width: 80,
        renderCell: (params) => (
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
        )
      },
      {
        field: 'divisionNumber',
        headerName: 'Division No',
        width: 100,
        renderCell: (params) => (
          <Chip 
            label={params.value} 
            size="small" 
            variant="outlined"
            color="primary"
          />
        )
      },
      {
        field: 'nameOfProject',
        headerName: 'Name of the Project',
        width: 220,
        renderCell: (params) => (
          <Box>
            <Typography variant="body2" fontWeight="medium" color="primary">
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.location.locality}, {params.row.location.ward}
            </Typography>
          </Box>
        )
      },
      {
        field: 'typeOfWork',
        headerName: 'Type of Work',
        width: 120,
        renderCell: (params) => {
          const colorMap: { [key: string]: string } = {
            'Layout': 'success',
            'Roads': 'info',
            'parks/lakes': 'warning',
            'others': 'secondary'
          };
          return (
            <Chip 
              label={params.value} 
              size="small" 
              color={colorMap[params.value] as any || 'default'}
            />
          );
        }
      },
      {
        field: 'nameOfAgency',
        headerName: 'Name of the Agency',
        width: 200,
        renderCell: (params) => (
          <Typography variant="body2">
            {params.row.contractor?.nameOfAgency || params.row.contractor?.name}
          </Typography>
        )
      },
      {
        field: 'estimateAmountCrores',
        headerName: 'Estimate Amount (Rs. in Crs)',
        width: 160,
        renderCell: (params) => (
          <Box textAlign="right">
            <Typography variant="body2" fontWeight="medium">
              ₹{params.value} Cr
            </Typography>
          </Box>
        )
      },
      {
        field: 'asFileNumber',
        headerName: 'AS File No',
        width: 180,
        renderCell: (params) => (
          <Typography variant="body2" fontFamily="monospace">
            {params.value}
          </Typography>
        )
      },
      {
        field: 'asApprovalAuthority',
        headerName: 'AS to MC or Govt',
        width: 140,
        renderCell: (params) => (
          <Chip 
            label={params.value === 'Metropolitan Commissioner' ? 'MC' : 'Govt'}
            size="small"
            color={params.value === 'Metropolitan Commissioner' ? 'success' : 'warning'}
          />
        )
      },
      {
        field: 'statusOfWork',
        headerName: 'Status of the Work',
        width: 150,
        renderCell: (params) => (
          <Chip 
            label={params.value}
            size="small"
            color={params.value === 'Work is completed' ? 'success' : 'info'}
            variant="filled"
          />
        )
      },
      {
        field: 'expenditureIncurredWithTax',
        headerName: 'Expenditure Incurred (Rs. in Crs)',
        width: 180,
        renderCell: (params) => (
          <Box textAlign="right">
            <Typography variant="body2" fontWeight="medium">
              ₹{params.value} Cr
            </Typography>
            <Typography variant="caption" color="text.secondary">
              (incl. taxes)
            </Typography>
          </Box>
        )
      },
      {
        field: 'category',
        headerName: 'Category',
        width: 120,
        renderCell: (params) => (
          <Chip
            label={dataService.getCategoryLabel(params.value)}
            size="small"
            sx={{
              backgroundColor: dataService.getCategoryColor(params.value),
              color: 'white',
              fontWeight: 'bold'
            }}
          />
        )
      },
      {
        field: 'currentStage',
        headerName: 'Stage',
        width: 160,
        renderCell: (params) => (
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {dataService.getStageLabel(params.value)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Stage {params.value} of 9
            </Typography>
          </Box>
        )
      },
      {
        field: 'totalBudget',
        headerName: 'Budget',
        width: 120,
        type: 'number',
        renderCell: (params) => (
          <Typography variant="body2" fontWeight="bold">
            {dataService.formatCurrency(params.value)}
          </Typography>
        )
      },
      {
        field: 'physicalProgress',
        headerName: 'Physical Progress',
        width: 140,
        renderCell: (params) => (
          <Box sx={{ width: '100%', minWidth: 120 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
              <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
                P: {params.value}%
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600 }}>
                F: {params.row.financialProgress}%
              </Typography>
            </Box>
            <Box position="relative">
              <LinearProgress
                variant="determinate"
                value={params.value}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${
                      params.value < 30 ? '#ef4444' : 
                      params.value < 70 ? '#f59e0b' : '#10b981'
                    } 0%, ${
                      params.value < 30 ? '#f87171' : 
                      params.value < 70 ? '#fbbf24' : '#34d399'
                    } 100%)`,
                    borderRadius: 3,
                  }
                }}
              />
              <LinearProgress
                variant="determinate"
                value={params.row.financialProgress}
                sx={{
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '100%',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'rgba(30, 58, 138, 0.6)',
                    borderRadius: 2,
                  }
                }}
              />
            </Box>
          </Box>
        )
      },
      {
        field: 'riskLevel',
        headerName: 'Risk',
        width: 100,
        renderCell: (params) => (
          <Chip
            label={params.value}
            size="small"
            icon={params.value === 'HIGH' || params.value === 'CRITICAL' ? <Warning /> : undefined}
            sx={{
              backgroundColor: dataService.getRiskColor(params.value),
              color: 'white',
              fontWeight: 'bold'
            }}
          />
        )
      },
      {
        field: 'timeline.delayDays',
        headerName: 'Delay',
        width: 80,
        valueGetter: (value: any, row: any) => row.timeline.delayDays,
        renderCell: (params) => (
          <Typography 
            variant="body2" 
            color={params.value > 0 ? 'error' : 'success'}
            fontWeight="bold"
          >
            {params.value > 0 ? `+${params.value}d` : '✓'}
          </Typography>
        )
      },
      {
        field: 'contractor.name',
        headerName: 'Contractor',
        width: 180,
        valueGetter: (value: any, row: any) => row.contractor?.name || 'Not Assigned',
        renderCell: (params) => (
          <Box>
            <Typography variant="body2">
              {params.row.contractor?.name || 'Not Assigned'}
            </Typography>
            {params.row.contractor && (
              <Typography variant="caption" color="text.secondary">
                Grade: {params.row.contractor.grade} | Rating: {params.row.contractor.performanceRating.toFixed(1)}
              </Typography>
            )}
          </Box>
        )
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        renderCell: (params) => (
          <Box>
            <Tooltip title="View Details">
              <IconButton
                size="small"
                onClick={() => onProjectSelect?.(params.row)}
                color="primary"
              >
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Timeline">
              <IconButton size="small" color="secondary">
                <TrendingUp />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    ];

    // Add stage-specific columns
    if (stage === ProjectStage.CONSTRUCTION) {
      baseColumns.splice(-1, 0, {
        field: 'quality.overallScore',
        headerName: 'Quality Score',
        width: 120,
        valueGetter: (value: any, row: any) => row.quality.overallScore,
        renderCell: (params) => (
          <Typography 
            variant="body2" 
            color={params.value < 70 ? 'error' : params.value < 85 ? 'warning' : 'success'}
            fontWeight="bold"
          >
            {params.value.toFixed(1)}
          </Typography>
        )
      });
    }

    if (stage === ProjectStage.TENDERING) {
      baseColumns.splice(-1, 0, {
        field: 'financial.budgetUtilization',
        headerName: 'Budget Utilization',
        width: 140,
        valueGetter: (value: any, row: any) => row.financial.budgetUtilization,
        renderCell: (params) => (
          <Typography variant="body2">
            {params.value.toFixed(1)}%
          </Typography>
        )
      });
    }

    return baseColumns;
  };

  const columns = useMemo(() => {
    // Determine the most common stage in filtered projects for dynamic columns
    const stageCounts = displayedProjects.reduce((acc, project) => {
      acc[project.currentStage] = (acc[project.currentStage] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    const dominantStage = Object.entries(stageCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0];

    return getColumnsForStage(dominantStage ? parseInt(dominantStage) : undefined);
  }, [displayedProjects]);

  const handleExport = () => {
    const csvData = displayedProjects.map(project => ({
      'Project ID': project.projectId,
      'Project Name': project.projectName,
      'Category': dataService.getCategoryLabel(project.category),
      'Stage': dataService.getStageLabel(project.currentStage),
      'Budget': dataService.formatCurrency(project.totalBudget),
      'Physical Progress': `${project.physicalProgress}%`,
      'Financial Progress': `${project.financialProgress}%`,
      'Risk Level': project.riskLevel,
      'Delay Days': project.timeline.delayDays,
      'Contractor': project.contractor?.name || 'Not Assigned',
      'Location': `${project.location.locality}, ${project.location.ward}`,
      'Circle': project.location.circle
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hmda-projects-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        sx={{ paddingBottom: '12px' }}
        title={
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  backgroundColor: 'primary.main',
                }}
              >
                <Assignment sx={{ fontSize: 18, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
                  HMDA Projects Portfolio
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  Comprehensive project management and monitoring
                </Typography>
              </Box>
              <Chip 
                label={`${displayedProjects.length} Projects`}
                color="primary"
                size="small"
                sx={{ 
                  height: 24,
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                }}
              />
            </Box>
            <Box display="flex" gap={1} alignItems="center">
              {/* Quick Pagination Controls */}
              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconButton 
                  size="small" 
                  onClick={() => setPaginationModel(prev => ({ ...prev, page: 0 }))}
                  disabled={paginationModel.page === 0}
                  title="First Page"
                >
                  <FirstPage fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => setPaginationModel(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={paginationModel.page === 0}
                  title="Previous Page"
                >
                  <NavigateBefore fontSize="small" />
                </IconButton>
                <Typography variant="caption" sx={{ minWidth: 60, textAlign: 'center' }}>
                  {paginationModel.page + 1} / {Math.max(1, Math.ceil(displayedProjects.length / paginationModel.pageSize))}
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={() => setPaginationModel(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={paginationModel.page >= Math.ceil(displayedProjects.length / paginationModel.pageSize) - 1}
                  title="Next Page"
                >
                  <NavigateNext fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => setPaginationModel(prev => ({ ...prev, page: Math.ceil(displayedProjects.length / paginationModel.pageSize) - 1 }))}
                  disabled={paginationModel.page >= Math.ceil(displayedProjects.length / paginationModel.pageSize) - 1}
                  title="Last Page"
                >
                  <LastPage fontSize="small" />
                </IconButton>
              </Stack>
              
              <Button
                startIcon={<GetApp />}
                onClick={handleExport}
                variant="outlined"
                size="small"
                sx={{ 
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.8125rem'
                }}
              >
                Export CSV
              </Button>
            </Box>
          </Box>
        }
      />
      
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px 20px !important' }}>
        {/* Search and Quick Stats */}
        <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
          <Box flex="1 1 300px">
            <TextField
              fullWidth
              placeholder="Search projects, locations, contractors..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: <Search color="action" />
              }}
              size="small"
            />
          </Box>
          <Box flex="1 1 300px">
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Total Budget: <strong>{dataService.formatCurrency(
                  displayedProjects.reduce((sum, p) => sum + p.totalBudget, 0)
                )}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Progress: <strong>{
                  displayedProjects.length > 0 
                    ? (displayedProjects.reduce((sum, p) => sum + p.physicalProgress, 0) / displayedProjects.length).toFixed(1)
                    : '0'
                }%</strong>
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* Pagination Summary */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2" color="text.secondary">
            Showing {Math.min((paginationModel.page * paginationModel.pageSize) + 1, displayedProjects.length)} - {Math.min((paginationModel.page + 1) * paginationModel.pageSize, displayedProjects.length)} of {displayedProjects.length} projects
            {searchText && ` (filtered from ${projects.length} total)`}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Page {paginationModel.page + 1} of {Math.max(1, Math.ceil(displayedProjects.length / paginationModel.pageSize))}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Items per page: {paginationModel.pageSize}
            </Typography>
          </Stack>
        </Box>

        {/* Enhanced Data Grid */}
        <Box flex={1} sx={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}>
          <DataGrid
            rows={displayedProjects}
            columns={columns}
            getRowId={(row) => row.projectId}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            paginationMode="client"
            checkboxSelection={false}
            disableColumnSelector={false}
            disableDensitySelector={false}
            disableColumnFilter={false}
            slots={{
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { 
                  debounceMs: 500
                },
              },
              pagination: {
                showFirstButton: true,
                showLastButton: true,
              }
            }}
            onRowClick={(params: GridRowParams) => {
              onProjectSelect?.(params.row as HMDAProject);
            }}
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f5f5f5',
                cursor: 'pointer'
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #e0e0e0'
              }
            }}
            disableRowSelectionOnClick
            density="comfortable"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

