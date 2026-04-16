import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import PostGeneratePage from "./pages/postGeneratepage.jsx";
import ForgotPasswordPage from "./pages/forgotPassword.jsx";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import AboutPage from "./pages/aboutPage.jsx";
import ContactUs from "./pages/contactUsPage.jsx";
import FAQ from "./pages/FAQPage.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/FAQ" element={<FAQ />} />
      <Route path="/post-generate" element={<PostGeneratePage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
);
