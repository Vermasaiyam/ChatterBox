import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import Authenticated from "../middlewares/Authenticated.js";

const router = express.Router();

router.route('/send/:id').post(Authenticated, sendMessage);
router.route('/all/:id').get(Authenticated, getMessage);
 
export default router;