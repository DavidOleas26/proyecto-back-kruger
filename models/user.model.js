import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  // favorite_flats: [
  //   {
  //     flat: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "flats",
  //       required: true,
  //     },
  //   },
  // ],
  create_at: {
    type: Date,
    default: Date.now,
  },
  update_at: {
    type: Date,
    default: null,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (password) {
  const validationResult = await bcrypt.compare(password, this.password);
  return validationResult;
};

export const User = mongoose.model("users", userSchema);
