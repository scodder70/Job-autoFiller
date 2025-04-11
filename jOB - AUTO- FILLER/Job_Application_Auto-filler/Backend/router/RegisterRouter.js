import express from "express";
import { getRegister, register } from "../controllers/RegisterController.js";
const router = express.Router();
router.post("/register", register);
router.get("/getRegister", getRegister);
export default router;
