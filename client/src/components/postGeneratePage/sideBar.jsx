import { useState, useEffect } from "react";
import { X, Menu, MessageSquarePlus, History, User, LogIn } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔐 Check auth
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
        console.log("USER:", user);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <div
      className={`h-screen bg-background/60 text-foreground flex flex-col border border-border
      transition-all duration-300
      ${isOpen ? "w-60" : "w-16"}`}
    >
      {/* TOP */}
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <button
          className="font-semibold text-lg cursor-pointer"
          onClick={() => {
            !isOpen ? setIsOpen(!isOpen) : null;
          }}
        >
          {isOpen ? "PostCraft" : "PC"}
        </button>

        {isOpen ? (
          <button onClick={() => setIsOpen(!isOpen)}>
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
      <div className="p-3 border-t border-white/10">
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
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/10"
          >
            <LogIn size={20} />
            {isOpen && <span>Login</span>}
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
