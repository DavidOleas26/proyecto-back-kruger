import express from "express";
import { UserController } from "../controllers/user.controller.js";

// Middlewares authentication and authorization
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { AuthorizationMiddleware } from "../middlewares/userAuthorization.middleware.js";

const userRouter = express.Router();

userRouter.use(authenticationMiddleware)

userRouter.get("/", AuthorizationMiddleware.authUserMiddleware, UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.patch("/:id", AuthorizationMiddleware.authUserMiddleware, UserController.updateUser);
userRouter.delete("/:id", AuthorizationMiddleware.authUserMiddleware, UserController.deleteUser);

export default userRouter;
