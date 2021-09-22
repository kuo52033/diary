import express from "express";
import {
  userSignup,
  userSignin,
  getUserProfile,
  updateUserAvatar,
  updateUserProfile,
  favoritePost,
  unfavoritePost,
  logout,
  getUserPostLength,
  changePassword,
} from "../controllers/userCon.js";
import auth from "../middleware/auth.js";
import upload from "./image.js";

const router = express.Router();

router.post("/signin", userSignin);
router.post("/signup", userSignup);
router.delete("/logout/:myId", logout);
router.patch("/changePassword", auth, changePassword);
router.patch("/avatar", auth, upload.single("avatar"), updateUserAvatar);
router.patch("/profile/:type", auth, updateUserProfile);
router.patch("/:id/favorite", auth, favoritePost);
router.patch("/:id/unfavorite", auth, unfavoritePost);
router.get("/profile/:userId/postLength", getUserPostLength);
router.get("/profile/:userId", getUserProfile);

export default router;
