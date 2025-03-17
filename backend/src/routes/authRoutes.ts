import express from "express";
import { login, validateToken } from "../controllers/authController";

const router = express.Router();

router.post("/login", login);
router.post("/validate-token", validateToken);
export default router;
