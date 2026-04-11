import { motion } from "framer-motion";

const toneMap = {
  sky: "bg-violet-100 text-violet-600",
  emerald: "bg-cyan-100 text-cyan-600",
  pink: "bg-pink-100 text-pink-600",
  amber: "bg-blue-100 text-blue-600"
};

export function StatCard({ title, value, description, icon: Icon, tone = "sky" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-3xl p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-slate-500">{title}</span>
        {Icon ? (
          <div className={`rounded-2xl p-3 ${toneMap[tone] || toneMap.sky}`}>
            <Icon size={20} />
          </div>
        ) : null}
      </div>
      <div className="text-3xl font-semibold text-slate-900">{value}</div>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </motion.div>
  );
}
