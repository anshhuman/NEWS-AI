import express from "express";
import {login,register,verify} from "../Controller/authController.js";
import {tokenMw} from "../Middlewares/verifyToken.js";

const userRoutes = express.Router();

userRoutes.post("/register" , register);
userRoutes.post("/login" , login);
userRoutes.get("/verify" , tokenMw , verify);


export default userRoutes;