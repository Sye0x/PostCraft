import { motion } from "framer-motion";

function ValueSection() {
  const values = [
    {
      title: "Speed Without Sacrifice",
      desc: "Great content shouldn't take hours. The AI generates polished posts in under 10 seconds — without cutting corners on quality.",
    },
    {
      title: "Built for Real People",
      desc: "Not a corporate tool. Built by someone who actually struggled with LinkedIn posting and wanted a simple, no-fluff solution.",
    },
    {
      title: "Your Voice, Always",
      desc: "This doesn't replace your ideas — it removes the blank-page friction. You stay in control of what gets posted.",
    },
  ];
  return (
    <section className="w-full px-6 py-24 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-buttonbg border border-buttonbg/30 bg-buttonbg/10 px-4 py-1.5 rounded-full mb-5">
            What I Care About
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Principles I <span className="text-buttonbg">build by</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {values.map((v, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 45, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="rounded-3xl p-px bg-linear-to-br from-white/20 to-white/5 shadow-lg shadow-buttonbg/20"
            >
              <div className="rounded-3xl bg-background/80 backdrop-blur-xl p-7 h-full flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <h3 className="text-lg font-semibold text-buttonbg">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed font-medium text-foreground/60">
                  {v.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ValueSection;
