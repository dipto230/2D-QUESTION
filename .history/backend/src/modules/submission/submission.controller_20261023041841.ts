import { Request, Response } from "express";
import { ZodError } from "zod";

import {
  createSubmissionSchema,
} from "./submission.validation";

import {
  createSubmission,
} from "./submission.service";

export const submitProject = async (
  req: Request,
  res: Response
) => {
  try {
    // Validate incoming data
    const validatedData =
      createSubmissionSchema.parse(req.body);

    // Create submission
    const submission =
      await createSubmission(validatedData);

    return res.status(201).json({
      success: true,
      message: "Project submitted successfully",
      data: submission,
    });
  } catch (error) {
    // Zod validation error
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.flatten().fieldErrors,
      });
    }

    // Duplicate submission
    if (
      error instanceof Error &&
      error.message === "DUPLICATE_SUBMISSION"
    ) {
      return res.status(409).json({
        success: false,
        message:
          "This GitHub repository has already been submitted.",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};