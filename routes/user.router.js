import express from "express";
import { UserController } from "../controllers/user.controller.js";

// Middlewares authentication and authorization
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { authUserMiddleware } from "../middlewares/authorization.middleware.js";

const userRouter = express.Router();

userRouter.use(authenticationMiddleware)

userRouter.get("/", authUserMiddleware, UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.patch("/:id", authUserMiddleware, UserController.updateUser);
userRouter.delete("/:id", authUserMiddleware, UserController.deleteUser);

export default userRouter;
