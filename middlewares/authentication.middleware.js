import jwt from "jsonwebtoken";
import configs from "../configs/configs.js";
import { UserService } from "../services/user.service.js";

const authenticationMiddleware = async(req, res, next) => {
  const authHeader = req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ "Access Denied": "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, configs.JWT_SECRET);

    const user = await UserService.userById(decoded.userId)
    if (!user) {
      return res.status(404).json({ error: "User does not exist" })
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid Token" });
  }
};

export default authenticationMiddleware;
