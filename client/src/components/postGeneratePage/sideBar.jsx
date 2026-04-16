import { useState, useEffect } from "react";
import { X, MessageSquarePlus, History, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { api } from "../../api/api.js"; // adjust path

function Sidebar({ isOpen, setIsOpen }) {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

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
      setShowMenu(false);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // 🔽 Close dropdown on outside click
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
      fixed md:static top-0 left-0 h-screen 
      bg-background text-foreground flex flex-col 
      border border-border transition-transform duration-300 z-50

      w-full 
      md:translate-x-0
      ${isOpen ? "translate-x-0 md:w-60" : "-translate-x-full md:translate-x-0 md:w-15"}
    `}
    >
      {/* TOP */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <button
          className="font-semibold text-lg"
          onClick={() => {
            if (!isOpen) setIsOpen(true);
          }}
        >
          {isOpen ? "PostCraft" : "PC"}
        </button>

        {isOpen && (
          <button onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        )}
      </div>

      {/* MENU */}
      <div className="flex-1 p-2 space-y-2">
        <button
          onClick={() => navigate("/post-generate")}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-hover"
        >
          <MessageSquarePlus size={20} />
          {isOpen && <span>New Chat</span>}
        </button>

        <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-hover">
          <History size={20} />
          {isOpen && <span>Previous Chats</span>}
        </button>
      </div>

      {/* BOTTOM */}
      <div className="relative border-t border-border">
        {!user ? (
          // 🔓 LOGIN
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 w-full p-3 hover:bg-hover"
          >
            <LogIn size={20} />
            {isOpen && <span>Login</span>}
          </button>
        ) : (
          // 👤 PROFILE
          <button
            className="w-full p-3 hover:bg-hover"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-buttonbg flex items-center justify-center text-white text-sm font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* Name + Email */}
              {isOpen && (
                <div className="text-sm text-left">
                  <p className="font-medium whitespace-nowrap">{user.name}</p>
                  <p className="text-xs text-subtext whitespace-nowrap">
                    {user.email}
                  </p>
                </div>
              )}
            </div>
          </button>
        )}

        {/* 🔽 DROPDOWN */}
        {user && showMenu && (
          <div
            className={`
            absolute bg-card border border-border rounded-lg shadow-lg z-50

            ${isOpen ? "left-2 right-2 bottom-16" : "left-14 w-40 bottom-2"}
          `}
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-hover"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* MOBILE OVERLAY */}
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
