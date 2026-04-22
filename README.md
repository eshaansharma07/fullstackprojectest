# EventSphere – Smart Event Management System

EventSphere is a production-oriented full-stack MERN web application for colleges, institutes, clubs, RWAs, and local communities. It centralizes approvals, registrations, notifications, analytics, attendance, certificates, feedback, favorites, waitlists, and role-based dashboards in one platform.

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
- QR-based ticket generation plus organizer/admin attendance marking
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

Create a root `.env` file for backend/local server settings:

```env
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
```

Create a root `.env.local` or Vercel frontend environment value for the client:

```env
VITE_API_URL=http://localhost:5000/api
```

Notes:

- `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, and `CLIENT_URL` are required for production.
- `PORT` and `NODE_ENV` are used by the local/server runtime.
- `CLOUDINARY_*` and `EMAIL_*` are optional in development, but features that depend on uploads or email will be skipped or limited if they are not set.
- `SERVER_URL` is not used by the current codebase and is intentionally omitted.

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

3. Add your environment variables to the root `.env`.

4. Optional: set `VITE_API_URL=http://localhost:5000/api` in `.env.local` if you want to override the frontend API target explicitly.

5. Seed sample data:
```bash
npm run seed
```

6. Run both frontend and backend:
```bash
npm run dev
```

7. Open:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000/api/health`

## Demo Seed Accounts

- Admin: `admin@eventsphere.com` / `password123`
- Organizer: `organizer@eventsphere.com` / `password123`
- Participant: `participant@eventsphere.com` / `password123`

## API Documentation

Detailed endpoint documentation is available in [docs/API.md](docs/API.md).

## Screenshots

Add screenshots in [docs/screenshots](docs/screenshots) and update this section before submission:

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
4. Vercel uses [server/vercel.json](server/vercel.json).
5. Add these production environment variables:
   `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`
6. Add these optional production environment variables if you use uploads or email features:
   `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `EMAIL_USER`, `EMAIL_PASS`
7. Deploy. The API health URL will be `/api/health`.

### Frontend deployment

1. Create a second Vercel project for the same repo.
2. Set the project root directory to `client`.
3. Framework preset: `Vite`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add `VITE_API_URL` pointing to your deployed backend URL plus `/api`
7. Vercel uses [client/vercel.json](client/vercel.json) so React routes work after refresh.

### Suggested environment values

- Backend `CLIENT_URL`: your deployed frontend URL
- Frontend `VITE_API_URL`: your deployed backend URL followed by `/api`

## Evaluation Talking Points

- Full MERN implementation with modular MVC backend
- Real event flow with approvals, registration, waitlist, QR attendance, analytics, and certificates
- Premium UI with dashboards, charts, dark mode, and responsive layouts
- Clear deployment strategy and beginner-friendly project structure
