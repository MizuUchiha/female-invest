# Female Invest TEST

This project is a small web application implementing a Learning Management System (LMS) for Female Invest. The application is designed to showcase the basic functionalities of a course management platform.
For a detailed summary, please refer to the [sum_up.md](./sum_up.md) file.

## Features

- **Frontend**: Built with React and TypeScript.
- **Backend**: Built with Node.js and Express.
- **Database**: SQLite for data persistence.
- **API Documentation**: Swagger for API documentation.
- **Unit Tests**: Basic tests for API endpoints using `supertest`.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   ├── context/
│   ├── types/
│   ├── App.tsx
│   └── ...
backend/
├── ___tests___
│   ├── app.tests.ts
├── src/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   ├── index.ts
│   └── ...

## Prerequisites

- Node.js
- npm (Node Package Manager)
- SQLite

## Getting Started

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MizuUchiha/female-invest.git
   ```

2. **Install dependencies:**

   ```bash
   # For frontend
   cd frontend
   npm install

   # For backend
   cd ../backend
   npm install
   ```

### Running the Application

1. **Start the application:**

   ```bash
   npm start
   ```

   The backend server will start on `http://localhost:5000`.
   The frontend application will start on `http://localhost:3000`.

### API Documentation

API documentation is available via Swagger. Once the backend server is running, you can access it at:

```
http://localhost:5000/api-docs
```

### Running Tests

To run the tests, use the following command:

```bash
cd backend
npm test
```

## Project Details

### Frontend

- **React** for building user interfaces.
- **TypeScript** for type safety and better development experience.
- **Material-UI** for UI components.
- **Context API** for state management.

### Backend

- **Node.js** and **Express** for building the server and APIs.
- **SQLite** for database management.
- **Swagger** for API documentation.

### Database

The SQLite database is set up with initial seed data for courses and users.

### Tests

Basic tests are written using `supertest` to test API endpoints for:
- Fetching ongoing courses.
- Fetching recommended courses.
- Liking and unliking courses.


## Author

Angelika Klimek
