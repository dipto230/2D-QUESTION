import { Router } from "express";

import {
  submitProject,
} from "./submission.controller";

const router = Router();

router.post("/", submitProject);

export default router;