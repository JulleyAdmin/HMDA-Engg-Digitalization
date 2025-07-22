import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import { Keyboard } from '@mui/icons-material';

interface ShortcutItem {
  key: string;
  description: string;
  category: 'Navigation' | 'View' | 'Actions';
}

const shortcuts: ShortcutItem[] = [
  // Navigation
  { key: 'Tab', description: 'Navigate between tabs', category: 'Navigation' },
  { key: '1-8', description: 'Jump to specific tab (1-8)', category: 'Navigation' },
  { key: '←/→', description: 'Previous/Next tab', category: 'Navigation' },
  
  // View
  { key: 'F', description: 'Focus on hovered component', category: 'View' },
  { key: 'Esc', description: 'Exit focus/fullscreen mode', category: 'View' },
  { key: 'M', description: 'Minimize/Restore current component', category: 'View' },
  { key: 'S', description: 'Toggle sidebar', category: 'View' },
  { key: 'I', description: 'Toggle insights panel', category: 'View' },
  
  // Actions
  { key: '?', description: 'Show this help dialog', category: 'Actions' },
  { key: 'Ctrl+S', description: 'Save current view preferences', category: 'Actions' },
  { key: 'Ctrl+R', description: 'Refresh data', category: 'Actions' },
];

export const KeyboardShortcuts: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show help dialog with ? key
      if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        setOpen(true);
      }
      
      // Close dialog with Escape
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, ShortcutItem[]>);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Keyboard />
          <Typography variant="h6">Keyboard Shortcuts</Typography>
        </Stack>
      </DialogTitle>
      
      <DialogContent>
        {Object.entries(groupedShortcuts).map(([category, items]) => (
          <Box key={category} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {category}
            </Typography>
            <Stack spacing={1}>
              {items.map((item) => (
                <Box
                  key={item.key}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 0.5
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Chip
                    label={item.key}
                    size="small"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      bgcolor: 'grey.100',
                      color: 'text.primary'
                    }}
                  />
                </Box>
              ))}
            </Stack>
            {category !== 'Actions' && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
        
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Tip: Press <strong>?</strong> at any time to show this help dialog
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

// Hook for adding custom keyboard shortcuts
export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  options?: {
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    preventDefault?: boolean;
  }
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { ctrl = false, shift = false, alt = false, preventDefault = true } = options || {};
      
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrl &&
        event.shiftKey === shift &&
        event.altKey === alt
      ) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, options]);
};