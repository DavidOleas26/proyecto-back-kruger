import mongoose from "mongoose";

const flatSchemma = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
  streetNumber: {
    type: Number,
    min: [0, "Street Number no puede ser menor a cero"],
    required: true,
  },
  areaSize: {
    type: Number,
    min: [0, "Area size no puede ser menor a cero"],
    required: true,
  },
  hasAc: {
    type: Boolean,
    required: true
  },
  yearBuilt: {
    type: Date,
  },
  rentPrice: {
    type: Number,
    min: [0, "Rent price can't be 0"],
    required: true
  },
  dateAvailable : {
    type: Date,
  },
  // ownerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "users",
  //   required: true
  // },
  createdAt : {
    type: Date,
    default: Date.now,
  },
  updatedAt : {
    type: Date,
    default: null
  },
  deletedAt: {
    type: Date,
    default: null,
  },
})

export const Flat = mongoose.model("flats", flatSchemma)