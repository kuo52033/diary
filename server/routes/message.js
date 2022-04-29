import express from "express";
import { createMessage, getMessage } from "../controllers/messageCon.js";

const router = express.Router();

router.get("/:chatId", getMessage);
router.post("/", createMessage);

export default router;
