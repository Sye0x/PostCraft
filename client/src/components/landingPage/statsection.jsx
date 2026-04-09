import { motion } from "framer-motion";

const stats = [
  {
    value: "50K+",
    label: "Ideas Processed",
    description:
      "From rough thoughts to structured LinkedIn posts across multiple industries.",
  },
  {
    value: "<10s",
    label: "Generation Time",
    description:
      "Get a complete LinkedIn post with hook, CTA, and hashtags in seconds.",
  },
  {
    value: "4",
    label: "Writing Styles",
    description:
      "Professional, casual, inspirational, and educational tones tailored to your voice.",
  },
  {
    value: "100%",
    label: "Ready to Publish",
    description:
      "Clean, formatted posts you can copy and share instantly without edits.",
  },
];

function StatsSection() {
  return (
    <section className="w-full px-6 py-20 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Top Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Trusted by learners building
            <span className="text-buttonbg"> smarter LinkedIn posts</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/70 text-lg font-medium leading-relaxed">
            See how professionals, content creators, and aspiring writers use
            our platform to turn rough ideas into polished LinkedIn posts that
            engage and grow their audience.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group rounded-2xl p-px bg-linear-to-br from-white/20 to-white/5 shadow-lg shadow-buttonbg/30"
            >
              <div className="rounded-2xl bg-background/80 backdrop-blur p-6 shadow-lg transition-all duration-300  h-full">
                <h3 className="text-4xl md:text-5xl font-bold text-buttonbg">
                  {stat.value}
                </h3>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed font-medium text-foreground/60">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSection;
