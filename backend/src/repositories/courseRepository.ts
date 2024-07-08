
import { Course } from '../models/course';
import { getDatabase } from '../db/setup';

export async function getOngoingCourses(): Promise<Course[]> {
  const db = await getDatabase();
  return db.all('SELECT * FROM courses WHERE completionPercentage < 100');
}

export async function getRecommendedCourses(): Promise<Course[]> {
  const db = await getDatabase();
  return db.all('SELECT * FROM courses ORDER BY likes DESC LIMIT 5');
}

export async function likeCourse(courseId: number): Promise<void> {
  const db = await getDatabase();
  await db.run('UPDATE courses SET likes = likes + 1 WHERE id = ?', courseId);
}

export async function unlikeCourse(courseId: number): Promise<void> {
  const db = await getDatabase();
  await db.run('UPDATE courses SET likes = likes - 1 WHERE id = ?', courseId);
}
