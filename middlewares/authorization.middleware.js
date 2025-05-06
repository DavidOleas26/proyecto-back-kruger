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

const authUserMiddleware = (req, res, next) => {
  if (req.params.id != req.user.userId && req.user.role != "admin")
    return res.status(403).json({ message: "Access denied for User" });
  next();
};

export { authorizationMiddleware, authUserMiddleware };
