import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import api, { extractErrorMessage } from "../../api/http.js";
import { StatCard } from "../../components/common/StatCard.jsx";
import { Loader } from "../../components/ui/Loader.jsx";
import { formatDate } from "../../lib/utils.js";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "", color: "#38bdf8" });

  const load = async () => {
    const [dashboardRes, eventsRes, usersRes, categoriesRes] = await Promise.all([
      api.get("/dashboard/admin"),
      api.get("/events?approvalStatus=pending&includeAll=true"),
      api.get("/users"),
      api.get("/categories")
    ]);

    setDashboard(dashboardRes.data.data);
    setEvents(eventsRes.data.data);
    setUsers(usersRes.data.data);
    setCategories(categoriesRes.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  const insightCards = useMemo(
    () => dashboard?.eventInsights || {},
    [dashboard]
  );

  const handleApproval = async (id, approvalStatus) => {
    try {
      await api.patch(`/events/${id}/approval`, { approvalStatus });
      toast.success(`Event ${approvalStatus}`);
      load();
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    try {
      await api.post("/categories", categoryForm);
      setCategoryForm({ name: "", description: "", color: "#38bdf8" });
      toast.success("Category created");
      load();
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  if (!dashboard) return <Loader label="Loading admin panel..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl font-semibold text-white dark:text-white">Admin Dashboard</h1>
        <p className="mt-2 text-slate-400">Approve events, manage users, categories, reports, and platform health.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard title="Total Users" value={dashboard.cards.totalUsers} description="All active accounts" />
        <StatCard title="Total Events" value={dashboard.cards.totalEvents} description="Across colleges and communities" tone="emerald" />
        <StatCard title="Total Registrations" value={dashboard.cards.totalRegistrations} description="Tracks adoption and demand" tone="pink" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Popular Category" value={insightCards.mostPopularEventCategory} description="Best performing category" />
        <StatCard title="Highest Attendance" value={insightCards.highestAttendanceEvent} description="Top performing event" tone="emerald" />
        <StatCard title="This Month" value={insightCards.totalRegistrationsThisMonth} description="Registrations this month" tone="amber" />
        <StatCard title="Organizer Metrics" value={dashboard.organizerPerformance.length} description="Tracked organizer profiles" tone="pink" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="glass rounded-[32px] p-6">
          <h2 className="font-display text-2xl font-semibold text-white dark:text-white">User growth</h2>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboard.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="_id" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#34d399" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-[32px] p-6">
          <h2 className="font-display text-2xl font-semibold text-white dark:text-white">Organizer performance</h2>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboard.organizerPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="_id" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="totalRegistrations" fill="#f472b6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="glass rounded-[32px] p-6">
          <h2 className="font-display text-2xl font-semibold text-white dark:text-white">Pending event approvals</h2>
          <div className="mt-6 space-y-4">
            {events.map((event) => (
              <div key={event._id} className="rounded-3xl bg-white/5 p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <div className="font-semibold text-white dark:text-white">{event.title}</div>
                    <div className="mt-1 text-sm text-slate-400">{event.organizerName} · {formatDate(event.startDate)}</div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleApproval(event._id, "approved")} className="btn-primary">Approve</button>
                    <button onClick={() => handleApproval(event._id, "rejected")} className="rounded-2xl bg-rose-500 px-4 py-3 text-sm font-medium text-white">Reject</button>
                  </div>
                </div>
              </div>
            ))}
            {!events.length ? <div className="text-sm text-slate-400">No pending approvals right now.</div> : null}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-[32px] p-6">
            <h2 className="font-display text-2xl font-semibold text-white dark:text-white">Manage categories</h2>
            <form onSubmit={handleCreateCategory} className="mt-5 space-y-4">
              <input className="input" placeholder="Category name" value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} required />
              <textarea className="input min-h-28" placeholder="Description" value={categoryForm.description} onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })} />
              <input className="input" type="color" value={categoryForm.color} onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })} />
              <button className="btn-primary w-full" type="submit">Create category</button>
            </form>
            <div className="mt-5 space-y-3">
              {categories.map((category) => (
                <div key={category._id} className="rounded-2xl bg-white/5 p-4">
                  <div className="font-medium text-white dark:text-white">{category.name}</div>
                  <div className="text-sm text-slate-400">{category.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-[32px] p-6">
            <h2 className="font-display text-2xl font-semibold text-white dark:text-white">Users</h2>
            <div className="mt-5 space-y-3">
              {users.slice(0, 6).map((user) => (
                <div key={user._id} className="rounded-2xl bg-white/5 p-4">
                  <div className="font-medium text-white dark:text-white">{user.name}</div>
                  <div className="text-sm text-slate-400">{user.email} · {user.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
