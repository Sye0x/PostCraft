import { motion } from "framer-motion";

function FeatureSection() {
  return (
    <section className="w-full min-h-screen flex justify-center px-6 py-20 bg-linear-to-b from-background to-muted/40">
      <div className="max-w-6xl w-full">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-10 items-center mb-26"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Write Better <span className="text-buttonbg">LinkedIn</span> Posts,
            Faster
          </h1>

          <p className="text-foreground/70 text-lg leading-relaxed font-semibold">
            Everything you need to turn rough ideas into polished,
            high-performing LinkedIn posts — without overthinking or wasting
            time.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.25,
              },
            },
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon="avatars.png"
            heading="Instant Post Generation"
            detail="Transform your ideas into engaging LinkedIn posts in seconds."
          />

          <FeatureCard
            icon="analytics.png"
            heading="Smart Writing Control"
            detail="Adjust tone, style, and length to fit your audience and content goals effortlessly."
          />

          <FeatureCard
            icon="outcome.png"
            heading="Optimized for Engagement"
            detail="Built with proven structures — hooks, flow, and CTAs that help your posts perform better."
          />
        </motion.div>
      </div>
    </section>
  );
}

export default FeatureSection;

function FeatureCard({ icon, heading, detail }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group rounded-2xl p-px bg-linear-to-br from-white/20 to-white/5  shadow-lg shadow-buttonbg/30"
    >
      <div className="rounded-2xl bg-background/80 backdrop-blur p-6 shadow-lg transition-all duration-300  flex flex-col gap-4">
        {/* Heading */}
        <h3 className="text-lg font-semibold text-buttonbg">{heading}</h3>

        {/* Text */}
        <p className="text-sm leading-relaxed font-semibold text-foreground/60">
          {detail}
        </p>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 1.1 }}
          className="bg-buttonbg text-white p-2.5 rounded-2xl w-fit cursor-pointer"
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
}
