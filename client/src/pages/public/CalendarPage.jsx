import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import enUS from "date-fns/locale/en-US";
import api from "../../api/http.js";
import { Loader } from "../../components/ui/Loader.jsx";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

export default function CalendarPage() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    api.get("/events?limit=100").then((response) => setEvents(response.data.data));
  }, []);

  if (!events) return <Loader label="Loading calendar..." />;

  const calendarEvents = events.map((event) => ({
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate)
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-6">
        <h1 className="page-title">Event Calendar</h1>
        <p className="page-subtitle">View all approved events in calendar mode.</p>
      </div>
      <div className="h-[75vh]">
        <Calendar localizer={localizer} events={calendarEvents} startAccessor="start" endAccessor="end" />
      </div>
    </div>
  );
}
