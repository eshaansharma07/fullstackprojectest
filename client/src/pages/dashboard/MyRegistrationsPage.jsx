import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import api, { extractErrorMessage } from "../../api/http.js";
import { Loader } from "../../components/ui/Loader.jsx";
import { formatDate } from "../../lib/utils.js";

export default function MyRegistrationsPage() {
  const [registrations, setRegistrations] = useState(null);
  const ticketRefs = useRef({});

  const load = async () => {
    const { data } = await api.get("/registrations/me");
    setRegistrations(data.data);
  };

  useEffect(() => {
    load();
  }, []);

  const cancelRegistration = async (id) => {
    try {
      await api.patch(`/registrations/${id}/cancel`);
      toast.success("Registration cancelled");
      load();
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  const downloadTicket = async (id) => {
    const ticketNode = ticketRefs.current[id];
    if (!ticketNode) return;
    const canvas = await html2canvas(ticketNode);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 100);
    pdf.save(`ticket-${id}.pdf`);
  };

  if (!registrations) return <Loader label="Loading registrations..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">My Registrations</h1>
        <p className="page-subtitle">Download tickets and manage cancellations in one place.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        {registrations.map((item) => (
          <div key={item._id} className="glass rounded-[32px] p-6">
            <div ref={(node) => { ticketRefs.current[item._id] = node; }} className="rounded-[24px] border border-dashed border-violet-200 bg-white/80 p-5">
              <div className="font-display text-2xl font-semibold text-slate-900">{item.event?.title}</div>
              <div className="mt-2 text-sm text-slate-500">{formatDate(item.event?.startDate)} · {item.event?.venue}</div>
              <div className="mt-3 text-sm text-slate-600">Ticket: {item.ticketNumber}</div>
              <div className="mt-3 text-sm capitalize text-slate-600">Status: {item.status}</div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="btn-primary" onClick={() => downloadTicket(item._id)}>Download PDF</button>
              <button className="btn-secondary" onClick={() => cancelRegistration(item._id)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
