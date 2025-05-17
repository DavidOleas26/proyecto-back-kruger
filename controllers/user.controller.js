import { UserService } from "../services/user.service.js";
import { validateUpdateUserSchema } from "../schemas/user.schema.js";

export class UserController {

  static getAllUsers = async (req, res) => {
    try {
      const users = await UserService.allUsers()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static getUserById = async (req, res) => {
    try {
      const { id } = req.params
      const user = await UserService.userById(id)
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static updateUser = async (req, res) => {
    try {
      const { error, value } = validateUpdateUserSchema.validate(req.body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }
  
      const { id } = req.params
      const user = await UserService.userUpdated(id, req.body)
  
      if ( !user ) {
        return res.status(404).json({message: "User not found"})
      }
  
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserService.userDeleted(id)
  
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
  
      res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
