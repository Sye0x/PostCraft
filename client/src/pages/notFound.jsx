import { Link } from "react-router";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-buttonbg">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          Page Not Found
        </h2>

        <p className="mt-3 text-foreground/70">
          The page you are looking for doesn’t exist.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-buttonbg text-white px-6 py-3 rounded-xl font-semibold
            hover:bg-buttonbg/90 transition-all active:scale-95"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
