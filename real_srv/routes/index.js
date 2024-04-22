import express from "express";
import authRoute from "./auth_route.js";
import listingRoute from "./listing_route.js";
import userRoute from "./user_route.js";

const router = express.Router();

router.use("/api/auth", authRoute);
router.use("/api/listing", listingRoute);
router.use("/api/user", userRoute);

export default router;
