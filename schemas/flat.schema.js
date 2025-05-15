import Joi from 'joi'

const getMaxBuiltYear = () => {
  const prsentYear = new Date().getFullYear()
  const maxYearsOld = 100
  return new Date(prsentYear - maxYearsOld, 0, 1)
}

const validateFlatSchema = Joi.object(
  {
    city: Joi.string().required().max(50),
    streetName: Joi.string().required().max(50),
    streetNumber: Joi.number().required().integer().positive(),
    areaSize: Joi.number().required().positive(),
    hasAc: Joi.boolean().required(),
    yearBuilt: Joi.date().required().greater(getMaxBuiltYear()).max('now'),
    rentPrice: Joi.number().required().precision(2).positive(),
    dateAvailable: Joi.date().required().min('now'),
    ownerId: Joi.required()
  }
)

const validateUpdateFlatSchema = Joi.object(
  {
    city: Joi.string().max(50),
    streetName: Joi.string().max(50),
    streetNumber: Joi.number().integer().positive(),
    areaSize: Joi.number().positive(),
    hasAc: Joi.boolean(),
    yearBuilt: Joi.date().greater(getMaxBuiltYear()).max('now'),
    rentPrice: Joi.number().precision(2).positive(),
    dateAvailable: Joi.date().min('now'),
  }
)

export { validateFlatSchema, validateUpdateFlatSchema }