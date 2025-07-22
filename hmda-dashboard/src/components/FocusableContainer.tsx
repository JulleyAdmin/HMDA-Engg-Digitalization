import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import {
  Box,
  IconButton,
  Fade,
  Portal,
  styled,
  useTheme,
  Tooltip,
  Typography,
  Stack
} from '@mui/material';
import {
  CenterFocusStrong,
  CenterFocusWeak,
  Close,
  Fullscreen
} from '@mui/icons-material';

// Context for managing focus state across the app
interface FocusContextType {
  focusedId: string | null;
  setFocusedId: (id: string | null) => void;
}

const FocusContext = createContext<FocusContextType>({
  focusedId: null,
  setFocusedId: () => {}
});

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [focusedId, setFocusedId] = useState<string | null>(null);

  return (
    <FocusContext.Provider value={{ focusedId, setFocusedId }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => useContext(FocusContext);

interface FocusableContainerProps {
  children: React.ReactNode;
  id: string;
  title?: string;
  enableFocus?: boolean;
  focusActions?: React.ReactNode;
  onFocusChange?: (focused: boolean) => void;
  sx?: any;
}

const FocusOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(8px)',
  zIndex: theme.zIndex.modal - 2,
  cursor: 'pointer'
}));

const FocusedContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: theme.zIndex.modal - 1,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[24],
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  margin: 'auto',
  transition: 'all 0.3s ease-in-out'
}));

const FocusToolbar = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -48,
  right: 0,
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4]
}));

export const FocusableContainer: React.FC<FocusableContainerProps> = ({
  children,
  id,
  title,
  enableFocus = true,
  focusActions,
  onFocusChange,
  sx = {}
}) => {
  const theme = useTheme();
  const { focusedId, setFocusedId } = useFocus();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [originalPosition, setOriginalPosition] = useState<DOMRect | null>(null);
  
  const isFocused = focusedId === id;

  useEffect(() => {
    if (isFocused && containerRef.current) {
      // Store original position
      const rect = containerRef.current.getBoundingClientRect();
      setOriginalPosition(rect);
      
      // Prevent body scroll when focused
      document.body.style.overflow = 'hidden';
      
      // Call callback
      onFocusChange?.(true);
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
      
      // Call callback
      if (focusedId === null && originalPosition) {
        onFocusChange?.(false);
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFocused, focusedId, originalPosition, onFocusChange]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // ESC to exit focus mode
      if (event.key === 'Escape' && isFocused) {
        setFocusedId(null);
      }
      
      // F key to toggle focus (when hovering)
      if (event.key === 'f' && !event.ctrlKey && !event.metaKey) {
        if (isHovered && enableFocus) {
          event.preventDefault();
          toggleFocus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, isHovered, enableFocus]);

  const toggleFocus = () => {
    if (isFocused) {
      setFocusedId(null);
    } else {
      setFocusedId(id);
    }
  };

  const handleOverlayClick = () => {
    setFocusedId(null);
  };

  // Regular view when not focused
  if (!isFocused) {
    return (
      <Box
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          ...sx,
          position: 'relative',
          transition: 'all 0.2s ease'
        }}
      >
        {/* Focus button on hover */}
        {enableFocus && isHovered && (
          <Fade in={isHovered}>
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 10
              }}
            >
              <Tooltip title="Focus on this component (F)">
                <IconButton
                  size="small"
                  onClick={toggleFocus}
                  sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 2,
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText'
                    }
                  }}
                >
                  <CenterFocusStrong fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Fade>
        )}
        
        {children}
      </Box>
    );
  }

  // Focused view
  return (
    <>
      {/* Original container placeholder */}
      <Box
        ref={containerRef}
        sx={{
          ...sx,
          opacity: 0,
          pointerEvents: 'none'
        }}
      >
        {children}
      </Box>

      {/* Focused overlay and container */}
      <Portal>
        <FocusOverlay onClick={handleOverlayClick} />
        
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: originalPosition ? Math.min(originalPosition.width * 1.2, window.innerWidth * 0.9) : 'auto',
            height: originalPosition ? Math.min(originalPosition.height * 1.2, window.innerHeight * 0.9) : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <FocusedContainer
            sx={{
              width: '100%',
              height: '100%',
              p: 3
            }}
          >
            {/* Focus toolbar */}
            <FocusToolbar>
              {title && (
                <Typography variant="subtitle2" sx={{ mr: 2, alignSelf: 'center' }}>
                  {title}
                </Typography>
              )}
              
              {focusActions}
              
              <Tooltip title="Exit focus mode (ESC)">
                <IconButton
                  size="small"
                  onClick={() => setFocusedId(null)}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Tooltip>
            </FocusToolbar>

            {/* Focused content */}
            <Fade in={true} timeout={300}>
              <Box sx={{ height: '100%', overflow: 'auto' }}>
                {children}
              </Box>
            </Fade>
          </FocusedContainer>
        </Box>
      </Portal>
    </>
  );
};

// Hook for programmatic focus control
export const useFocusControl = (id: string) => {
  const { focusedId, setFocusedId } = useFocus();
  
  const focus = () => setFocusedId(id);
  const unfocus = () => setFocusedId(null);
  const isFocused = focusedId === id;
  
  return { focus, unfocus, isFocused };
};