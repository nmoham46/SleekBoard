import { Router } from "express";
import {
  createUserStories,
  getUserStory,
  updateUserStory,
  deleteUserStory,
  listUserStories,
  
 // Comments 
  addComment,
  getComments,
  updateComment,
  deleteComment
} from "../controllers/userStories.controller.js";

const router = Router();

router.get("/", listUserStories);
router.post("/", createUserStories);
router.get("/:id", getUserStory);
router.put("/:id", updateUserStory);
router.delete("/:id", deleteUserStory);

// comments
router.post("/:id/comments", addComment);
router.get("/:id/comments", getComments);
router.put("/:id/comments/:index", updateComment);
router.delete("/:id/comments/:index", deleteComment);

export default router;
