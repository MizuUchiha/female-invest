import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = 5000;

async function setupDatabase() {
  const db = await open({
    filename: ':memory:',
    driver: sqlite3.Database
  });

  await db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)');
  await db.run('INSERT INTO test (name) VALUES (?)', 'Test User');
  return db;
}

const dbPromise = setupDatabase();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a single user name
 *     responses:
 *       200:
 *         description: A single user name
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
app.get('/', async (req, res) => {
  const db = await dbPromise;
  const result = await db.get('SELECT name FROM test WHERE id = 1');
  res.send(result ? result.name : 'No data');
});

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API documentation'
    },
    servers: [
      {
        url: `http://localhost:${port}`
      }
    ]
  },
  apis: ['./src/*.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
