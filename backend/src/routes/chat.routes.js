import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = Router();

router.get("/", protectRoute, getStreamToken);

export default router;
