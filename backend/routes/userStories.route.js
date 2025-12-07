import { Router } from "express";
import {
  createUserStories,
  getUserStory,
  updateUserStory,
  deleteUserStory,
  listUserStories,
  updateQualityIndicators
} from "../controllers/userStories.controller.js";

const router = Router();

router.get("/", listUserStories);
router.post("/", createUserStories);
router.get("/:id", getUserStory);
router.put("/:id", updateUserStory);
router.patch("/quality/:id", updateQualityIndicators);
router.delete("/:id", deleteUserStory);

export default router;
