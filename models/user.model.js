import mongoose from "mongoose";

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

export const User = mongoose.model("users", userSchema);
