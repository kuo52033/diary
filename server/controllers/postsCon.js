import postMessage, { Comment } from "../modules/postMessage.js";
import mongoose from "mongoose";
import User from "../modules/user.js";
import * as fs from "fs";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const uploadAndCompress = async (files) => {
  const imagePath = [];
  await Promise.all(
    files.map(async (file) => {
      const filename = `${uuidv4()}-${file.originalname
        .toLowerCase()
        .split(" ")
        .join("-")}`;
      imagePath.push(filename);
      await sharp(file.buffer)
        .jpeg({ quality: 90 })
        .toFile(`./public/postImage/${filename}`);
    })
  );
  return imagePath;
};

export const getPaginate = async (req, res) => {
  try {
    const LIMIT = 12;
    const totalPost = await postMessage.countDocuments();

    res.status(200).json({ totalPages: Math.ceil(totalPost / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;
  const { myId = undefined } = req.body;

  try {
    const LIMIT = 12;
    const startIndex = (Number(page) - 1) * LIMIT;

    const sendPosts = await postMessage
      .find()
      .select({
        title: 1,
        likesContain: { $in: [myId, "$likes"] },
        likesLength: { $size: "$likes" },
        favoriteContain: { $in: [myId, "$favorites"] },
        tags: 1,
        message: 1,
        creator: 1,
        selectfile: 1,
        createAt: 1,
        comments: { $size: "$comments" },
      })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .populate({ path: "creator", select: "name avatar" })
      .lean();

    res.status(200).json({
      data: sendPosts,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const { myId = undefined } = req.body;
  try {
    const sendPost = await postMessage
      .findById(id)
      .populate({
        path: "comments",
        populate: { path: "user", model: "User", select: "name avatar" },
        select: "-post",
      })
      .populate({ path: "creator", select: "avatar name" })
      .select({
        title: 1,
        likesContain: { $in: [myId, "$likes"] },
        likesLength: { $size: "$likes" },
        favoriteContain: { $in: [myId, "$favorites"] },
        tags: 1,
        message: 1,
        creator: 1,
        selectfile: 1,
        createAt: 1,
        comments: 1,
      })
      .lean();

    res.json(sendPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  const { myId = undefined } = req.body;
  const title = new RegExp(searchQuery, "i");

  try {
    const sendPosts = await postMessage
      .find({
        $or: [{ title }, { tags: { $in: tags.split(",") } }],
      })
      .select({
        title: 1,
        likesContain: { $in: [myId, "$likes"] },
        likesLength: { $size: "$likes" },
        favoriteContain: { $in: [myId, "$favorites"] },
        tags: 1,
        message: 1,
        creator: 1,
        selectfile: 1,
        createAt: 1,
        comments: { $size: "$comments" },
      })
      .sort({ _id: -1 })
      .populate({ path: "creator", select: "name avatar" })
      .lean();

    res.json(sendPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostByUser = async (req, res) => {
  const { userid } = req.params;

  try {
    const sendPosts = await postMessage
      .find({ creator: userid })
      .select({
        selectfileFirst: {
          $cond: {
            if: { $gt: [{ $size: "$selectfile" }, 0] },
            then: { $first: "$selectfile" },
            else: null,
          },
        },
        likesLength: { $size: "$likes" },
        comments: { $size: "$comments" },
      })
      .sort({ _id: -1 })
      .lean();

    res.status(200).json(sendPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFavorites = async (req, res) => {
  const { userId } = req.params;
  try {
    const sendPosts = await postMessage
      .find({ favorites: { $in: userId } })
      .select({
        selectfileFirst: {
          $cond: {
            if: { $gt: [{ $size: "$selectfile" }, 0] },
            then: { $first: "$selectfile" },
            else: null,
          },
        },
        likesLength: { $size: "$likes" },
        comments: { $size: "$comments" },
      })
      .sort({ _id: -1 })
      .lean();

    res.status(200).json(sendPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const files = req.files;
  let imagePath = [];

  try {
    if (files.length !== 0) {
      imagePath = await uploadAndCompress(files);
    }

    const newPost = await postMessage.create({
      ...post,
      selectfile: imagePath.length > 0 ? imagePath : [],
      creator: req.userId,
      createAt: new Date().toISOString(),
    });

    const sendPost = await postMessage
      .findById(newPost._id)
      .select({
        title: 1,
        likesLength: { $size: "$likes" },
        tags: 1,
        message: 1,
        creator: 1,
        selectfile: 1,
        createAt: 1,
        comments: { $size: "$comments" },
      })
      .populate({ path: "creator", select: "name avatar" });

    res.status(201).json({ sendPost, message: "創建成功" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { myId = undefined } = req.body;
  const updatePost = req.body;
  const files = req.files;
  let imagePath = [];

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("no id with that post!");

    if (files.length !== 0) {
      imagePath = await uploadAndCompress(files);
    }

    if (!updatePost.beforeFile) {
      const deleteImage = await postMessage
        .findById(id)
        .select("selectfile")
        .lean();
      if (deleteImage.selectfile.length !== 0) {
        await Promise.all(
          deleteImage.selectfile.map(
            async (file) => await fs.unlinkSync(`./public/postImage/${file}`)
          )
        );
      }
    }

    const newPost = await postMessage
      .findByIdAndUpdate(
        id,
        {
          ...updatePost,
          selectfile:
            imagePath.length === 0 ? updatePost.beforeFile || [] : imagePath,
        },
        { new: true }
      )
      .select({
        title: 1,
        likesContain: { $in: [myId, "$likes"] },
        likesLength: { $size: "$likes" },
        favoriteContain: { $in: [myId, "$favorites"] },
        tags: 1,
        message: 1,
        creator: 1,
        selectfile: 1,
        createAt: 1,
        comments: { $size: "$comments" },
      })
      .populate({
        path: "creator",
        select: "name avatar",
      });

    res.json({ newPost, message: "編輯成功" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletePost = await postMessage
      .findById(id)
      .select("selectfile comments")
      .lean();

    if (deletePost.selectfile.length !== 0) {
      await Promise.all(
        deletePost.selectfile.map(
          async (file) => await fs.unlinkSync(`./public/postImage/${file}`)
        )
      );
    }
    await Comment.deleteMany({ _id: { $in: deletePost.comments } });
    await postMessage.findByIdAndRemove(id);
    await User.updateMany({}, { $pull: { favorites: id } });

    res.status(200).json({ message: "刪除成功" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    await postMessage.findByIdAndUpdate(id, {
      $push: { likes: req.userId },
    });

    res.send("案讚成功");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const unlikePost = async (req, res) => {
  const { id } = req.params;

  try {
    await postMessage.findByIdAndUpdate(id, {
      $pull: { likes: req.userId },
    });

    res.send("收回讚成功");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    const newComment = await Comment.create({
      post: id,
      user: userId,
      content: comment,
      createAt: new Date().toISOString(),
    });

    const sendComment = await User.populate(newComment, {
      path: "user",
      select: "name avatar",
    });

    await postMessage.findByIdAndUpdate(id, {
      $push: { comments: newComment._id },
    });

    res.status(200).json(sendComment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId, postId } = req.params;
  try {
    await Comment.findByIdAndRemove(commentId);
    await postMessage.findByIdAndUpdate(postId, {
      $pull: { comments: { $in: [commentId] } },
    });

    res.status(200).json({ message: "評論刪除成功" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
