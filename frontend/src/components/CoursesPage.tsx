import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider, Typography } from '@mui/material';
import { Container } from '@mui/system';
import CourseList from './CourseList';
import { Course } from '../types/Course';

const CoursesPage: React.FC = () => {
  const [ongoingCourses, setOngoingCourses] = useState<Course[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [hasMoreOngoing, setHasMoreOngoing] = useState(true);
  const [hasMoreRecommended, setHasMoreRecommended] = useState(true);
  const userId = new URLSearchParams(window.location.search).get('user');

  useEffect(() => {
    // Fetch initial courses data from API
    const fetchCourses = async () => {
      const ongoingResponse = await axios.get(`http://localhost:5000/api/courses/ongoing?user=${userId}`);
      setOngoingCourses(ongoingResponse.data);

      const recommendedResponse = await axios.get(`http://localhost:5000/api/courses/recommended?user=${userId}`);
      setRecommendedCourses(recommendedResponse.data);
    };

    fetchCourses();
  }, [userId]);

  const handleLike = async (id: string) => {
    setOngoingCourses(ongoingCourses.map(course => {
      if (course.id === id) {
        const liked = !course.liked;
        axios.post(`http://localhost:5000/api/courses/${id}/like?user=${userId}`, { like: liked });
        return { ...course, liked: liked, likes: liked ? course.likes + 1 : course.likes - 1 };
      }
      return course;
    }));
  };

  const loadMoreOngoingCourses = async () => {
    const response = await axios.get(`http://localhost:5000/api/courses/ongoing?user=${userId}&offset=${ongoingCourses.length}`);
    const newCourses = response.data;
    setOngoingCourses((prevCourses) => [...prevCourses, ...newCourses]);
    if (newCourses.length === 0) setHasMoreOngoing(false);
  };

  const loadMoreRecommendedCourses = async () => {
    const response = await axios.get(`http://localhost:5000/api/courses/recommended?user=${userId}&offset=${recommendedCourses.length}`);
    const newCourses = response.data;
    setRecommendedCourses((prevCourses) => [...prevCourses, ...newCourses]);
    if (newCourses.length === 0) setHasMoreRecommended(false);
  };

  return (
    <Container>
      <Typography variant="h4">Continue Learning</Typography>
      <CourseList
        courses={ongoingCourses}
        onLike={handleLike}
        loadMoreCourses={loadMoreOngoingCourses}
        hasMoreCourses={hasMoreOngoing}
      />

      <Typography variant="h4">You Might Also Like</Typography>
      <CourseList
        courses={recommendedCourses}
        onLike={handleLike}
        loadMoreCourses={loadMoreRecommendedCourses}
        hasMoreCourses={hasMoreRecommended}
      />
    </Container>
  );
};

export default CoursesPage;
