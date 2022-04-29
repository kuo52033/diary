import express from "express";
import { getChat, createChat } from "../controllers/chatCon.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId", getChat);
router.post("/", createChat);

export default router;
