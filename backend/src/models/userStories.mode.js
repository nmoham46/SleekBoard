import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserStorySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["todo", "in-review", "sprint-ready"], default: "todo" },
    businessValue: { type: Number, required: true, min: 1, max: 100 },
    storyPoint: { type: Number, required: true, enum: [1, 2, 3, 5, 8, 13, 21, 34, 55] },
    comments: {type: [String], default: []},
  },
  { timestamps: true }
);

UserStorySchema.index({ projectId: 1, createdAt: -1 });

export default model("UserStory", UserStorySchema);
