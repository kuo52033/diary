import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  selectfile: [String],
  likes: [String],
  favorites: [{ type: String, default: [] }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const commentSchema = mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "postMessage" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  createAt: { type: Date, default: new Date() },
});

const postMessage = mongoose.model("postMessage", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

export { Comment };
export default postMessage;
