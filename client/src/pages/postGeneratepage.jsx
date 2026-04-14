import Navbar from "../components/navbar";
import HeroSection from "../components/landingPage/herosection";
import FeatureSection from "../components/landingPage/featuresection";
import StatsSection from "../components/landingPage/statsection";
import TestimonialSection from "../components/landingPage/testimonialsection";
import Footer from "../components/footer";
import { SunMoon } from "lucide-react";
import { useState, useEffect } from "react";
import PostPromptArea from "../components/postGeneratePage/postPromptArea";
import { useNavigate } from "react-router";
import axios from "axios";
import SidebarLayout from "../components/postGeneratePage/sideBar";

function PostGeneratePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });

        setUser(res.data);
      } catch (err) {
        console.log("Not logged in");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
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
    <div className="relative bg-background min-h-screen overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 md:w-175 md:h-175 
        bg-buttonbg/20 blur-[120px] rounded-full z-0"
      />
      <div className="relative z-10">
        <SidebarLayout />
        <PostPromptArea />
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
    </div>
  );
}

export default PostGeneratePage;
