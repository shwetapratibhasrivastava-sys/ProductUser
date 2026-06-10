import Auth from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, repassword } = req.body;

    if (!email || !password || !repassword) {
      return res.json({
        message: "All fields are required",
      });
    }

    const existingOne = await Auth.findOne({ email });

    if (existingOne) {
      return res.json({
        message: "User already exists",
      });
    }

    if (password !== repassword) {
      return res.json({
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Auth.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    return res.json({
      message: "User created successfully",
      token,
      data: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        message: "All fields are required",
      });
    }

    const existingOne = await Auth.findOne({ email });

    if (!existingOne) {
      return res.json({
        message: "User doesn't exist",
      });
    }

    const valid = await bcrypt.compare(
      password,
      existingOne.password
    );

    if (!valid) {
      return res.json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: existingOne._id,
        email: existingOne.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    return res.json({
      message: "User login successfully",
      token,
      data: {
        _id: existingOne._id,
        email: existingOne.email,
      },
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};