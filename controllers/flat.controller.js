import { FlatService } from "../services/flat.service.js";
import { validateFlatSchema, validateUpdateFlatSchema } from "../schemas/flat.schema.js";

export class FlatController {

  static getAllFlats = async (req, res) => {
    try {
      const flats = await FlatService.getAllFlats()
      res.status(201).json(flats)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static getFlatsByfilters = async (req, res) => {
    try {
      let queryObject = { ...req.query };
      console.log(queryObject)

      const withoutFields = ["sort", "page", "limit", "fields"];
      withoutFields.forEach((field) => {
        delete queryObject[field];
      })

      // let queryString = JSON.stringify(queryObject);
      // queryString = queryString.replace(
      //   /\b(gt|gte|lt|lte)\b/g,
      //   (match) => `$${match}`
      // );
      // queryObject = JSON.parse(queryString);

      Object.keys(queryObject).forEach((key) => {
        if (typeof queryObject[key] === 'object') {
          Object.keys(queryObject[key]).forEach((subKey) => {
            if (["gt", "gte", "lt", "lte"].includes(subKey)) {
              queryObject[key][`$${subKey}`] = queryObject[key][subKey];
              delete queryObject[key][subKey];
            }
          });
        }
      });

      queryObject.deletedAt = null
      console.log(queryObject);

      let selected = "";
      if (req.query.fields) {
        selected = req.query.fields.split(",").join(" ");
      }
      console.log("selected", selected);

      let sort = "city";
      if (req.query.sort) {
        sort = req.query.sort.split(",").join(" ");
      }
      console.log("sort", sort);

      let limit = req.query.limit || 10;
      let page = req.query.page || 1;
      let skip = (page - 1) * limit;

      const flats = await FlatService.getFlatsWithFilters({queryObject, selected, sort, limit, skip})
      res.status(201).json(flats)

    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static getFlatById = async (req, res) => {
    try {
      const { id } = req.params
      const flat = await FlatService.getFlatById(id)

      if (!flat) {
        return res.status(404).send({ message: "Flat not found" })
      }

      res.status(200).send(flat);

    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static addFlat = async(req, res) => {
    try {
      const { error, value } = validateFlatSchema.validate(req.body)
  
      if (error) {
        return res.status(400).json({message: error.details[0].message})
      }
  
      const flat = await FlatService.saveFlat(req.body)
      res.status(201).json(flat)
      
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static updateFlat = async(req, res) => {
    try {
      const { error, value } = validateUpdateFlatSchema.validate(req.body)
  
      if (error) {
        return res.status(400).json({message: error.details[0].message})
      }
  
      const { id } = req.params
      const flat = await FlatService.updateFlat(id, req.body)
  
      if ( !flat ) {
        return res.status(404).json({message: "Flat not found"})
      }
  
      res.status(201).json(flat)
  
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static deleteFlat = async (req, res) => {
    try {
      const { id } = req.params
      const flat = await FlatService.deleteFlat(id)
      
      if ( !flat ) {
        return res.status(404).json({message: "Flat not found"})
      }
  
      res.status(201).json(flat)

    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

}

