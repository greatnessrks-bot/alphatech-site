import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Rating,
} from '@mui/material';
import {
  PlayCircleOutline,
  AccessTime,
  TrendingUp,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import herobg from '../assets/herobg.jpg'; 

const Landing = () => {
  const navigate = useNavigate();

  // Mock course data and other constant data remain the same...
  const featuredCourses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      instructor: 'Sarah Johnson',
      rating: 4.8,
      students: '45,230',
      duration: '12 hours',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      category: 'Web Development',
    },
    {
      id: 2,
      title: 'Node.js: The Complete Guide',
      instructor: 'Michael Chen',
      rating: 4.9,
      students: '38,150',
      duration: '16 hours',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      category: 'Backend Development',
    },
    {
      id: 3,
      title: 'Python for Data Science',
      instructor: 'Emily Rodriguez',
      rating: 4.7,
      students: '52,890',
      duration: '20 hours',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      category: 'Data Science',
    },
    {
      id: 4,
      title: 'AWS Cloud Practitioner',
      instructor: 'David Kim',
      rating: 4.8,
      students: '29,450',
      duration: '10 hours',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
      category: 'Cloud Computing',
    },
  ];

  const categories = [
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Cloud Computing',
    'Machine Learning',
    'Cybersecurity',
    'DevOps',
    'UI/UX Design',
  ];

  const stats = [
    { value: '200+', label: 'Expert-Led Courses' },
    { value: '50K+', label: 'Active Learners' },
    { value: '95%', label: 'Success Rate' },
    { value: '24/7', label: 'Learning Access' },
  ];

  return (
    <Box>
      {/* Hero Section - Aligned Left */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${herobg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: { xs: '60vh', md: '70vh' },
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center"> 
            {/* Removed justifyContent="center" from Grid container */}
            
            {/* Grid item adjustments */}
            <Grid item xs={12} md={6} sx={{ 
              maxWidth: 800, // Reduced max width to keep it on the left
              mx: 'unset', // Resetting auto margins
              textAlign: 'left' // IMPORTANT: Align text content to the left
            }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 3,
                  color: 'white',
                }}
              >
                Learn Without Limits
              </Typography>
              <Typography
                variant="h6"
                color="rgba(255,255,255,0.85)"
                sx={{ mb: 4, lineHeight: 1.7, fontWeight: 400 }}
              >
                Start, switch, or advance your career with thousands of courses,
                Professional Certificates, and degrees from world-class universities
                and companies.
              </Typography>
              {/* Button Box adjustments */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-start' }}> 
              {/* IMPORTANT: Aligned buttons to the start/left */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                    }
                  }}
                >
                  Join for Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/courses')}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderColor: 'rgba(255,255,255,0.7)',
                    }
                  }}
                >
                  Explore Courses
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Bar (Original Position) */}
      <Box sx={{ bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      mb: 0.5,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Courses */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" sx={{ mb: 1, fontWeight: 700 }}>
            Featured Courses
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore our most popular courses and start learning today
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {featuredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={course.image}
                    alt={course.title}
                  />
                  <Chip
                    label={course.level}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    {course.category}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 1,
                      mb: 1.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      lineHeight: 1.4,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5, fontSize: '0.875rem' }}
                  >
                    {course.instructor}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Rating value={course.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {course.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({course.students})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {course.duration}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/courses')}
          >
            View All Courses
          </Button>
        </Box>
      </Container>

      {/* Browse by Category */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ mb: 1, fontWeight: 700, textAlign: 'center' }}>
            Explore by Category
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 5, textAlign: 'center' }}
          >
            Find the perfect course for your learning goals
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => navigate('/courses')}
                sx={{
                  px: 2,
                  py: 3,
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
                    color: 'white',
                  },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ mb: 1, fontWeight: 700, textAlign: 'center' }}>
          Why Learn With Us?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 6, textAlign: 'center', maxWidth: 700, mx: 'auto' }}
        >
          We provide the tools and resources you need to advance your career
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <PlayCircleOutline sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                Learn from Experts
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Access courses created by industry professionals with real-world
                experience
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'secondary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <TrendingUp sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                Track Your Progress
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Monitor your learning journey with detailed analytics and achievements
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'success.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <CheckCircle sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                Get Certified
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Earn certificates to showcase your skills and boost your career prospects
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{ mb: 2, fontWeight: 700, color: 'white' }}
            >
              Start Your Learning Journey Today
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, color: 'rgba(255,255,255,0.95)' }}
            >
              Join thousands of learners who are already advancing their careers
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Get Started for Free
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;