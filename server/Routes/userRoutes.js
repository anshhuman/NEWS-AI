import express from "express";
import {login , register} from "../Controller/authController.js";

const userRoutes = express.Router();

userRoutes.post("/register" , register);

export default userRoutes;