import express from "express";
import {
  getPosts,
  getPost,
  getPostsBySearch,
  getPostByUser,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  deleteComment,
  unlikePost,
  getUserFavorites,
  getPaginate,
} from "../controllers/postsCon.js";
import auth from "../middleware/auth.js";
import upload from "./image.js";

const router = express.Router();

router.post("/search", getPostsBySearch);
router.post("/create", auth, upload.array("file", 10), createPost);
router.post("/:id", getPost);
router.get("/paginate", getPaginate);
router.post("/", getPosts);
router.get("/user/:userid", getPostByUser);
router.get("/favorites/:userId", getUserFavorites);
router.patch("/:id", auth, upload.array("file", 10), updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/like", auth, likePost);
router.patch("/:id/unlike", auth, unlikePost);
router.post("/:id/comment", auth, commentPost);
router.delete("/:commentId/:postId", auth, deleteComment);

export default router;
