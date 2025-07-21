import React, { useState, useRef, useEffect } from 'react';
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

interface FullscreenableCardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  sx?: any;
  contentSx?: any;
}

const FullscreenOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  zIndex: theme.zIndex.modal - 1,
  backdropFilter: 'blur(4px)',
}));

const FullscreenCard = styled(Card)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  height: '90vh',
  maxWidth: '1400px',
  maxHeight: '900px',
  zIndex: theme.zIndex.modal,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[24],
}));

export const FullscreenableCard: React.FC<FullscreenableCardProps> = ({
  children,
  title,
  actions,
  sx = {},
  contentSx = {}
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
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
  }, [isFullscreen]);

  const handleToggleFullscreen = () => {
    setIsTransitioning(true);
    setIsFullscreen(!isFullscreen);
    // Allow transition to complete before re-rendering charts
    setTimeout(() => {
      setIsTransitioning(false);
    }, 350);
  };

  const cardContent = (
    <CardContent 
      sx={{
        ...contentSx,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: isFullscreen ? '24px' : contentSx.padding || '20px !important',
      }}
    >
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
          size="small"
          sx={{
            backgroundColor: isFullscreen ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)',
            '&:hover': {
              backgroundColor: isFullscreen ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)',
            },
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
            onClick={() => setIsFullscreen(false)}
            size="small"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
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
        opacity: isTransitioning ? 0 : 1, 
        transition: 'opacity 0.2s ease-in-out',
        visibility: isTransitioning ? 'hidden' : 'visible'
      }}>
        {children}
      </Box>
    </CardContent>
  );

  if (!isFullscreen) {
    return (
      <Card ref={cardRef} sx={sx}>
        {cardContent}
      </Card>
    );
  }

  return (
    <>
      <Card ref={cardRef} sx={sx}>
        <CardContent sx={contentSx}>
          {/* Placeholder to maintain layout */}
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
            Viewing in fullscreen...
          </Box>
        </CardContent>
      </Card>
      <Portal>
        <Fade in={isFullscreen} timeout={300}>
          <FullscreenOverlay onClick={() => setIsFullscreen(false)} />
        </Fade>
        <Fade in={isFullscreen} timeout={300}>
          <FullscreenCard onClick={(e) => e.stopPropagation()}>
            {cardContent}
          </FullscreenCard>
        </Fade>
      </Portal>
    </>
  );
};