import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
  alpha,
  useTheme,
  ClickAwayListener,
  IconButton,
  Popper,
  Fade
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Assignment,
  LocationOn,
  TrendingUp,
  Warning,
  CheckCircle
} from '@mui/icons-material';
import { HMDAProject } from '../types/Project';
import dataService from '../services/dataService';

interface GlobalSearchBarProps {
  projects: HMDAProject[];
  onProjectSelect: (project: HMDAProject) => void;
  currentProjectId?: string;
}

const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  projects,
  onProjectSelect,
  currentProjectId
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<HMDAProject[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  // Filter projects based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProjects([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = projects.filter(project => {
      return (
        project.projectName.toLowerCase().includes(query) ||
        project.projectId.toLowerCase().includes(query) ||
        project.location.circle.toLowerCase().includes(query) ||
        project.location.locality.toLowerCase().includes(query) ||
        project.subCategory.toLowerCase().includes(query) ||
        (project.contractor?.name || '').toLowerCase().includes(query)
      );
    });

    // Sort by relevance (exact matches first)
    filtered.sort((a, b) => {
      const aExactMatch = a.projectName.toLowerCase() === query || a.projectId.toLowerCase() === query;
      const bExactMatch = b.projectName.toLowerCase() === query || b.projectId.toLowerCase() === query;
      
      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;
      
      // Then sort by name match position
      const aNameIndex = a.projectName.toLowerCase().indexOf(query);
      const bNameIndex = b.projectName.toLowerCase().indexOf(query);
      
      if (aNameIndex !== -1 && bNameIndex === -1) return -1;
      if (aNameIndex === -1 && bNameIndex !== -1) return 1;
      if (aNameIndex !== -1 && bNameIndex !== -1) {
        return aNameIndex - bNameIndex;
      }
      
      return 0;
    });

    setFilteredProjects(filtered.slice(0, 8)); // Limit to 8 results
    setSelectedIndex(-1);
  }, [searchQuery, projects]);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen || filteredProjects.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredProjects.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredProjects.length) {
          handleSelectProject(filteredProjects[selectedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        handleClose();
        break;
    }
  };

  const handleSelectProject = (project: HMDAProject) => {
    onProjectSelect(project);
    setSearchQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    searchInputRef.current?.blur();
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredProjects([]);
    searchInputRef.current?.focus();
  };

  // Global keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const getProjectIcon = (project: HMDAProject) => {
    if (project.riskLevel === 'CRITICAL') return <Warning color="error" />;
    if (project.physicalProgress >= 90) return <CheckCircle color="success" />;
    if (project.timeline?.delayDays && project.timeline.delayDays > 30) return <Warning color="warning" />;
    return <Assignment color="primary" />;
  };

  const getProjectStatusChip = (project: HMDAProject) => {
    const stage = dataService.getStageLabel(project.currentStage);
    return (
      <Chip
        label={stage}
        size="small"
        sx={{ 
          ml: 1,
          height: 20,
          fontSize: '0.7rem',
          bgcolor: alpha(theme.palette.primary.main, 0.1)
        }}
      />
    );
  };

  return (
    <>
      <Box ref={anchorRef} sx={{ position: 'relative' }}>
        <TextField
          ref={searchInputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search projects... (⌘K)"
          size="small"
          sx={{
            width: 320,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              },
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.7)',
              }
            },
            '& .MuiInputBase-input': {
              color: 'white',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1,
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Popper
        open={isOpen && (searchQuery.trim() !== '' || filteredProjects.length > 0)}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        style={{ zIndex: 1400 }}
        transition
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper
              elevation={8}
              sx={{
                width: 480,
                maxHeight: 400,
                overflow: 'hidden',
                borderRadius: 2,
                border: 1,
                borderColor: 'divider'
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  {filteredProjects.length > 0 ? (
                    <>
                      <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant="caption" color="text.secondary">
                          Found {filteredProjects.length} projects
                        </Typography>
                      </Box>
                      <List sx={{ py: 0, maxHeight: 350, overflow: 'auto' }}>
                        {filteredProjects.map((project, index) => (
                          <ListItem
                            key={project.projectId}
                            onClick={() => handleSelectProject(project)}
                            sx={{
                              ...(index === selectedIndex && {
                                bgcolor: 'action.selected',
                              }),
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: 'action.hover'
                              },
                              borderBottom: index < filteredProjects.length - 1 ? 1 : 0,
                              borderColor: 'divider'
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              {getProjectIcon(project)}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: project.projectId === currentProjectId ? 600 : 400,
                                      color: project.projectId === currentProjectId ? 'primary.main' : 'text.primary'
                                    }}
                                  >
                                    {project.projectName}
                                  </Typography>
                                  {getProjectStatusChip(project)}
                                </Box>
                              }
                              secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                      {project.location.circle} • {project.location.locality}
                                    </Typography>
                                  </Box>
                                  <Typography variant="caption" color="text.secondary">•</Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {project.projectId}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">•</Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <TrendingUp sx={{ fontSize: 14, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                      {project.physicalProgress}%
                                    </Typography>
                                  </Box>
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  ) : searchQuery.trim() !== '' ? (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        No projects found for "{searchQuery}"
                      </Typography>
                    </Box>
                  ) : null}

                  <Box sx={{ 
                    p: 1, 
                    borderTop: 1, 
                    borderColor: 'divider',
                    bgcolor: 'grey.50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant="caption" color="text.secondary">
                      Press <kbd style={{ 
                        padding: '2px 6px', 
                        borderRadius: 3,
                        backgroundColor: '#e5e5e5',
                        border: '1px solid #ccc',
                        fontSize: '0.75rem'
                      }}>↑↓</kbd> to navigate, <kbd style={{ 
                        padding: '2px 6px', 
                        borderRadius: 3,
                        backgroundColor: '#e5e5e5',
                        border: '1px solid #ccc',
                        fontSize: '0.75rem'
                      }}>Enter</kbd> to select
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      <kbd style={{ 
                        padding: '2px 6px', 
                        borderRadius: 3,
                        backgroundColor: '#e5e5e5',
                        border: '1px solid #ccc',
                        fontSize: '0.75rem'
                      }}>Esc</kbd> to close
                    </Typography>
                  </Box>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default GlobalSearchBar;