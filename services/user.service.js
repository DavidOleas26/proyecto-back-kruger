import { User } from "../models/user.model.js";

const saveUser = async (userToSave) => {
  const user = new User(userToSave);
  await user.save();
  return user;
};

const allUsers = async () => {
  const users = await User.find({});
  return users;
};

const userById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const userUpdated = async (id, userToSave) => {
  const user = await User.findByIdAndUpdate(id, userToSave, { new: true });
  if (!user) {
    return null;
  }
  return user;
};

const userDeleted = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return null;
  }
  return user;
};

export { saveUser, allUsers, userById, userUpdated, userDeleted };
