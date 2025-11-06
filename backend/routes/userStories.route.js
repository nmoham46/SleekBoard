import { Router } from "express";
import {
  createUserStories,
  getUserStory,
  updateUserStory,
  deleteUserStory,
  listUserStories
} from "../controllers/userStories.controller.js";

const router = Router();

router.get("/", listUserStories);
router.post("/", createUserStories);
router.get("/:id", getUserStory);
router.patch("/:id", updateUserStory);
router.delete("/:id", deleteUserStory);

export default router;
