import { createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";
import { DashboardShell } from "../components/layout/DashboardShell.jsx";
import { PublicLayout } from "../components/layout/PublicLayout.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import HomePage from "../pages/public/HomePage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import SignupPage from "../pages/auth/SignupPage.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";
import ParticipantDashboard from "../pages/dashboard/ParticipantDashboard.jsx";
import OrganizerDashboard from "../pages/dashboard/OrganizerDashboard.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import EventDetailsPage from "../pages/events/EventDetailsPage.jsx";
import EventFormPage from "../pages/events/EventFormPage.jsx";
import MyRegistrationsPage from "../pages/dashboard/MyRegistrationsPage.jsx";
import FavoritesPage from "../pages/dashboard/FavoritesPage.jsx";
import NotificationsPage from "../pages/dashboard/NotificationsPage.jsx";
import CalendarPage from "../pages/public/CalendarPage.jsx";
import ContactPage from "../pages/public/ContactPage.jsx";
import FAQPage from "../pages/public/FAQPage.jsx";
import AboutPage from "../pages/public/AboutPage.jsx";
import TermsPage from "../pages/public/TermsPage.jsx";
import PrivacyPage from "../pages/public/PrivacyPage.jsx";
import NotFoundPage from "../pages/public/NotFoundPage.jsx";
import ProfilePage from "../pages/dashboard/ProfilePage.jsx";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Route>

      <Route element={<ProtectedRoute roles={["participant", "organizer", "admin"]} />}>
        <Route element={<DashboardShell />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["participant"]} />}>
        <Route element={<DashboardShell />}>
          <Route path="/dashboard" element={<ParticipantDashboard />} />
          <Route path="/my-registrations" element={<MyRegistrationsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["organizer", "admin"]} />}>
        <Route element={<DashboardShell />}>
          <Route path="/organizer" element={<OrganizerDashboard />} />
          <Route path="/events/create" element={<EventFormPage />} />
          <Route path="/events/:id/edit" element={<EventFormPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route element={<DashboardShell />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);
