import Navbar from "../components/navbar";
import HeroSection from "../components/landingPage/herosection";
import FeatureSection from "../components/landingPage/featuresection";
import StatsSection from "../components/landingPage/statsection";
import TestimonialSection from "../components/landingPage/testimonialsection";
import Footer from "../components/footer";
import { SunMoon, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import PostPromptArea from "../components/postGeneratePage/postPromptArea";
import { useNavigate } from "react-router";
import axios from "axios";
import SidebarLayout from "../components/postGeneratePage/sideBar";
import { api } from "../api/api.js";

function PostGeneratePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  //shared
  const [history, setHistory] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [currentResult, setCurrentResult] = useState(null);
  const [user, setUser] = useState(null);

  const saveCurrentChat = () => {
    if (!currentPrompt || !currentResult) return;

    const newChat = {
      id: Date.now(),
      prompt: currentPrompt,
      result: currentResult,
    };

    setHistory((prev) => [newChat, ...prev]);
  };

  const fetchHistory = async () => {
    try {
      const data = await api("/api/postGen/history");
      setHistory(data.history);
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api("/api/postGen/history");
        setHistory(data.history);
      } catch {
        setHistory([]);
      }
    };

    fetchHistory();
  }, []);

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
        const data = await api("/api/auth/me");
        setUser(data.user);
      } catch {
        setUser(null);
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
      <div className="relative flex z-10">
        {!isOpen ? (
          <button
            className="md:hidden fixed top-3 left-3 z-50 bg-background text-foreground p-2 rounded"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Menu />
          </button>
        ) : null}

        <SidebarLayout
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          history={history}
          setHistory={setHistory}
          setCurrentPrompt={setCurrentPrompt}
          setCurrentResult={setCurrentResult}
          onNewChat={saveCurrentChat}
        />
        <div className="flex-1">
          <PostPromptArea
            input={currentPrompt}
            result={currentResult}
            setInput={setCurrentPrompt}
            setResultGlobal={setCurrentResult}
            refreshHistory={fetchHistory}
          />
        </div>
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
