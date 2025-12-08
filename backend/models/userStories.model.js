import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const QualityIndicatorSchema = new Schema(
  {
    correct:      { type: Boolean, default: false },
    unambiguous:  { type: Boolean, default: false },
    complete:     { type: Boolean, default: false },
    consistent:   { type: Boolean, default: false },
    verifiable:   { type: Boolean, default: false },
    modifiable:   { type: Boolean, default: false },
  },
  { _id: false }
);

const UserStorySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["Todo", "In-Review", "Sprint-Ready"], default: "Todo" },
    businessValue: { type: Number, required: true, min: 1, max: 100 },
    storyPoint: { type: Number, required: true, enum: [1, 2, 3, 5, 8, 13, 21, 34, 55] },
    assignedTo: { type: String  },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    qualityIndicators: { type: QualityIndicatorSchema, default: () => ({}),},
  },
  { timestamps: true }
);

//Sorting by most recent
UserStorySchema.index({ createdAt: -1 });

export default model("UserStory", UserStorySchema);
