import { FavoriteFlat } from "../models/favoriteFlats.model.js";

export class FavoriteFlatService {
  
  static addFlat = async (flatToSave) => {
    const favoriteFlat = new FavoriteFlat(flatToSave)
    await favoriteFlat.save()
    return favoriteFlat
  }

  static getFavoriteFlat = async ({flatId, userId}) => {
    const favoriteFlat = await FavoriteFlat.findOne({ flatId, userId });
  
    if (!favoriteFlat) {
      return false
    }

    return favoriteFlat
  }

  static deleteFlat = async (favoriteFlatId) => {
    await FavoriteFlat.deleteOne({ _id: favoriteFlatId })
  }

  static getOwnerFavoriteFlats = async (userId) => {
    const favoriteFlats = await FavoriteFlat.find({ userId })
      // .populate('flatId', 'title description price location') // Puedes agregar más campos si lo deseas
      .sort({ createdAt: -1 }) // Ordenar del más reciente al más antiguo
      .lean();
    
  return favoriteFlats
  }
}