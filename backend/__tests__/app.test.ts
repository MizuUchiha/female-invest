
import request from 'supertest';
import express from 'express';
import { setupDatabase } from '../src/db/setup';
import courseController from '../src/controllers/courseController';

const app = express();
app.use(express.json());
app.use('/api', courseController);

let db: any;

beforeAll(async () => {
  db = await setupDatabase();
});

afterAll(async () => {
  await db.close();
});

describe('GET /api/courses/ongoing', () => {
  it('should fetch ongoing courses', async () => {
    const response = await request(app).get('/api/courses/ongoing');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

describe('GET /api/courses/recommended', () => {
  it('should fetch recommended courses', async () => {
    const response = await request(app).get('/api/courses/recommended');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

describe('POST /api/courses/:id/like', () => {
  it('should like a course', async () => {
    const response = await request(app).post('/api/courses/1/like');
    expect(response.status).toBe(200);
  });
});