import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ResponsiveContainer } from 'recharts';

interface ChartContainerProps {
  height: number;
  children: React.ReactElement;
  minHeight?: number;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ 
  height, 
  children, 
  minHeight 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        setIsReady(true);
      }
    };

    // Initial measurement
    updateDimensions();
    isInitialMount.current = false;

    // Debounced resize handler
    const handleResize = (entries: ResizeObserverEntry[]) => {
      // Skip if this is the initial observation
      if (isInitialMount.current) return;
      
      // Clear any existing timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      // Only set ready to false if dimensions actually changed
      const entry = entries[0];
      if (entry && entry.contentRect.width !== dimensions.width) {
        setIsReady(false);
        
        // Debounce the actual update
        resizeTimeoutRef.current = setTimeout(() => {
          updateDimensions();
        }, 200);
      }
    };

    // Create ResizeObserver for container size changes
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [height, dimensions.width]);

  return (
    <Box 
      ref={containerRef}
      sx={{ 
        width: '100%', 
        height: height,
        minHeight: minHeight || height,
        position: 'relative'
      }}
    >
      {isReady && dimensions.width > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      ) : (
        <Box 
          sx={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'text.secondary',
            opacity: 0.6
          }}
        >
          <Box sx={{ width: 40, height: 40, border: '3px solid', borderColor: 'divider', borderTopColor: 'primary.main', borderRadius: '50%', animation: 'spin 1s linear infinite', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />
        </Box>
      )}
    </Box>
  );
};