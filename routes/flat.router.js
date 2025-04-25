import express from 'express'
import { getAllFlats, addFlat } from '../controllers/flat.controller.js'

const flatRouter = express.Router()

// Rutas Endpoints
flatRouter.post('/', addFlat)
flatRouter.get('/', getAllFlats)


export default flatRouter