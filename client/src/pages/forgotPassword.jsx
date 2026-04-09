import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validate = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // simulate API call
    setMessage("Password reset link sent to your email");
    setEmail("");

    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-100 bg-background shadow-2xl shadow-buttonbg rounded-2xl py-7 px-4"
      >
        <h1 className="text-center text-3xl font-semibold text-buttonbg/70">
          Forgot Password
        </h1>

        {message && (
          <div className="mt-4 bg-green-200 text-green-700 text-sm text-center py-2 rounded-lg">
            {message}
          </div>
        )}

        <form className="mt-8" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-foreground/70 mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setMessage("");
            }}
            placeholder="Enter your email"
            className="bg-background text-foreground border w-full border-foreground/30 focus:ring-1 
            focus:ring-buttonbg focus:outline-none py-2 px-4 rounded-lg"
          />

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

          <button
            type="submit"
            className="mt-6 w-full bg-buttonbg text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Send Reset Link
          </button>

          <p className="text-center text-sm text-foreground/70 mt-6">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-buttonbg hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default ForgotPasswordPage;
