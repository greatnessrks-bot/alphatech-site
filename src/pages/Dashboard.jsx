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
  LinearProgress,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useCourseProgress } from '../context/CourseProgressContext';
import SkillCard from '../components/common/SkillCard'; 
import StatsCard from '../components/common/StatsCard'; 

// Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { 
    getAllStartedCourses, 
    getCompletionPercentage, 
    getCoursesByStatus,
    resetCourse 
  } = useCourseProgress();

  const displayName = user?.name || user?.email?.split('@')[0] || 'Learner';

  // Get real course data
  const allCourses = getAllStartedCourses();
  const inProgressCourses = getCoursesByStatus('in-progress');
  const completedCourses = getCoursesByStatus('completed');

  // Calculate stats
  const totalCoursesEnrolled = allCourses.length;
  const totalHours = allCourses.reduce((sum, course) => {
    const hours = parseFloat(course.duration) || 0;
    return sum + hours;
  }, 0);

  // Get most recent course
  const mostRecentCourse = allCourses.sort((a, b) => 
    new Date(b.lastAccessedAt) - new Date(a.lastAccessedAt)
  )[0];

  const stats = [
    { 
      id: 1, 
      title: "Courses Enrolled", 
      value: totalCoursesEnrolled.toString(), 
      color: 'primary', 
      icon: CheckCircleOutlineIcon 
    },
    { 
      id: 2, 
      title: "Hours of Content", 
      value: totalHours.toFixed(1), 
      color: 'secondary', 
      icon: TrendingUpIcon 
    },
    { 
      id: 3, 
      title: "Courses Completed", 
      value: completedCourses.length.toString(), 
      color: 'success', 
      icon: CheckCircleOutlineIcon 
    },
  ];

  // Mock skills for now (you can enhance this later)
  const mockSkills = [
    { id: 1, skillName: "React Development", progress: 75, level: "Intermediate" },
    { id: 2, skillName: "Python for Data Science", progress: 50, level: "Beginner" },
  ];

  const handleContinueLearning = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleStartAgain = (courseId) => {
    if (window.confirm('Are you sure you want to restart this course? All progress will be reset.')) {
      resetCourse(courseId);
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '80vh' }}>
      
      {/* Header */}
      <Box sx={{ mb: 4, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome back, {displayName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {allCourses.length > 0 
            ? "Ready to continue your learning journey?" 
            : "Start your first course to see your progress here!"}
        </Typography>
      </Box>

      {/* Main Grid Layout */}
      <Grid container spacing={4}>
        
        {/* Left Column */}
        <Grid item xs={12} md={8}>

          {/* Most Recent Course Card */}
          {mostRecentCourse && (
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Continue Where You Left Off
                </Typography>
                <Chip 
                  label={mostRecentCourse.status === 'completed' ? 'Completed' : 'In Progress'}
                  color={mostRecentCourse.status === 'completed' ? 'success' : 'primary'}
                  size="small"
                />
              </Box>

              <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
                {mostRecentCourse.title}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <SchoolIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {mostRecentCourse.instructor}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {mostRecentCourse.duration}
                  </Typography>
                </Box>
                <Chip label={mostRecentCourse.level} size="small" variant="outlined" />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {getCompletionPercentage(mostRecentCourse.courseId)}% Complete
                </Typography>
              </Box>

              <LinearProgress 
                variant="determinate" 
                value={getCompletionPercentage(mostRecentCourse.courseId)} 
                sx={{ height: 10, borderRadius: 5, mb: 2 }} 
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                {mostRecentCourse.status === 'completed' ? (
                  <Button 
                    variant="outlined" 
                    startIcon={<RefreshIcon />}
                    onClick={() => handleStartAgain(mostRecentCourse.courseId)}
                  >
                    Start Again
                  </Button>
                ) : (
                  <Button 
                    variant="contained" 
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => handleContinueLearning(mostRecentCourse.courseId)}
                  >
                    Continue Learning
                  </Button>
                )}
              </Box>
            </Paper>
          )}

          {/* All Enrolled Courses */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
              Your Courses ({allCourses.length})
            </Typography>
            
            {allCourses.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No courses yet!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Start your learning journey by exploring our course catalog.
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/courses')}
                >
                  Browse Courses
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {allCourses.map(course => {
                  const progress = getCompletionPercentage(course.courseId);
                  const isCompleted = course.status === 'completed';

                  return (
                    <Grid item xs={12} sm={6} key={course.courseId}>
                      <Card 
                        elevation={2} 
                        sx={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          '&:hover': { boxShadow: 4 }
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Chip 
                              label={isCompleted ? 'Completed' : 'In Progress'}
                              color={isCompleted ? 'success' : 'primary'}
                              size="small"
                            />
                            <Chip label={course.level} size="small" variant="outlined" />
                          </Box>

                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {course.title}
                          </Typography>

                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            By {course.instructor}
                          </Typography>

                          <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="caption" color="text.secondary">
                                Progress
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {progress}%
                              </Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={progress} 
                              sx={{ height: 6, borderRadius: 3 }} 
                            />
                          </Box>

                          {isCompleted ? (
                            <Button 
                              fullWidth
                              variant="outlined"
                              startIcon={<RefreshIcon />}
                              onClick={() => handleStartAgain(course.courseId)}
                            >
                              Start Again
                            </Button>
                          ) : (
                            <Button 
                              fullWidth
                              variant="contained"
                              endIcon={<ArrowForwardIcon />}
                              onClick={() => handleContinueLearning(course.courseId)}
                            >
                              Continue Learning
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
          
          <Divider sx={{ my: 3 }} />

          {/* Skill Focus */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Skill Focus
            </Typography>
            <Grid container spacing={3}>
              {mockSkills.map(skill => (
                <Grid item xs={12} sm={6} key={skill.id}>
                  <SkillCard {...skill} /> 
                </Grid>
              ))}
            </Grid>
          </Box>

        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          
          {/* Stats */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Your Progress
            </Typography>
            <Grid container spacing={2}>
              {stats.map(stat => (
                <Grid item xs={12} key={stat.id}>
                  <StatsCard 
                    title={stat.title} 
                    value={stat.value} 
                    icon={stat.icon} 
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Account Quick Links */}
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

        </Grid>

      </Grid>
    </Container>
  );
}

export default Dashboard;