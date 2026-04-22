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
- Dark/light mode

## Live Demo

Frontend: https://client-umber-rho-85.vercel.app

## GitHub Repository

Repository: https://github.com/eshaansharma07/fullstackprojectest

---

# Features

## Admin Features
- Approve or reject organizer-created events
- Manage users and assign roles
- View platform-wide analytics
- Publish announcements
- Monitor registrations and attendance

## Organizer Features
- Create and manage events
- Edit event details
- View registrations
- Mark attendance using QR scanning
- Issue certificates
- View event-specific analytics

## Participant Features
- Browse and search events
- Register for events
- Get QR ticket instantly
- Download PDF ticket
- Track waitlist status
- Save favorite events
- Submit ratings and feedback
- View leaderboard ranking

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- React Context API
- Recharts
- React Big Calendar

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
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── utils/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   ├── package.json
│   └── server.js
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
