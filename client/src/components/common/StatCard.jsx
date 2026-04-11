import { motion } from "framer-motion";

const toneMap = {
  sky: "bg-[#e23744]/15 text-[#ff9d95]",
  emerald: "bg-[#ffb47d]/15 text-[#ffc08e]",
  pink: "bg-[#f7758b]/15 text-[#ff9cab]",
  amber: "bg-[#ffcf8b]/15 text-[#ffd9a7]"
};

export function StatCard({ title, value, description, icon: Icon, tone = "sky" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-3xl p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-[#d4b8b3]">{title}</span>
        {Icon ? (
          <div className={`rounded-2xl p-3 ${toneMap[tone] || toneMap.sky}`}>
            <Icon size={20} />
          </div>
        ) : null}
      </div>
      <div className="text-3xl font-semibold text-white">{value}</div>
      <p className="mt-2 text-sm text-[#ccb2ad]">{description}</p>
    </motion.div>
  );
}
