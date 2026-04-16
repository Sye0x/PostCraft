import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import validateSignup from "../utils/validateSignup.js";
import { api } from "../api/api.js";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
  };

  const validate = () => {
    const newErrors = validateSignup(formData);
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setSuccess("Account created successfully!");
      setFormData(initialForm);
      setErrors({});
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      const message = err.message || "Something went wrong";
      if (message === "Email already in use") {
        setErrors((prev) => ({ ...prev, email: message }));
      } else {
        setErrors((prev) => ({ ...prev, general: message }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = Object.values(formData).some((value) => !value.trim());

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-100 bg-background z-10 shadow-2xl shadow-buttonbg rounded-2xl py-7 px-4"
      >
        <h1 className="text-center text-4xl font-semibold text-buttonbg/70">
          Sign Up
        </h1>

        {success && (
          <div className="h-14 w-full bg-green-200 rounded-xl flex items-center justify-center mt-4">
            <p className="text-green-600 text-sm text-center">{success}</p>
          </div>
        )}
        {errors.general && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mt-3">
            {errors.general}
          </div>
        )}

        <form className="mt-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-foreground/70 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="bg-background text-foreground border w-full border-foreground/30 focus:ring-1 focus:ring-buttonbg focus:outline-none py-2 px-4 rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 mb-3">{errors.name}</p>
          )}

          <label className="block text-sm font-semibold text-foreground/70 mb-1 mt-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="bg-background text-foreground border w-full border-foreground/30 focus:ring-1 focus:ring-buttonbg focus:outline-none py-2 px-4 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 mb-3">{errors.email}</p>
          )}

          <label className="block text-sm font-semibold text-foreground/70 mb-1 mt-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="bg-background text-foreground border w-full border-foreground/30 focus:ring-1 focus:ring-buttonbg focus:outline-none py-2 px-4 rounded-lg pr-10"
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
            <p className="text-red-500 text-xs mt-1 mb-3">{errors.password}</p>
          )}

          <label className="block text-sm font-semibold text-foreground/70 mb-1 mt-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-background text-foreground border w-full border-foreground/30 focus:ring-1 focus:ring-buttonbg focus:outline-none py-2 px-4 rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-buttonbg"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1 mb-3">
              {errors.confirmPassword}
            </p>
          )}

          <button
            type="submit"
            disabled={isDisabled || isSubmitting}
            className="cursor-pointer mt-6 w-full bg-buttonbg text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Submitting...
              </span>
            ) : (
              "Create Account"
            )}{" "}
          </button>

          <div className="flex items-center my-6">
            <div className="grow h-px bg-foreground/20" />
            <span className="mx-3 text-sm text-foreground/50">or</span>
            <div className="grow h-px bg-foreground/20" />
          </div>

          <p className="text-center text-sm text-foreground/70">
            Already have an account?{" "}
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

export default Register;
