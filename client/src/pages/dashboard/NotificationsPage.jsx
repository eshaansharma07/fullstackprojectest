import { useEffect, useState } from "react";
import api from "../../api/http.js";
import { fromNow } from "../../lib/utils.js";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  const load = async () => {
    const { data } = await api.get("/notifications");
    setNotifications(data.data);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  const markRead = async (id) => {
    await api.patch(`/notifications/${id}/read`);
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-semibold text-white dark:text-white">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((item) => (
          <div key={item._id} className="glass rounded-3xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium text-white dark:text-white">{item.title}</div>
                <div className="mt-2 text-sm text-slate-300">{item.message}</div>
                <div className="mt-2 text-xs text-slate-500">{fromNow(item.createdAt)}</div>
              </div>
              {!item.isRead ? (
                <button onClick={() => markRead(item._id)} className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                  Mark read
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
