import express from 'express'
import { FlatController } from '../controllers/flat.controller.js'

const flatRouter = express.Router()

// Rutas Endpoints
flatRouter.get('/', FlatController.getAllFlats)
flatRouter.get('/:id', FlatController.getFlatById)
flatRouter.post('/', FlatController.addFlat)
flatRouter.patch('/:id', FlatController.updateFlat)
flatRouter.delete('/:id', FlatController.deleteFlat)


export default flatRouter