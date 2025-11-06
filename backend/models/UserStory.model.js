import mongoose from "mongoose";

const UserStorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 5, maxlength: 120 },
    description: { type: String, maxlength: 5000 },
    acceptanceCriteria: { type: [String], default: [] },
    priority: { type: String, enum: ["P0","P1","P2"], default: "P2" },
    status: { type: String, enum: ["backlog","in_progress","review","done"], default: "backlog" },
    storyPoints: { type: Number, min: 0, max: 100 },
    sprintId: { type: String },
    assignees: { type: [String], default: [] },
    createdBy: { type: String },
    updatedBy: { type: String }
  },
  { timestamps: true }
);

UserStorySchema.index({ title: "text", description: "text" });

export default mongoose.model("UserStory", UserStorySchema);
