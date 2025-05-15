import express from 'express'
import { FlatController } from '../controllers/flat.controller.js'
// middlewares
import authenticationMiddleware from '../middlewares/authentication.middleware.js'
import { AuthorizationMiddleware } from '../middlewares/authorization.middleware.js'

const flatRouter = express.Router()

flatRouter.use(authenticationMiddleware)

// Rutas Endpoints
flatRouter.get('/', FlatController.getAllFlats)
flatRouter.get('/:id', FlatController.getFlatById)
flatRouter.post('/', AuthorizationMiddleware.flatCreatioMiddleware, FlatController.addFlat)
flatRouter.patch('/:id', AuthorizationMiddleware.flatOwnerMiddleware, FlatController.updateFlat)
flatRouter.delete('/:id', AuthorizationMiddleware.flatOwnerMiddleware, FlatController.deleteFlat)


export default flatRouter