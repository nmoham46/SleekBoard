import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const CommentUserStorySchema = new Schema(
  {
    userStoryId: { type: Schema.Types.ObjectId, ref: "UserStory", required: true },
    CommentText: { type: String, required: true },
    commentedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Comment", CommentUserStorySchema);
