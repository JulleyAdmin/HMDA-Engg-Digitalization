// Filter Presets Component
import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Typography,
  Divider,
  Alert,
  InputAdornment
} from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Share as ShareIcon,
  Search as SearchIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { FilterPreset } from '../../filters/filter-types';
import { DEFAULT_FILTER_PRESETS } from '../../filters/filter-config';

interface FilterPresetsProps {
  presets: FilterPreset[];
  activePreset?: string;
  onApplyPreset: (presetId: string) => void;
  onSavePreset: (name: string, description?: string) => void;
  onDeletePreset?: (presetId: string) => void;
  onSharePreset?: (presetId: string) => void;
  onClose: () => void;
}

const FilterPresets: React.FC<FilterPresetsProps> = ({
  presets,
  activePreset,
  onApplyPreset,
  onSavePreset,
  onDeletePreset,
  onSharePreset,
  onClose
}) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [presetDescription, setPresetDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Combine default and custom presets
  const allPresets = [
    ...DEFAULT_FILTER_PRESETS.map(preset => ({
      ...preset,
      createdBy: 'System',
      createdAt: new Date('2024-01-01'),
      isDefault: true
    })),
    ...presets
  ];

  // Filter presets based on search
  const filteredPresets = allPresets.filter(preset =>
    preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    preset.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle save preset
  const handleSavePreset = () => {
    if (presetName.trim()) {
      onSavePreset(presetName.trim(), presetDescription.trim());
      setShowSaveDialog(false);
      setPresetName('');
      setPresetDescription('');
    }
  };

  // Handle apply preset
  const handleApplyPreset = (presetId: string) => {
    onApplyPreset(presetId);
    onClose();
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Filter Presets
        </Typography>
        
        {/* Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search presets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            )
          }}
          sx={{ mb: 2 }}
        />

        {/* Save Current Filters Button */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setShowSaveDialog(true)}
        >
          Save Current Filters as Preset
        </Button>
      </Box>

      {/* Presets List */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {filteredPresets.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No presets found
            </Typography>
          </Box>
        ) : (
          <List>
            {filteredPresets.map((preset, index) => (
              <React.Fragment key={preset.id}>
                {index > 0 && <Divider />}
                <ListItem
                  disablePadding
                  sx={{
                    backgroundColor: preset.id === activePreset ? 'action.selected' : 'transparent'
                  }}
                >
                  <ListItemButton onClick={() => handleApplyPreset(preset.id)}>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <span>{preset.name}</span>
                          {preset.isDefault && (
                            <Chip label="Default" size="small" color="primary" />
                          )}
                          {'isShared' in preset && preset.isShared && (
                            <Chip label="Shared" size="small" color="secondary" />
                          )}
                          {preset.id === activePreset && (
                            <CheckIcon fontSize="small" color="primary" />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          {preset.description && (
                            <Typography variant="body2" color="text.secondary">
                              {preset.description}
                            </Typography>
                          )}
                          <Typography variant="caption" color="text.secondary">
                            {Object.keys(preset.filters).length} filters • 
                            Created by {preset.createdBy} • 
                            {new Date(preset.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                  <ListItemSecondaryAction>
                    {!preset.isDefault && (
                      <>
                        {onSharePreset && (
                          <IconButton
                            edge="end"
                            onClick={() => onSharePreset(preset.id)}
                            size="small"
                          >
                            <ShareIcon fontSize="small" />
                          </IconButton>
                        )}
                        {onDeletePreset && (
                          <IconButton
                            edge="end"
                            onClick={() => onDeletePreset(preset.id)}
                            size="small"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>

      {/* Save Preset Dialog */}
      <Dialog
        open={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Save Filter Preset</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Save your current filter configuration as a preset for quick access later.
          </Alert>
          <TextField
            autoFocus
            fullWidth
            label="Preset Name"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="e.g., High Priority Projects"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description (Optional)"
            value={presetDescription}
            onChange={(e) => setPresetDescription(e.target.value)}
            placeholder="e.g., Projects with critical issues and major delays"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSaveDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSavePreset}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={!presetName.trim()}
          >
            Save Preset
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FilterPresets;