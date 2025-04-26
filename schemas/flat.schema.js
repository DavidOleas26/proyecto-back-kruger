import Joi from 'joi'

const prsentYear = new Date().getFullYear()
const maxYearsOld = 100
const minYear = new Date(prsentYear - maxYearsOld, 0, 1)

const validateFlatSchema = Joi.object(
  {
    city: Joi.string().required().max(50),
    streetName: Joi.string().required().max(50),
    streetNumber: Joi.number().required().integer().positive(),
    areaSize: Joi.number().required().positive(),
    hasAc: Joi.boolean().required(),
    yearBuilt: Joi.date().required().greater(minYear),
    rentPrice: Joi.number().required().precision(2).positive(),
    dateAvailable: Joi.date().required().min('now'),
  }
)

const validateUpdateFlatSchema = Joi.object(
  {
    city: Joi.string().max(50),
    streetName: Joi.string().max(50),
    streetNumber: Joi.number().integer().positive(),
    areaSize: Joi.number().positive(),
    hasAc: Joi.boolean(),
    yearBuilt: Joi.date().greater(minYear),
    rentPrice: Joi.number().precision(2).positive(),
    dateAvailable: Joi.date().min('now'),
  }
)

export { validateFlatSchema, validateUpdateFlatSchema }