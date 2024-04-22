import express from "express";
import { verifyToken } from "../middleware/authenticate.js";
import {
  createListing,
  deleteListing,
  getListing,
  getListings,
  updateListing,
} from "../controllers/listing_controller.js";

const router = express.Router();

router.post("/create", verifyToken,createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router;
