import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Chip,
  Rating,
  Paper,
} from '@mui/material';

import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// 🔥 IMPORT AUTH CONTEXT
import { useAuth } from '../context/AuthContext';
import { detailedCourses } from '../data/courses.js';

// ⭐ NEW: Import course navigation context
import { useCourseNavigation } from '../context/CourseNavigationContext';

const categoryNames = {
  'web-development': 'Web Development',
  'data-science': 'Data Science',
  'mobile-development': 'Mobile Development',
  'cloud-computing': 'Cloud Computing',
  'machine-learning': 'Machine Learning',
  'cybersecurity': 'Cybersecurity',
  'devops': 'DevOps',
  'ui-ux-design': 'UI/UX Design',
};

// Helper for chip color
const getLevelColor = (level) => {
  switch(level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'primary';
  }
};

// ⭐ UPDATED Course List Item
const CourseListItem = ({ course, navigate }) => {
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (!user) {
      navigate('/signup');
    } else {
      navigate(`/course/${course.id}`);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Box sx={{ flexGrow: 1, mr: { md: 3 }, mb: { xs: 2, md: 0 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mr: 1 }}>
            {course.title}
          </Typography>
          <Chip 
            label={course.level}
            size="small"
            color={getLevelColor(course.level)}
          />
        </Box>

        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">{course.duration}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating value={course.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {course.rating}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ({(course.students / 1000).toFixed(1)}k students)
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SchoolIcon fontSize="small" />
            <Typography variant="body2">Taught by **{course.instructor}**</Typography>
          </Box>
        </Box>
      </Box>

      <Button 
        variant="contained"
        size="large"
        sx={{ fontWeight: 700, minWidth: { xs: '100%', md: '180px' } }}
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
    </Paper>
  );
};



function CategoryDetail() {
  const { categoryID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // ⭐ NEW: Course navigation tracking
  const { updateLastCoursePath, resetToCoursesHome } = useCourseNavigation();

  const categoryName = categoryNames[categoryID] || 'Unknown Category';

  // ⭐ NEW: Track current path when component mounts
  useEffect(() => {
    updateLastCoursePath(location.pathname);
  }, [location.pathname, updateLastCoursePath]);

  // 1. Filter courses by categoryID
  let filteredCourses = detailedCourses.filter(
    (course) => course.categoryId === categoryID
  );
  
  // 2. Sort courses by level
  const levelOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
  filteredCourses.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);

  // ⭐ NEW: Handle back button - resets to courses home
  const handleBackToCourses = () => {
    resetToCoursesHome();
    navigate('/courses');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6, minHeight: '80vh' }}>

      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToCourses}
          color="secondary"
          sx={{ mb: 2, textTransform: 'none', fontWeight: 600 }}
        >
          Back to Categories
        </Button>

        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
          {categoryName} Learning Path 🚀
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Follow the step-by-step path from **Beginner** to **Advanced** to become a professional.
        </Typography>
      </Box>

      {filteredCourses.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredCourses.map(course => (
            <CourseListItem 
              key={course.id}
              course={course}
              navigate={navigate}
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ p: 6, textAlign: 'center', mt: 4 }}>
          <Typography variant="h5">No courses found for this category yet.</Typography>
        </Box>
      )}

    </Container>
  );
}

export default CategoryDetail;