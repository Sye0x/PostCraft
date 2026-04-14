import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import validateLogin from "../utils/validateLogin";
import axios from "axios";

const initialForm = {
  email: "",
  password: "",
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // ✅ IMPORTANT

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const validate = () => {
    const newErrors = validateLogin(formData);
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  // ✅ FIXED FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true },
      );

      console.log("Login success:", res.data);

      setMessage("Login successful!");
      setFormData(initialForm);
      setErrors({});

      // ✅ Redirect after short delay (so user sees success)
      setTimeout(() => {
        navigate("/post-generate");
      }, 800);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";

      setMessage(msg);
      console.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled =
    Object.values(formData).some((value) => !value.trim()) || isSubmitting;

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-auto w-100 bg-background z-10 shadow-2xl shadow-buttonbg rounded-2xl py-7 px-4"
      >
        <h1 className="text-center text-4xl font-semibold text-buttonbg/70">
          Login
        </h1>

        {message && (
          <div
            className={`mt-4 rounded-lg px-4 py-3 text-sm text-center ${
              message === "Login successful!"
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form className="mt-12" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-foreground/70 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-background text-foreground border w-full border-foreground/30 focus:ring-1 focus:ring-buttonbg focus:outline-none py-2 px-4 rounded-lg"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 mb-2">{errors.email}</p>
          )}

          <label className="block text-sm font-semibold text-foreground/70 my-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-background text-foreground border w-full border-foreground/30 focus:ring-1 focus:ring-buttonbg focus:outline-none py-2 px-4 rounded-lg pr-10"
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-buttonbg"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}

          <Link
            to="/forgot-password"
            className="text-sm text-buttonbg hover:underline block text-right mt-2"
          >
            Forgot your password?
          </Link>

          <button
            type="submit"
            disabled={isDisabled}
            className="mt-6 w-full bg-buttonbg text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center my-6">
            <div className="grow h-px bg-foreground/20" />
            <span className="mx-3 text-sm text-foreground/50">or</span>
            <div className="grow h-px bg-foreground/20" />
          </div>

          <p className="text-center text-sm text-foreground/70">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-buttonbg hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
