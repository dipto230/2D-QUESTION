import express from "express";
import cors from "cors";

import submissionRoutes from "./modules/submission/submission.routes";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use(
  "/api/submissions",
  submissionRoutes
);

export default app;