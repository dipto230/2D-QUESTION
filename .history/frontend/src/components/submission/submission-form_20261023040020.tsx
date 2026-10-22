"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



export default function SubmissionForm() {
  const [serverError, setServerError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    mode: "onBlur",
  });

  const onSubmit = async (
    data: SubmissionFormData
  ) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const token =
        localStorage.getItem("accessToken");

      if (!token) {
        setServerError(
          "Please login before submitting your project."
        );

        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/submissions`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setServerError(
          result.message ||
            "Failed to submit project."
        );

        return;
      }

      setSuccessMessage(
        "Project submitted successfully!"
      );

      reset();
    } catch (error) {
      console.error(error);

      setServerError(
        "Unable to connect to the server. Please try again."
      );
    }
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Project Name */}

        <div className="space-y-2">
          <label
            htmlFor="projectName"
            className="text-sm font-medium"
          >
            Project Name
          </label>

          <input
            id="projectName"
            type="text"
            placeholder="Enter your project name"
            {...register("projectName")}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
          />

          {errors.projectName && (
            <p className="text-sm text-red-500">
              {errors.projectName.message}
            </p>
          )}
        </div>

        {/* GitHub URL */}

        <div className="space-y-2">
          <label
            htmlFor="githubUrl"
            className="text-sm font-medium"
          >
            GitHub Repository URL
          </label>

          <input
            id="githubUrl"
            type="url"
            placeholder="https://github.com/username/project"
            {...register("githubUrl")}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
          />

          {errors.githubUrl && (
            <p className="text-sm text-red-500">
              {errors.githubUrl.message}
            </p>
          )}
        </div>

        {/* Live URL */}

        <div className="space-y-2">
          <label
            htmlFor="liveUrl"
            className="text-sm font-medium"
          >
            Live Project URL
          </label>

          <input
            id="liveUrl"
            type="url"
            placeholder="https://example.com"
            {...register("liveUrl")}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
          />

          {errors.liveUrl && (
            <p className="text-sm text-red-500">
              {errors.liveUrl.message}
            </p>
          )}
        </div>

        {/* Description */}

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium"
          >
            Project Description
          </label>

          <textarea
            id="description"
            rows={6}
            placeholder="Describe your project..."
            {...register("description")}
            className="w-full resize-none rounded-md border px-3 py-2 outline-none focus:ring-2"
          />

          <div className="flex justify-between">
            {errors.description ? (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            ) : (
              <span />
            )}
          </div>
        </div>

        {/* Server Error */}

        {serverError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">
              {serverError}
            </p>
          </div>
        )}

        {/* Success */}

        {successMessage && (
          <div className="rounded-md border border-green-200 bg-green-50 p-3">
            <p className="text-sm text-green-600">
              {successMessage}
            </p>
          </div>
        )}

        {/* Submit */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-black px-4 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Submitting..."
            : "Submit Project"}
        </button>
      </form>
    </div>
  );
}