import { UserService } from "../services/user.service.js";
import { AuthService } from "../services/auth.service.js";
import { validateUserSchema } from "../schemas/user.schema.js";

export class AuthController {

  static register = async (req, res) => {
    try {
  
      const { error, value } = validateUserSchema.validate(req.body)
      if (error) {
        return res.status(400).json({ error: error.details[0].message })
      }
  
      const user = await UserService.saveUser(req.body)
      res.status(201).json(user)
  
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static login = async (req, res) => {
    try {
      
      const { email, password } = req.body;
  
      const user = await UserService.findByEmail(email)
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const userToken = AuthService.getToken(user)
      res.json({ userToken })
  
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  }

}

