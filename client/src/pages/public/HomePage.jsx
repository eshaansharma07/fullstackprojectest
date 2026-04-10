import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, CalendarHeart, Search, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../api/http.js";
import { EventCard } from "../../components/common/EventCard.jsx";
import { SectionHeading } from "../../components/common/SectionHeading.jsx";
import { StatCard } from "../../components/common/StatCard.jsx";
import { SkeletonCard } from "../../components/ui/SkeletonCard.jsx";
import { useTranslation } from "../../hooks/useTranslation.js";

export default function HomePage() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    api.get("/events/home").then((response) => setData(response.data.data));
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-24 px-4 py-10 md:px-6">
      <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-7">
          <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
            {t("brandTagline")}
          </span>
          <div className="space-y-4">
            <h1 className="font-display text-5xl font-semibold leading-tight text-white dark:text-white md:text-7xl">
              Plan, approve, promote, and analyze every event from one polished workspace.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">{t("discoverEvents")}</p>
          </div>
          <div className="glass flex items-center gap-3 rounded-3xl p-3">
            <Search size={18} className="ml-3 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent py-3 text-sm outline-none"
              placeholder="Search by title, venue, category, or organizer"
            />
            <Link to={search ? `/?search=${encodeURIComponent(search)}` : "/"} className="btn-primary">
              Explore
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/signup" className="btn-primary">
              Get started <ArrowRight size={16} />
            </Link>
            <Link to="/calendar" className="btn-secondary">
              View calendar
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass relative overflow-hidden rounded-[32px] p-6"
        >
          <div className="absolute inset-0 bg-mesh" />
          <div className="relative grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <StatCard title="Events managed" value={data?.stats?.totalEvents || "120+"} description="All approved and moderated centrally" icon={CalendarHeart} />
              <StatCard title="Registrations" value={data?.stats?.totalRegistrations || "2.4K"} description="Tickets, QR codes, and attendance in one flow" icon={Users} tone="emerald" />
            </div>
            <div className="glass rounded-3xl p-5">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-white dark:text-white">Trending this week</h3>
                <BarChart3 className="text-sky-300" />
              </div>
              <div className="space-y-4">
                {(data?.trendingEvents || []).slice(0, 3).map((event) => (
                  <div key={event._id} className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
                    <div>
                      <div className="font-medium text-white dark:text-white">{event.title}</div>
                      <div className="text-xs text-slate-400">{event.registrationCount} registrations</div>
                    </div>
                    <div className="rounded-full bg-sky-400/10 px-3 py-1 text-xs text-sky-300">{event.category?.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <StatCard title="Total Events" value={data?.stats?.totalEvents || 0} description="Approved public events" icon={CalendarHeart} />
        <StatCard title="Registrations" value={data?.stats?.totalRegistrations || 0} description="Across colleges and communities" icon={Users} tone="emerald" />
        <StatCard title="Active Users" value={data?.stats?.activeUsers || 0} description="Students, organizers, and admins" icon={BarChart3} tone="pink" />
      </section>

      <section className="space-y-8">
        <SectionHeading badge={t("featuredEvents")} title="Curated events evaluators can understand instantly" description="A premium, easy-to-demo homepage with approvals, filters, countdowns, and shareable event pages." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data?.featuredEvents?.length
            ? data.featuredEvents.map((event) => <EventCard key={event._id} event={event} />)
            : Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading badge={t("categories")} title="Built for every format of campus and community event" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {(data?.categories || []).map((category) => (
            <div key={category._id} className="glass rounded-3xl p-5">
              <div className="text-sm text-slate-400">{category.description}</div>
              <div className="mt-4 font-display text-2xl font-semibold text-white dark:text-white">{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading badge="Recently Added" title="Freshly added events" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {(data?.recentEvents || []).map((event) => (
            <EventCard key={event._id} event={event} compact />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading badge={t("testimonials")} title="Trusted by students, admins, and event teams" />
        <div className="grid gap-5 md:grid-cols-3">
          {(data?.testimonials || []).map((item) => (
            <div key={item._id} className="glass rounded-3xl p-6">
              <div className="text-4xl text-sky-300">“</div>
              <p className="mt-3 text-slate-300">{item.comment}</p>
              <div className="mt-6">
                <div className="font-medium text-white dark:text-white">{item.user?.name}</div>
                <div className="text-sm text-slate-400">{item.event?.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
