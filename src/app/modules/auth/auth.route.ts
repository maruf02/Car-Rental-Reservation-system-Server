import express from "express";
import validateRequest from "../middleware/validateRequest";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post("/auth/signin", AuthControllers.loginUser);

export const authRoutes = router;
