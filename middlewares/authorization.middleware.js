const authorizationMiddleware = (roles) => (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: "Access Denied: No role provided" });
  }

  if (!roles.includes(req.user.role)) {
    return res
      .status(401)
      .json({ message: "Access Denied: Unauthorized role" });
  }

  next();
};

export default authorizationMiddleware;
