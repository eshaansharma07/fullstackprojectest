import { useState } from "react";
import toast from "react-hot-toast";
import api, { extractErrorMessage } from "../../api/http.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    institute: user?.institute || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    language: user?.language || "en"
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.put("/users/me", form);
      await refreshUser();
      toast.success("Profile updated");
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <div className="glass rounded-[32px] p-8">
      <h1 className="font-display text-4xl font-semibold text-white dark:text-white">Profile</h1>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
        <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Institute" value={form.institute} onChange={(e) => setForm({ ...form, institute: e.target.value })} />
        <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <select className="input" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
        <textarea className="input min-h-40 md:col-span-2" placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        <button className="btn-primary md:col-span-2">Save profile</button>
      </form>
    </div>
  );
}
