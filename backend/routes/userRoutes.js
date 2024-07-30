import express from "express";
import {
  Userregister,
  verifyUser,
  loginUser,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/user/register", Userregister);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);

export default router;
