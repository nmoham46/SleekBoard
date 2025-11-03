import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserStorySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["todo", "in-review", "sprint-ready"], default: "todo" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

UserStorySchema.index({ projectId: 1, createdAt: -1 });

export default model("UserStory", UserStorySchema);
