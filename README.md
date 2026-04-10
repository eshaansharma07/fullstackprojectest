# EventSphere – Smart Event Management System

EventSphere is a production-oriented full-stack MERN web application for colleges, institutes, clubs, RWAs, and local communities. It solves fragmented event coordination with a centralized platform for approvals, registrations, notifications, analytics, QR attendance, certificates, feedback, favorites, waitlists, and role-based dashboards.

## Tech Stack

- Frontend: React.js, Vite, Tailwind CSS, Framer Motion, Recharts, React Big Calendar
- Backend: Node.js, Express.js, Mongoose, JWT, bcrypt
- Database: MongoDB Atlas
- Uploads: Multer, Cloudinary
- Notifications: Nodemailer
- QR Code: qrcode
- State: Context API
- Deployment: Vercel frontend + Vercel serverless backend

## Key Features

- JWT authentication with role-based access control
- Admin, organizer, and participant dashboards
- Event creation, editing, approval, deletion, and moderation
- Event categories, tags, featured events, trending events, and recent events
- Event registration, cancellation, waitlist handling, and favorites
- QR-based ticket generation and attendance marking
- Ticket PDF downloads
- Feedback, ratings, certificates, and participant leaderboard
- Real-time style notification polling and announcement system
- Event analytics, charts, and event insights
- English and Hindi language toggle
- Dark and light mode
- Calendar view, contact form, FAQ, terms, privacy, and 404 page
- Seed data for quick demo and evaluation

## Folder Structure

```text
.
├── client/
├── server/
├── docs/
│   └── screenshots/
├── .env.example
├── package.json
├── README.md
└── vercel.json
```

## Environment Variables

Create a `.env` file in the project root and keep these values available for the backend:

```env
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
```

Frontend can optionally use:

```env
VITE_API_URL=http://localhost:5000/api
```

## Local Setup

1. Clone the repository:
```bash
git clone https://github.com/eshaansharma07/fullstackprojectest.git
cd fullstackprojectest
```

2. Install dependencies:
```bash
npm install
```

3. Add `.env` values in the root.

4. Seed sample data:
```bash
npm run seed
```

5. Run both frontend and backend:
```bash
npm run dev
```

6. Open:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000/api/health`

## Demo Seed Accounts

- Admin: `admin@eventsphere.com` / `password123`
- Organizer: `organizer@eventsphere.com` / `password123`
- Participant: `participant@eventsphere.com` / `password123`

## API Documentation

Detailed endpoint documentation is available in [docs/API.md](/Users/eshaansharma/Downloads/FULL STACK PROJECT EST ASSESMENT/docs/API.md).

## Screenshots

Add screenshots in [docs/screenshots](/Users/eshaansharma/Downloads/FULL STACK PROJECT EST ASSESMENT/docs/screenshots) and update this section before submission:

- Home page
- Participant dashboard
- Organizer dashboard
- Admin dashboard
- Event details page
- Calendar page

## Deployment on Vercel

### Backend deployment

1. Import the GitHub repo into Vercel.
2. Set the project root directory to `server`.
3. Framework preset: `Other`.
4. Vercel will use [server/vercel.json](/Users/eshaansharma/Downloads/FULL STACK PROJECT EST ASSESMENT/server/vercel.json).
5. Add environment variables:
   `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`, `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `EMAIL_USER`, `EMAIL_PASS`
6. Deploy. The API health URL will be `/api/health`.

### Frontend deployment

1. Create a second Vercel project for the same repo.
2. Set the project root directory to `client`.
3. Framework preset: `Vite`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add `VITE_API_URL` pointing to your deployed backend URL plus `/api`
7. Vercel will use [client/vercel.json](/Users/eshaansharma/Downloads/FULL STACK PROJECT EST ASSESMENT/client/vercel.json) so React routes work after refresh.

### Suggested environment values

- Backend `CLIENT_URL`: your deployed frontend URL
- Frontend `VITE_API_URL`: your deployed backend URL followed by `/api`

## GitHub Push Commands

Use these exact commands after review:

```bash
git init
git checkout -b codex/eventsphere
git add .
git commit -m "Build EventSphere full-stack event management system"
git remote add origin https://github.com/eshaansharma07/fullstackprojectest.git
git push -u origin codex/eventsphere
```

## Evaluation Talking Points

- Full MERN implementation with modular MVC backend
- Real event flow with approvals, registration, waitlist, QR attendance, analytics, and certificates
- Premium UI with dashboards, charts, dark mode, and responsive layouts
- Clear deployment strategy and beginner-friendly project structure
