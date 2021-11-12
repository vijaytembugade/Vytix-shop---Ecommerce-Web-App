import express from "express";
import {
  authUser,
  getUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/usersController.js";
import { protect , admin} from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").post(registerUser);

router.route('/').get(protect,admin, getUser)
export default router;
