import { Flat } from "../models/flat.model.js";

const addFlat = (req, res) => {
  try {
    const body = req.body
    console.log(body)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const getAllFlats = () => {

}

export { getAllFlats, addFlat }