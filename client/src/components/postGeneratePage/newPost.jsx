import { Plus } from "lucide-react";

function NewPost() {
  return (
    <div
      className="w-full h-20 
    flex items-center justify-between px-6 
    bg-background/70 backdrop-blur-lg 
    border-b border-border"
    >
      {/* Logo */}
      <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
        Post<span className="text-buttonbg">Craft</span>
      </h1>

      {/* Button */}
      <button
        className="flex items-center gap-2 
        bg-buttonbg text-white 
        px-4 py-2 rounded-xl 
        font-medium 
        shadow-md shadow-black/10
        hover:scale-105 hover:shadow-lg 
        active:scale-95 
        transition-all duration-200"
      >
        <Plus size={18} />
        <span>New Post</span>
      </button>
    </div>
  );
}

export default NewPost;
