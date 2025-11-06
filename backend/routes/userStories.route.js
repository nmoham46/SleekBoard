import { Router } from "express";
import {
  createStory,
  getStory,
  updateStory,
  deleteStory,
  listStories
} from "../controllers/userStories.controller.js";

const router = Router();

router.get("/", listStories);
router.post("/", createStory);
router.get("/:id", getStory);
router.patch("/:id", updateStory);
router.delete("/:id", deleteStory);

export default router;
