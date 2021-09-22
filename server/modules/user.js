import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  avatar: { type: String },
  personalProfile: { type: String, default: "" },
  education: [{ type: String }],
  workExperience: [{ type: String }],
  birthDate: { type: Date },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "postMessage" }],
  refreshToken: [{ type: String }],
});

export default mongoose.model("User", userSchema);
