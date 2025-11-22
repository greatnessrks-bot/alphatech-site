import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// Icons imported for category representation
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CloudIcon from '@mui/icons-material/Cloud';
import MemoryIcon from '@mui/icons-material/Memory';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

// ⭐ NEW: Import course navigation context
import { useCourseNavigation } from '../context/CourseNavigationContext';

// --- MOCK CATEGORY DATA ---
const mockCategories = [
    { id: 'web-development', title: 'Web Development', description: 'Build modern, responsive, and powerful web applications.', icon: <CodeIcon sx={{ fontSize: 40 }} />, color: '#6366f1' },
    { id: 'data-science', title: 'Data Science', description: 'Master Python, R, and machine learning models for data analysis.', icon: <StorageIcon sx={{ fontSize: 40 }} />, color: '#ec4899' },
    { id: 'mobile-development', title: 'Mobile Development', description: 'Create native and cross-platform apps for iOS and Android.', icon: <PhoneIphoneIcon sx={{ fontSize: 40 }} />, color: '#06b6d4' },
    { id: 'cloud-computing', title: 'Cloud Computing', description: 'Learn AWS, Azure, and Google Cloud for scalable deployments.', icon: <CloudIcon sx={{ fontSize: 40 }} />, color: '#10b981' },
    { id: 'machine-learning', title: 'Machine Learning', description: 'Dive into deep learning, neural networks, and AI algorithms.', icon: <MemoryIcon sx={{ fontSize: 40 }} />, color: '#f59e0b' },
    { id: 'cybersecurity', title: 'Cybersecurity', description: 'Protect systems and networks from threats and vulnerabilities.', icon: <SecurityIcon sx={{ fontSize: 40 }} />, color: '#ef4444' },
    { id: 'devops', title: 'DevOps', description: 'Automate infrastructure, CI/CD, and monitoring with modern tools.', icon: <SettingsIcon sx={{ fontSize: 40 }} />, color: '#8b5cf6' },
    { id: 'ui-ux-design', title: 'UI/UX Design', description: 'Design intuitive, user-friendly interfaces with Figma and Sketch.', icon: <DesignServicesIcon sx={{ fontSize: 40 }} />, color: '#3b82f6' },
];
// --- END MOCK CATEGORY DATA ---


/**
 * CategoryCard Component
 */
const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  
  const handleViewCourses = () => {
    navigate(`/category/${category.id}`);
  };

  return (
    <Card 
      elevation={6} 
      sx={{ 
        height: 280,
        display: 'flex', 
        flexDirection: 'column',
        textAlign: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
        borderRadius: 3,
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: 12,
          cursor: 'pointer'
        }
      }}
      onClick={handleViewCourses}
    >
      <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <Box 
            sx={{ 
                color: category.color, 
                mb: 1, 
                width: 80, 
                height: 80, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: '50%',
                bgcolor: 'action.hover'
            }}
        >
            {category.icon}
        </Box>

        <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
                fontWeight: 700,
                mb: 1,
            }}
        >
            {category.title}
        </Typography>

        <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ flexGrow: 1 }}
        >
            {category.description}
        </Typography>
        
        <Button 
            size="small" 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
            onClick={(e) => {
              e.stopPropagation(); 
              handleViewCourses();
            }}
        >
          View Courses
        </Button>
      </CardContent>
    </Card>
  );
};


/**
 * Main Courses Component
 */
function Courses() {
  // ⭐ NEW: Track that user is on Courses page
  const { updateLastCoursePath } = useCourseNavigation();

  useEffect(() => {
    // Update last position when component mounts
    updateLastCoursePath('/courses');
  }, [updateLastCoursePath]);
  
  return (
    <Container maxWidth="xl" sx={{ py: 6, minHeight: '80vh' }}>
      
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Explore Course Categories
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Find the main domain that aligns with your career goals.
        </Typography>
      </Box>

      <Grid 
        container 
        spacing={4} 
        justifyContent="center"
        sx={{ px: { xs: 1, md: 4 } }}
      >
        {mockCategories.map(category => (
            <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4}
                lg={3}
                key={category.id}
            >
                <CategoryCard category={category} />
            </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Courses;