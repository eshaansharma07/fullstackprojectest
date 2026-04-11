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
        <span className="accent-pill">
          {badge}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-slate-500">{description}</p> : null}
    </motion.div>
  );
}
