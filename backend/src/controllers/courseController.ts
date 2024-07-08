
import express from 'express';
import { fetchOngoingCourses, fetchRecommendedCourses, likeOrUnlikeCourse } from '../services/courseService';

const router = express.Router();

router.get('/courses/ongoing', async (req, res) => {
  const courses = await fetchOngoingCourses();
  res.json(courses);
});

router.get('/courses/recommended', async (req, res) => {
  const courses = await fetchRecommendedCourses();
  res.json(courses);
});

router.post('/courses/:id/like', async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  await likeOrUnlikeCourse(courseId);
  res.status(200).send();
});

export default router;