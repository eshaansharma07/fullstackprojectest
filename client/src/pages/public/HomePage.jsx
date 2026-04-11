import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, CalendarHeart, Search, Sparkles, Star, Users } from "lucide-react";
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
    <div className="mx-auto max-w-7xl space-y-24 px-4 py-8 md:px-6">
      <section className="relative overflow-hidden rounded-[40px] px-6 py-12 md:px-10">
        <motion.div
          className="hero-blob left-[-120px] top-[-80px] h-72 w-72 bg-violet-300/30"
          animate={{ y: [0, 12, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="hero-blob right-[-90px] top-16 h-64 w-64 bg-cyan-300/30"
          animate={{ y: [0, -12, 0], x: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
        <motion.div
          className="hero-blob bottom-[-100px] left-1/3 h-72 w-72 bg-pink-300/20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div className="space-y-7">
            <span className="accent-pill">{t("brandTagline")}</span>
            <div className="space-y-4">
              <h1 className="font-display text-5xl font-semibold leading-tight text-slate-900 md:text-7xl">
                Manage every <span className="gradient-text">event journey</span> with a brighter, premium startup UI.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-500">
                EventSphere brings together registrations, approvals, analytics, reminders, dashboards, and ticketing in
                one elegant light-theme experience inspired by luxury SaaS products.
              </p>
            </div>

            <div className="glass-strong flex items-center gap-3 rounded-[28px] p-3">
              <Search size={18} className="ml-3 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none"
                placeholder="Search by title, venue, category, or organizer"
              />
              <Link to={search ? `/?search=${encodeURIComponent(search)}` : "/"} className="btn-primary whitespace-nowrap">
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

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative">
            <div className="glass-strong rounded-[34px] p-6">
              <div className="mb-5 grid gap-4 md:grid-cols-2">
                <StatCard title="Events managed" value={data?.stats?.totalEvents || "120+"} description="Approved and live across categories" icon={CalendarHeart} />
                <StatCard title="Registrations" value={data?.stats?.totalRegistrations || "2.4K"} description="Tickets, QR passes, and capacity tracking" icon={Users} tone="emerald" />
              </div>

              <div className="grid gap-4">
                <div className="soft-card p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500">Event insights</div>
                      <div className="font-display text-xl font-semibold text-slate-900">Growth overview</div>
                    </div>
                    <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
                      <BarChart3 size={20} />
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs text-slate-400">This month</div>
                      <div className="mt-2 text-2xl font-semibold text-slate-900">{data?.stats?.totalRegistrations || 0}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs text-slate-400">Active users</div>
                      <div className="mt-2 text-2xl font-semibold text-slate-900">{data?.stats?.activeUsers || 0}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-xs text-slate-400">Trending score</div>
                      <div className="mt-2 text-2xl font-semibold text-slate-900">92%</div>
                    </div>
                  </div>
                </div>

                <div className="soft-card p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold text-slate-900">Trending this week</h3>
                    <Sparkles className="text-pink-500" />
                  </div>
                  <div className="space-y-3">
                    {(data?.trendingEvents || []).slice(0, 3).map((event, index) => (
                      <div key={event._id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                        <div>
                          <div className="font-medium text-slate-900">{event.title}</div>
                          <div className="text-xs text-slate-500">{event.registrationCount} registrations</div>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600">
                          <Star size={12} />
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="glass absolute -left-6 top-10 hidden rounded-[24px] p-4 lg:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="text-xs text-slate-400">Ticket sales</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">+18.4%</div>
            </motion.div>

            <motion.div
              className="glass absolute -bottom-6 right-2 hidden rounded-[24px] p-4 lg:block"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
            >
              <div className="text-xs text-slate-400">Upcoming approvals</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">12 pending</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <StatCard title="Total Events" value={data?.stats?.totalEvents || 0} description="Approved public events" icon={CalendarHeart} />
        <StatCard title="Registrations" value={data?.stats?.totalRegistrations || 0} description="Across colleges and communities" icon={Users} tone="emerald" />
        <StatCard title="Active Users" value={data?.stats?.activeUsers || 0} description="Students, organizers, and admins" icon={BarChart3} tone="pink" />
      </section>

      <section className="space-y-8">
        <SectionHeading
          badge={t("featuredEvents")}
          title="Featured events in a premium discovery layout"
          description="Large glass cards, luxury spacing, pastel highlights, and polished hover states make the platform feel like a funded startup product."
        />
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
            <div key={category._id} className="soft-card p-5 transition hover:-translate-y-1">
              <div className="text-sm text-slate-500">{category.description}</div>
              <div className="mt-4 font-display text-2xl font-semibold text-slate-900">{category.name}</div>
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
            <div key={item._id} className="soft-card p-6">
              <div className="text-4xl text-violet-400">“</div>
              <p className="mt-3 text-slate-600">{item.comment}</p>
              <div className="mt-6">
                <div className="font-medium text-slate-900">{item.user?.name}</div>
                <div className="text-sm text-slate-500">{item.event?.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
