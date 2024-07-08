import { getOngoingCourses, getRecommendedCourses, likeCourse, unlikeCourse } from '../repositories/courseRepository';

export async function fetchOngoingCourses(userId: number) {
  return getOngoingCourses(userId);
}

export async function fetchRecommendedCourses(userId: number) {
  return getRecommendedCourses(userId);
}

export async function likeOrUnlikeCourse(userId: number, courseId: number, like: boolean) {
  if (like) {
    await likeCourse(userId, courseId);
  } else {
    await unlikeCourse(userId, courseId);
  }
}
