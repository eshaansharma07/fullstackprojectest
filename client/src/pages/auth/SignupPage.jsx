import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "participant",
    institute: "",
    interests: "Tech Fest,Workshop"
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "interests") {
        formData.append(key, JSON.stringify(value.split(",").map((item) => item.trim()).filter(Boolean)));
      } else {
        formData.append(key, value);
      }
    });

    const user = await signup(formData);
    navigate(user.role === "admin" ? "/admin" : user.role === "organizer" ? "/organizer" : "/dashboard");
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center px-4 py-12">
      <form onSubmit={handleSubmit} className="glass w-full space-y-5 rounded-[32px] p-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-white dark:text-white">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">Sign up as admin, organizer, or participant.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <input className="input" placeholder="Institute / Organization" value={form.institute} onChange={(e) => setForm({ ...form, institute: e.target.value })} />
          <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="participant">Participant / Student</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>
          <input className="input" placeholder="Interests (comma separated)" value={form.interests} onChange={(e) => setForm({ ...form, interests: e.target.value })} />
        </div>
        <button className="btn-primary w-full" type="submit">Create account</button>
        <div className="text-sm text-slate-400">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
