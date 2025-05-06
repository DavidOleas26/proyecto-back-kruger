import express from "express";

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { authUserMiddleware } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", authUserMiddleware, getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", authUserMiddleware, updateUser);
router.delete("/:id", authUserMiddleware, deleteUser);

export default router;
