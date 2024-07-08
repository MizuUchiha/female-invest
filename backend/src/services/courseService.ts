
import { getOngoingCourses, getRecommendedCourses, likeCourse, unlikeCourse } from '../repositories/courseRepository';

export async function fetchOngoingCourses() {
  return getOngoingCourses();
}

export async function fetchRecommendedCourses() {
  return getRecommendedCourses();
}

export async function likeOrUnlikeCourse(courseId: number, like: boolean) {
  if (like) {
    await likeCourse(courseId);
  } else {
    await unlikeCourse(courseId);
  }
}
