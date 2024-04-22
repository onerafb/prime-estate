import bcryptjs from "bcryptjs";
import User from "../model/user_model.js";
import Listing from "../model/listing_model.js";
import { errorHandler } from "../utils/error.js";
import { json } from "express";

export const updateUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, "You can only update your own account!"));
  // console.log(req.params.id);
  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({ rest, message: "UPDATE SUCCESSFULL" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("cookie_token");
    res.status(200).json({ message: "USER DELETED!" });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const adminUser = async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
};
export const adminDeleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(errorHandler(404, "USER NOT FOUND"));
  await user.deleteOne();
  res.status(200).json({ message: "USER DELETED SUCCESSFULLY" });
};
