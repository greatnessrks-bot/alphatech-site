import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

// Minimum functional component
const StatsCard = ({ title = "Metric", value = 0, color = "primary" }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" color={`${color}.main`}>
          {value}
        </Typography>
        {/* Placeholder for trend or subtitle */}
        <Typography variant="caption" color="text.secondary">
          Last 30 days
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;