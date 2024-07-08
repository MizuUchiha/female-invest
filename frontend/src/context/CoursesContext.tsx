import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Course } from '../types/Course';

interface CoursesContextProps {
  ongoingCourses: Course[];
  recommendedCourses: Course[];
  setOngoingCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  setRecommendedCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const CoursesContext = createContext<CoursesContextProps | undefined>(undefined);

export const useCoursesContext = () => {
  const context = useContext(CoursesContext);
  if (!context) throw new Error('useCoursesContext must be used within a CoursesProvider');
  return context;
};

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ongoingCourses, setOngoingCourses] = useState<Course[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);

  return (
    <CoursesContext.Provider value={{ ongoingCourses, recommendedCourses, setOngoingCourses, setRecommendedCourses }}>
      {children}
    </CoursesContext.Provider>
  );
};
