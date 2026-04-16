import { motion } from "framer-motion";

function StorySection() {
  return (
    <section className="w-full px-6 py-24 bg-linear-to-b from-background to-muted/40">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-sm font-semibold text-buttonbg border border-buttonbg/30 bg-buttonbg/10 px-4 py-1.5 rounded-full mb-5">
            The Honest Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            No team.
            <br />
            <span className="text-buttonbg">Just a problem</span>
            <br />
            worth solving.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
          className="space-y-5 text-foreground/70 text-lg leading-relaxed font-medium"
        >
          <p>
            I'm a solo developer who kept putting off posting on LinkedIn
            because writing felt like a chore. I had ideas — I just couldn't
            turn them into something worth publishing without spending way too
            long on it.
          </p>
          <p>
            So I built this. It uses AI to take your rough idea and shape it
            into a proper LinkedIn post — with a hook, clear structure, and
            hashtags. Nothing more, nothing less.
          </p>
          <p>
            This project is still growing. If something's broken or you have
            feedback, I'd genuinely love to hear it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default StorySection;
