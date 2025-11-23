import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent, // <-- Ensure CardContent is used
  Avatar,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Icons
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import greatnezImg from '../assets/greatnez.jpg';

function About() {
  const navigate = useNavigate();

  // Platform Stats
  const stats = [
    { value: '50+', label: 'Expert Courses', icon: SchoolIcon, color: '#6366f1' },
    { value: '10k+', label: 'Active Learners', icon: GroupsIcon, color: '#ec4899' },
    { value: '98%', label: 'Success Rate', icon: TrendingUpIcon, color: '#10b981' },
    { value: '24/7', label: 'Support Available', icon: VerifiedUserIcon, color: '#f59e0b' },
  ];

  // Core Values
  const values = [
    {
      icon: EmojiObjectsIcon,
      title: 'Innovation First',
      description: 'We constantly update our curriculum with the latest technologies and industry best practices.',
      color: '#6366f1',
    },
    {
      icon: FavoriteIcon,
      title: 'Student Success',
      description: 'Your growth is our priority. We provide personalized learning paths and dedicated support.',
      color: '#ec4899',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Career Ready',
      description: 'Our courses are designed with industry needs in mind, preparing you for real-world challenges.',
      color: '#10b981',
    },
    {
      icon: AutoAwesomeIcon,
      title: 'Quality Education',
      description: 'Learn from industry experts with years of practical experience and proven teaching methods.',
      color: '#f59e0b',
    },
  ];

  // Team Members
  const team = [
    {
      name: 'Greatnez',
      role: 'CEO & Founder',
      image: greatnezImg,
      description: 'Expert Frontend dev, still learning backend.',
    },
    {
      name: 'Calipher',
      role: 'Manager and Shareholder',
      image: 'https://i.pravatar.cc/150?img=12',
      description: 'Expert Frontend dev doing his internship at WOF.',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          color: 'white',
          py: 10,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                textAlign: 'center',
              }}
            >
              About AlphaTech
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                opacity: 0.95,
                maxWidth: 800,
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              Empowering the next generation of tech professionals through innovative,
              accessible, and industry-relevant education.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={3} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: `${stat.color}20`,
                    mb: 2,
                  }}
                >
                  <stat.icon sx={{ fontSize: 40, color: stat.color }} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: stat.color,
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Paper elevation={3} sx={{ p: 6, borderRadius: 3 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              textAlign: 'center',
              color: 'primary.main',
            }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              lineHeight: 1.8,
              maxWidth: 900,
              mx: 'auto',
            }}
          >
            At AlphaTech, we believe that quality tech education should be accessible to everyone,
            everywhere. We're committed to breaking down barriers and creating pathways for
            aspiring developers, data scientists, designers, and tech professionals to achieve
            their dreams. Our platform combines cutting-edge content, hands-on projects, and
            a supportive community to ensure every student succeeds.
          </Typography>
        </Paper>
      </Container>

      {/* Core Values Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 6,
            textAlign: 'center',
          }}
        >
          Our Core Values
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'all 0.3s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: `${value.color}20`,
                    mb: 2,
                  }}
                >
                  <value.icon sx={{ fontSize: 40, color: value.color }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    textAlign: 'center',
                  }}
                >
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  {value.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Story Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Our Story
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  mb: 2,
                  color: 'text.secondary',
                }}
              >
                AlphaTech was born from a simple observation: traditional tech education was
                failing too many talented individuals. High costs, rigid schedules, and
                outdated curricula were keeping people from reaching their potential.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  mb: 2,
                  color: 'text.secondary',
                }}
              >
                Founded in 2023 by Greatnez and Calipher, we set out to
                create something different. A platform where anyone, regardless of their
                background, could learn the skills they need to thrive in tech.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: 'text.secondary',
                }}
              >
                Today, we're proud to serve thousands of students worldwide, helping them
                launch careers, switch industries, and level up their skills. But we're just
                getting started.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    textAlign: 'center',
                    p: 4,
                  }}
                >
                  Building the Future
                  <br />
                  One Student at a Time
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            textAlign: 'center',
          }}
        >
          Meet Our Team
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 6,
          }}
        >
          The Brains behind AlphaTech
        </Typography>
        {/* Equal Height Fix applied here: Grid item is 100%, Card is flex column, CardContent flexGrow: 1 */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}> {/* Changed md={3} to md={4} to ensure two items fit better with a possible wide gap */}
              <Card
                elevation={2}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  transition: 'all 0.3s',
                  display: 'flex', // Crucial for equal height
                  flexDirection: 'column', // Crucial for equal height
                  alignItems: 'center',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main',
                  }}
                />
                <CardContent // Wrap the text content
                  sx={{
                    p: 0, // Reset padding
                    pt: 1, // Add slight top padding
                    flexGrow: 1, // Card content takes up all available space
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                      textAlign: 'center',
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary.main"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      textAlign: 'center',
                    }}
                  >
                    {member.role}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      textAlign: 'center',
                      flexGrow: 1, // Pushes the description to the bottom edge if needed, or takes up space
                      display: 'flex', // Allows text to be centered if it's very short
                      alignItems: 'flex-end'
                    }}
                  >
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Ready to Start Learning?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.95,
              }}
            >
              Join thousands of students already transforming their careers with AlphaTech
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/courses')}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  },
                }}
              >
                Browse Courses
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/signup')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Sign Up Free
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default About;