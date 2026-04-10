import { useEffect, useState } from "react";

export function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Started");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      setTimeLeft(`${days}d ${hours}h ${mins}m`);
    };

    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">{timeLeft}</span>;
}
