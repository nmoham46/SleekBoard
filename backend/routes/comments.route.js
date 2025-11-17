import { Router } from "express";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comments.controller.js";

const router = Router();

// POST /api/comments
router.post("/", createComment);

// PUT /api/comments/:id
router.put("/:id", updateComment);

// DELETE /api/comments/:id
router.delete("/:id", deleteComment);

export default router;