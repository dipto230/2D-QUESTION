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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/submissions`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Project Name */}

      <div>
        <label
          htmlFor="projectName"
          className="mb-2 block text-sm font-medium"
        >
          Project Name
        </label>

        <input
          id="projectName"
          {...register("projectName")}
          placeholder="Task Management Dashboard"
          className="w-full rounded-md border p-3"
        />

        {errors.projectName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.projectName.message}
          </p>
        )}
      </div>

      {/* GitHub URL */}

      <div>
        <label
          htmlFor="githubUrl"
          className="mb-2 block text-sm font-medium"
        >
          GitHub Repository URL
        </label>

        <input
          id="githubUrl"
          {...register("githubUrl")}
          placeholder="https://github.com/username/project"
          className="w-full rounded-md border p-3"
        />

        {errors.githubUrl && (
          <p className="mt-1 text-sm text-red-500">
            {errors.githubUrl.message}
          </p>
        )}
      </div>

      {/* Live URL */}

      <div>
        <label
          htmlFor="liveUrl"
          className="mb-2 block text-sm font-medium"
        >
          Live Project URL
        </label>

        <input
          id="liveUrl"
          {...register("liveUrl")}
          placeholder="https://example.com"
          className="w-full rounded-md border p-3"
        />

        {errors.liveUrl && (
          <p className="mt-1 text-sm text-red-500">
            {errors.liveUrl.message}
          </p>
        )}
      </div>

      {/* Description */}

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium"
        >
          Project Description
        </label>

        <textarea
          id="description"
          rows={6}
          {...register("description")}
          placeholder="Describe your project..."
          className="w-full rounded-md border p-3"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
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
        className="w-full rounded-md bg-black p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? "Submitting..."
          : "Submit Project"}
      </button>
    </form>
  );
}