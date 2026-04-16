import { motion } from "framer-motion";
import { Link } from "react-router";

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-30">
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-230 h-auto md:h-83 lg:h-88 py-10 bg-linear-to-br from-bg via-buttonbg/35 to-bg
         rounded-2xl p-8 md:p-10 flex flex-col justify-center shadow-2xl shadow-border"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
        >
          Built by one dev,
          <span className="text-buttonbg block mt-2">for real creators.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-5 text-foreground/80 text-[0.85rem] md:text-[1rem] lg:text-[1.1rem] leading-relaxed text-justify max-w-3xl"
        >
          This is a solo side project — no big team, no VC funding, no fancy
          office. Just someone who got tired of staring at a blank LinkedIn
          draft and decided to fix it.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Link
            to="/post-generate"
            className="inline-block bg-buttonbg text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold
            shadow-lg shadow-black/20 transition-all duration-200
            hover:bg-buttonbg/90 hover:shadow-xl hover:-translate-y-0.5
            active:scale-95 active:shadow-md"
          >
            Try It Free
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
