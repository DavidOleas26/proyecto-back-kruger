import jwt from "jsonwebtoken";
import configs from "../configs/configs.js";

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ "Access Denied": "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, configs.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid Token" });
  }
};

export default authenticationMiddleware;
