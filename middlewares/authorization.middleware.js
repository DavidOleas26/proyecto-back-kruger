import { FlatService } from "../services/flat.service.js"

export class AuthorizationMiddleware {

  static authUserMiddleware = (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Access Denied: No role provided" })
    }
  
    if (req.params.id != req.user.userId && req.user.role != "admin") 
      return res.status(403).json({ message: "Access denied for User" })
    next()
  }
  
  static flatCreatioMiddleware = (req, res, next) => {
    const { userId } = req.user
    const { ownerId } = req.body
    if ( userId !== ownerId ) {
      return res.status(403).json({ message: "Access denied for User" })
    }
    next()
  }
  
  static flatOwnerMiddleware = async (req, res, next) => {
    const { id } = req.params
    const { userId } = req.user
  
    try {
      const flat = await FlatService.getFlatById(id)
        if (!flat) {
          return res.status(404).send({ message: "Flat not found" })
        }
        
        if (flat.ownerId != userId) {
          return res.status(403).json({ message: "Access denied for User" })
        }
  
        next()
    } catch (error) {
      return res.status(403).json({ message: "Access denied for User" })
    }
  
  }

}
