import { User } from "../models/user.model.js";

export class UserService {

  static allUsers = async ({query, pagination, sort}) => {
    const users = await User.find(query)
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.limit)
      .select('-password');
    
    const total = await User.countDocuments(query);

    return {
      users,
      pagination: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil(total / pagination.limit),
        hasMore: pagination.page * pagination.limit < total
      }
    };
  }

  static userById = async (id) => {
    const user = await User.findOne({ _id: id, deletedAt: null }).lean();
    if (!user) {
      return null
    }
    delete user.password
    return user
  }

  static findByEmail = async (userEmail) => {
    const user = await User.findOne({ email: userEmail, deletedAt: null });
    if (!user) {
      return null
    }
    return user
  }

  static saveUser = async (userToSave) => {
    const user = new User(userToSave)
    await user.save()
    const userObj = user.toObject();
    delete userObj.password
    return userObj
  }

  static userUpdated = async (id, userToSave) => {
    userToSave.updatedAt = new Date();

    const existingUser = await User.findOne({ _id: id, deletedAt: null })
    if (!existingUser) {
      return null
    }

    const updatedUser = await User.findByIdAndUpdate(
      id, 
      userToSave, 
      { new: true, runValidators: true }
    ).lean()

    if (!updatedUser) {
      return null
    }

    delete updatedUser.password
    return updatedUser
  }

  static userDeleted = async (id) => {
      const user = await User.findOne({ _id: id, deletedAt: null })
      if (!user) {
        return null
      }

      user.deletedAt = Date.now()
      await user.save()

      const userObj = user.toObject()
      delete userObj.password
      return userObj
  }
}
