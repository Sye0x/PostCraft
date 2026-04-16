import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SunMoon } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function ContactUs() {
  const [darkMode, setDarkMode] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background ">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 py-10">
          {/* Left Side Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center px-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Contact Us
            </h1>

            <p className="mt-4 text-foreground/70 text-lg leading-relaxed">
              Got a question, feedback, or idea? We'd love to hear from you.
              Fill out the form and we'll get back to you as soon as possible.
            </p>

            <div className="mt-6 space-y-2 text-foreground/60">
              <p>Email: s.r.mahamid@gmail.com</p>
              <p>Response time: 24–48 hours</p>
            </div>
          </motion.div>

          {/* Right Side Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10  rounded-2xl p-6 md:p-8 
            shadow-xl flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="p-3 rounded-lg bg-transparent border border-border focus:outline-none 
              focus:border-buttonbg text-foreground"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="p-3 rounded-lg bg-transparent border border-border focus:outline-none 
              focus:border-buttonbg text-foreground"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="p-3 rounded-lg bg-transparent border border-border focus:outline-none 
              focus:border-buttonbg text-foreground resize-none"
              required
            />

            <button
              type="submit"
              className="bg-buttonbg text-white py-3 rounded-xl font-semibold hover:bg-buttonbg/90 
              transition-all active:scale-95"
            >
              Send Message
            </button>
            {/* Floating Theme Button */}
            <button
              onClick={toggleTheme}
              className="fixed bottom-6 right-6 z-40 
        w-12 h-12 rounded-full 
        bg-buttonbg text-white 
        shadow-lg shadow-black/20 
        flex items-center justify-center 
        hover:scale-110 hover:shadow-xl 
        active:scale-95 transition-all duration-200"
            >
              <SunMoon className="text-white" />
            </button>
          </motion.form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ContactUs;
