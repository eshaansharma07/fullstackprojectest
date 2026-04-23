import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import api from "../../api/http.js";
import { EventCard } from "../../components/common/EventCard.jsx";
import { SectionHeading } from "../../components/common/SectionHeading.jsx";
import { StatCard } from "../../components/common/StatCard.jsx";
import { Loader } from "../../components/ui/Loader.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ParticipantDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState([]);
  const [eventFilter, setEventFilter] = useState("available");
  const { user } = useAuth();

  useEffect(() => {
    Promise.all([
      api.get("/dashboard/participant"),
      api.get("/events/recommendations/ai"),
      api.get("/registrations/me"),
      api.get("/events?limit=100")
    ]).then(([dashboardRes, recRes, registrationsRes, eventsRes]) => {
      setDashboard(dashboardRes.data.data);
      setRecommendations(recRes.data.data);
      setAllEvents(eventsRes.data.data);
      setRegisteredEventIds(
        registrationsRes.data.data
          .filter((item) => item.status !== "cancelled")
          .map((item) => item.event?._id)
          .filter(Boolean)
      );
    });
  }, []);

  const visibleEvents = useMemo(() => {
    const merged = [...recommendations, ...allEvents];
    const deduped = merged.filter((event, index, source) => source.findIndex((item) => item._id === event._id) === index);

    return deduped.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }, [allEvents, recommendations]);

  const filteredRecommendations = useMemo(() => {
    if (eventFilter === "registered") {
      return visibleEvents.filter((event) => registeredEventIds.includes(event._id));
    }

    if (eventFilter === "available") {
      return visibleEvents.filter((event) => !registeredEventIds.includes(event._id));
    }

    return visibleEvents;
  }, [eventFilter, visibleEvents, registeredEventIds]);

  if (!dashboard) return <Loader label="Loading dashboard..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Welcome, {user?.name}</h1>
        <p className="page-subtitle">Track your registrations, favorites, certificates, and leaderboard rank.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard title="My Registrations" value={dashboard.cards.myRegistrations} description="Active tickets and waitlist items" />
        <StatCard title="Attended Events" value={dashboard.cards.attendedEvents} description="Events checked-in via QR scan" tone="emerald" />
        <StatCard title="Favorites" value={dashboard.cards.favorites} description="Saved for quick access" tone="pink" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-[32px] p-6">
          <SectionHeading badge="Leaderboard" title="Most active participants" />
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboard.leaderboard}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="points" fill="#38bdf8" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-[32px] p-6">
          <SectionHeading badge="AI Picks" title="Recommended events for you" />
          <div className="mt-5 space-y-4">
            {(recommendations.length ? recommendations : visibleEvents).slice(0, 3).map((event) => (
              <div key={event._id} className="rounded-2xl border border-slate-100 bg-white/90 p-4">
                <div className="font-medium text-slate-900">{event.title}</div>
                <div className="mt-1 text-sm text-slate-600">{event.category?.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading badge="Events" title="Browse approved events and quickly separate new ones from your registrations" />
          <div className="flex flex-wrap gap-2">
            {[
              { key: "available", label: "Available events" },
              { key: "registered", label: "Already registered" },
              { key: "all", label: "All" }
            ].map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setEventFilter(filter.key)}
                className={
                  eventFilter === filter.key
                    ? "rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                    : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600"
                }
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredRecommendations.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
        {!filteredRecommendations.length ? (
          <div className="text-sm text-slate-500">No events match the selected filter right now.</div>
        ) : null}
      </section>
    </div>
  );
}
