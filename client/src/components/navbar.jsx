import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/api.js"; // ✅ make sure path is correct
import { LogOut } from "lucide-react";

function Navbar() {
  const navItem = [
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "FAQ", path: "/FAQ" },
  ];

  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setShowProfileMenu(false);

    if (showProfileMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [showProfileMenu]);

  // 🌙 Detect initial theme
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  // 🔄 Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setDarkMode(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // 🔒 Lock scroll when menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // 🔐 Check auth
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

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await api("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full flex items-center justify-between 
      px-6 md:px-10 py-2 
      bg-background/80 backdrop-blur-md 
      text-foreground 
      shadow-lg shadow-border 
      border-b border-border 
      h-30"
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={darkMode ? "/images/darklogo.png" : "/images/lightlogo.png"}
          alt="logo"
          className="w-29 transition-all duration-300"
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-10">
        {navItem.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className="relative text-lg font-semibold group"
          >
            {item.name}
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-subtext transition-all group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* Desktop Auth */}
      <div className="hidden md:flex items-center space-x-6">
        {!user ? (
          <>
            <Link
              to={"/login"}
              className="border border-border px-6 py-2 rounded-lg hover:bg-hover transition"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-buttonbg text-white px-6 py-2 rounded-lg hover:bg-buttonhover transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative">
            {/* Profile */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu((prev) => !prev);
              }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-buttonbg flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Dropdown */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 w-fit 
  bg-card border border-border rounded-lg shadow-lg p-2 z-50"
                >
                  <span className="font-semibold whitespace-nowrap px-2 block">
                    {user.name}
                  </span>

                  <hr className="my-2 border-border" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-hover transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 min-h-screen
            bg-background text-foreground 
            flex flex-col"
          >
            {/* Close */}
            <div className="flex justify-end p-6">
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={30} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center justify-center flex-1 space-y-10">
              {navItem.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-semibold"
                >
                  {item.name}
                </Link>
              ))}

              {/* Auth */}
              <div className="w-full px-10 space-y-4">
                {!user ? (
                  <div className="flex justify-center items-center gap-10 mt-10 ">
                    <Link
                      to={"/login"}
                      className="border border-border w-30 py-3 rounded-lg text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to={"/register"}
                      className="bg-buttonbg text-white w-30 py-3 rounded-lg text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center items-center space-x-3 mt-40">
                      <div className="w-12 h-12 rounded-full bg-buttonbg flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xl">{user.name}</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="border border-red-500 text-red-500 w-full py-3 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
