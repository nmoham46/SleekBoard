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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
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

// POST /api/user-stories/:id/comments
export const addComment = async (req, res) => 
  {
    try
      {
        const { id } = req.params;
        const { text } = req.body;

        if (!text || typeof text !== "string") 
          {
            return res.status(400).json({ message: "Comment text is required" });
          }

        const story = await UserStory.findById(id);

        if (!story) 
          {
          return res.status(StatusCodes.NOT_FOUND).json({ message: "User story not found" });
      }

      story.comments.push(text);
      await story.save();

      return res.status(201).json(
        {
        message: "Comment added",
        comments: story.comments,
      });

    } 
    catch (err) 
      {
        console.error("Error adding comment", err);
        return res.status(500).json({ message: "Error adding comment" });
      }
  };

  // GET /api/user-stories/:id/comments
export const getComments = async (req, res) => 
    {
    try 
      {
        const { id } = req.params;
        const story = await UserStory.findById(id);

        if (!story) 
          {
            return res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: "User story not found" });
          }

        return res.status(StatusCodes.OK).json({
          comments: story.comments,
        });
      } 
    catch (err) 
      {
        console.error("Error getting comments", err);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error getting comments" });
      }
  };

// PUT /api/user-stories/:id/comments/:index
export const updateComment = async (req, res) => 
  {
    try 
      {
        const { id, index } = req.params;
        const { text } = req.body;

        const i = Number(index);

        if (!Number.isInteger(i) || i < 0) 
          {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid comment index" });
          }

        if (!text || typeof text !== "string") 
          {
              return res.status(StatusCodes.BAD_REQUEST).json({ message: "Comment text is required" });
          }

        const story = await UserStory.findById(id);

        if (!story) 
          {
            return res
            .status(StatusCodes.NOT_FOUND).json({ message: "User story not found" });
          }


        if (i >= story.comments.length)
          {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Comment not found" });
          }

        story.comments[i] = text;
        await story.save();

        return res.status(StatusCodes.OK).json(
          {
            message: "Comment updated",
            comments: story.comments,
          });
      } 
    catch (err) 
      {
        console.error("Error updating comment", err);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error updating comment" });
      }
  };

// DELETE /api/user-stories/:id/comments/:index
export const deleteComment = async (req, res) => 
  {
    try 
      {
        const { id, index } = req.params;
        const i = Number(index);

        if (!Number.isInteger(i) || i < 0) 
          {
            return res.status(StatusCodes.BAD_REQUEST)
            .json({ message: "Invalid comment index" });
          }

        const story = await UserStory.findById(id);

        if (!story) 
          {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User story not found" });
          }

        if (i >= story.comments.length) 
          {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Comment not found" });
          }

        story.comments.splice(i, 1);
        await story.save();

        return res.status(StatusCodes.OK).json(
          {
            message: "Comment deleted",
            comments: story.comments,
          });
      } 
    catch (err) 
      {
        console.error("Error deleting comment", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error deleting comment" });
      }
  };

