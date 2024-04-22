import User from "../model/user_model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import { createJWT, hashString } from "../utils/other.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return next(errorHandler(401, "SOME INPUT FIELD ARE EMPTY!!"));
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return next(errorHandler(401, "EMAIL ALREADY EXIST"));
    }

    const hashedPassword = await hashString(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "SIGNUP SUCCESSFULL!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(errorHandler(401, "SOME INPUT FIELD ARE EMPTY!"));
    }

    const vUser = await User.findOne({ email });

    if (!vUser)
      return next(errorHandler(404, "USER NOT FOUND! REGISTER FIRST"));

    const vPassword = bcryptjs.compareSync(password, vUser.password);

    if (!vPassword) return next(errorHandler(401, "INVALID CREDENTIALS!"));

    const token = createJWT(vUser?._id);

    const { password: pass, ...rest } = vUser._doc;

    res
     .cookie("cookie_token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
  })
      .status(201)
      .json({
        success: true,
        message: "SIGN-IN SUCCESSFULL!",
        rest,
      });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("cookie_token");
    res.status(200).json({ message: "LOGOUT SUCCESSFULL!" });
  } catch (error) {
    next(error);
  }
};
