import { User } from "../models/user.model.js";

export class UserService {

  static allUsers = async () => {
    const users = await User.find({
      deletedAt: null,
    })
    return users
  }

  static userById = async (id) => {
    const user = await User.findOne({ _id: id, deletedAt: null });
    if (!user) {
      return false
    }
    return user
  }

  static findByEmail = async (userEmail) => {
    const user = await User.findOne({ email: userEmail, deletedAt: null });
    if (!user) {
      return false
    }
    return user
  }

  static saveUser = async (userToSave) => {
    const user = new User(userToSave)
    await user.save()
    return user
  }

  static userUpdated = async (id, userToSave) => {
    userToSave.updatedAt = new Date();
    const user = await User.findByIdAndUpdate(
      id, 
      userToSave, 
      { new: true, runValidators: true }
    )
    if (!user) {
      return null
    }
    return user
  }

  static userDeleted = async (id) => {
    const user = await User.findByIdAndUpdate(
      id, 
      { deletedAt: Date.now() },
      { new: true, runValidators: true }
    )
  
    if (!user) {
      return null
    }
    return user
  }
}
