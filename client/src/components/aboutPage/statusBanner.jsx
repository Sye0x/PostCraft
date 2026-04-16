import { motion } from "framer-motion";

function StatusBanner() {
  return (
    <section className="w-full px-6 py-16 bg-linear-to-b from-muted/40 to-background">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto rounded-3xl p-px bg-linear-to-br from-white/20 to-white/5 shadow-lg shadow-buttonbg/20"
      >
        <div className="rounded-3xl bg-background/80 backdrop-blur-xl px-8 py-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <span className="text-5xl">🚧</span>
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Still in active development
            </h3>
            <p className="mt-2 text-foreground/60 font-medium leading-relaxed text-sm">
              This tool isn't officially launched yet. Features are being added,
              things might break, and the design is still evolving. If you run
              into issues or have suggestions, reach out — your feedback
              actually shapes what gets built next.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default StatusBanner;
