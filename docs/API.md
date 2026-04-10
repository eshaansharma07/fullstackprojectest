# EventSphere API Documentation

Base URL:

```text
http://localhost:5000/api
```

## Authentication

### `POST /auth/register`
- Create a new account
- Supports `multipart/form-data`

### `POST /auth/login`
- Login with email and password

### `POST /auth/forgot-password`
- Request reset link

### `POST /auth/reset-password/:token`
- Reset password with token

### `GET /auth/me`
- Get logged-in user

## Users

### `PUT /users/me`
- Update profile fields

### `GET /users/me/activity`
- Registrations, attended events, certificates, and past events

### `GET /users/favorites`
- Fetch favorite events

### `POST /users/favorites/:eventId`
- Toggle favorite

### `GET /users`
- Admin only

### `DELETE /users/:id`
- Admin only

## Events

### `GET /events/home`
- Homepage payload with featured, trending, recent, categories, stats, testimonials

### `GET /events`
- Search, filter, paginate events
- Query params:
  - `page`
  - `limit`
  - `search`
  - `category`
  - `venue`
  - `date`
  - `organizer`
  - `mode`
  - `status`
  - `approvalStatus`

### `GET /events/:id`
- Event details, related events, feedback

### `POST /events`
- Organizer/Admin

### `PUT /events/:id`
- Organizer/Admin

### `DELETE /events/:id`
- Organizer/Admin

### `PATCH /events/:id/approval`
- Admin approval or rejection

### `GET /events/:id/participants`
- Organizer/Admin participant list

### `GET /events/:id/participants/export`
- Organizer/Admin CSV export

### `GET /events/recommendations/ai`
- Participant recommendations based on interests and categories

## Registrations

### `POST /registrations/event/:eventId`
- Participant registration with waitlist logic

### `PATCH /registrations/:id/cancel`
- Cancel registration

### `GET /registrations/me`
- Participant registrations with QR code payload

### `POST /registrations/scan`
- Organizer/Admin QR attendance marking

## Dashboards

### `GET /dashboard/participant`
- Participant cards and leaderboard

### `GET /dashboard/organizer`
- Organizer summary, event registration chart, category performance

### `GET /dashboard/admin`
- Admin counts, event insights, growth metrics, organizer performance

## Categories

### `GET /categories`
- Public category list

### `POST /categories`
- Admin create category

### `PUT /categories/:id`
- Admin update category

### `DELETE /categories/:id`
- Admin delete category

## Notifications

### `GET /notifications`
- Personal + global notifications

### `PATCH /notifications/:id/read`
- Mark notification as read

### `POST /notifications/event/:eventId/announcement`
- Organizer/Admin event announcement

### `POST /notifications/global`
- Admin global banner announcement

## Feedback

### `GET /feedback/:eventId`
- Event feedback list

### `POST /feedback/:eventId`
- Participant feedback after attendance

## Public

### `GET /public/meta`
- FAQ, categories, and announcements

### `POST /public/contact`
- Contact form submission
