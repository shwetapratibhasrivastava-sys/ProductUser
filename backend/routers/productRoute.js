import express from "express";
import {
  register,
  login,
} from "../controllers/auth.js";

import upload from "../middleware/auth.multer.middleware.js";

const authRoute = express.Router();

authRoute.post(
  "/register",
  upload.single("image"),
  register
);

authRoute.post("/login", login);

export default authRoute;