import { Router } from "express";
import {
	getChatHistory,
	postChatMessage,
} from "../controllers/chatController.mjs";

import { postAudioTrans } from "../controllers/groqSpeechToTextController.mjs";

const router = Router();

router.get("/", getChatHistory);
router.post("/", postChatMessage);

export default router;
