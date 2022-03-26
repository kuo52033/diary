import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  avatar: {
    url: { type: String },
    filename: { type: String },
  },
  personalProfile: { type: String, default: "" },
  education: [{ type: String }],
  workExperience: [{ type: String }],
  birthDate: { type: Date },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "postMessage" }],
  refreshToken: [{ type: String }],
});

userSchema.virtual("thumbnail").get(function () {
  return this.avatar.url.replace("/upload", "/upload/w_200");
});

export default mongoose.model("User", userSchema);
