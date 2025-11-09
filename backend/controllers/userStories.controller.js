import UserStory from "../models/userStories.model.js";
import { StatusCodes } from "http-status-codes";


export async function createUserStories(req, res) {
  try {
    const userStory = new UserStory(req.body);
    const savedStory = await userStory.save();
    res.status(StatusCodes.CREATED).json(savedStory);
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).json({ error: e.message });
  }
}

export async function getUserStory(req, res) {
  try {
    const userStory = await UserStory.findById(req.params.id);
    if (!userStory) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "User story not found" });
    }
    res.status(StatusCodes.OK).json(userStory);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}

export async function updateUserStory(req, res) {
  try {
    const updatedStory = await UserStory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStory) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "User story not found" });
    }
    res.status(StatusCodes.OK).json(updatedStory);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function deleteUserStory(req, res) {
  try {
    const out = await UserStory.findByIdAndDelete(req.params.id);
    if (!out) return res.status(StatusCodes.NOT_FOUND).json({ error: "User story not found" });
    res.status(StatusCodes.OK).json({ message: "User story deleted successfully" });
  } catch (e) {
    res.status(StatusCodes.NO_CONTENT).json({ error: e.message });
  }
}

export async function listUserStories(req, res) {
  try {
    const stories = await UserStory.find();
    res.status(StatusCodes.OK).json(stories);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
  }
}

