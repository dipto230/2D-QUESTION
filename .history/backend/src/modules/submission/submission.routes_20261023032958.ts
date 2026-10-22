import { Router } from "express";

import auth from "../../middlewares/auth";
import {
  createSubmission,
} from "./submission.controller";

const router = Router();

router.post(
  "/",
  auth,
  createSubmission
);

export default router;