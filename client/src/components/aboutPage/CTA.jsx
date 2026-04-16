import { motion } from "framer-motion";
import { Link } from "react-router";

function AboutCTA() {
  return (
    <section className="w-full px-6 py-28 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center rounded-3xl p-px bg-linear-to-br from-white/20 to-white/5 shadow-2xl shadow-buttonbg/20"
      >
        <div className="rounded-3xl bg-background/90 backdrop-blur-xl px-10 py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Give it a try. <span className="text-buttonbg">It's free.</span>
          </h2>
          <p className="mt-5 text-foreground/60 font-medium text-lg leading-relaxed">
            No sign-up wall, no credit card, no catch. Just drop your idea in
            and see what comes out.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/post-generate"
              className="bg-buttonbg text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-black/20 inline-block
                transition-all duration-200 hover:bg-buttonbg/90 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            >
              Start Generating
            </Link>
            <Link
              to="/"
              className="border border-border px-8 py-4 rounded-xl font-semibold inline-block text-foreground
                transition-all duration-200 hover:bg-hover hover:-translate-y-0.5 active:scale-95"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutCTA;
