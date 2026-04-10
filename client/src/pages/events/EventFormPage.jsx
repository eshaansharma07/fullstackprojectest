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
  tags: "college,community"
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
          tags: event.tags?.join(",") || ""
        });
      });
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: JSON.stringify(form.tags.split(",").map((item) => item.trim()).filter(Boolean))
      };

      if (isEdit) {
        await api.put(`/events/${id}`, payload);
        toast.success("Event updated");
      } else {
        await api.post("/events", payload);
        toast.success("Event submitted");
      }
      navigate("/organizer");
    } catch (error) {
      toast.error(extractErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-[32px] p-8">
      <h1 className="font-display text-4xl font-semibold text-white dark:text-white">
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
