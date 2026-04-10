import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center px-4">
      <div className="glass rounded-[36px] p-10 text-center">
        <div className="font-display text-7xl font-semibold text-white dark:text-white">404</div>
        <p className="mt-4 text-slate-300">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-primary mt-6">Back to home</Link>
      </div>
    </div>
  );
}
