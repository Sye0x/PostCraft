import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SunMoon } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function FAQ() {
  const faqs = [
    {
      q: "Is it free?",
      a: "Yes, for now.",
    },
    {
      q: "How does it work?",
      a: "It’s an AI wrapper that helps you generate posts quickly.",
    },
    {
      q: "Do I need an account?",
      a: "Only if you want to keep history of your generated posts.",
    },
    {
      q: "Can I use it for LinkedIn?",
      a: "Yes, you can use it for LinkedIn posts freely.",
    },
  ];

  const [darkMode, setDarkMode] = useState(true);

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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-3xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              FAQ
            </h1>
            <p className="mt-3 text-foreground/70">
              Everything you need to know about the project.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 rounded-xl border border-border bg-white/5 "
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {item.q}
                </h3>
                <p className="mt-2 text-foreground/70">{item.a}</p>
              </motion.div>
            ))}
          </div>
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
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default FAQ;
