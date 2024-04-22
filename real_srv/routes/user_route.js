import express from "express";
import { verifyToken } from "../middleware/authenticate.js";
import {
  adminDeleteUser,
  adminUser,
  deleteUser,
  getUserListings,
  updateUser,
} from "../controllers/user_controller.js";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", getUserListings);
router.get("/allusers", adminUser);
router.delete("/deleteUser/:id", adminDeleteUser);

export default router;
