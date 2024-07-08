import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider, Typography } from '@mui/material';
import { Container } from '@mui/system';
import CourseList from './CourseList';
import { Course } from '../types/Course';

const CoursesPage: React.FC = () => {
  const [ongoingCourses, setOngoingCourses] = useState<Course[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch courses data from API
    const fetchCourses = async () => {
      const ongoingResponse = await axios.get('http://localhost:5000/api/courses/ongoing');
      setOngoingCourses(ongoingResponse.data);

      const recommendedResponse = await axios.get('http://localhost:5000/api/courses/recommended');
      setRecommendedCourses(recommendedResponse.data);
    };

    fetchCourses();
  }, []);

  const handleLike = (id: string) => {
    setOngoingCourses(ongoingCourses.map(course => {
      if (course.id === id) {
        const liked = !course.liked;
        axios.post(`http://localhost:5000/api/courses/${id}/like`, { like: liked });
        return { ...course, liked: !course.liked, likes: course.liked ? course.likes - 1 : course.likes + 1 };
      }
      return course;
    }));
  };

  return (
    <Container>
      <Typography variant="h4">Continue Learning</Typography>
      <CourseList courses={ongoingCourses} onLike={handleLike} />

      <Typography variant="h4">You Might Also Like</Typography>
      <CourseList courses={recommendedCourses} onLike={handleLike} />
    </Container>
  );
};

export default CoursesPage;
