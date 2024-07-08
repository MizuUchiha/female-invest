import React, { useRef, useCallback } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import CourseCard from './CourseCard';
import { Course } from '../types/Course';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";

interface CourseListProps {
  courses: Course[];
  onLike: (id: string) => void;
  loadMoreCourses: () => void;
  hasMoreCourses: boolean;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onLike, loadMoreCourses, hasMoreCourses }) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastCourseElementRef = useCallback((node: any) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMoreCourses) {
        loadMoreCourses();
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMoreCourses, loadMoreCourses]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ marginTop: 16, marginBottom: 25 }}>
      <Slider {...settings}>
        {courses.map((course, index) => {
          if (courses.length === index + 1) {
            return (
              <div key={course.id} ref={lastCourseElementRef}>
                <CourseCard {...course} onLike={() => onLike(course.id)} />
              </div>
            );
          } else {
            return (
              <div key={course.id}>
                <CourseCard {...course} onLike={() => onLike(course.id)} />
              </div>
            );
          }
        })}
      </Slider>
    </div>
  );
};

export default CourseList;
