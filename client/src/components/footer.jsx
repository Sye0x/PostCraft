import { Link } from "react-router";

function Footer() {
  return (
    <footer className="w-full px-6 py-10 bg-background border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <a href="/" className="text-xl font-bold text-buttonbg">
            PostCraft
          </a>
          <p className="text-sm text-foreground/60 mt-2 max-w-sm">
            Turn your ideas into polished LinkedIn posts with hooks, CTAs, and
            hashtags — in seconds.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-foreground/60 font-medium">
          <Link to={"/about"} className="hover:text-buttonbg cursor-pointer">
            About
          </Link>
          <Link to={"/contact"} className="hover:text-buttonbg cursor-pointer">
            Contact
          </Link>
          <Link to={"/FAQ"} className="hover:text-buttonbg cursor-pointer">
            FAQ
          </Link>
        </div>

        {/* Bottom */}
        <p className="text-sm text-foreground/40">
          © {new Date().getFullYear()} PostCraft
        </p>
      </div>
    </footer>
  );
}

export default Footer;
