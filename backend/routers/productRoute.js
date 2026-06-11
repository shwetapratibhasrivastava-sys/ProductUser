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

export default authRoute;
=======
import express from "express";
import {
  create,
  deleted,
  get,
  getById,
  update,
} from "../controllers/product.js";

import authMiddleware from "../middleware/authMiddleware.js";

const productRoute = express.Router();

productRoute.post(
  "/create",
  authMiddleware,
  create
);

productRoute.get(
  "/get",
  authMiddleware,
  get
);

productRoute.get(
  "/getById/:id",
  authMiddleware,
  getById
);

productRoute.put(
  "/update/:id",
  authMiddleware,
  update
);

productRoute.delete(
  "/delete/:id",
  authMiddleware,
  deleted
);

export default productRoute;
>>>>>>> ac1bf44 (updated)
