import express from "express";
import auth from "../middleware/auth.js";
import {
  createMessage,
  d,
  getMessage,
  updateRead,
} from "../controllers/messageCon.js";

const router = express.Router();

router.get("/:chatId", getMessage);
router.post("/", createMessage);
router.patch("/read/:chatId/:userId", updateRead);

//test
router.post("/d", d);

export default router;
