import express from 'express';
import { fetchOngoingCourses, fetchRecommendedCourses, likeOrUnlikeCourse } from '../services/courseService';

const router = express.Router();

/**
 * @swagger
 * /api/courses/ongoing:
 *   get:
 *     summary: Get ongoing courses
 *     description: Retrieve a list of ongoing courses for a user
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: A list of ongoing courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/courses/ongoing', async (req, res) => {
  const userId = parseInt(req.query.user as string, 10);
  const courses = await fetchOngoingCourses(userId);
  res.json(courses);
});

/**
 * @swagger
 * /api/courses/recommended:
 *   get:
 *     summary: Get recommended courses
 *     description: Retrieve a list of recommended courses for a user
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: A list of recommended courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/courses/recommended', async (req, res) => {
  const userId = parseInt(req.query.user as string, 10);
  const courses = await fetchRecommendedCourses(userId);
  res.json(courses);
});

/**
 * @swagger
 * /api/courses/{id}/like:
 *   post:
 *     summary: Like or unlike a course
 *     description: Like or unlike a course for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Course ID
 *       - in: query
 *         name: user
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               like:
 *                 type: boolean
 *                 description: Like status
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/courses/:id/like', async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const { like } = req.body;
  const userId = parseInt(req.query.user as string, 10);
  await likeOrUnlikeCourse(userId, courseId, like);
  res.status(200).send();
});

export default router;
