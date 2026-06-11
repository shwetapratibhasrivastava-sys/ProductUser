import express from "express";
import { sendContactMessage } from "../controllers/mail.js";

const mailRoute = express.Router();

mailRoute.post("/send", sendContactMessage);

export default mailRoute;