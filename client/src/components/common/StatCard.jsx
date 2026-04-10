import { motion } from "framer-motion";

const toneMap = {
  sky: "bg-sky-500/15 text-sky-300",
  emerald: "bg-emerald-500/15 text-emerald-300",
  pink: "bg-pink-500/15 text-pink-300",
  amber: "bg-amber-500/15 text-amber-300"
};

export function StatCard({ title, value, description, icon: Icon, tone = "sky" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-3xl p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-slate-400">{title}</span>
        {Icon ? (
          <div className={`rounded-2xl p-3 ${toneMap[tone] || toneMap.sky}`}>
            <Icon size={20} />
          </div>
        ) : null}
      </div>
      <div className="text-3xl font-semibold text-white dark:text-white">{value}</div>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </motion.div>
  );
}
