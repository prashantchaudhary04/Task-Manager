import { useForm } from "react-hook-form";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleData(data) {
    try {
      setLoading(true);

      console.log(data);

      const res = await axios.post("http://localhost:3000/tasks", data);

      console.log(res);

      navigate("/");
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Unable to create task. Please try again.");
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
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-600">
            <button
              onClick={() => navigate("/")}
              className="transition hover:text-indigo-800"
            >
              Tasks
            </button>

            <span className="text-slate-300">/</span>

            <span className="text-slate-500">Add Task</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Create a new task
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Add the details of your task below. Keep your description clear so
            you always know exactly what needs to be done.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Form Card */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(handleData)}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Form Header */}
              <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl text-indigo-600">
                    ✨
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Task information
                    </h2>

                    <p className="mt-0.5 text-sm text-slate-500">
                      Provide the basic details for your task.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="space-y-6 px-6 py-7 sm:px-8">
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

                  {errors.title && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
                      <span>!</span>
                      {errors.title.message}
                    </p>
                  )}

                  {!errors.title && (
                    <p className="mt-2 text-xs text-slate-400">
                      Choose a short and descriptive title.
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
                    placeholder="Describe what needs to be done, add useful details, requirements, or notes..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Add enough context to make the task easy to understand.
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
                          Mark as completed
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          You can mark this task as completed right away.
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

                      <div className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-indigo-600 peer-focus:ring-4 peer-focus:ring-indigo-500/20" />

                      <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
                    </div>
                  </label>
                </div>
              </div>

              {/* Form Footer */}
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
                      Creating...
                    </>
                  ) : (
                    <>
                      <span className="text-lg leading-none">+</span>
                      Create Task
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Side Information */}
          <aside className="space-y-5">
            {/* Tips Card */}
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                💡
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                Create better tasks
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                A well-defined task is easier to understand and complete.
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Be specific
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Use a clear title that explains what needs to be done.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Add context
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Include important details in the description.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Keep moving
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Break large projects into smaller actionable tasks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  ✓
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Ready to organize?
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Your new task will appear on the dashboard.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                View All Tasks →
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default AddTask;
