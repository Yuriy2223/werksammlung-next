import Joi from "joi";

export const contactMeSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).max(500).required(),
});
