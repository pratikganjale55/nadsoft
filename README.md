# Student Management System

This project is a Student Management System built using React for the frontend and Node.js with Express and PostgreSQL for the backend.

## Features
- Add, edit, and delete students
- Search students by name
- Paginate students list
- Handle duplicate emails with validation

## Technologies Used
- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

## Installation

### 1. Clone the repository
```sh
git clone https://github.com/pratikganjale55/nadsoft.git
cd nadsoft
```

### 2. Install dependencies
#### Backend
```sh
cd server
npm install
```

#### Frontend
```sh
cd client
npm install
```

### 3. Setup PostgreSQL Database
- Create a database 
- below is credentials for database connections
- add yours credentials
  ```sh
 const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
  ```

### 4. Run the project
#### Start Backend Server
```sh
cd server
npm start
```
#### Start Frontend
```sh
cd client
npm run dev
```

## API Endpoints

### 1. Get Students (with Pagination & Search)
**Endpoint:** `GET /students?page=1&limit=5&search=John`

#### Query Parameters:
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Number of students per page (default: 10)
- `search` (optional) - Search by student name

#### Response:
```json
{
  "total_students": 50,
  "current_page": 1,
  "per_page": 5,
  "total_pages": 10,
  "students": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 20,
      "parent_id": 5
    }
  ]
}
```

---
### 2. Add a New Student
**Endpoint:** `POST /students`

#### Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20,
  "parent_id": 5
}
```

#### Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20,
  "parent_id": 5
}
```

---
### 3. Update a Student
**Endpoint:** `PUT /students/:id`

#### Request Body:
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "age": 21,
  "parent_id": 6
}
```

#### Response:
```json
{
  "id": 1,
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "age": 21,
  "parent_id": 6
}
```

---
### 4. Delete a Student
**Endpoint:** `DELETE /students/:id`

#### Response:
```json
{
  "message": "Student deleted successfully."
}
```

## Project Structure
```
student-management/
│── backend/
│   ├── index.js       # Main entry point
│   ├── routes/
│   │   ├── students.js  # Student API routes
│   ├── db/
│   │   ├── db.js    # PostgreSQL connection
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│── README.md
```