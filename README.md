# 💰 Personal Expense Tracker — MERN Stack

A fully responsive, secure full-stack web application built from scratch to help users seamlessly track their daily financial expenses.

## ✨ Key Features

- **Secure Authentication:** User registration and login system powered by JSON Web Tokens (JWT) and bcrypt password hashing.
- **Protected Routes:** API endpoints are secured via custom middleware, ensuring users can only manage their own data.
- **Expense Management (CRUD):** Seamlessly add, view, update, and delete daily expense records.
- **Real-Time Dashboard:** Dynamic dashboard displaying total calculated expenses and record counts.
- **Custom UI Design:** Clean, intuitive interface built with custom CSS, completely avoiding heavy third-party UI libraries for optimal performance.

## 🛠️ Technology Stack

- **Frontend:** React.js (Vite), React Router DOM, Axios, Custom CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB configured with Mongoose ORM
- **Security:** JSON Web Token (JWT), bcrypt

## 📂 Project Structure

```text
ExpenseTracker/
├── Client/                 # React Frontend (Vite)
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── pages/          # Application Views
│       │   ├── Dashboard.css
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       ├── App.jsx         # App Routing
│       ├── index.css       # Global Styles
│       └── main.jsx        # React DOM Entry
│
└── Server/                 # Node.js/Express Backend
    ├── controllers/        # Request handling logic
    │   ├── expenseController.js
    │   └── userController.js
    ├── middleware/         # Security and validation
    │   └── authMiddleware.js
    ├── models/             # Mongoose Database Schemas
    │   ├── expenseModel.js
    │   └── userModel.js
    ├── routes/             # API Endpoints
    │   ├── expenseRoutes.js
    │   └── userRoutes.js
    └── index.js            # Server Entry Point & DB Connection