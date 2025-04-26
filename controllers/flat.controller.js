import { validateFlatSchema, validateUpdateFlatSchema } from "../schemas/flat.schema.js";
import { FlatService } from "../services/flat.service.js";

export class FlatController {

  static getAllFlats = async (req, res) => {
    try {
      const flats = await FlatService.getAllFlats()
      res.status(201).json(flats)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static getFlatById = async (req, res) => {
    try {
      const { id } = req.params
      const flat = await FlatService.getFlatById(id)

      if (!flat) {
        return res.status(404).send({ message: "Flat not found" })
      }

      res.status(200).send(flat);

    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static addFlat = async(req, res) => {
    try {
      const { error, value } = validateFlatSchema.validate(req.body)
  
      if (error) {
        return res.status(400).json({message: error.details[0].message})
      }
  
      const flat = await FlatService.saveFlat(req.body)
      res.status(201).json(flat)
      
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static updateFlat = async(req, res) => {
    try {
      const { error, value } = validateUpdateFlatSchema.validate(req.body)
  
      if (error) {
        return res.status(400).json({message: error.details[0].message})
      }
  
      const { id } = req.params
      const flat = await FlatService.updateFlat(id, req.body)
  
      if ( !flat ) {
        return res.status(404).json({message: "Flat not found"})
      }
  
      res.status(201).json(flat)
  
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static deleteFlat = async (req, res) => {
    try {
      const { id } = req.params
      const flat = await FlatService.deleteFlat(id)
      
      if ( !flat ) {
        return res.status(404).json({message: "Flat not found"})
      }
  
      res.status(201).json(flat)

    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

}

