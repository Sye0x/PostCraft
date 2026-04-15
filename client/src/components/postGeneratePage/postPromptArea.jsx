import { useState } from "react";
import axios from "axios";
import ResultModal from "./promptResult";

function PostPromptArea() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/postGen/generate-post",
        { prompt: input },
      );

      setResult(res.data.result);
      setIsModalOpen(true); // 👈 open modal
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-20 pt-20">
      {/* Heading */}
      <h1 className="text-foreground text-3xl md:text-5xl font-semibold text-center max-w-3xl leading-tight">
        Turn your ideas into{" "}
        <span className="text-buttonbg">LinkedIn posts</span> in seconds
      </h1>

      {/* Subtext */}
      <p className="text-foreground/60 mt-4 text-center max-w-xl">
        Drop your thoughts, notes, or topic and we’ll generate a polished post
        with hook, structure, and hashtags.
      </p>

      {/* Input Card */}
      <div className="w-full max-w-2xl mt-10 bg-card border border-border rounded-2xl p-4 shadow-lg">
        {/* Textarea */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. I learned consistency matters more than motivation..."
          className="w-full h-32 resize-none bg-transparent outline-none text-foreground placeholder:text-foreground/40 text-sm md:text-base"
        />

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-foreground/40">
            Tip: Start with a rough idea
          </span>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-buttonbg text-white px-5 py-2 rounded-xl font-medium hover:bg-buttonbg/90 active:scale-95 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {/* Result */}
      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        result={result}
      />
    </div>
  );
}

export default PostPromptArea;
