import { Grid } from '@mui/material';
import React from 'react';
import CourseCard from './CourseCard';

interface Course {
  id: string;
  title: string;
  author: string;
  lessons: number;
  time: string;
  likes: number;
  coverImage: string;
  progress: number;
  liked: boolean;
}

interface CourseListProps {
  courses: Course[];
  onLike: (id: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onLike }) => {
  return (
    <Grid container spacing={3} style={{marginTop: 1, marginBottom: 25}}>
      {courses.map(course => (
        <Grid item key={course.id} xs={12} sm={6} md={4}>
          <CourseCard
            {...course}
            onLike={() => onLike(course.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseList;
