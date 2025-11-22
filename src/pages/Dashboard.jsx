import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Divider, 
  Paper,
  LinearProgress
} from '@mui/material';
import { useAuth } from '../context/AuthContext'; 
import SkillCard from '../components/common/SkillCard'; 
import StatsCard from '../components/common/StatsCard'; 
// Optional: Import specific icons for professional look
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Dashboard() {
  const { user, logout } = useAuth();
  const displayName = user?.name || user?.email?.split('@')[0] || 'Learner';

  // --- Mock Data for Realistic Display ---
  const mockStats = [
    { id: 1, title: "Courses Enrolled", value: "8", color: 'primary', icon: CheckCircleOutlineIcon },
    { id: 2, title: "Hours Logged", value: "45.5", color: 'secondary', icon: TrendingUpIcon },
    { id: 3, title: "Next Due Assignment", value: "3 Days", color: 'error', icon: null },
  ];

  const mockSkills = [
    { id: 1, skillName: "React Development", progress: 75, level: "Intermediate" },
    { id: 2, skillName: "Python for Data Science", progress: 50, level: "Beginner" },
  ];

  const mockInProgressCourse = {
    title: "Full Stack Web Development (MERN)",
    progress: 65, // 65% complete
    nextModule: "API Design with Node.js",
  };
  // ----------------------------------------

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '80vh' }}>
      
      {/* 1. Header and Welcome Section */}
      <Box sx={{ mb: 4, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome back, {displayName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ready to continue your learning journey?
        </Typography>
      </Box>

      {/* 2. Main Grid Layout (Sidebar & Content) */}
      <Grid container spacing={4}>
        
        {/* === Left Column: Progress and Quick Actions (md=8) === */}
        <Grid item xs={12} md={8}>

          {/* A. Course In Progress Card */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Your Learning Streak
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="primary.main">
                {mockInProgressCourse.title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {mockInProgressCourse.progress}% Complete
              </Typography>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={mockInProgressCourse.progress} 
              sx={{ height: 10, borderRadius: 5, mb: 2 }} 
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Next: **{mockInProgressCourse.nextModule}**
                </Typography>
                <Button 
                    variant="contained" 
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => console.log('Navigate to Course')}
                >
                    Continue
                </Button>
            </Box>
          </Paper>

          {/* B. Skill Development & Recommended Content */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Skill Focus
            </Typography>
            <Grid container spacing={3}>
                {mockSkills.map(skill => (
                    <Grid item xs={12} sm={6} key={skill.id}>
                        {/* Use the common SkillCard component here */}
                        <SkillCard {...skill} /> 
                    </Grid>
                ))}
            </Grid>
          </Box>
          
          <Divider sx={{ my: 3 }} />

          {/* C. Suggested Courses / Recommendations */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Top Recommendations
            </Typography>
            {/* Placeholder for list of recommended course cards */}
            <Typography variant="body1" color="text.secondary">
                [Space for dynamically loaded Course Cards based on user history or skills.]
            </Typography>
          </Box>

        </Grid> {/* === END Left Column === */}


        {/* === Right Column: Stats and Account Actions (md=4) === */}
        <Grid item xs={12} md={4}>
          
          {/* D. Learning Statistics */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Your Progress
            </Typography>
            <Grid container spacing={2}>
              {mockStats.map(stat => (
                <Grid item xs={12} key={stat.id}>
                  {/* Use the common StatsCard component here */}
                  <StatsCard 
                    title={stat.title} 
                    value={stat.value} 
                    icon={stat.icon} 
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* E. Account Quick Links */}
          <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Account & Settings
            </Typography>
            <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
                Edit Profile
            </Button>
            <Button fullWidth variant="outlined" sx={{ mb: 2 }}>
                Billing and Subscriptions
            </Button>
            <Divider sx={{ my: 1 }} />
            <Button 
              fullWidth 
              variant="contained" 
              color="secondary" 
              onClick={logout}
              sx={{ mt: 1 }}
            >
              Log Out
            </Button>
          </Paper>

        </Grid> {/* === END Right Column === */}

      </Grid>
    </Container>
  );
}

export default Dashboard;