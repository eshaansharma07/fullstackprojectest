import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, CalendarHeart, Flame, Search, Star, Users } from "lucide-react";
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
      <section className="relative overflow-hidden rounded-[42px] border border-white/5 bg-[linear-gradient(135deg,#e23744_0%,#c81f35_45%,#8d1527_100%)] px-6 py-10 shadow-[0_35px_120px_rgba(226,55,68,0.18)] md:px-10 md:py-12">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,236,225,0.28),transparent_45%)] md:block" />
        <div className="relative grid gap-10 md:grid-cols-[1.08fr_0.92fr] md:items-center">
          <div className="space-y-7">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90">
              {t("brandTagline")}
            </span>
            <div className="space-y-4">
              <h1 className="font-display text-5xl font-semibold leading-tight text-white md:text-7xl">
                Discover events the way Zomato helps people discover places.
              </h1>
              <p className="max-w-2xl text-lg text-white/80">
                EventSphere now feels like a discovery-first product: warm red accents, rich cards, quick search,
                trending picks, and one-tap navigation for students, organizers, and admins.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-white/85">
              <span className="rounded-full bg-white/10 px-4 py-2">Campus fests</span>
              <span className="rounded-full bg-white/10 px-4 py-2">Club activities</span>
              <span className="rounded-full bg-white/10 px-4 py-2">Community meetups</span>
            </div>

            <div className="flex items-center gap-3 rounded-[24px] bg-white px-3 py-3 shadow-xl shadow-black/10">
              <Search size={18} className="ml-3 text-[#827a80]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent py-3 text-sm text-[#2a2226] outline-none"
                placeholder="Search for event title, venue, category, or organizer"
              />
              <Link to={search ? `/?search=${encodeURIComponent(search)}` : "/"} className="btn-primary whitespace-nowrap">
                Explore
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="rounded-full bg-white px-6 py-3 font-medium text-[#c91e34] transition hover:bg-[#fff0eb]">
                Get started <ArrowRight size={16} className="inline" />
              </Link>
              <Link to="/calendar" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/15">
                View calendar
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[34px] bg-[#fff8f4] p-6 text-[#241b1d] shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
          >
            <div className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[24px] bg-[#fff1eb] p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-[#756c71]">Events managed</span>
                    <CalendarHeart className="text-[#e23744]" size={20} />
                  </div>
                  <div className="text-3xl font-semibold text-[#23191c]">{data?.stats?.totalEvents || "120+"}</div>
                  <p className="mt-2 text-sm text-[#756c71]">Structured event discovery and approvals</p>
                </div>
                <div className="rounded-[24px] bg-[#fff1eb] p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-[#756c71]">Registrations</span>
                    <Users className="text-[#e23744]" size={20} />
                  </div>
                  <div className="text-3xl font-semibold text-[#23191c]">{data?.stats?.totalRegistrations || "2.4K"}</div>
                  <p className="mt-2 text-sm text-[#756c71]">QR tickets, favorites, reminders, and more</p>
                </div>
              </div>

              <div className="rounded-[28px] bg-[#fff1eb] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold text-[#2a1f21]">Trending right now</h3>
                  <Flame className="text-[#e23744]" />
                </div>
                <div className="space-y-3">
                  {(data?.trendingEvents || []).slice(0, 3).map((event, index) => (
                    <div key={event._id} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                      <div>
                        <div className="font-medium text-[#241b1d]">{event.title}</div>
                        <div className="text-xs text-[#6d666c]">{event.registrationCount} registrations</div>
                      </div>
                      <div className="flex items-center gap-2 rounded-full bg-[#fff3ef] px-3 py-1 text-xs text-[#d73343]">
                        <Star size={12} />
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
          title="Featured experiences, not plain listings"
          description="A card-first discovery surface inspired by Zomato: visual, energetic, easy to scan, and evaluator-friendly."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data?.featuredEvents?.length
            ? data.featuredEvents.map((event) => <EventCard key={event._id} event={event} />)
            : Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading badge={t("categories")} title="Explore by vibe, format, and audience" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {(data?.categories || []).map((category) => (
            <div key={category._id} className="rounded-[28px] border border-white/5 bg-[#221719] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
              <div className="text-sm text-[#cfb4af]">{category.description}</div>
              <div className="mt-4 font-display text-2xl font-semibold text-white">{category.name}</div>
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
            <div key={item._id} className="rounded-[28px] border border-white/5 bg-[#201518] p-6">
              <div className="text-4xl text-[#ff8d84]">“</div>
              <p className="mt-3 text-[#ecd6d1]">{item.comment}</p>
              <div className="mt-6">
                <div className="font-medium text-white">{item.user?.name}</div>
                <div className="text-sm text-[#c8aba6]">{item.event?.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
