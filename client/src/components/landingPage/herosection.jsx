import { motion } from "framer-motion";
import { Link } from "react-router";
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-30">
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-230 h-75 md:h-83 lg:h-88 bg-background  shadow-2xl shadow-buttonbg rounded-2xl p-7"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl md:text-4xl lg:text-6xl font-bold text-foreground"
        >
          Turn Your Ideas Into Viral{" "}
          <span className="text-buttonbg">
            <br />
            LinkedIn Posts
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-5 text-foreground/80 text-justify text-[0.8rem] md:text-[1rem] lg:text-[1.1rem]"
        >
          Drop your rough thoughts, messy notes, or half-formed ideas and
          instantly turn them into polished, high-performing LinkedIn posts. Get
          a strong hook, clear structure, engaging tone, and relevant hashtags
          all ready to copy and publish in seconds.
        </motion.h2>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-buttonbg px-2 py-3 md:px-6 md:py-4 rounded-xl text-white font-semibold shadow-lg shadow-black/20
          transition-all duration-200 ease-out hover:bg-buttonbg/90 hover:shadow-xl hover:-translate-y-0.5
          active:scale-95 active:shadow-md active:bg-buttonbg/80 cursor-pointer mt-5"
        >
          <Link to="/post-generate">Get Started</Link>
        </motion.button>
      </motion.div>
    </section>
  );
}

export default HeroSection;
