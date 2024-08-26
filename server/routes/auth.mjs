import express from "express";
import { login, logout, signup } from "../controllers/auth.mjs";

const authRoutes = express.Router({ mergeParams: true });

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

authRoutes.get("/logout", logout);

export default authRoutes;
