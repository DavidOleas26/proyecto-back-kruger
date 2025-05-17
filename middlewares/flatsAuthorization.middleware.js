import { FlatService } from "../services/flat.service.js"

export class AuthorizationMiddleware {

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
        
        if (flat.ownerId._id.toString() !== userId.toString()) {
          return res.status(403).json({ message: "Access denied for User" })
        }
        req.flat = flat;
        next()
    } catch (error) {
      return res.status(403).json({ message: "Access denied for User" })
    }
  
  }

}