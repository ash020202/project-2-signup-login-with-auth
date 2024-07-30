import User from "../models/userModel.js";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";
export const Userregister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPwd = await bycrpt.hash(password, 10);

    const otp = Math.floor(Math.random() * 10000);

    user = { name, email, hashedPwd };

    const activationToken = jwt.sign({ user, otp }, process.env.SECRET_CODE, {
      expiresIn: "5m",
    });

    const msg = `Please verify your account using OTP: ${otp}`;

    await sendMail(email, "welcome to spark", msg);
    return res.status(200).json({
      message: "Otp sent successfully!!",
      activationToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;
    const verify = jwt.verify(activationToken, process.env.SECRET_CODE);
    if (!otp || !activationToken) {
      return res.status(400).json({ error: "Otp is required" });
    }
    if (!verify) {
      return res.status(401).json({
        message: "OTP Expired!!",
      });
    }
    if (verify.otp.toString() !== otp.toString()) {
      return res.json({
        message: "Invalid OTP",
      });
    }
    // if (verify.otp.toString() === otp.toString()) {
    //   return res.json({
    //     message: "OTP verified successfully",
    //   });
    // }
    await User.create({
      name: verify.user.name,

      email: verify.user.email,
      password: verify.user.hashedPwd,
    });
    return res.status(200).json({
      message: "User Register Success!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }
    const matchPassword = await bycrpt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
    const { password: userPwd, ...userDetails } = user.toObject();

    return res
      .status(200)
      .json({ message: "Login Success " + user.name, token, userDetails });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
