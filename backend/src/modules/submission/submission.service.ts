import prisma from "../../lib/prisma";
import {
  CreateSubmissionInput,
} from "./submission.validation";

export const createSubmission = async (
  data: CreateSubmissionInput
) => {
  const existingSubmission =
    await prisma.submission.findUnique({
      where: {
        githubUrl: data.githubUrl,
      },
    });

  if (existingSubmission) {
    throw new Error("DUPLICATE_SUBMISSION");
  }

  const submission =
    await prisma.submission.create({
      data: {
        projectName: data.projectName,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        description: data.description,
      },
    });

  return submission;
};