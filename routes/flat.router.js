import express from 'express'
import { FlatController } from '../controllers/flat.controller.js'
import { CommentController } from '../controllers/comments.controller.js'
// middlewares
import authenticationMiddleware from '../middlewares/authentication.middleware.js'
import { AuthorizationMiddleware } from '../middlewares/flatsAuthorization.middleware.js'
import { FlatsMiddleware } from '../middlewares/flats.middleware.js'
import { AuthorizationMiddleware as commentMiddleware} from '../middlewares/commentsAuthorization.middleware.js'

const flatRouter = express.Router()

flatRouter.use(authenticationMiddleware)

// Rutas Endpoints Flats
flatRouter.get('/', 
  FlatsMiddleware.validateQueryMiddleware,
  FlatsMiddleware.buildQueryMiddleware, 
  FlatController.getAllFlats
)
flatRouter.get('/my-flats', FlatController.getAllMyFlats)
flatRouter.get('/:id', FlatController.getFlatById)
flatRouter.post('/', FlatController.addFlat)
flatRouter.patch('/:id', AuthorizationMiddleware.flatOwnerMiddleware, FlatController.updateFlat)
flatRouter.delete('/:id', AuthorizationMiddleware.flatOwnerMiddleware, FlatController.deleteFlat)

// EndPoints Comments
flatRouter.post('/:flatId/comments', commentMiddleware.usersAllowedToComment, CommentController.createComment)
flatRouter.get('/:flatId/comments', commentMiddleware.flatOwnerCommentsMiddleware, CommentController.getAllCommentsOwner)
flatRouter.get('/:userId/user-comments', commentMiddleware.userOwnerMessages ,CommentController.getUserMessages)

export default flatRouter