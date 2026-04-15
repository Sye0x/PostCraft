import { useState, useEffect } from "react";
import { X, Menu, MessageSquarePlus, History, User, LogIn } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";

function Sidebar({ isOpen, setIsOpen }) {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // 🔐 Check auth
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true },
      );
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => setShowMenu(false);
    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  return (
    <div
      className={`
    fixed md:static top-0 left-0 h-screen bg-background text-foreground flex flex-col border border-border
    transition-transform duration-300 z-50

    w-full 

    md:translate-x-0
    ${isOpen ? "translate-x-0 md:w-60" : "-translate-x-full md:translate-x-0 md:w-15"}
  `}
    >
      {/* TOP */}
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <button
          className={`font-semibold text-lg  ${isOpen ? "cursor" : "cursor-pointer"}`}
          onClick={() => {
            !isOpen ? setIsOpen(!isOpen) : null;
          }}
        >
          {isOpen ? "PostCraft" : "PC"}
        </button>

        {isOpen ? (
          <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <X size={20} />
          </button>
        ) : null}
      </div>

      {/* MENU */}
      <div className="flex-1 p-2 space-y-2">
        {/* New Chat */}
        <button
          onClick={() => navigate("/post-generate")}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/10"
        >
          <MessageSquarePlus size={20} />
          {isOpen && <span>New Chat</span>}
        </button>

        {/* Previous Chats */}
        <button
          onClick={() => console.log("Show history")}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/10"
        >
          <History size={20} />
          {isOpen && <span>Previous Chats</span>}
        </button>
      </div>

      {/* BOTTOM (User/Login) */}
      <div className="relative border-t border-white/10">
        <button
          className="w-full p-3 hover:bg-buttonbg/4 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            user && setShowMenu(!showMenu);
          }}
        >
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>

              {isOpen && (
                <div className="text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              )}
            </div>
          ) : (
            <div
              onClick={() => navigate("/login")}
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/10"
            >
              <LogIn size={20} />
              {isOpen && <span>Login</span>}
            </div>
          )}
        </button>

        {/* 🔽 DROPDOWN MENU */}
        {user && showMenu && (
          <div
            className={`absolute   left-2 right-2 bg-background 
          border border-border rounded-lg shadow-lg overflow-hidden
          ${isOpen ? "left-2 right-2 bottom-16" : "left-16 w-40 bottom-2"}`}
          >
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default Sidebar;
