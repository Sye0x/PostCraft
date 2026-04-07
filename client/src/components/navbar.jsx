import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const navItem = [];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  return (
    <motion.nav
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full flex items-center justify-between px-6 md:px-10 py-4 bg-white shadow-lg shadow-subtext h-30"
    >
      {/* Logo + Links */}
      <div className="flex items-center space-x-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="transition-transform duration-300 hover:scale-105"
          >
            <h1 className="text-2xl text-buttonbg font-bold">PostCraft</h1>{" "}
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="hidden md:flex items-center space-x-10 lg:space-x-14"
        >
          {navItem.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.path}
                className="relative text-foreground text-lg font-semibold group"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-subtext transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Desktop Buttons */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="hidden md:flex items-center space-x-6"
      >
        <Link
          to="/"
          className="text-buttonbg cursor-pointer
          font-semibold border border-buttonbg rounded-lg py-2 px-6 
          hover:bg-buttonbg hover:text-white hover:scale-105 transition-all duration-300"
        >
          Login
        </Link>

        <Link
          to="/"
          className="bg-buttonbg cursor-pointer
           text-white font-semibold rounded-lg py-2 px-6 
           hover:bg-buttonbg hover:text-white hover:scale-105 transition-all duration-300"
        >
          Sign Up
        </Link>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="md:hidden z-200"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <AnimatePresence mode="wait">
          {isMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Menu size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white flex flex-col items-center justify-center space-y-10 md:hidden z-100"
          >
            {navItem.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="text-2xl font-semibold hover:scale-110 transition-transform duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col space-y-4 pt-6"
            >
              <Link
                to="/login"
                className="border border-buttonbg text-buttonbg rounded-lg py-3 px-8 font-semibold hover:scale-105 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-buttonbg text-white rounded-lg py-3 px-8 font-semibold hover:scale-105 transition"
              >
                Sign Up
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
