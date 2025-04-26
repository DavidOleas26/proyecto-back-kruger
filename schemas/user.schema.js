import joi from "joi";

const prsentYear = new Date().getFullYear();
const maxYearsOld = 18;
const minYear = new Date(prsentYear - maxYearsOld, 0, 1);

const validateUserSchema = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  birthdate: joi.date().max(minYear).required(),
  role: joi.string().valid("user", "admin").default("user"),
});

const validateUpdateUserSchema = joi.object({
  first_name: joi.string(),
  last_name: joi.string(),
  email: joi.string().email(),
  password: joi.string().min(6),
  birthdate: joi.date().max(minYear),
});

export { validateUserSchema, validateUpdateUserSchema };
