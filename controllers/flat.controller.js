import mongoose from "mongoose";
import { FlatService } from "../services/flat.service.js";
import { validateFlatSchema, validateUpdateFlatSchema } from "../schemas/flat.schema.js";

export class FlatController {

  static getAllFlats = async (req, res) => {
    try {
      const { query, pagination, sort } = req.queryParams;

      const result = await FlatService.getAllFlats({query, pagination, sort})
      res.status(200).json({
        success: true,
        data: result.flats,
        pagination: result.pagination
      });

    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static getAllMyFlats = async (req, res) => {
    try {
      const { userId } = req.user
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const page = Math.max(Number(req.query.page) || 1, 1);
      const flats = await FlatService.getAllOwnerFlats({ userId, page })
      
      res.status(200).json(flats);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static getFlatById = async (req, res) => {
    try {
      const { id } = req.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid flat ID" });
      }

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

      const { userId } = req.user
      req.body.ownerId = userId

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
      
      const { id } = req.params;
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
  
      res.status(200).json({ message: "Flat deleted successfully", flat });

    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

}

