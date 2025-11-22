import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

// Minimum functional component
const SkillCard = ({ skillName = "Unknown Skill", level = "Novice" }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="text.primary">
          {skillName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Level: {level}
        </Typography>
        {/* Placeholder for the real logic (like a progress bar) */}
        <Box sx={{ height: 4, bgcolor: 'primary.light', mt: 1 }} /> 
      </CardContent>
    </Card>
  );
};

export default SkillCard;