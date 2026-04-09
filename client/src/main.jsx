import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import PostGeneratePage from "./pages/postGeneratepage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/post-generate" element={<PostGeneratePage />} />
    </Routes>
  </BrowserRouter>,
);
