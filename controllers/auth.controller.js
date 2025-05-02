import { validateUserSchema } from "../schemas/user.schema.js";
import { saveUser } from "../services/user.service.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import configs from "../configs/configs.js";

const register = async (req, res) => {
  try {
    const { error, value } = validateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await saveUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        user_name: user.first_name,
        user_last_name: user.last_name,
      },
      configs.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login };
