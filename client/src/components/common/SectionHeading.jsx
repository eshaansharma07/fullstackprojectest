import { motion } from "framer-motion";

export function SectionHeading({ badge, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-3"
    >
      {badge ? (
        <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-300">
          {badge}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-white dark:text-white md:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-slate-300">{description}</p> : null}
    </motion.div>
  );
}
