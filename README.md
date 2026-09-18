# Student Task Management Application

A full-stack Student Task Management Application built to help students manage academic and personal tasks in a simple, clean, and responsive interface.

The application supports authentication, task creation, editing, deletion, completion tracking, filtering, search, priorities, due dates, dashboard statistics, profile management, error handling, and persistent MySQL storage.

---

## Live Links

- **Frontend:** https://frontend-production-7ef4.up.railway.app
- **Backend API:** https://backend-production-e134.up.railway.app
- **API Documentation:** https://backend-production-e134.up.railway.app/docs
- **GitHub Repository:** `Add your GitHub repository URL here`

---

# Assignment Objective

The objective of this assignment was to build a simple full-stack application that allows students to manage academic or personal tasks.

The application was designed to satisfy the required functionality while also including several bonus features such as authentication, search, priorities, due dates, dashboard statistics, TypeScript, deployment, form validation, and error handling.

---

# Features Implemented

## Core Features

- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- View pending tasks
- View completed tasks
- Filter tasks
- Organize tasks
- Store all task information in a MySQL database
- Clean and responsive user interface

## Bonus Features

- User registration
- User login
- Logout
- Protected routes
- Search
- Task priority
- Due dates
- Dashboard statistics
- Profile management
- Password update
- Form validation
- Error handling
- Loading states
- TypeScript frontend
- API documentation
- Cloud deployment

---

# Technologies Used

## Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- CSS

## Backend

- Python
- FastAPI
- SQLAlchemy
- PyMySQL
- Pydantic
- JWT authentication
- Uvicorn

## Database

- MySQL

## Deployment

- Railway Frontend Service
- Railway FastAPI Backend Service
- Railway MySQL Service

## Development / Source Control

- Git
- GitHub
- Visual Studio Code
- MySQL Workbench

---

# Overall Architecture

The application uses a three-layer architecture:

```text
+--------------------------------------------------+
|                React Frontend                    |
|          React + TypeScript + Vite               |
|                                                  |
| Pages -> Components -> Services -> Axios         |
+-------------------------+------------------------+
                          |
                          | HTTPS REST API
                          v
+--------------------------------------------------+
|                FastAPI Backend                   |
|                                                  |
| Routers -> Validation -> Authentication          |
|          -> Business Logic -> SQLAlchemy         |
+-------------------------+------------------------+
                          |
                          | MySQL connection
                          | through PyMySQL
                          v
+--------------------------------------------------+
|                 MySQL Database                   |
|                                                  |
|                Users / Tasks                     |
+--------------------------------------------------+
```

The frontend does **not** connect directly to MySQL.

All database access happens through the FastAPI backend.

---

# Project Structure

The frontend and backend are stored in the same GitHub repository.

```text
student-task-manager/
|
|-- frontend/
|   |
|   |-- src/
|   |   |
|   |   |-- components/
|   |   |   |-- ErrorMessage.tsx
|   |   |   |-- Loading.tsx
|   |   |   |-- Navbar.tsx
|   |   |   |-- PriorityBadge.tsx
|   |   |   |-- ProtectedRoute.tsx
|   |   |   |-- SearchBar.tsx
|   |   |   |-- Sidebar.tsx
|   |   |   |-- TaskCard.tsx
|   |   |   |-- TaskFilter.tsx
|   |   |   `-- TaskForm.tsx
|   |   |
|   |   |-- context/
|   |   |   `-- AuthContext.tsx
|   |   |
|   |   |-- hooks/
|   |   |   `-- useAuth.ts
|   |   |
|   |   |-- pages/
|   |   |   |-- Dashboard.tsx
|   |   |   |-- Login.tsx
|   |   |   |-- NotFound.tsx
|   |   |   |-- Profile.tsx
|   |   |   |-- Register.tsx
|   |   |   |-- TaskDetails.tsx
|   |   |   `-- Tasks.tsx
|   |   |
|   |   |-- services/
|   |   |   |-- api.ts
|   |   |   |-- authService.ts
|   |   |   `-- taskService.ts
|   |   |
|   |   |-- styles/
|   |   |-- types/
|   |   |-- utils/
|   |   `-- App.tsx
|   |
|   |-- package.json
|   |-- tsconfig.json
|   `-- vite.config.ts
|
|-- backend/
|   |
|   |-- app/
|   |   |-- core/
|   |   |-- models/
|   |   |-- routers/
|   |   |-- schemas/
|   |   `-- main.py
|   |
|   |-- tests/
|   `-- requirements.txt
|
`-- README.md
```

---

# How the Application Works

## 1. User Registration

The user enters:

- Name
- Email
- Password

The frontend sends a request to:

```text
POST /auth/register
```

The FastAPI backend:

1. Validates the submitted data
2. Checks whether the email already exists
3. Hashes the password
4. Creates the user in MySQL
5. Returns the result to the frontend

After successful registration, the user can log in.

---

## 2. User Login

The login page sends:

```text
POST /auth/login
```

with:

```text
email
password
```

The backend validates the credentials.

If valid, it returns authentication tokens.

The frontend stores the token and includes it in protected requests using:

```text
Authorization: Bearer <access-token>
```

---

## 3. Authentication State

Authentication state is handled using:

```text
AuthContext.tsx
useAuth.ts
ProtectedRoute.tsx
```

`AuthContext` stores:

```text
user
loading
login
register
logout
```

`ProtectedRoute` prevents unauthenticated users from accessing protected pages such as:

```text
/dashboard
/tasks
/profile
```

---

## 4. Create Task

The user can enter:

- Title
- Description
- Priority
- Due date

The frontend sends:

```text
POST /tasks
```

The backend validates the request, associates the task with the logged-in user, and stores it in MySQL.

---

## 5. Edit Task

The user can open an existing task and modify its information.

The frontend sends:

```text
PUT /tasks/{id}
```

The backend updates the corresponding task record in MySQL.

---

## 6. Delete Task

The frontend sends:

```text
DELETE /tasks/{id}
```

The backend deletes the selected task from the database.

---

## 7. Mark Task as Completed

The task card contains a completion checkbox.

The frontend sends:

```text
PATCH /tasks/{id}/complete
```

The backend updates the task status.

The frontend then refreshes the task list so the user immediately sees the updated state.

---

## 8. Search

Users can search their tasks using the search field.

The search value is passed through the task API as a query parameter.

This allows users to quickly locate matching tasks.

---

## 9. Filter Tasks

Tasks can be filtered by:

### Status

```text
All
Pending
Completed
```

### Priority

```text
All
Low
Medium
High
```

---

## 10. Sort Tasks

Tasks can be organized using options such as:

```text
Created Date
Due Date
```

The selected option is sent to the backend through `taskService.ts`.

---

# Dashboard

The dashboard displays an overview of the user's tasks.

The frontend requests:

```text
GET /dashboard/stats
```

The dashboard shows:

- Total Tasks
- Pending Tasks
- Completed Tasks
- Overdue Tasks

This gives users a quick summary of their current workload.

---

# User Profile

The profile page allows users to:

- View their email
- Update their name
- Change their password

Profile update:

```text
PUT /users/me
```

Password update:

```text
PUT /users/me/password
```

The frontend shows success and error messages based on the API response.

---

# Frontend Implementation

The frontend was developed using React and TypeScript.

TypeScript was used for stronger type safety and clearer contracts between components and API services.

Typed models are used for concepts such as:

```text
Task
TaskPayload
TaskStatus
TaskPriority
TaskSort
TaskQueryParams
DashboardStats
User
LoginResponse
RegisterPayload
AuthContextValue
```

Reusable components were created for common functionality such as:

- Forms
- Search
- Filters
- Task cards
- Priority badges
- Loading states
- Error messages
- Navigation
- Protected routes

API calls are centralized in service files instead of being written directly inside UI components.

---

# Frontend API Service

All HTTP requests use Axios.

The Axios base URL is loaded from:

```env
VITE_API_BASE_URL
```

For production:

```env
VITE_API_BASE_URL=https://backend-production-e134.up.railway.app
```

The frontend API service automatically attaches the authentication token to protected requests.

---

# Backend Implementation

The backend is implemented using FastAPI.

FastAPI handles:

- API routing
- Request validation
- Authentication
- Protected routes
- Task operations
- Dashboard statistics
- User profile operations
- Error responses
- Database access

The production application starts with:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Railway provides the production port automatically.

---

# Database Implementation

MySQL is used to persist application data.

The main application data is stored in:

```text
users
tasks
```

## Users

The user data contains information required for authentication and profile management.

Typical user data includes:

```text
id
name
email
hashed password
created date
```

## Tasks

Task information includes values such as:

```text
id
user_id
title
description
status
priority
due_date
created_at
updated_at
```

Each task belongs to a user.

The backend uses the authenticated user when retrieving or modifying task records.

---

# Database Connection

The backend uses:

- SQLAlchemy
- PyMySQL

The SQLAlchemy connection format is:

```text
mysql+pymysql://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

The production database connection is stored in Railway Variables rather than hardcoded in the project.

For example:

```env
DATABASE_URL=mysql+pymysql://...
```

The actual production password and database credentials are not stored in the GitHub repository.

---

# How Frontend, Backend and MySQL Are Connected

The complete production flow is:

```text
User Browser
    |
    v
Railway Frontend
https://frontend-production-7ef4.up.railway.app
    |
    | VITE_API_BASE_URL
    | HTTPS requests
    v
Railway FastAPI Backend
https://backend-production-e134.up.railway.app
    |
    | DATABASE_URL
    | SQLAlchemy + PyMySQL
    v
Railway MySQL
```

## Frontend to Backend

The frontend Railway service contains:

```env
VITE_API_BASE_URL=https://backend-production-e134.up.railway.app
```

So, for example:

```text
POST /auth/register
```

is sent to:

```text
https://backend-production-e134.up.railway.app/auth/register
```

The frontend never talks directly to MySQL.

---

## Backend to MySQL

The backend Railway service contains the production database connection information as environment variables.

SQLAlchemy creates the database engine using this connection.

PyMySQL is used as the MySQL driver.

The application therefore follows this flow:

```text
React
  |
  | REST API
  v
FastAPI
  |
  | SQLAlchemy / PyMySQL
  v
MySQL
```

---

# CORS Configuration

Because the frontend and backend have different Railway domains, CORS is configured in FastAPI.

Production frontend origin:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://frontend-production-7ef4.up.railway.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

This allows the deployed React application to call the FastAPI API.

---

# Environment Variables

Environment variables are used so that local development and production can use different configuration values.

The local `.env` files are not intended to contain production secrets in GitHub.

---

## Frontend Environment

Local example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Production Railway variable:

```env
VITE_API_BASE_URL=https://backend-production-e134.up.railway.app
```

---

## Backend Environment

The backend uses environment variables for configuration.

Typical values include:

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=
ACCESS_TOKEN_EXPIRE_MINUTES=
REFRESH_TOKEN_EXPIRE_DAYS=
```

The exact values are configured in Railway for production.

Sensitive values are not committed to GitHub.

---

# Local Development Setup

## Prerequisites

Install:

- Git
- Node.js
- npm
- Python 3
- MySQL

---

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd student-task-manager
```

---

## 2. MySQL Setup

Create a MySQL database:

```sql
CREATE DATABASE student_task_manager;
```

Create the required `users` and `tasks` tables using the database schema expected by the backend.

Update the backend database connection variable to point to the local MySQL database.

---

## 3. Backend Setup

Move into the backend folder:

```bash
cd backend
```

Create a Python virtual environment:

### Windows

```powershell
python -m venv .venv
.venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create the backend `.env` file.

Example:

```env
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/student_task_manager
SECRET_KEY=your-development-secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Run FastAPI:

```bash
uvicorn app.main:app --reload
```

Local backend:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 4. Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Create:

```text
frontend/.env
```

with:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Run the frontend:

```bash
npm run dev
```

Vite normally starts at:

```text
http://localhost:5173
```

---

# Production Deployment

The complete application is deployed on Railway.

Three Railway services are used:

```text
Student Task Manager Railway Project
|
|-- MySQL
|
|-- Backend
|   |-- GitHub source
|   |-- Root Directory: /backend
|   `-- FastAPI / Uvicorn
|
`-- Frontend
    |-- GitHub source
    |-- Root Directory: /frontend
    `-- React / Vite
```

---

## Backend Railway Setup

Backend root directory:

```text
/backend
```

Backend start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

The backend receives its database and JWT settings through Railway Variables.

---

## Frontend Railway Setup

Frontend root directory:

```text
/frontend
```

The frontend receives:

```env
VITE_API_BASE_URL=https://backend-production-e134.up.railway.app
```

through Railway Variables.

Because Vite environment variables are used during the build, the frontend is redeployed when the production API URL changes.

---

# Error Handling

The application contains frontend and backend error handling.

Examples include:

- Invalid login credentials
- Registration failures
- Required input validation
- API request errors
- Database errors
- Unauthorized requests
- Missing tasks
- Invalid routes
- Loading states
- Empty result states

Reusable error and loading components are used to keep feedback consistent throughout the frontend.

---

# Responsive Design

The frontend was styled to work on:

- Desktop
- Tablet
- Mobile

The UI includes:

- Responsive authentication pages
- Responsive navigation
- Sidebar layout
- Task cards
- Dashboard cards
- Forms
- Search controls
- Filter controls
- Priority badges
- Loading indicators
- Error messages
- Mobile-friendly spacing and layout

---

# Security / Configuration

Production secrets are handled through environment variables.

Examples include:

```text
Database credentials
JWT secret
Token configuration
```

These values are configured in Railway and are not intended to be committed to GitHub.

Passwords are handled by the backend and are not stored as plain text.

Protected API requests require authentication.

---

# API Documentation

FastAPI automatically provides interactive Swagger documentation.

Production Swagger URL:

https://backend-production-e134.up.railway.app/docs

This can be used to inspect and test the available API endpoints.

---

# Approach Taken

The project was implemented by first separating the application into three responsibilities:

1. **Frontend**
   - Handles screens, forms, navigation, task interaction and user feedback.

2. **Backend**
   - Handles authentication, validation, API logic, security, and database operations.

3. **Database**
   - Stores users and task information persistently.

The frontend uses reusable components and centralized API services.

The backend uses FastAPI routers, schemas, authentication utilities, SQLAlchemy, and MySQL access.

Environment variables are used to keep local and production configurations separate.

The application was then deployed as three connected Railway services: frontend, backend, and MySQL.

---

# AI Tool Disclosure

**ChatGPT by OpenAI was used only as a development-assistance tool to help speed up coding and troubleshooting.**

AI assistance was mainly used for:

- Faster code generation
- Converting existing React JavaScript/JSX files to TypeScript/TSX
- Suggestions for cleaner responsive styling
- Debugging build and deployment issues
- Reviewing configuration and environment-variable setup
- Helping prepare project documentation

The application requirements, implementation decisions, integration, configuration, testing, and final submission were handled as part of the development work.

AI was used as a **productivity aid for faster code generation and development help**, not as a replacement for understanding, implementing, or testing the application.

---

# Submission Checklist

- [x] Completed the Student Task Management Application
- [x] Frontend implemented
- [x] Backend implemented
- [x] MySQL database implemented
- [x] Create task implemented
- [x] Edit task implemented
- [x] Delete task implemented
- [x] Complete task implemented
- [x] Pending/completed task view implemented
- [x] Search implemented
- [x] Filtering implemented
- [x] Priorities implemented
- [x] Due dates implemented
- [x] Dashboard implemented
- [x] Authentication implemented
- [x] Form validation implemented
- [x] Error handling implemented
- [x] TypeScript implemented
- [x] Responsive UI implemented
- [x] Application deployed
- [x] Live application link included
- [x] Backend/API link included
- [x] Database/setup instructions included
- [x] Architecture and approach explained
- [x] Technologies/tools listed
- [x] AI usage disclosed
- [ ] GitHub repository URL added above
- [ ] Final links tested in an incognito/private browser
- [ ] Submitted before the deadline

---

# Final Testing Checklist

Before submission, verify:

- [ ] Registration works
- [ ] Login works
- [ ] Logout works
- [ ] Dashboard loads
- [ ] Create task works
- [ ] Edit task works
- [ ] Delete task works
- [ ] Mark completed works
- [ ] Search works
- [ ] Status filtering works
- [ ] Priority filtering works
- [ ] Due dates work
- [ ] Profile update works
- [ ] Password update works
- [ ] Backend `/docs` loads
- [ ] Frontend works on mobile
- [ ] Protected pages remain accessible after browser refresh
- [ ] Production links work in an incognito/private browser

---

# Future Improvements

Possible future enhancements include:

- Task categories
- Labels or tags
- Recurring tasks
- Email reminders
- Calendar view
- Drag-and-drop ordering
- Dark mode
- Pagination
- More automated tests
- CI/CD validation
- Improved refresh-token handling

---

# Author

**Add your name here**

---

This project was developed as a full-stack Student Task Management Application assignment.
