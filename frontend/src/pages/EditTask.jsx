import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: location.state?.title || "",
      description: location.state?.description || "",
      isCompleted: location.state?.isCompleted || false,
    },
  });

  async function handleData(data) {
    try {
      setLoading(true);

      console.log("Updated task:", data);

      const res = await axios.patch(
        "http://localhost:3000/tasks/" + id,
        data,
      );

      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Unable to update the task. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <button
              onClick={() => navigate("/")}
              className="text-indigo-600 transition hover:text-indigo-800"
            >
              Tasks
            </button>

            <span className="text-slate-300">/</span>

            <span className="text-slate-500">Edit Task</span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Edit your task
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Update your task details, make changes, and keep your task
                information accurate.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />

              <span className="text-xs font-medium text-slate-500">
                Editing task
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(handleData)}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Form Header */}
              <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600">
                    ✏️
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Task information
                    </h2>

                    <p className="mt-0.5 text-sm text-slate-500">
                      Make changes to your task below.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="space-y-6 px-6 py-7 sm:px-8">
                {/* Task ID */}
                <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Task ID
                    </span>

                    <span className="max-w-[220px] truncate rounded-lg bg-white px-2.5 py-1 font-mono text-xs text-slate-500">
                      {id}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Task title
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    id="title"
                    {...register("title", {
                      required: "Task title is required",
                      minLength: {
                        value: 3,
                        message: "Title must contain at least 3 characters",
                      },
                    })}
                    type="text"
                    placeholder="e.g. Complete project presentation"
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.title
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                    }`}
                  />

                  {errors.title ? (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                      <span>!</span>
                      {errors.title.message}
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-slate-400">
                      Give your task a clear and descriptive name.
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    {...register("description")}
                    rows={6}
                    placeholder="Describe what needs to be done..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Update the description with any new information or
                    requirements.
                  </p>
                </div>

                {/* Completion Status */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <label
                    htmlFor="isCompleted"
                    className="flex cursor-pointer items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                        ✓
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Task completed
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          Mark this task as completed if you've finished it.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        id="isCompleted"
                        type="checkbox"
                        {...register("isCompleted")}
                        className="peer sr-only"
                      />

                      <div className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-emerald-500 peer-focus:ring-4 peer-focus:ring-emerald-500/20" />

                      <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
                    </div>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Saving changes...
                    </>
                  ) : (
                    <>
                      <span>✓</span>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Current Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Current status
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    location.state?.isCompleted
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {location.state?.isCompleted ? "✓" : "•"}
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    {location.state?.isCompleted
                      ? "Completed"
                      : "In progress"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {location.state?.isCompleted
                      ? "This task has been completed."
                      : "This task still needs your attention."}
                  </p>
                </div>
              </div>
            </div>

            {/* Editing Tips */}
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                💡
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                Editing tips
              </h3>

              <div className="mt-4 space-y-4">
                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

                  <p className="text-sm leading-5 text-slate-500">
                    Keep the title short and specific.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

                  <p className="text-sm leading-5 text-slate-500">
                    Update the description whenever requirements change.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

                  <p className="text-sm leading-5 text-slate-500">
                    Mark the task complete when all work is finished.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Tasks */}
            <button
              onClick={() => navigate("/")}
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Back to dashboard
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    View all your tasks
                  </p>
                </div>

                <span className="text-lg text-slate-400">→</span>
              </div>
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default EditTask;
