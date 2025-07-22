import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  Stack,
  Button,
  Paper,
  TextField
} from '@mui/material';
import {
  Description,
  Edit,
  Save,
  Download
} from '@mui/icons-material';
import { HMDAProject } from '../../../../../types/Project';

interface ConceptNotePreparationScreenProps {
  project: HMDAProject;
  onUpdate: (updates: Partial<HMDAProject>) => void;
  compactMode?: boolean;
}

const ConceptNotePreparationScreen: React.FC<ConceptNotePreparationScreenProps> = ({
  project,
  onUpdate,
  compactMode = false
}) => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Concept Note Preparation
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<Edit />}>
            Edit
          </Button>
          <Button variant="outlined" startIcon={<Download />}>
            Export PDF
          </Button>
          <Button variant="contained" startIcon={<Save />}>
            Save Draft
          </Button>
        </Stack>
      </Stack>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Concept note draft is 85% complete. Review and finalization pending.
      </Alert>

      <Box display="flex" flexWrap="wrap" gap={3}>
        <Box flex="2 1 600px">
          <Paper sx={{ p: 3, height: 600 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Concept Note Editor
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={20}
              variant="outlined"
              value={`# PROJECT CONCEPT NOTE
# Gachibowli IT Corridor Road Development

## 1. PROJECT BACKGROUND
The proposed road development project aims to enhance connectivity between residential areas and the IT corridor in Gachibowli. This project addresses critical traffic congestion issues and supports economic growth in the region.

## 2. PROJECT OBJECTIVES
- Improve traffic flow and reduce commute times
- Support IT sector growth and development
- Enhance last-mile connectivity for residents
- Reduce environmental impact through better traffic management

## 3. PROJECT SCOPE
- Construction of 4-lane divided carriageway
- Length: 5.2 kilometers
- Width: 30 meters (including footpaths and utilities)
- 3 major intersections with signal systems
- Underground utilities and drainage

## 4. ESTIMATED COST
Total Project Cost: ₹45.2 Crores
- Civil Works: ₹32.5 Cr
- Electrical & Utilities: ₹5.5 Cr
- Land Acquisition: ₹7.2 Cr

## 5. IMPLEMENTATION TIMELINE
- Phase 1 (Design & Approvals): 6 months
- Phase 2 (Construction): 18 months
- Total Duration: 24 months

## 6. EXPECTED BENEFITS
- Reduction in travel time by 35%
- Improved accessibility to IT parks
- Enhanced property values in the area
- Better emergency services access`}
              sx={{
                '& .MuiInputBase-root': {
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }
              }}
            />
          </Paper>
        </Box>
        
        <Box flex="1 1 300px">
          <Stack gap={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Document Status
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Progress</Typography>
                    <Typography variant="body2" fontWeight={600}>85%</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Word Count</Typography>
                    <Typography variant="body2" fontWeight={600}>1,245</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Last Modified</Typography>
                    <Typography variant="body2" fontWeight={600}>2 hours ago</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Version</Typography>
                    <Typography variant="body2" fontWeight={600}>v2.1</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Review Comments
                </Typography>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  3 pending review comments from technical team
                </Alert>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    • Add traffic simulation results
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Include environmental clearance status
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Update cost breakdown details
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default ConceptNotePreparationScreen;