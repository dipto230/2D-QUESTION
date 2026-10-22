import { Request, Response } from "express";
import { ZodError } from "zod";

import {
  createSubmissionSchema,
} from "./submission.validation";

import * as submissionService from "./submission.service";

export const createSubmission = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData =
      createSubmissionSchema.parse(req.body);

    /*
     * For this demonstration, userId comes
     * from the authenticated request.
     *
     * If your existing auth middleware already
     * sets req.user.id, use that here.
     */

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const submission =
      await submissionService.createSubmission(
        userId,
        validatedData
      );

    return res.status(201).json({
      success: true,
      message: "Project submitted successfully",
      data: submission,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.flatten().fieldErrors,
      });
    }

    if (
      error instanceof Error &&
      error.message === "DUPLICATE_SUBMISSION"
    ) {
      return res.status(409).json({
        success: false,
        message:
          "You have already submitted this project",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};