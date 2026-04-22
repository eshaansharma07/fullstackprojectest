EventSphere – Smart Event Management System

EventSphere is a production-grade full-stack MERN web application designed for colleges, institutes, clubs, RWAs, and local communities to manage events efficiently.

The platform centralizes the complete event lifecycle including:

* Event creation and approval
* Participant registration
* Automatic waitlisting
* QR-based attendance tracking
* Certificate issuance
* Real-time notifications
* Analytics dashboards
* Multilingual support
* Dark/light mode

Live Demo

Frontend: https://client-umber-rho-85.vercel.app

GitHub Repository

Repository: https://github.com/eshaansharma07/fullstackprojectest

⸻

Features

Admin Features

* Approve or reject organizer-created events
* Manage users and assign roles
* View platform-wide analytics
* Publish announcements
* Monitor registrations and attendance

Organizer Features

* Create and manage events
* Edit event details
* View registrations
* Mark attendance using QR scanning
* Issue certificates
* View event-specific analytics

Participant Features

* Browse and search events
* Register for events
* Get QR ticket instantly
* Download PDF ticket
* Track waitlist status
* Save favorite events
* Submit ratings and feedback
* View leaderboard ranking

⸻

Tech Stack

Frontend

* React.js
* Vite
* Tailwind CSS
* Framer Motion
* React Router DOM
* React Context API
* Recharts
* React Big Calendar

Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* Nodemailer
* Multer
* Cloudinary
* QRCode

Deployment

* Vercel (Frontend)
* Vercel Serverless Functions (Backend)
* MongoDB Atlas
* Cloudinary

⸻

Folder Structure

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

⸻

Environment Variables

Backend (.env)

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

Frontend (client/.env)

VITE_API_URL=https://server-umber.vercel.app/api
VITE_APP_NAME=EventSphere
VITE_CLIENT_URL=https://client-umber-rho-85.vercel.app

⸻

Installation & Setup

1. Clone the Repository

git clone https://github.com/eshaansharma07/fullstackprojectest.git
cd fullstackprojectest

2. Install Frontend Dependencies

cd client
npm install

3. Install Backend Dependencies

cd ../server
npm install

4. Configure Environment Variables

Create .env files in both server/ and client/ folders using the variables above.

5. Run Backend

cd server
npm run dev

6. Run Frontend

cd client
npm run dev

Frontend will run on:

http://localhost:5173

Backend will run on:

http://localhost:5000

⸻

API Modules

* Authentication API
* User Management API
* Event Management API
* Registration API
* Waitlist API
* QR Attendance API
* Certificate API
* Notification API
* Feedback API
* Analytics API

⸻

Authentication & Authorization

EventSphere uses JWT-based authentication with role-based access control.

Supported roles:

* Admin
* Organizer
* Participant

Protected routes are secured using middleware.

⸻

Major Functionalities

Event Lifecycle

Event Creation → Admin Approval → Registration → Waitlist → QR Ticket → Attendance → Feedback → Certificate

QR Attendance

* Unique QR code generated for each registration
* Organizer scans QR code using browser camera
* Attendance is marked instantly
* Duplicate attendance is prevented

Waitlist Management

* Automatically adds users to waitlist if event capacity is full
* Promotes waitlisted users automatically when someone cancels

Analytics Dashboard

* Total users
* Total events
* Total registrations
* Attendance rate
* Top participants
* Event-wise feedback scores

⸻

Deployment

Frontend Deployment

Hosted on Vercel:

https://client-umber-rho-85.vercel.app

Backend Deployment

Hosted as Vercel Serverless Functions.

⸻

Future Improvements

* AI-powered event recommendations
* Real-time chat using Socket.io
* Payment gateway integration
* Mobile app using React Native
* Push notifications
* Progressive Web App support
* Google and GitHub OAuth login
* More Indian language support

⸻

Screenshots

Add screenshots here for:

* Landing Page
* Admin Dashboard
* Organizer Dashboard
* Participant Dashboard
* QR Attendance Screen
* Analytics Dashboard
* Calendar View

⸻

Authors

* Eshaan Sharma
* Ramit Koirala

⸻

License

This project is developed for academic and educational purposes under Chandigarh University.

⸻

Acknowledgement

Special thanks to Chandigarh University, the Department of AIT-CSE, and our faculty guide Ms. Amandeep Kaur Seekhon for their support and guidance throughout the development of this project.
