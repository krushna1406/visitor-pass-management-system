# 🏢 Visitor Pass Management System

A full-stack web application for managing visitor passes in organizations. It streamlines the entire visitor lifecycle — from scheduling visits and requesting approvals to generating QR-coded passes, checking in/out at security, and sending automated email notifications.

---

## 📋 Table of Contents

  - [Overview](#overview)
  - [Key Features](#key-features)
  - [Tech Stack](#tech-stack)
  - [Architecture](#architecture)
  - [API Endpoints](#api-endpoints)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [License](#license)

---

##  Overview

The **Visitor Pass Management System** replaces manual, paper-based visitor tracking with a digital solution. It provides role-based dashboards for four types of users — **Admin**, **Employee**, **Security**, and **Visitor** — each with tailored capabilities. When a visit is approved, the system automatically generates a PDF visitor pass with a QR code and emails it to the visitor. Security personnel can then scan the QR code to verify and check-in/check-out visitors in real time.

---

##  Key Features

| Feature | Description |
|---|---|
| **Role-Based Access Control** | Four distinct roles (Admin, Employee, Security, Visitor) with route-level and API-level authorization. |
| **Visitor Registration** | Visitors can self-register and schedule visits by providing an employee ID. |
| **Visit Approval Workflow** | Employees review and approve or reject visitor requests directed to them. |
| **QR Code Generation** | On approval, a unique QR code is generated and embedded in a PDF visitor pass. |
| **PDF Visitor Pass** | A branded PDF pass is auto-generated using PDFKit with visit details and QR code. |
| **Email Notifications** | Automated approval/rejection emails sent to visitors via Nodemailer (with PDF attachment on approval). |
| **QR-Based Check-In/Out** | Security scans visitor QR codes to record check-in and check-out timestamps. |
| **Dashboard Analytics** | Role-specific dashboard stats (total visitors, pending, approved, rejected, check-in logs). |
| **User Management** | Admin can create, view, and delete user accounts for employees and security staff. |
| **Protected Routes** | JWT-based authentication with middleware-enforced role restrictions on both frontend and backend. |

---

##  Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **React Router DOM 7** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Lucide React / React Icons** | Icon libraries |
| **html5-qrcode** | QR code scanning in-browser |
| **react-hot-toast** | Toast notifications |
| **date-fns** | Date formatting utilities |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express 5** | Web framework |
| **MongoDB + Mongoose 9** | Database & ODM |
| **JSON Web Tokens** | Authentication |
| **bcrypt** | Password hashing |
| **QRCode** | QR code generation |
| **PDFKit** | PDF visitor pass generation |
| **Nodemailer** | Email service |
| **Validator** | Input validation |

---

The application follows a **client-server architecture** with a clear separation between the React frontend and the Express REST API backend. The backend uses **Mongoose** as an ODM to interact with a **MongoDB Atlas** cloud database. Authentication is handled via **JWT tokens** stored in the browser's local storage.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **[Node.js](https://nodejs.org/)** (v18 or higher recommended)
- **[npm](https://www.npmjs.com/)** (comes with Node.js)
- **[Git](https://git-scm.com/)**
- A **[MongoDB Atlas](https://www.mongodb.com/atlas)** account (or a local MongoDB instance)
- A **Gmail account** with an [App Password](https://support.google.com/accounts/answer/185833) for email notifications

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/krushna1406/visitor-pass-management-system.git
cd visitor-pass-management-system
```

**2. Install backend dependencies**

```bash
cd backend
npm install
```

**3. Install frontend dependencies**

```bash
cd ../frontend
npm install
```

### Environment Variables

You need to create `.env` files in both the `backend/` and `frontend/` directories.

**`backend/.env`**

```env
MONGO_URI=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection URI (Atlas or local) |
| `PORT` | Port number for the backend server |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `EMAIL_USER` | Gmail address for sending notifications |
| `EMAIL_PASS` | Gmail [App Password](https://support.google.com/accounts/answer/185833) (not your regular password) |

**`frontend/.env`**

```env
VITE_SERVER_URL=http://localhost:4000
```

| Variable | Description |
|---|---|
| `VITE_SERVER_URL` | Base URL of the backend API server |

### Running the Application

**1. Start the backend server**

```bash
cd backend
npm run dev
```

This starts the backend with **nodemon** on `http://localhost:4000` (hot-reloads on file changes).

**2. Start the frontend dev server** (in a new terminal)

```bash
cd frontend
npm run dev
```

This starts the Vite dev server, typically on `http://localhost:5173`.

**3. Open your browser** and navigate to `http://localhost:5173`

> [!TIP]
> For production, build the frontend with `npm run build` inside the `frontend/` directory. The output will be in the `dist/` folder.

---

##  Project Structure

```
visitor-pass-management/
├── backend/
│   ├── config/
│   │   └── connectDB.js            # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js        # Signup & login logic
│   │   ├── checkLogController.js    # Check-in & check-out logic
│   │   ├── userController.js        # User CRUD & dashboard stats
│   │   └── visitorController.js     # Visitor CRUD, status, QR, pass, email
│   ├── middleware/
│   │   ├── requireAuth.js           # JWT authentication middleware
│   │   ├── requireRole.js           # Role-based authorization (named)
│   │   └── genericRequireRole.js    # Generic role authorization helper
│   ├── models/
│   │   ├── checkLogs.js             # Check-in/out log schema
│   │   ├── userModel.js             # User schema with signup/login statics
│   │   └── visitorModel.js          # Visitor schema
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints
│   │   ├── checkLogRoutes.js        # Check log endpoints
│   │   ├── userRoutes.js            # User management endpoints
│   │   └── visitorRoutes.js         # Visitor management endpoints
│   ├── templates/
│   │   ├── approvalEmail.js         # HTML email template for approval
│   │   └── rejectionEmail.js        # HTML email template for rejection
│   ├── utils/
│   │   ├── generateVisitorPass.js   # PDF pass generation with QR code
│   │   └── sendEmail.js             # Nodemailer email utility
│   ├── app.js                       # Express app configuration
│   ├── server.js                    # Server entry point
│   └── package.json
│
├── frontend/
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/               # Admin dashboard components
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── AllUsers.jsx
│   │   │   │   ├── AllEmployees.jsx
│   │   │   │   ├── CreateUser.jsx
│   │   │   │   ├── User.jsx
│   │   │   │   ├── Visitor.jsx
│   │   │   │   └── VisitorList.jsx
│   │   │   ├── employee/            # Employee dashboard components
│   │   │   │   ├── EmpDashboard.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── EmpVisitorList.jsx
│   │   │   │   ├── InviteVisitor.jsx
│   │   │   │   ├── PendingVisitCard.jsx
│   │   │   │   └── Visitor.jsx
│   │   │   ├── security/            # Security dashboard components
│   │   │   │   ├── SecDashboard.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── CheckIn.jsx
│   │   │   │   ├── CheckOut.jsx
│   │   │   │   ├── QRScanner.jsx
│   │   │   │   └── TodaysVisitors.jsx
│   │   │   ├── visitor/             # Visitor dashboard components
│   │   │   │   ├── VisDashboard.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── ScheduleVisit.jsx
│   │   │   │   └── MyPasses.jsx
│   │   │   ├── DashboardCard.jsx
│   │   │   └── Navbar.jsx
│   │   ├── contexts/
│   │   │   ├── authContext.jsx       # Authentication state management
│   │   │   ├── userContext.jsx       # User data context
│   │   │   └── visitorContext.jsx    # Visitor data context
│   │   ├── hooks/
│   │   │   ├── useLogin.js           # Login hook
│   │   │   ├── useLogout.js          # Logout hook
│   │   │   ├── useSignup.js          # Signup hook
│   │   │   ├── useVisitorSignup.js   # Visitor self-registration hook
│   │   │   ├── useAuthContext.js     # Auth context accessor
│   │   │   ├── useUserContext.js     # User context accessor
│   │   │   └── useVisitorContext.js  # Visitor context accessor
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── VisitorSignup.jsx     # Visitor self-registration page
│   │   │   ├── AdminDashboard.jsx    # Admin dashboard layout
│   │   │   ├── EmployeeDashboard.jsx # Employee dashboard layout
│   │   │   ├── SecurityDashboard.jsx # Security dashboard layout
│   │   │   └── VisitorDashboard.jsx  # Visitor dashboard layout
│   │   ├── route/
│   │   │   └── ProtectedRoute.jsx    # Role-based route guard
│   │   ├── services/
│   │   │   └── api.js                # Axios API service layer
│   │   ├── App.jsx                   # Root component with routing
│   │   ├── main.jsx                  # App entry point
│   │   └── index.css                 # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

##  User Roles

### 🔴 Admin
- View and manage all users (employees, security, visitors)
- Create new employee and security accounts
- View and manage all visitor records
- Access admin-level dashboard analytics

### 🟡 Employee
- View visitors assigned to them
- Approve or reject pending visit requests
- Invite visitors by creating visit records
- Access employee-level dashboard analytics

### 🔵 Security
- Scan QR codes to verify visitor passes
- Check-in and check-out visitors
- View today's visitor list
- Access security-level dashboard analytics

### 🟢 Visitor
- Self-register and create an account
- Schedule visits by providing an employee ID
- View visit status (pending, approved, rejected)
- View and download active visitor passes with QR codes

---

##  License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
