import { FlatService } from "../services/flat.service.js"
import { CommentService } from "../services/comments.service.js"

export class AuthorizationMiddleware {

  static usersAllowedToComment = async (req, res, next) => {
      
    try {
      const { flatId } = req.params
      const senderId = req.user?.userId
      const { content, parentId } = req.body

      const flat = await FlatService.getFlatById(flatId)
      if (!flat) {
        return res.status(404).send({ message: "Flat not found" })
      }

      if (!parentId) {
        req.comment = {
          flatId,
          senderId, 
          content: content.trim(), 
          parentId: null, 
        }
        return next()
      } 

      const parentComment = await CommentService.getCommentById(parentId)
      
      if (!parentComment) {
        return res.status(404).json({ message: 'Comentario padre no encontrado' })
      }

      const isUserAllowedComment = parentComment.senderId.toString() === senderId.toString()
      const isFlatOwner = flat.ownerId._id.toString() === senderId.toString()

      if (!isUserAllowedComment && !isFlatOwner) {
        return res.status(403).json({ message: "You are not authorized to reply to this comment" });
      }

      req.comment = {
        flatId,
        senderId,
        content: content.trim(),
        parentId,
      };

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static flatOwnerCommentsMiddleware = async (req, res, next) => {
      const { flatId } = req.params
      const { userId } = req.user
    
      try {
        const flat = await FlatService.getFlatById(flatId)
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

  static userOwnerMessages = async (req, res, next) => {
    const { ownerId } = req.params
    const { userId } = req.user
    
    if (ownerId != userId) {
      return res.status(403).json({ message: "Access denied for User" })
    }

    next()
  }
}