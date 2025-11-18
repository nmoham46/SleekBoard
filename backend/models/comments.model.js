import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const CommentUserStorySchema = new Schema(
  {
    userStoryId: { type: Schema.Types.ObjectId, ref: "UserStory", required: true },
    commentText: { type: String, required: true },
    commentedBy: { type: String, required: true },
  },
  { timestamps: true }
);

CommentUserStorySchema.post("save", async function (doc, next) {
  try {
    await mongoose.model("UserStory").findByIdAndUpdate(
      doc.userStoryId,
      { $addToSet: { comments: doc._id } } // $addToSet avoids duplicates
    );
    next();
  } catch (err) {
    next(err);
  }
});

export default model("Comment", CommentUserStorySchema);
