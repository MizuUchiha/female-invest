import express from 'express';
import { fetchOngoingCourses, fetchRecommendedCourses, likeOrUnlikeCourse } from '../services/courseService';

const router = express.Router();

router.get('/courses/ongoing', async (req, res) => {
  const userId = parseInt(req.query.user as string, 10);
  const courses = await fetchOngoingCourses(userId);
  res.json(courses);
});

router.get('/courses/recommended', async (req, res) => {
  const userId = parseInt(req.query.user as string, 10);
  const courses = await fetchRecommendedCourses(userId);
  res.json(courses);
});

router.post('/courses/:id/like', async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const { like } = req.body;
  const userId = parseInt(req.query.user as string, 10);
  await likeOrUnlikeCourse(userId, courseId, like);
  res.status(200).send();
});

export default router;
