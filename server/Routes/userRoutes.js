import express from "express";
import {login,register,verify,googleAuth} from "../Controller/authController.js";
import {tokenMw} from "../Middlewares/verifyToken.js";

const userRoutes = express.Router();

userRoutes.post("/register" , register);
userRoutes.post("/login" , login);
userRoutes.get("/verify" , tokenMw , verify);
userRoutes.post("/google-auth" , googleAuth);


export default userRoutes;