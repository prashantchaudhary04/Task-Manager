import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 transition duration-200 group-hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 11l3 3L22 4"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
              />
            </svg>
          </div>

          <div className="hidden sm:block">
            <h1 className="text-base font-bold tracking-tight text-slate-900">
              Task<span className="text-indigo-600">Manager</span>
            </h1>

            <p className="text-[11px] font-medium text-slate-400">
              Organize. Focus. Accomplish.
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${
              isActive("/")
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l9-9 9 9"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10v10h14V10"
              />
            </svg>

            <span>Home</span>
          </Link>

          <Link
            to="/add-task"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${
              isActive("/add-task")
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <span className="text-base leading-none">+</span>
            <span>Add Task</span>
          </Link>
        </nav>

        {/* Right Action */}
        <div className="hidden items-center gap-3 sm:flex">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 lg:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-slate-500">
              All systems ready
            </span>
          </div>

          <Link
            to="/add-task"
            className="flex h-10 items-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-600/30"
          >
            <span className="text-lg leading-none">+</span>
            New Task
          </Link>
        </div>

        {/* Mobile New Task Button */}
        <Link
          to="/add-task"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl font-medium text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 sm:hidden"
          aria-label="Add Task"
        >
          +
        </Link>
      </div>
    </header>
  );
}

export default Header;
