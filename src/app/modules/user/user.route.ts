import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../middleware/validateRequest";
import { userValidationSchema } from "./user.validation";

const router = express.Router();

router.post("/auth/signup", userController.createUser);

export const UserRoutes = router;
