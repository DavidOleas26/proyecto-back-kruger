export class AuthorizationMiddleware {

  static authUserMiddleware = (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Access Denied: No role provided" })
    }
  
    if (req.params.id != req.user.userId && req.user.role != "admin") 
      return res.status(403).json({ message: "Access denied for User" })
    next()
  }
  
}
