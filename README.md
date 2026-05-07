# 🏋️ Fitness Planner Backend API

A scalable backend system for a Fitness Planner application built using **Node.js, Express, PostgreSQL, and Clean Architecture**.

This API powers workout plans, exercises, user management, and plan assignments for coaches and clients.

---

## 🚀 Live API

- 🔗 Base URL: https://fitness-planner-backend-vtk7.onrender.com/
- 📘 Swagger Docs: https://fitness-planner-backend-vtk7.onrender.com/api-docs

---

## 🏗️ Architecture

This project follows **Clean Architecture + Feature-based modular structure**

```
backend/
│
├── src/
│   ├── config/
│   │     db.js
│   │
│   ├── exceptions/
│   │     app.error.js
│   │
│   ├── helpers/
│   │     asyncHandler.js
│   │     dbErrorHandler.js
│   │
│   ├── middleware/
│   │     auth.middleware.js
│   │     error.middleware.js
│   │
│   ├── features/
│   │      │──users/
│   │         users.controller.js
│   │         users.routes.js
│   │         users.model.js
│   │         users.service.js
│   │
│   ├── utils/
│   │     helpers.js
│   │     hash.js
│   │     jwt.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
└── index.js
```

---

## ⚙️ Features

### 👤 Users Module
- Register / Login
- Role-based access (Coach / Client)

### 🔐 Auth Module
- JWT authentication
- Password hashing

### 🏋️ Workout Plans
- Create workout plans
- Assign plans to clients

### 🏃 Exercises
- Manage exercise library
- Attach exercises to plans

---

## 🧩 Tech Stack

- Node.js
- Express.js
- PostgreSQL (Neon DB)
- JWT Authentication
- Swagger API Docs
- Render (Deployment)

---

## 🗄️ Database Schema

- users
- workout_plans
- exercises
- plan_exercises
- plan_assignments

---

## 📡 API Docs

All APIs are documented using Swagger:

👉 https://fitness-planner-backend-vtk7.onrender.com/api-docs

---

## 🔐 Environment Variables
DATABASE_URL=your_postgres_url
PORT=3000
JWT_SECRET=your_secret


---

## 🚀 Getting Started (Local Setup)

```bash
git clone https://github.com/your-username/fitness-planner-backend.git
cd fitness-planner-backend
npm install
npm run dev


📦 Deployment
Backend hosted on Render
Database on Neon PostgreSQL
CI/CD via GitHub integration


👨‍💻 Author
Aniket Chavan
Flutter + Backend Developer
