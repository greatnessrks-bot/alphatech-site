import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  IconButton,
  Paper,
  LinearProgress,
} from '@mui/material';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BookOpenIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';

import { detailedCourses } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import { useCourseNavigation } from '../context/CourseNavigationContext';
import { useCourseProgress } from '../context/CourseProgressContext';

const getLevelColor = (level) => {
  switch (level) {
    case 'Beginner': return 'success';
    case 'Intermediate': return 'warning';
    case 'Advanced': return 'error';
    default: return 'primary';
  }
};

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // ⭐ NEW: Course navigation tracking
  const { updateLastCoursePath, resetToCoursesHome } = useCourseNavigation();
  
  // ⭐ NEW: Course progress tracking
  const { 
    startCourse, 
    markLessonComplete, 
    updateCurrentLesson, 
    saveNotes: saveNotesToProgress,
    getCourseProgress 
  } = useCourseProgress();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState({ 1: true });
  const [currentLesson, setCurrentLesson] = useState({ moduleId: 1, lessonId: 0 });
  const [completedLessons, setCompletedLessons] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showResources, setShowResources] = useState(false);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState('');
  const [progressLoaded, setProgressLoaded] = useState(false);

  // Find the course
  const course = detailedCourses.find((c) => String(c.id) === String(id));

  // Auto-save notes
  useEffect(() => {
    const key = `${currentLesson.moduleId}-${currentLesson.lessonId}`;
    setCurrentNote(notes[key] || '');
  }, [currentLesson, notes]);
  
  // ⭐ NEW: Track current path when component mounts (only if logged in)
  useEffect(() => {
    if (user) {
      updateLastCoursePath(location.pathname);
    }
  }, [location.pathname, updateLastCoursePath, user]);

  // ⭐ NEW: Load saved progress when course loads
  useEffect(() => {
    if (user && course && !progressLoaded) {
      const savedProgress = getCourseProgress(course.id);
      
      if (savedProgress) {
        // Restore previous progress
        setCurrentLesson(savedProgress.currentLesson || { moduleId: 1, lessonId: 0 });
        setCompletedLessons(savedProgress.completedLessons || {});
        setNotes(savedProgress.notes || {});
        
        // Expand the current module
        setExpandedModules(prev => ({
          ...prev,
          [savedProgress.currentLesson?.moduleId || 1]: true
        }));
      } else {
        // First time visiting this course - register it
        startCourse(course.id, {
          title: course.title,
          categoryId: course.categoryId,
          instructor: course.instructor,
          level: course.level,
          duration: course.duration,
          rating: course.rating,
          totalLessons: 12, // 3 modules x 4 lessons
        });
      }
      
      setProgressLoaded(true);
    }
  }, [user, course, progressLoaded, getCourseProgress, startCourse]);

  if (!course) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Course Not Found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/courses')}>
          Back to Courses
        </Button>
      </Container>
    );
  }

  // Generate dynamic modules based on course level and category
  const modules = [
    {
      id: 1,
      title: "Module 1: Introduction & Foundations",
      lessons: [
        { 
          id: 0, 
          title: "Welcome to the Course", 
          content: `Welcome to **${course.title}**! This comprehensive ${course.level.toLowerCase()} course will guide you through everything you need to know. With a rating of ${course.rating} ⭐ from ${(course.students / 1000).toFixed(1)}k students, you're in great hands with instructor ${course.instructor}.` 
        },
        { 
          id: 1, 
          title: "Course Overview & Learning Objectives", 
          content: `${course.description} Throughout this ${course.duration} journey, you'll master fundamental concepts and build practical skills that professionals use daily. By the end, you'll have a portfolio-ready understanding of the subject matter.` 
        },
        { 
          id: 2, 
          title: "Setting Up Your Environment", 
          content: "Before diving into the core material, let's ensure your development environment is properly configured. This lesson covers all the tools, software, and resources you'll need. We'll walk through installation steps and verify everything is working correctly." 
        },
        { 
          id: 3, 
          title: "Core Concepts Introduction", 
          content: "Now let's explore the foundational principles that form the backbone of this subject. Understanding these core concepts is crucial for everything that follows. We'll break down complex topics into digestible pieces." 
        },
      ],
    },
    {
      id: 2,
      title: "Module 2: Building Core Skills",
      lessons: [
        { 
          id: 0, 
          title: "Deep Dive into Key Topics", 
          content: "Now that you understand the basics, we'll explore advanced concepts that separate beginners from experts. This module focuses on practical application and real-world scenarios." 
        },
        { 
          id: 1, 
          title: "Hands-On Practice Exercises", 
          content: "Theory is important, but practice makes perfect. In this lesson, you'll complete guided exercises that reinforce your understanding. Take your time and experiment with different approaches." 
        },
        { 
          id: 2, 
          title: "Real-World Case Studies", 
          content: "See how industry professionals apply these concepts in production environments. We'll analyze successful projects, common pitfalls, and best practices you can implement immediately." 
        },
        { 
          id: 3, 
          title: "Module 2 Project Challenge", 
          content: "Test your mastery with this comprehensive project. You'll apply everything you've learned to solve a realistic problem. This is your chance to build something portfolio-worthy!" 
        },
      ],
    },
    {
      id: 3,
      title: "Module 3: Advanced Techniques",
      lessons: [
        { 
          id: 0, 
          title: "Professional Workflows & Architecture", 
          content: "Learn how to structure projects like a professional. We'll cover design patterns, scalability considerations, and industry-standard approaches to problem-solving." 
        },
        { 
          id: 1, 
          title: "Advanced Implementation Strategies", 
          content: "Dive deep into sophisticated techniques and optimization strategies. This lesson covers performance tuning, security considerations, and production-ready implementations." 
        },
        { 
          id: 2, 
          title: "Debugging & Troubleshooting Mastery", 
          content: "Even experts encounter challenges. Master professional debugging techniques, learn to read error messages effectively, and develop systematic problem-solving approaches." 
        },
        { 
          id: 3, 
          title: "Final Capstone Project", 
          content: "Congratulations on making it this far! Your final project will demonstrate mastery of all course concepts. Build a complete, production-ready solution that showcases your new skills." 
        },
      ],
    },
  ];

  // UI Handlers
  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const selectLesson = (moduleId, lessonId) => {
    setCurrentLesson({ moduleId, lessonId });
    // ⭐ Save lesson position to progress
    if (user && course) {
      updateCurrentLesson(course.id, moduleId, lessonId);
    }
  };

  const markComplete = () => {
    const key = `${currentLesson.moduleId}-${currentLesson.lessonId}`;
    setCompletedLessons(prev => ({ ...prev, [key]: true }));
    
    // ⭐ Save completion to progress context
    if (user && course) {
      markLessonComplete(course.id, currentLesson.moduleId, currentLesson.lessonId);
    }
  };

  const isCompleted = (moduleId, lessonId) => {
    return completedLessons[`${moduleId}-${lessonId}`];
  };

  const saveNote = () => {
    const key = `${currentLesson.moduleId}-${currentLesson.lessonId}`;
    setNotes(prev => ({ ...prev, [key]: currentNote }));
  };

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setCurrentNote(newNote);
    // Auto-save to local state
    const key = `${currentLesson.moduleId}-${currentLesson.lessonId}`;
    setNotes(prev => ({ ...prev, [key]: newNote }));
    
    // ⭐ Save to progress context
    if (user && course) {
      saveNotesToProgress(course.id, currentLesson.moduleId, currentLesson.lessonId, newNote);
    }
  };

  const getCurrentLessonData = () => {
    const module = modules.find(m => m.id === currentLesson.moduleId);
    return module?.lessons[currentLesson.lessonId];
  };

  const goToNextLesson = () => {
    const currentModule = modules.find(m => m.id === currentLesson.moduleId);
    if (!currentModule) return;

    if (currentLesson.lessonId < currentModule.lessons.length - 1) {
      setCurrentLesson({ moduleId: currentLesson.moduleId, lessonId: currentLesson.lessonId + 1 });
    } else {
      const nextModule = modules.find(m => m.id === currentLesson.moduleId + 1);
      if (nextModule) {
        setCurrentLesson({ moduleId: nextModule.id, lessonId: 0 });
        setExpandedModules(prev => ({ ...prev, [nextModule.id]: true }));
      }
    }
  };

  const goToPrevLesson = () => {
    if (currentLesson.lessonId > 0) {
      setCurrentLesson({ moduleId: currentLesson.moduleId, lessonId: currentLesson.lessonId - 1 });
    } else {
      const prevModule = modules.find(m => m.id === currentLesson.moduleId - 1);
      if (prevModule) {
        setCurrentLesson({ moduleId: prevModule.id, lessonId: prevModule.lessons.length - 1 });
        setExpandedModules(prev => ({ ...prev, [prevModule.id]: true }));
      }
    }
  };

  const hasNextLesson = () => {
    const currentModule = modules.find(m => m.id === currentLesson.moduleId);
    if (currentLesson.lessonId < currentModule.lessons.length - 1) return true;
    return modules.some(m => m.id === currentLesson.moduleId + 1);
  };

  const hasPrevLesson = () => {
    if (currentLesson.lessonId > 0) return true;
    return modules.some(m => m.id === currentLesson.moduleId - 1);
  };
  
  // ⭐ NEW: Handle exit course - resets to category page
  const handleExitCourse = () => {
    resetToCoursesHome();
    navigate(`/category/${course.categoryId}`);
  };

  const calculateProgress = () => {
    const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
    const completed = Object.keys(completedLessons).length;
    return (completed / totalLessons) * 100;
  };

  const lessonData = getCurrentLessonData();
  const progress = calculateProgress();
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = Object.keys(completedLessons).length;

  // --- LOGIN PROTECTION ---
  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)} 
          sx={{ mb: 3, textTransform: 'none', fontWeight: 600 }}
        >
          Back
        </Button>

        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
          {course.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Chip label={course.level} color={getLevelColor(course.level)} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SchoolIcon fontSize="small" />
            <Typography variant="body2">{course.instructor}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">{course.duration}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon fontSize="small" sx={{ color: '#ffa500' }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {course.rating} ({(course.students / 1000).toFixed(1)}k students)
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          {course.description}
        </Typography>

        <Paper sx={{ p: 4, background: '#fff3f3', border: '1px solid #ffbcbc', borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            🔒 Login Required
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Create an account or login to access all course modules, track your progress, and start learning!
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/signup')}
            sx={{ fontWeight: 700 }}
          >
            Get Started - Sign Up Free
          </Button>
        </Paper>
      </Container>
    );
  }

  // --- MAIN COURSE INTERFACE (NetAcad Style) ---
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      {/* LEFT SIDEBAR - Course Outline */}
      <Box
        sx={{
          width: sidebarOpen ? 320 : 0,
          transition: 'width 0.3s',
          overflow: 'hidden',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
        }}
      >
        {/* Sidebar Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>Course Outline</Typography>
            <IconButton size="small" onClick={() => setSidebarOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Search Box */}
          <Box 
            component="input"
            type="text"
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: '100%',
              p: '8px 12px 8px 36px',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              fontSize: '14px',
              bgcolor: 'background.default',
              color: 'text.primary',
              outline: 'none',
              mb: 2,
              '&::placeholder': {
                color: 'text.secondary',
                opacity: 0.7,
              },
              '&:focus': {
                borderColor: 'primary.main',
              }
            }}
          />
          <SearchIcon 
            sx={{ 
              position: 'absolute', 
              left: 24, 
              top: 86, 
              fontSize: 18,
              color: 'text.secondary',
              pointerEvents: 'none'
            }} 
          />

          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 6, borderRadius: 3, mb: 1 }} 
          />
          <Typography variant="caption" color="text.secondary">
            {completedCount} / {totalLessons} completed ({Math.round(progress)}%)
          </Typography>
        </Box>

        {/* Modules List */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {modules
            .filter(module =>
              searchQuery === '' ||
              module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              module.lessons.some(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map((module) => (
              <Box key={module.id}>
                <Button
                  fullWidth
                  onClick={() => toggleModule(module.id)}
                  sx={{
                    justifyContent: 'space-between',
                    p: 2,
                    bgcolor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    textTransform: 'none',
                    color: 'text.primary',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', textAlign: 'left' }}>
                    {module.title}
                  </Typography>
                  {expandedModules[module.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Button>

                {expandedModules[module.id] && (
                  <Box sx={{ bgcolor: 'background.default' }}>
                    {module.lessons
                      .filter(lesson =>
                        searchQuery === '' ||
                        lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((lesson) => {
                        const isActive = currentLesson.moduleId === module.id && currentLesson.lessonId === lesson.id;
                        const completed = isCompleted(module.id, lesson.id);

                        return (
                          <Button
                            key={lesson.id}
                            fullWidth
                            onClick={() => selectLesson(module.id, lesson.id)}
                            sx={{
                              justifyContent: 'flex-start',
                              pl: 4,
                              py: 1.5,
                              textAlign: 'left',
                              textTransform: 'none',
                              bgcolor: isActive ? '#e3f2fd' : 'transparent',
                              borderLeft: isActive ? '3px solid' : '3px solid transparent',
                              borderColor: isActive ? 'primary.main' : 'transparent',
                              '&:hover': { bgcolor: isActive ? '#e3f2fd' : 'action.hover' },
                            }}
                          >
                            <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>
                              {completed ? (
                                <CheckCircleIcon color="success" sx={{ fontSize: 18 }} />
                              ) : (
                                <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                              )}
                            </Box>
                            <Typography sx={{ fontSize: '0.85rem', fontWeight: isActive ? 600 : 400, color: 'text.primary' }}>
                              {lesson.title}
                            </Typography>
                          </Button>
                        );
                      })}
                  </Box>
                )}
              </Box>
            ))}
        </Box>
      </Box>

      {/* MAIN CONTENT AREA */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Bar */}
        <Box 
          sx={{ 
            p: 2, 
            borderBottom: '1px solid', 
            borderColor: 'divider', 
            bgcolor: 'background.paper', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2 
          }}
        >
          {!sidebarOpen && (
            <IconButton onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1, fontSize: '1.1rem' }}>
            {course.title}
          </Typography>

          {/* Resources Button */}
          <Button
            onClick={() => setShowResources(!showResources)}
            startIcon={<BookOpenIcon />}
            variant={showResources ? "contained" : "outlined"}
            size="small"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Resources
          </Button>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleExitCourse}
            size="small"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Exit Course
          </Button>
        </Box>

        {/* Lesson Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 4, bgcolor: 'background.default' }}>
          <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            {showResources ? (
              /* Resources Panel */
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: 'text.primary' }}>
                  📚 Course Resources
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Paper elevation={2} sx={{ p: 3, '&:hover': { boxShadow: 4 } }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                      📄 Course PDF Materials
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Download comprehensive study guides and reference materials
                    </Typography>
                    <Button variant="contained" size="small">Download PDF</Button>
                  </Paper>

                  <Paper elevation={2} sx={{ p: 3, '&:hover': { boxShadow: 4 } }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                      💻 Lab Files & Templates
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Access project files and starter templates
                    </Typography>
                    <Button variant="contained" size="small">Download Files</Button>
                  </Paper>

                  <Paper elevation={2} sx={{ p: 3, '&:hover': { boxShadow: 4 } }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                      🎯 Practice Quizzes
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Test your knowledge with interactive assessments
                    </Typography>
                    <Button variant="contained" size="small">Start Quiz</Button>
                  </Paper>

                  <Paper elevation={2} sx={{ p: 3, '&:hover': { boxShadow: 4 } }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                      🔗 Additional Resources
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Helpful links, documentation, and external references
                    </Typography>
                    <Button variant="contained" size="small">View Links</Button>
                  </Paper>
                </Box>
              </Box>
            ) : (
              /* Main Lesson Content */
              <>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
                  {lessonData?.title}
                </Typography>

                {/* Hero Video Embed - Real YouTube Video */}
                <Box
                  sx={{
                    position: 'relative',
                    paddingBottom: '56.25%', // 16:9 Aspect Ratio
                    height: 0,
                    overflow: 'hidden',
                    borderRadius: 2,
                    mb: 4,
                    boxShadow: 3,
                  }}
                >
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                    src="https://www.youtube.com/embed/rfscVS0vtbw?si=6LbF8T9vBq0hXKQd"
                    title="Learn Python - Full Course for Beginners"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>

                {/* Current Lesson Title */}
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                  {currentLesson.moduleId}.0.{currentLesson.lessonId + 1} {lessonData?.title}
                </Typography>

                {/* Lesson Content */}
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4, color: 'text.primary' }}>
                  {lessonData?.content}
                </Typography>

                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4, color: 'text.primary' }}>
                  This comprehensive lesson covers essential concepts that will help you master {course.title}. 
                  As you progress through this {course.level.toLowerCase()} course, you'll gain practical 
                  skills that are directly applicable to real-world scenarios.
                </Typography>

                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4, color: 'text.primary' }}>
                  Your instructor, {course.instructor}, has designed this curriculum to ensure you understand 
                  not just the "how" but also the "why" behind each concept. Take your time to absorb the material, 
                  practice regularly, and don't hesitate to review lessons as needed.
                </Typography>

                {/* Key Takeaways */}
                <Paper 
                  sx={{ 
                    p: 3, 
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : '#e3f2fd',
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    mb: 4 
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                    💡 Key Takeaways
                  </Typography>
                  <Typography sx={{ mb: 1, color: 'text.primary' }}>• Master fundamental concepts and best practices</Typography>
                  <Typography sx={{ mb: 1, color: 'text.primary' }}>• Apply skills in real-world scenarios and projects</Typography>
                  <Typography sx={{ color: 'text.primary' }}>• Build confidence through hands-on practice and exercises</Typography>
                </Paper>

                {/* Mark Complete Button */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={markComplete}
                  disabled={isCompleted(currentLesson.moduleId, currentLesson.lessonId)}
                  sx={{
                    py: 2,
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    mb: 4,
                    bgcolor: isCompleted(currentLesson.moduleId, currentLesson.lessonId) 
                      ? 'success.light' 
                      : 'primary.main',
                  }}
                >
                  {isCompleted(currentLesson.moduleId, currentLesson.lessonId) 
                    ? '✓ Completed' 
                    : 'Mark as Complete'}
                </Button>

                {/* Personal Notes Section */}
                <Paper 
                  sx={{ 
                    p: 3, 
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(236, 72, 153, 0.1)' : '#fffbf0',
                    border: '1px solid',
                    borderColor: (theme) => theme.palette.mode === 'dark' ? 'secondary.dark' : '#ffe082'
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                    📝 My Notes
                  </Typography>
                  <Box
                    component="textarea"
                    value={currentNote}
                    onChange={handleNoteChange}
                    placeholder="Take notes for this lesson... (auto-saves)"
                    sx={{
                      width: '100%',
                      height: '120px',
                      p: 1.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      outline: 'none',
                      bgcolor: 'background.paper',
                      color: 'text.primary',
                      '&::placeholder': {
                        color: 'text.secondary',
                        opacity: 0.7,
                      },
                      '&:focus': {
                        borderColor: 'primary.main',
                      }
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Notes are automatically saved
                  </Typography>
                </Paper>
              </>
            )}
          </Box>
        </Box>

        {/* Bottom Navigation */}
        <Box 
          sx={{ 
            p: 2, 
            borderTop: '1px solid', 
            borderColor: 'divider', 
            bgcolor: 'background.paper', 
            display: 'flex', 
            justifyContent: 'space-between' 
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={goToPrevLesson}
            disabled={!hasPrevLesson()}
            variant="outlined"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Previous
          </Button>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={goToNextLesson}
            disabled={!hasNextLesson()}
            variant="contained"
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CourseDetail;