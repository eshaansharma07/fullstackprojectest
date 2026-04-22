import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { Link } from "react-router-dom";
import api from "../../api/http.js";
import { StatCard } from "../../components/common/StatCard.jsx";
import { SectionHeading } from "../../components/common/SectionHeading.jsx";
import { Loader } from "../../components/ui/Loader.jsx";

const COLORS = ["#38bdf8", "#34d399", "#f472b6", "#f59e0b"];

export default function OrganizerDashboard() {
  const [dashboard, setDashboard] = useState(null);
  useEffect(() => {
    api.get("/dashboard/organizer").then((response) => setDashboard(response.data.data));
  }, []);

  if (!dashboard) return <Loader label="Loading organizer insights..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Organizer Dashboard</h1>
        <p className="page-subtitle">Manage events, approvals, attendance, participants, and analytics.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard title="Total Events" value={dashboard.cards.totalEvents} description="Created by your account" />
        <StatCard title="Total Registrations" value={dashboard.cards.totalRegistrations} description="Across managed events" tone="emerald" />
        <StatCard title="Pending Approvals" value={dashboard.cards.pendingApprovals} description="Awaiting admin review" tone="pink" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-[32px] p-6">
          <SectionHeading badge="Registrations" title="Registrations per event" />
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboard.registrationsPerEvent}>
                <defs>
                  <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="title" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="registrations" stroke="#38bdf8" fillOpacity={1} fill="url(#colorRegistrations)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-[32px] p-6">
          <SectionHeading
            badge="Attendance"
            title="Simple attendance workflow"
            description="Open the attendance tab to mark participants present or absent with one click."
          />
          <Link to="/attendance" className="btn-primary mt-6 w-full">
            Open attendance tab
          </Link>
        </div>
      </div>

      <div className="glass rounded-[32px] p-6">
        <SectionHeading badge="Category Performance" title="Where your registrations are growing fastest" />
        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dashboard.categoryPerformance} dataKey="registrations" nameKey="_id" outerRadius={120} label>
                {dashboard.categoryPerformance.map((entry, index) => (
                  <Cell key={entry._id} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
