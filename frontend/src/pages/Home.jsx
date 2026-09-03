import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  async function getTasks() {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();

      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function deleteTask(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await axios.delete("http://localhost:3000/tasks/" + id);

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Unable to delete the task. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.toLowerCase();

      return (
        task.title?.toLowerCase().includes(searchText) ||
        task.description?.toLowerCase().includes(searchText)
      );
    });
  }, [tasks, search]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 right-24 h-72 w-72 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Task Manager Dashboard
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Stay organized.
                <br />
                Get things done.
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                Manage your tasks, keep track of your priorities, and stay
                focused on what matters most.
              </p>
            </div>

            <button
              onClick={() => navigate("/add-task")}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow-xl"
            >
              <span className="text-xl leading-none">+</span>
              Create New Task
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Tasks
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {tasks.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                📋
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-full rounded-full bg-indigo-500" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Visible Tasks
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {filteredTasks.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                ✓
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Matching your current search
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Productivity
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {tasks.length > 0 ? "Active" : "Ready"}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-xl">
                ⚡
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              {tasks.length > 0
                ? "You have tasks waiting for your attention."
                : "Create your first task to get started."}
            </div>
          </div>
        </section>

        {/* Tasks Header */}
        <section>
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Your Tasks
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Organize and manage everything you need to accomplish.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-5 flex justify-between">
                    <div className="h-8 w-8 rounded-lg bg-slate-200" />
                    <div className="h-5 w-20 rounded-full bg-slate-200" />
                  </div>

                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="h-10 rounded-xl bg-slate-100" />
                    <div className="h-10 rounded-xl bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredTasks.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                {search ? "🔍" : "✓"}
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {search ? "No tasks found" : "No tasks yet"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {search
                  ? "Try searching with a different title or description."
                  : "Your task list is currently empty. Create your first task and start organizing your work."}
              </p>

              {!search && (
                <button
                  onClick={() => navigate("/add-task")}
                  className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
                >
                  Create Your First Task
                </button>
              )}
            </div>
          )}

          {/* Task Grid */}
          {!loading && filteredTasks.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map(function (val, index) {
                return (
                  <article
                    key={val._id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/60"
                  >
                    {/* Card Top */}
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Task
                        </span>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                        Active
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col px-5 py-5">
                      <h3 className="line-clamp-2 text-lg font-bold leading-7 text-slate-900 transition group-hover:text-indigo-600">
                        {val.title}
                      </h3>

                      <p className="mt-3 line-clamp-4 min-h-[96px] text-sm leading-6 text-slate-500">
                        {val.description || "No description provided for this task."}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50">
                          📝
                        </span>

                        <span>Task details</span>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                          onClick={function () {
                            navigate("/edit-task/" + val._id, {
                              state: val,
                            });
                          }}
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          Edit Task
                        </button>

                        <button
                          onClick={function () {
                            deleteTask(val._id);
                          }}
                          disabled={deletingId === val._id}
                          className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === val._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
