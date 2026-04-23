import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api, { extractErrorMessage } from "../../api/http.js";

const initialState = {
  title: "",
  description: "",
  category: "",
  venue: "",
  capacity: 100,
  startDate: "",
  endDate: "",
  registrationDeadline: "",
  mode: "offline",
  meetingLink: "",
  tags: "college,community",
  image: null,
  banner: null
};

export default function EventFormPage() {
  const [form, setForm] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = useMemo(() => Boolean(id), [id]);

  useEffect(() => {
    api.get("/categories").then((response) => setCategories(response.data.data));
    if (id) {
      api.get(`/events/${id}`).then((response) => {
        const event = response.data.data;
        setForm({
          title: event.title,
          description: event.description,
          category: event.category?._id,
          venue: event.venue,
          capacity: event.capacity,
          startDate: event.startDate?.slice(0, 16),
          endDate: event.endDate?.slice(0, 16),
          registrationDeadline: event.registrationDeadline?.slice(0, 16),
          mode: event.mode,
          meetingLink: event.meetingLink || "",
          tags: event.tags?.join(",") || "",
          image: null,
          banner: null
        });
      });
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("description", form.description);
      payload.append("category", form.category);
      payload.append("venue", form.venue);
      payload.append("capacity", form.capacity);
      payload.append("startDate", form.startDate);
      payload.append("endDate", form.endDate);
      payload.append("registrationDeadline", form.registrationDeadline);
      payload.append("mode", form.mode);
      payload.append("meetingLink", form.meetingLink);
      payload.append("tags", JSON.stringify(form.tags.split(",").map((item) => item.trim()).filter(Boolean)));

      if (form.image instanceof File) {
        payload.append("image", form.image);
      }

      if (form.banner instanceof File) {
        payload.append("banner", form.banner);
      }

      if (isEdit) {
        const response = await api.put(`/events/${id}`, payload);
        toast.success(response.data.message || "Event updated");
      } else {
        const response = await api.post("/events", payload);
        toast.success(response.data.message || "Event submitted");
      }
      navigate("/organizer");
    } catch (error) {
      toast.error(extractErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-strong rounded-[32px] p-8">
      <h1 className="page-title">
        {isEdit ? "Edit Event" : "Create Event"}
      </h1>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
        <input className="input" placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
          <option value="">Select category</option>
          {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
        </select>
        <input className="input" placeholder="Venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} required />
        <input className="input" type="number" placeholder="Capacity" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} required />
        <input className="input" type="datetime-local" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
        <input className="input" type="datetime-local" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} required />
        <input className="input" type="datetime-local" value={form.registrationDeadline} onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })} required />
        <select className="input" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
          <option value="offline">Offline</option>
          <option value="online">Online</option>
        </select>
        <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-medium text-slate-700">
          Event card image
          <input
            type="file"
            accept="image/*"
            className="text-sm text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
          />
        </label>
        <label className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-medium text-slate-700">
          Event hero banner
          <input
            type="file"
            accept="image/*"
            className="text-sm text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            onChange={(e) => setForm({ ...form, banner: e.target.files?.[0] || null })}
          />
        </label>
        <input className="input md:col-span-2" placeholder="Meeting link (for online events)" value={form.meetingLink} onChange={(e) => setForm({ ...form, meetingLink: e.target.value })} />
        <input className="input md:col-span-2" placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        <textarea className="input min-h-40 md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <button className="btn-primary md:col-span-2" disabled={loading} type="submit">
          {loading ? "Saving..." : isEdit ? "Update event" : "Create event"}
        </button>
      </form>
    </div>
  );
}
