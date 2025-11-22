// src/components/comments/CommentsModal.jsx
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaTrashAlt, FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import { useToast } from "@/context/ToastContext";
import {
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { useLoader } from "@/context/LoaderContext";

import {
  addComment,
  updateComment,
  deleteComment,
} from "@/services/apis/comments";

const CommentsModal = ({
  isCommentOpen,
  handleCommentOpen,
  selectedStoryComments = [],
  userStoryId,
  currentUserName = "Developer",
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Load comments on open or change
  useEffect(() => {
    setComments(selectedStoryComments || []);
  }, [selectedStoryComments, isCommentOpen]);

  const toast = useToast();
  const { startGlobalLoading, stopGlobalLoading } = useLoader();

  // --------------------------------------------------
  // Handlers
  // --------------------------------------------------

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const submitNewComment = async () => {
    if (!newComment.trim() || !userStoryId) return;

    setIsSubmitting(true);
    startGlobalLoading();  

    try {
      const payload = {
        userStoryId,
        commentText: newComment.trim(),
        commentedBy: currentUserName,
      };

      const created = await addComment(payload);

      setComments((prev) => [created, ...prev]);
      setNewComment("");

      toast.success("Comment added successfully!");
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Failed to add comment.");
    } finally {
      stopGlobalLoading();      
      setIsSubmitting(false);
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.commentText);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const saveEditedComment = async () => {
    if (!editingText.trim() || !editingCommentId) return;

    setIsUpdating(true);
    startGlobalLoading();      

    try {
      const payload = { commentText: editingText.trim() };
      const updated = await updateComment(editingCommentId, payload);

      setComments((prev) =>
        prev.map((c) =>
          c._id === editingCommentId ? { ...c, ...updated } : c
        )
      );

      setEditingCommentId(null);
      setEditingText("");

      toast.success("Comment updated successfully!");
    } catch (err) {
      console.error("Error updating comment:", err);
      toast.error("Failed to update comment.");
    } finally {
      stopGlobalLoading();     
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    setDeletingId(id);
    startGlobalLoading();     

    try {
      await deleteComment(id);

      setComments((prev) => prev.filter((c) => c._id !== id));

      toast.success("Comment deleted successfully!");
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast.error("Failed to delete comment.");
    } finally {
      stopGlobalLoading();     
      setDeletingId(null);
    }
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <Dialog
      size="lg"
      open={isCommentOpen}
      handler={handleCommentOpen}
      dismiss={{ outsidePress: false }}
      className="p-2 md:p-8"
    >
      <DialogHeader className="flex justify-between">
        <h4 className="text-h4 md:text-h2">Comments</h4>

        <IconButton size="sm" variant="text" onClick={handleCommentOpen}>
          <IoClose className="text-h4" />
        </IconButton>
      </DialogHeader>

      <DialogBody>
        <div className="flex flex-col gap-4 overflow-auto h-[15rem] p-2">
          {comments.length === 0 && (
            <p className="text-sm text-gray-500">
              No comments yet. Be the first to add one!
            </p>
          )}

          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col text-tPrimary font-primary gap-3 shadow-border rounded p-4"
            >
              <div className="flex justify-between items-center border-b-2 border-tertiary pb-1">
                <h4 className="font-semibold">
                  By: {comment.commentedBy || "Unknown"}
                </h4>

                <div className="flex gap-2">
                  {editingCommentId === comment._id ? (
                    <>
                      <IconButton
                        size="sm"
                        variant="text"
                        onClick={saveEditedComment}
                        disabled={isUpdating}
                      >
                        <FaCheck className="w-4 h-4" />
                      </IconButton>

                      <IconButton
                        size="sm"
                        variant="text"
                        onClick={cancelEditing}
                        disabled={isUpdating}
                      >
                        <FaTimes className="w-4 h-4" />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        size="sm"
                        variant="text"
                        onClick={() => startEditing(comment)}
                      >
                        <FaPencilAlt className="w-4 h-4" />
                      </IconButton>

                      <IconButton
                        size="sm"
                        variant="text"
                        onClick={() => handleDelete(comment._id)}
                        disabled={deletingId === comment._id}
                      >
                        <FaTrashAlt className="w-4 h-4" />
                      </IconButton>
                    </>
                  )}
                </div>
              </div>

              {editingCommentId === comment._id ? (
                <Textarea
                  variant="outlined"
                  rows={3}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <p>{comment.commentText}</p>
              )}
            </div>
          ))}
        </div>
      </DialogBody>

      <DialogFooter className="w-full flex flex-col items-start gap-4">
        <div className="w-full">
          <Textarea
            label="Add Comment"
            variant="outlined"
            rows={3}
            value={newComment}
            onChange={handleNewCommentChange}
            className="w-full"
          />
        </div>

        <Button
          onClick={submitNewComment}
          disabled={isSubmitting || !newComment.trim() || !userStoryId}
          className="px-6 py-3"
        >
          {isSubmitting ? "Adding..." : "Add Comment"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CommentsModal;
