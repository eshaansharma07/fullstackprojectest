import { CalendarDays, Heart, MapPin, Share2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CountdownTimer } from "./CountdownTimer.jsx";
import { formatDate } from "../../lib/utils.js";

export function EventCard({ event, onFavorite, isFavorite, compact = false }) {
  const shareEvent = async () => {
    const url = `${window.location.origin}/events/${event._id}`;
    if (navigator.share) {
      await navigator.share({ title: event.title, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <motion.div whileHover={{ y: -6 }} className="glass overflow-hidden rounded-[28px]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            event.banner ||
            event.image ||
            "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
          }
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
            {event.category?.name || "Event"}
          </span>
          <CountdownTimer targetDate={event.startDate} />
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          {onFavorite ? (
            <button onClick={() => onFavorite(event._id)} className="rounded-full bg-white/10 p-2 text-white">
              <Heart size={16} className={isFavorite ? "fill-current text-rose-400" : ""} />
            </button>
          ) : null}
          <button onClick={shareEvent} className="rounded-full bg-white/10 p-2 text-white">
            <Share2 size={16} />
          </button>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <h3 className="font-display text-xl font-semibold text-white dark:text-white">{event.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-slate-300">{event.description}</p>
        </div>
        <div className={`grid gap-3 text-sm text-slate-300 ${compact ? "grid-cols-1" : "grid-cols-2"}`}>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-sky-300" />
            {formatDate(event.startDate)}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-emerald-300" />
            {event.venue}
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-pink-300" />
            {event.registrationCount}/{event.capacity}
          </div>
          <div>{event.mode}</div>
        </div>
        <Link to={`/events/${event._id}`} className="btn-primary w-full">
          View details
        </Link>
      </div>
    </motion.div>
  );
}
