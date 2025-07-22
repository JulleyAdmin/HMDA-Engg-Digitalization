import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { FullscreenableCard } from '../FullscreenableCard';
import SmartSidebar from './SmartSidebar';
import { HMDAProject, ProjectStage } from '../../types/Project';

interface SmartSidebarWrapperProps {
  project: HMDAProject;
  currentStage: ProjectStage;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const SmartSidebarWrapper: React.FC<SmartSidebarWrapperProps> = ({ 
  project, 
  currentStage,
  onCollapsedChange 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  const handleCollapsedChange = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onCollapsedChange?.(collapsed);
  };

  // If collapsed, render SmartSidebar directly without FullscreenableCard wrapper
  if (isCollapsed) {
    return (
      <SmartSidebar 
        project={project}
        currentStage={currentStage}
        onCollapsedChange={handleCollapsedChange}
      />
    );
  }

  // If expanded, wrap with FullscreenableCard
  return (
    <FullscreenableCard
      title={
        <Typography variant="h6" fontWeight={600}>
          Smart Sidebar - {project.projectName}
        </Typography>
      }
      sx={{
        height: '100%',
        bgcolor: 'transparent',
        boxShadow: 'none',
        border: 'none',
        overflow: 'visible'
      }}
      contentSx={{
        p: 0,
        height: '100%',
        overflow: 'auto'
      }}
      zIndexOffset={0} // Same level as main dashboard
    >
      <SmartSidebar 
        project={project}
        currentStage={currentStage}
        onCollapsedChange={handleCollapsedChange}
      />
    </FullscreenableCard>
  );
};

export default SmartSidebarWrapper;