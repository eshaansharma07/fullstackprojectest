import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Calendar, Clock3, MapPin, Star, UserRound } from "lucide-react";
import { useParams } from "react-router-dom";
import api, { extractErrorMessage } from "../../api/http.js";
import { EventCard } from "../../components/common/EventCard.jsx";
import { Loader } from "../../components/ui/Loader.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { formatDate } from "../../lib/utils.js";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const load = async () => {
    const { data } = await api.get(`/events/${id}`);
    setEventData(data.data);
  };

  useEffect(() => {
    load();
  }, [id]);

  const averageRating = useMemo(() => {
    const feedback = eventData?.feedback || [];
    if (!feedback.length) return "New";
    return (feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length).toFixed(1);
  }, [eventData]);

  const handleRegister = async () => {
    try {
      await api.post(`/registrations/event/${id}`);
      toast.success("Registration created");
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  const handleFeedback = async (event) => {
    event.preventDefault();
    try {
      await api.post(`/feedback/${id}`, { rating, comment });
      toast.success("Feedback submitted");
      setComment("");
      load();
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  if (!eventData) return <Loader label="Loading event details..." />;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 md:px-6">
      <section className="glass overflow-hidden rounded-[36px]">
        <div className="relative h-80">
          <img
            src={eventData.banner || eventData.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80"}
            alt={eventData.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-white">{eventData.category?.name}</div>
            <h1 className="font-display text-4xl font-semibold text-white md:text-5xl">{eventData.title}</h1>
            <p className="mt-3 max-w-3xl text-slate-200">{eventData.description}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass rounded-3xl p-5"><Calendar className="mb-3 text-sky-300" />{formatDate(eventData.startDate)}</div>
            <div className="glass rounded-3xl p-5"><Clock3 className="mb-3 text-emerald-300" />Deadline: {formatDate(eventData.registrationDeadline)}</div>
            <div className="glass rounded-3xl p-5"><MapPin className="mb-3 text-pink-300" />{eventData.venue}</div>
            <div className="glass rounded-3xl p-5"><UserRound className="mb-3 text-amber-300" />{eventData.organizerName}</div>
          </div>

          <div className="glass rounded-[32px] p-6">
            <h2 className="font-display text-2xl font-semibold text-white dark:text-white">Details</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {eventData.tags?.map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{tag}</span>
              ))}
            </div>
            <div className="mt-5 text-sm leading-7 text-slate-300">
              Capacity: {eventData.capacity} · Mode: {eventData.mode} · Status: {eventData.status}
            </div>
          </div>

          <div className="glass rounded-[32px] p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-white dark:text-white">Feedback & ratings</h2>
              <div className="flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1 text-sm text-amber-300">
                <Star size={16} /> {averageRating}
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {eventData.feedback.map((item) => (
                <div key={item._id} className="rounded-2xl bg-white/5 p-4">
                  <div className="font-medium text-white dark:text-white">{item.user?.name}</div>
                  <div className="text-sm text-slate-400">Rating: {item.rating}/5</div>
                  <p className="mt-2 text-sm text-slate-300">{item.comment}</p>
                </div>
              ))}
            </div>
            {user?.role === "participant" ? (
              <form onSubmit={handleFeedback} className="mt-6 space-y-4">
                <select className="input" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                  {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} Stars</option>)}
                </select>
                <textarea className="input min-h-28" placeholder="Share your experience" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button className="btn-primary">Submit feedback</button>
              </form>
            ) : null}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass rounded-[32px] p-6">
            <h2 className="font-display text-2xl font-semibold text-white dark:text-white">Registration</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div>Registrations: {eventData.registrationCount}</div>
              <div>Available seats: {Math.max(eventData.capacity - eventData.registrationCount, 0)}</div>
              <div>Approval: {eventData.approvalStatus}</div>
            </div>
            {user?.role === "participant" ? (
              <button onClick={handleRegister} className="btn-primary mt-5 w-full">Register now</button>
            ) : null}
          </div>

          <div className="space-y-5">
            <h2 className="font-display text-2xl font-semibold text-white dark:text-white">Related events</h2>
            {eventData.relatedEvents.map((item) => (
              <EventCard key={item._id} event={item} compact />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
