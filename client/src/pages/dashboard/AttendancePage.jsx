import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api, { extractErrorMessage } from "../../api/http.js";
import { SectionHeading } from "../../components/common/SectionHeading.jsx";
import { Loader } from "../../components/ui/Loader.jsx";
import { formatDate } from "../../lib/utils.js";

const badgeClasses = {
  attended: "bg-emerald-100 text-emerald-700",
  absent: "bg-rose-100 text-rose-700",
  registered: "bg-sky-100 text-sky-700",
  cancelled: "bg-slate-200 text-slate-600",
  waitlisted: "bg-amber-100 text-amber-700"
};

export default function AttendancePage() {
  const [board, setBoard] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [savingId, setSavingId] = useState("");

  const loadBoard = async (eventId) => {
    const query = eventId ? `?eventId=${eventId}` : "";
    const { data } = await api.get(`/registrations/attendance${query}`);
    setBoard(data.data);
    setSelectedEventId(data.data.selectedEventId || "");
  };

  useEffect(() => {
    loadBoard().catch((error) => {
      toast.error(extractErrorMessage(error));
    });
  }, []);

  const activeRegistrations = useMemo(
    () => board?.registrations?.filter((item) => item.status !== "cancelled" && item.status !== "waitlisted") || [],
    [board]
  );

  const handleEventChange = async (event) => {
    const nextEventId = event.target.value;
    setSelectedEventId(nextEventId);
    try {
      await loadBoard(nextEventId);
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  const handleAttendanceUpdate = async (registrationId, status) => {
    setSavingId(registrationId);
    try {
      await api.patch(`/registrations/${registrationId}/attendance`, { status });
      toast.success(status === "attended" ? "Marked present" : "Marked absent");
      await loadBoard(selectedEventId);
    } catch (error) {
      toast.error(extractErrorMessage(error));
    } finally {
      setSavingId("");
    }
  };

  if (!board) return <Loader label="Loading attendance desk..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Attendance Desk</h1>
        <p className="page-subtitle">Mark participants present or absent without scanning QR tokens.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <div className="glass rounded-[28px] p-5">
          <div className="text-sm text-slate-500">Total registrations</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">{board.summary.total}</div>
        </div>
        <div className="glass rounded-[28px] p-5">
          <div className="text-sm text-slate-500">Present</div>
          <div className="mt-2 text-3xl font-semibold text-emerald-600">{board.summary.present}</div>
        </div>
        <div className="glass rounded-[28px] p-5">
          <div className="text-sm text-slate-500">Absent</div>
          <div className="mt-2 text-3xl font-semibold text-rose-600">{board.summary.absent}</div>
        </div>
        <div className="glass rounded-[28px] p-5">
          <div className="text-sm text-slate-500">Pending mark</div>
          <div className="mt-2 text-3xl font-semibold text-sky-600">{board.summary.pending}</div>
        </div>
      </div>

      <div className="glass rounded-[32px] p-6">
        <SectionHeading badge="Event Selection" title="Choose an event to mark attendance" />
        <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Event</label>
            <select className="input" value={selectedEventId} onChange={handleEventChange}>
              {board.events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.title} · {formatDate(event.startDate, "dd MMM yyyy")}
                </option>
              ))}
            </select>
          </div>
          {selectedEventId ? (
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600">
              {board.events.find((event) => event._id === selectedEventId)?.venue || "Venue pending"}
            </div>
          ) : null}
        </div>
      </div>

      <div className="glass rounded-[32px] p-6">
        <SectionHeading
          badge="Mark Attendance"
          title="Present or absent"
          description="Confirmed participants can be marked with one click. Cancelled or waitlisted registrations are excluded."
        />
        <div className="mt-6 space-y-4">
          {activeRegistrations.map((registration) => {
            const currentStatus = registration.status;
            const participant = registration.participant;
            const isSaving = savingId === registration._id;

            return (
              <div key={registration._id} className="rounded-3xl border border-slate-100 bg-white/85 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{participant?.name || "Unknown participant"}</div>
                    <div className="mt-1 text-sm text-slate-500">
                      {participant?.email || "No email"}{participant?.institute ? ` · ${participant.institute}` : ""}
                    </div>
                    <div className="mt-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses[currentStatus] || badgeClasses.registered}`}>
                        {currentStatus === "attended" ? "Present" : currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleAttendanceUpdate(registration._id, "attended")}
                      disabled={isSaving}
                      className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
                    >
                      Mark present
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAttendanceUpdate(registration._id, "absent")}
                      disabled={isSaving}
                      className="rounded-2xl bg-rose-500 px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
                    >
                      Mark absent
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {!activeRegistrations.length ? (
            <div className="text-sm text-slate-500">No confirmed registrations are available for attendance marking in this event yet.</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
