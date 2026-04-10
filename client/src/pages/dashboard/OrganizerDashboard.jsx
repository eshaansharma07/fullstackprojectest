import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import api, { extractErrorMessage } from "../../api/http.js";
import { StatCard } from "../../components/common/StatCard.jsx";
import { SectionHeading } from "../../components/common/SectionHeading.jsx";
import { Loader } from "../../components/ui/Loader.jsx";

const COLORS = ["#38bdf8", "#34d399", "#f472b6", "#f59e0b"];

export default function OrganizerDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    api.get("/dashboard/organizer").then((response) => setDashboard(response.data.data));
  }, []);

  const handleScan = async (event) => {
    event.preventDefault();
    try {
      await api.post("/registrations/scan", { qrToken: token });
      toast.success("Attendance marked");
      setToken("");
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  if (!dashboard) return <Loader label="Loading organizer insights..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl font-semibold text-white dark:text-white">Organizer Dashboard</h1>
        <p className="mt-2 text-slate-400">Manage events, approvals, attendance, participants, and analytics.</p>
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
          <SectionHeading badge="Attendance" title="QR scan attendance desk" />
          <form onSubmit={handleScan} className="mt-6 space-y-4">
            <textarea className="input min-h-36" placeholder="Paste QR token after scanning" value={token} onChange={(e) => setToken(e.target.value)} />
            <button className="btn-primary w-full" type="submit">Mark attendance</button>
          </form>
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
