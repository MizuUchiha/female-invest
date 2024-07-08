
import { getOngoingCourses, getRecommendedCourses, likeCourse } from '../repositories/courseRepository';

export async function fetchOngoingCourses() {
  return getOngoingCourses();
}

export async function fetchRecommendedCourses() {
  return getRecommendedCourses();
}

export async function likeOrUnlikeCourse(courseId: number) {
  await likeCourse(courseId);
}