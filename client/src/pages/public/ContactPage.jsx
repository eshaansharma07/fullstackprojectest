import { useState } from "react";
import toast from "react-hot-toast";
import api, { extractErrorMessage } from "../../api/http.js";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/public/contact", form);
      toast.success("Message sent successfully");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <div className="glass rounded-[36px] p-8">
        <h1 className="page-title">Contact Us</h1>
        <p className="mt-3 text-slate-500">Reach the EventSphere team for demos, support, or deployment help.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <textarea className="input min-h-40" placeholder="How can we help?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          <button className="btn-primary">Send message</button>
        </form>
      </div>
    </div>
  );
}
