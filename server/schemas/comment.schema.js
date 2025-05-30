import Joi from 'joi'

const validateCommentSchema = Joi.object(
  {
    flatId: Joi.string().required().messages({
      "any.required": "flatId is required",
    }),
    senderId: Joi.string().required().messages({
      "any.required": "SenderId is required",
    }), 
    content: Joi.string().required().messages({
      "string.empty": "Content cannot be empty",
      "any.required": "Content is required",
    }), 
    parentId: Joi.string().allow(null).required().messages({
      "any.required": "parentId is required",
    })
  }
)

export { validateCommentSchema }
