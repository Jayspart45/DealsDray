import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register_user").post(registerUser);
router.route("/login_user").post(loginUser);
router.route("/logout_user").post(verifyJWT, logoutUser);


export default router
