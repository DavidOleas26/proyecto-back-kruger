import { Flat } from "../models/flat.model.js";

export class FlatService {

  static getAllFlats = async () => {
    const flats = await Flat.find({
      deletedAt: null
    }).populate("ownerId")
    return flats
  }

  static getFlatById = async ( flatId ) => {
    const flat = await Flat.findOne({ _id: flatId, deletedAt: null }).populate("ownerId");
    if (!flat) {
      return false
    }

    if (flat.ownerId?.deletedAt != null) {
      return false
    }

    return flat
  }

  static saveFlat = async (flatToSave) => {
    const flat = new Flat(flatToSave);
    await flat.save();
    return flat;
  }
  
  static updateFlat = async (flatId, flatToUpdate) => {
    flatToUpdate.updatedAt = Date.now();
    const flat = await Flat.findByIdAndUpdate(
      flatId, 
      flatToUpdate, 
      { new: true, runValidators: true }
    ).populate("ownerId")

    if (!flat) {
      return false;
    }

    if (flat.ownerId?.deletedAt != null) {
      return false
    }
    return flat;
  }

  static deleteFlat = async ( flatId ) => {
    const flat = await Flat.findByIdAndUpdate(
      flatId, 
      { deletedAt: Date.now() }, 
      { new: true, runValidators: true }
    ).populate("ownerId")
    
    if (!flat) {
      return false;
    }

    if (flat.ownerId?.deletedAt != null) {
      return false
    }
    return flat;
  }

}

