
import { Course } from '../models/course';
import { getDatabase } from '../db/setup';

export async function getOngoingCourses(userId: number): Promise<Course[]> {
  const db = await getDatabase();
  return db.all(`
    SELECT c.*, u.progress, u.liked
    FROM courses c 
    JOIN users u ON c.id = u.courseID 
    WHERE u.userID = ? AND u.progress < 100
  `, userId);
}

export async function getRecommendedCourses(userId: number): Promise<Course[]> {
  const db = await getDatabase();
  return db.all(`
    SELECT c.*, 0 as progress, 0 as liked
    FROM courses c 
    WHERE c.id NOT IN (SELECT courseID FROM users WHERE userID = ?)
    ORDER BY c.likes DESC 
    LIMIT 5
  `, userId);
}

export async function likeCourse(userId: number, courseId: number): Promise<void> {
  const db = await getDatabase();
  await db.run('UPDATE courses SET likes = likes + 1 WHERE id = ?', courseId);
  await db.run(`
    INSERT INTO users (userID, courseID, progress, liked) 
    VALUES (?, ?, 0, 1)
    ON CONFLICT(userID, courseID) DO UPDATE SET liked = 1
  `, userId, courseId);
}

export async function unlikeCourse(userId: number, courseId: number): Promise<void> {
  const db = await getDatabase();
  await db.run('UPDATE courses SET likes = likes - 1 WHERE id = ?', courseId);
  await db.run(`
    UPDATE users 
    SET liked = 0 
    WHERE userID = ? AND courseID = ?
  `, userId, courseId);
}