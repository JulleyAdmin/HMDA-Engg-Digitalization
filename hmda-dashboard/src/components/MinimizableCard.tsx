import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Box,
  Typography,
  Collapse,
  Fade,
  useTheme,
  styled,
  Badge,
  Tooltip,
  Stack,
  Chip
} from '@mui/material';
import {
  Minimize,
  Maximize,
  ExpandLess,
  ExpandMore,
  PushPin,
  PushPinOutlined
} from '@mui/icons-material';

interface MinimizableCardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  badge?: number | string;
  badgeColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  persistKey?: string; // Key to persist minimize state in localStorage
  defaultMinimized?: boolean;
  minimizedContent?: React.ReactNode; // Custom content to show when minimized
  showPinButton?: boolean;
  onMinimizeChange?: (minimized: boolean) => void;
  sx?: any;
  contentSx?: any;
  minimizedSx?: any;
  disableMinimize?: boolean;
}

const MinimizedCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export const MinimizableCard: React.FC<MinimizableCardProps> = ({
  children,
  title,
  icon,
  actions,
  badge,
  badgeColor = 'primary',
  persistKey,
  defaultMinimized = false,
  minimizedContent,
  showPinButton = false,
  onMinimizeChange,
  sx = {},
  contentSx = {},
  minimizedSx = {},
  disableMinimize = false
}) => {
  const theme = useTheme();
  const [isMinimized, setIsMinimized] = useState(() => {
    if (persistKey) {
      const saved = localStorage.getItem(`minimized-${persistKey}`);
      return saved ? saved === 'true' : defaultMinimized;
    }
    return defaultMinimized;
  });
  const [isPinned, setIsPinned] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (persistKey) {
      localStorage.setItem(`minimized-${persistKey}`, String(isMinimized));
    }
    onMinimizeChange?.(isMinimized);
  }, [isMinimized, persistKey, onMinimizeChange]);

  const handleToggleMinimize = (event?: React.MouseEvent) => {
    event?.stopPropagation();
    if (!disableMinimize) {
      setIsAnimating(true);
      setIsMinimized(!isMinimized);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleTogglePin = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsPinned(!isPinned);
  };

  // Minimized view
  if (isMinimized) {
    return (
      <MinimizedCard
        sx={{
          ...minimizedSx,
          position: isPinned ? 'sticky' : 'relative',
          top: isPinned ? 0 : 'auto',
          zIndex: isPinned ? 1000 : 'auto',
        }}
        onClick={handleToggleMinimize}
      >
        <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ width: '100%' }}
          >
            {/* Icon */}
            {icon && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.primary.main,
                }}
              >
                {badge !== undefined ? (
                  <StyledBadge badgeContent={badge} color={badgeColor}>
                    {icon}
                  </StyledBadge>
                ) : (
                  icon
                )}
              </Box>
            )}

            {/* Title or custom minimized content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {minimizedContent || (
                <Typography variant="body2" noWrap fontWeight={600}>
                  {title}
                </Typography>
              )}
            </Box>

            {/* Actions */}
            <Stack direction="row" spacing={0.5} alignItems="center">
              {showPinButton && (
                <Tooltip title={isPinned ? 'Unpin' : 'Pin to top'}>
                  <IconButton
                    size="small"
                    onClick={handleTogglePin}
                    sx={{ p: 0.5 }}
                  >
                    {isPinned ? (
                      <PushPin fontSize="small" />
                    ) : (
                      <PushPinOutlined fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Expand">
                <IconButton
                  size="small"
                  onClick={handleToggleMinimize}
                  sx={{ p: 0.5 }}
                >
                  <ExpandMore fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </CardContent>
      </MinimizedCard>
    );
  }

  // Expanded view
  return (
    <Card
      sx={{
        ...sx,
        position: isPinned ? 'sticky' : 'relative',
        top: isPinned ? 0 : 'auto',
        zIndex: isPinned ? 1000 : 'auto',
      }}
    >
      <CardContent 
        sx={{
          ...contentSx,
          position: 'relative',
        }}
      >
        {/* Header with minimize button */}
        {(title || !disableMinimize) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: title ? 2 : 0,
            }}
          >
            {/* Title with icon */}
            {title && (
              <Stack direction="row" alignItems="center" spacing={1.5}>
                {icon && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: theme.palette.primary.main,
                    }}
                  >
                    {badge !== undefined ? (
                      <StyledBadge badgeContent={badge} color={badgeColor}>
                        {icon}
                      </StyledBadge>
                    ) : (
                      icon
                    )}
                  </Box>
                )}
                <Box>{title}</Box>
              </Stack>
            )}

            {/* Action buttons */}
            <Stack direction="row" spacing={0.5} alignItems="center">
              {actions}
              {showPinButton && (
                <Tooltip title={isPinned ? 'Unpin' : 'Pin to top'}>
                  <IconButton
                    size="small"
                    onClick={handleTogglePin}
                  >
                    {isPinned ? (
                      <PushPin fontSize="small" />
                    ) : (
                      <PushPinOutlined fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              )}
              {!disableMinimize && (
                <Tooltip title="Minimize">
                  <IconButton
                    size="small"
                    onClick={handleToggleMinimize}
                  >
                    <ExpandLess fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>
        )}

        {/* Content with fade animation */}
        <Fade in={!isAnimating} timeout={200}>
          <Box>{children}</Box>
        </Fade>
      </CardContent>
    </Card>
  );
};

// Convenience component for collapsible sections within cards
export const CollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  badge?: string | number;
}> = ({ title, children, defaultExpanded = true, badge }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Box>
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          py: 1,
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2" fontWeight={600}>
            {title}
          </Typography>
          {badge !== undefined && (
            <Chip label={badge} size="small" />
          )}
        </Stack>
        <IconButton size="small">
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ pt: 1 }}>{children}</Box>
      </Collapse>
    </Box>
  );
};