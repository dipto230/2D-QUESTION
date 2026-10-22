import prisma from "../../lib/prisma";
import { CreateSubmissionInput } from "./submission.validation";

export const createSubmission = async (
  userId: string,
  data: CreateSubmissionInput
) => {
  const existingSubmission =
    await prisma.submission.findUnique({
      where: {
        userId_githubUrl: {
          userId,
          githubUrl: data.githubUrl,
        },
      },
    });

  if (existingSubmission) {
    throw new Error("DUPLICATE_SUBMISSION");
  }

  const submission = await prisma.submission.create({
    data: {
      projectName: data.projectName,
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      description: data.description,
      userId,
    },
  });

  return submission;
};