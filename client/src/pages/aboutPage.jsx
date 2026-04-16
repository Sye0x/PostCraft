import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { SunMoon } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import HeroSection from "../components/aboutPage/heroSection";
import StorySection from "../components/aboutPage/storySection";
import ValueSection from "../components/aboutPage/valueSection";
import StatusBanner from "../components/aboutPage/statusBanner";
import AboutCTA from "../components/aboutPage/CTA";

function AboutPage() {
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
    <div className="bg-background min-h-screen ">
      <Navbar />
      <HeroSection />
      <StorySection />
      <ValueSection />
      <StatusBanner />
      <AboutCTA />
      <Footer />

      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-50 
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
  );
}

export default AboutPage;
