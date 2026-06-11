<<<<<<< HEAD
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

=======
import express from "express";
import {
  register,
  login,
} from "../controllers/auth.js";

const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);

>>>>>>> ac1bf44 (updated)
export default authRoute;