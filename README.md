# EventSphere – Smart Event Management System

EventSphere is a production-grade full-stack MERN web application designed for colleges, institutes, clubs, RWAs, and local communities to manage events efficiently.

The platform centralizes the complete event lifecycle including:

- Event creation and approval
- Participant registration
- Automatic waitlisting
- QR-based attendance tracking
- Certificate issuance
- Real-time notifications
- Analytics dashboards
- Multilingual support
- Dark/Light mode
- Calendar-based event view
- Leaderboards and participant engagement tracking

---

# Live Demo

Frontend: https://client-umber-rho-85.vercel.app

---

# GitHub Repository

Repository: https://github.com/eshaansharma07/fullstackprojectest

---

# Problem Statement

Managing events in colleges, clubs, institutes, RWAs, and communities is often fragmented across WhatsApp groups, Google Forms, emails, and notice boards. This leads to:

- Duplicate registrations
- No centralized communication
- Manual attendance management
- No waitlist system
- No analytics
- Poor participant engagement
- Delayed certificate issuance

EventSphere solves these problems by providing a centralized event management platform with role-based access control and automation.

---

# Features

## Admin Features

- Approve or reject organizer-created events
- Manage users and assign roles
- View platform-wide analytics
- Publish announcements
- Monitor registrations and attendance
- Manage pending approvals
- Track event performance
- Access dashboard insights

## Organizer Features

- Create and manage events
- Edit event details
- Upload banners and event images
- View participant registrations
- Mark attendance using QR scanning
- Issue certificates
- View event-specific analytics
- Track feedback and ratings
- Manage waitlists
- Send notifications to participants

## Participant Features

- Browse and search events
- Filter events by category
- Register for events
- Get QR ticket instantly
- Download PDF ticket
- Track waitlist status
- Save favorite events
- Submit ratings and feedback
- View leaderboard ranking
- Access calendar-based event schedule
- Switch between Hindi and English

---

# Major Functionalities

## Event Lifecycle

```text
Event Creation → Admin Approval → Registration → Waitlist → QR Ticket → Attendance → Feedback → Certificate
```

## QR Attendance System

- Unique QR code generated for every participant registration
- Organizer scans QR code using browser camera
- Attendance is marked instantly
- Duplicate attendance is prevented
- QR token validation ensures secure attendance

## Waitlist Management

- Automatically adds users to waitlist when event capacity is full
- Promotes waitlisted users automatically when someone cancels
- Sends email notification after promotion

## Notification System

- Real-time notification polling
- Event reminders
- Registration confirmation
- Waitlist updates
- Certificate issued alerts
- System-wide announcements

## Analytics Dashboard

- Total users
- Total events
- Total registrations
- Attendance rate
- Top participants
- Event-wise feedback scores
- Pending approvals
- Participation growth charts

---

# Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- React Context API
- Axios
- Recharts
- React Big Calendar
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Nodemailer
- Multer
- Cloudinary
- QRCode
- CORS
- dotenv

## Deployment

- Vercel (Frontend)
- Vercel Serverless Functions (Backend)
- MongoDB Atlas
- Cloudinary

---

# Folder Structure

```bash
fullstackprojectest/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── package.json
│   ├── server.js
│   └── seed.js
│
├── .env.example
├── vercel.json
└── README.md
```

---

# Environment Variables

## Backend (.env)

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=https://client-umber-rho-85.vercel.app
SERVER_URL=https://server-umber.vercel.app
NODE_ENV=production

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## Frontend (client/.env)

```env
VITE_API_URL=https://server-umber.vercel.app/api
VITE_APP_NAME=EventSphere
VITE_CLIENT_URL=https://client-umber-rho-85.vercel.app
```

---

# Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/eshaansharma07/fullstackprojectest.git
cd fullstackprojectest
```

## 2. Install Frontend Dependencies

```bash
cd client
npm install
```

## 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

## 4. Configure Environment Variables

Create `.env` files in both `client/` and `server/` directories using the variables provided above.

## 5. Run Backend

```bash
cd server
npm run dev
```

## 6. Run Frontend

```bash
cd client
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

Backend will run on:

```bash
http://localhost:5000
```

---

# API Modules

- Authentication API
- User Management API
- Event Management API
- Registration API
- Waitlist API
- QR Attendance API
- Certificate API
- Notification API
- Feedback API
- Analytics API
- Leaderboard API
- Calendar API

---

# Authentication & Authorization

EventSphere uses JWT-based authentication with role-based access control.

Supported roles:

- Admin
- Organizer
- Participant

Protected routes are secured using middleware.

---

# Database Collections

The project uses MongoDB Atlas with the following collections:

- users
- events
- registrations
- feedbacks
- notifications
- announcements
- certificates

---

# Testing

Testing was performed using:

- Postman API testing
- Browser testing
- Responsive UI testing
- Authentication testing
- QR attendance testing
- Waitlist flow testing
- Certificate generation testing

---

# Deployment

## Frontend Deployment

Hosted on Vercel:

```bash
https://client-umber-rho-85.vercel.app
```

## Backend Deployment

Hosted using Vercel Serverless Functions.

---

# Future Improvements

- AI-powered event recommendations
- Real-time chat using Socket.io
- Payment gateway integration
- Mobile app using React Native
- Push notifications
- Progressive Web App support
- Google OAuth login
- GitHub OAuth login
- More Indian language support
- Advanced analytics reports
- Event recommendation engine

---

# Screenshots

Add screenshots here for:

- Landing Page
- Login Page
- Register Page
- Admin Dashboard
- Organizer Dashboard
- Participant Dashboard
- Event Creation Page
- QR Attendance Screen
- Analytics Dashboard
- Calendar View

---

# Demo Accounts

```text
Admin
Email: admin@eventsphere.com
Password: password123

Organizer
Email: organizer@eventsphere.com
Password: password123

Participant
Email: participant@eventsphere.com
Password: password123
```

---

# Authors

- Eshaan Sharma
- Ramit Koirala

---

# License

This project is developed for academic and educational purposes under Chandigarh University.

---

# Acknowledgement

Special thanks to Chandigarh University, the Department of AIT-CSE, and our faculty guide Ms. Amandeep Kaur Seekhon for their support and guidance throughout the development of this project.
