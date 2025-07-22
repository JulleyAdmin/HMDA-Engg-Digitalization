import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Box,
  Portal,
  Fade,
  useTheme,
  styled
} from '@mui/material';
import {
  Fullscreen,
  FullscreenExit,
  Close
} from '@mui/icons-material';

// Global counter for managing z-index of multiple fullscreen modals
let fullscreenCounter = 0;
const BASE_Z_INDEX = 1300; // MUI modal default is 1300

interface FullscreenableCardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  sx?: any;
  contentSx?: any;
  zIndexOffset?: number; // Allow custom z-index offset for nested fullscreens
}

const FullscreenOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(2px)',
  transition: 'opacity 0.2s ease-in-out',
}));

const FullscreenCard = styled(Card)(({ theme }) => ({
  width: '90vw',
  height: '90vh',
  maxWidth: '1400px',
  maxHeight: '900px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[24],
  transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
  backgroundColor: theme.palette.background.paper,
}));

export const FullscreenableCard: React.FC<FullscreenableCardProps> = memo(({
  children,
  title,
  actions,
  sx = {},
  contentSx = {},
  zIndexOffset = 0
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalZIndex, setModalZIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const handleToggleFullscreen = useCallback(() => {
    // Prevent multiple clicks during transition
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (!isFullscreen) {
      // Entering fullscreen
      fullscreenCounter++;
      const newZIndex = BASE_Z_INDEX + (fullscreenCounter * 10) + zIndexOffset;
      setModalZIndex(newZIndex);
      setShowFullscreen(true);
      // Use requestAnimationFrame for smoother transition
      requestAnimationFrame(() => {
        setIsFullscreen(true);
        setTimeout(() => setIsTransitioning(false), 250);
      });
    } else {
      // Exiting fullscreen
      setIsFullscreen(false);
      setTimeout(() => {
        setShowFullscreen(false);
        setIsTransitioning(false);
        fullscreenCounter = Math.max(0, fullscreenCounter - 1);
      }, 200);
    }
  }, [isFullscreen, isTransitioning, zIndexOffset]);

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        handleToggleFullscreen();
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when fullscreen
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, handleToggleFullscreen]);

  // Render content only once based on state
  const renderContent = () => (
    <>
      <Box 
        sx={{ 
          position: 'absolute',
          top: isFullscreen ? 16 : 8,
          right: isFullscreen ? 16 : 8,
          zIndex: 1,
          display: 'flex',
          gap: 1,
        }}
      >
        {actions}
        <IconButton
          onClick={handleToggleFullscreen}
          disabled={isTransitioning}
          size="small"
          sx={{
            backgroundColor: isFullscreen ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
            '&:hover': {
              backgroundColor: isFullscreen ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {isFullscreen ? (
            <FullscreenExit fontSize="small" />
          ) : (
            <Fullscreen fontSize="small" />
          )}
        </IconButton>
        {isFullscreen && (
          <IconButton
            onClick={handleToggleFullscreen}
            disabled={isTransitioning}
            size="small"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        )}
      </Box>
      {title && (
        <Box sx={{ mb: isFullscreen ? 3 : 2 }}>
          {title}
        </Box>
      )}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
      }}>
        {children}
      </Box>
    </>
  );

  // Regular card view
  if (!showFullscreen) {
    return (
      <Card ref={cardRef} sx={sx}>
        <CardContent 
          sx={{
            ...contentSx,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            padding: contentSx.padding || '20px !important',
          }}
        >
          {renderContent()}
        </CardContent>
      </Card>
    );
  }

  // Fullscreen view
  return (
    <>
      <Card ref={cardRef} sx={sx}>
        <CardContent sx={{...contentSx, minHeight: 200}}>
          {/* Placeholder to maintain layout */}
          <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            opacity: 0.3,
            minHeight: 'inherit'
          }}>
            Viewing in fullscreen...
          </Box>
        </CardContent>
      </Card>
      {showFullscreen && (
        <Portal>
          <Box>
            {/* Overlay */}
            <Fade in={isFullscreen} timeout={200}>
              <FullscreenOverlay 
                onClick={handleToggleFullscreen}
                sx={{ zIndex: modalZIndex }}
              />
            </Fade>
            
            {/* Fullscreen Card */}
            <Fade in={isFullscreen} timeout={200}>
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: modalZIndex + 1,
                  pointerEvents: 'none',
                }}
              >
                <FullscreenCard 
                  onClick={(e) => e.stopPropagation()}
                  sx={{ pointerEvents: 'auto' }}
                >
                  <CardContent 
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      padding: '24px',
                      backgroundColor: 'background.paper',
                    }}
                  >
                    {renderContent()}
                  </CardContent>
                </FullscreenCard>
              </Box>
            </Fade>
          </Box>
        </Portal>
      )}
    </>
  );
});