import joi from "joi";

const presentDay = new Date()
const minDate = new Date(presentDay.getFullYear() - 18, presentDay.getMonth(), presentDay.getDay());

const validateUserSchema = joi.object({
  firstName: joi.string().min(2).required(),
  lastName: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.#_-]).{6,}$/).required(),
  birthdate: joi.date().max(minDate).required(),
  role: joi.string().valid("user", "admin").default("user"),
});

const validateUpdateUserSchema = joi.object({
  firstName: joi.string().min(2),
  lastName: joi.string().min(2),
  email: joi.string().email(),
  password: joi.string().min(6).pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.#_-]).{6,}$/),
  birthdate: joi.date().max(minDate),
});

export { validateUserSchema, validateUpdateUserSchema };
