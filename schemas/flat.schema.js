import Joi from 'joi'

const validateFlatSchema = Joi.object(
  {
    city: Joi.string().required(),
    streetName: Joi.string().required(),
    streetNumber: Joi.number().required(),
    areaSize: Joi.number(),
    hasAc: Joi.boolean(),
    yearBuilt: Joi.number(),
    rentPrice: Joi.number(),
    dateAvailable: Joi.number()
  }
)

export { validateFlatSchema }