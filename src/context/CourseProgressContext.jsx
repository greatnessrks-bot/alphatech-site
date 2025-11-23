import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CourseProgressContext = createContext();

export const useCourseProgress = () => {
  const context = useContext(CourseProgressContext);
  if (!context) {
    throw new Error('useCourseProgress must be used within CourseProgressProvider');
  }
  return context;
};

export const CourseProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [courseProgress, setCourseProgress] = useState({});

  // Load progress from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`courseProgress_${user.id || user.email}`);
      if (savedProgress) {
        setCourseProgress(JSON.parse(savedProgress));
      }
    }
  }, [user]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (user && Object.keys(courseProgress).length > 0) {
      localStorage.setItem(
        `courseProgress_${user.id || user.email}`,
        JSON.stringify(courseProgress)
      );
    }
  }, [courseProgress, user]);

  // Start a course (called when user first enters CourseDetail)
  const startCourse = (courseId, courseData) => {
    if (!user) return;

    setCourseProgress(prev => ({
      ...prev,
      [courseId]: {
        courseId,
        title: courseData.title,
        categoryId: courseData.categoryId,
        instructor: courseData.instructor,
        level: courseData.level,
        duration: courseData.duration,
        rating: courseData.rating,
        startedAt: prev[courseId]?.startedAt || new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
        completedLessons: prev[courseId]?.completedLessons || {},
        currentLesson: prev[courseId]?.currentLesson || { moduleId: 1, lessonId: 0 },
        notes: prev[courseId]?.notes || {},
        totalLessons: courseData.totalLessons || 12, // Default 3 modules x 4 lessons
        status: 'in-progress',
      }
    }));
  };

  // Update lesson completion
  const markLessonComplete = (courseId, moduleId, lessonId) => {
    if (!user) return;

    setCourseProgress(prev => {
      const course = prev[courseId];
      if (!course) return prev;

      const completedLessons = {
        ...course.completedLessons,
        [`${moduleId}-${lessonId}`]: true,
      };

      const completedCount = Object.keys(completedLessons).length;
      const totalLessons = course.totalLessons;
      const isComplete = completedCount === totalLessons;

      return {
        ...prev,
        [courseId]: {
          ...course,
          completedLessons,
          lastAccessedAt: new Date().toISOString(),
          status: isComplete ? 'completed' : 'in-progress',
          completedAt: isComplete ? new Date().toISOString() : course.completedAt,
        }
      };
    });
  };

  // Update current lesson position
  const updateCurrentLesson = (courseId, moduleId, lessonId) => {
    if (!user) return;

    setCourseProgress(prev => {
      const course = prev[courseId];
      if (!course) return prev;

      return {
        ...prev,
        [courseId]: {
          ...course,
          currentLesson: { moduleId, lessonId },
          lastAccessedAt: new Date().toISOString(),
        }
      };
    });
  };

  // Save notes for a lesson
  const saveNotes = (courseId, moduleId, lessonId, noteContent) => {
    if (!user) return;

    setCourseProgress(prev => {
      const course = prev[courseId];
      if (!course) return prev;

      return {
        ...prev,
        [courseId]: {
          ...course,
          notes: {
            ...course.notes,
            [`${moduleId}-${lessonId}`]: noteContent,
          }
        }
      };
    });
  };

  // Reset course (Start Again)
  const resetCourse = (courseId) => {
    if (!user) return;

    setCourseProgress(prev => {
      const course = prev[courseId];
      if (!course) return prev;

      return {
        ...prev,
        [courseId]: {
          ...course,
          completedLessons: {},
          currentLesson: { moduleId: 1, lessonId: 0 },
          notes: {},
          status: 'in-progress',
          startedAt: new Date().toISOString(),
          lastAccessedAt: new Date().toISOString(),
          completedAt: null,
        }
      };
    });
  };

  // Get progress for a specific course
  const getCourseProgress = (courseId) => {
    return courseProgress[courseId] || null;
  };

  // Get all courses user has started
  const getAllStartedCourses = () => {
    return Object.values(courseProgress);
  };

  // Calculate completion percentage
  const getCompletionPercentage = (courseId) => {
    const course = courseProgress[courseId];
    if (!course) return 0;

    const completedCount = Object.keys(course.completedLessons).length;
    const totalLessons = course.totalLessons;
    return Math.round((completedCount / totalLessons) * 100);
  };

  // Get courses by status
  const getCoursesByStatus = (status) => {
    return Object.values(courseProgress).filter(course => course.status === status);
  };

  const value = {
    courseProgress,
    startCourse,
    markLessonComplete,
    updateCurrentLesson,
    saveNotes,
    resetCourse,
    getCourseProgress,
    getAllStartedCourses,
    getCompletionPercentage,
    getCoursesByStatus,
  };

  return (
    <CourseProgressContext.Provider value={value}>
      {children}
    </CourseProgressContext.Provider>
  );
};

export default CourseProgressContext;