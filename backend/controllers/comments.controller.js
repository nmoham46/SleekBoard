import Comment from "../models/comments.model.js";
import { StatusCodes } from "http-status-codes";

// POST /api/comments
export const createComment = async (req, res) => 
    {
        try 
            {
                const { userStoryId, commentText, commentedBy } = req.body;

                if (!userStoryId || !commentText) 
                    {
                        return res.status(StatusCodes.BAD_REQUEST).json({ message: "userStoryId and text are required" });
                    }

                const comment = new Comment({userStoryId,commentText,commentedBy});

                const saved = await comment.save();
                return res.status(StatusCodes.CREATED).json(saved);
            } 
        catch (err) 
            {
                console.error("Error creating comment", err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error creating comment" });
            }
    };

// PUT /api/comments/:id
export const updateComment = async (req, res) => 
    {
        try 
            {
                const { id } = req.params;
                const { commentText } = req.body;

                if (!commentText) 
                    {
                        return res.status(StatusCodes.BAD_REQUEST).json({ message: "text is required" });
                    }

                const updated = await Comment.findByIdAndUpdate(id,{ text },{ new: true });

                if (!updated) 
                    {
                        return res.status(StatusCodes.NOT_FOUND).json({ message: "Comment not found" });
                    }

                return res.status(StatusCodes.OK).json(updated);
            } 
        catch (err) 
            {
                console.error("Error updating comment", err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error updating comment" });
            }
    };

// DELETE /api/comments/:id
export const deleteComment = async (req, res) => 
    {
        try 
            {
                const { id } = req.params;

                const deleted = await Comment.findByIdAndDelete(id);

                if (!deleted) 
                    {
                        return res.status(StatusCodes.NOT_FOUND).json({ message: "Comment not found" });
                    }

                return res.status(StatusCodes.OK).json({ message: "Comment deleted successfully" });
            } 
        catch (err) 
            {
                console.error("Error deleting comment", err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error deleting comment" });
            }
    };