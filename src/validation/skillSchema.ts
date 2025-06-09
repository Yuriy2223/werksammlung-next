import Joi from "joi";

const localizedStringSchema = Joi.object({
  en: Joi.string().required(),
  de: Joi.string().required(),
  ua: Joi.string().required(),
});

const itemSchema = Joi.object({
  name: localizedStringSchema.required(),
  link: Joi.string().uri().required(),
});

export const skillSchema = Joi.object({
  profileId: Joi.string().length(24).required(),
  category: localizedStringSchema.required(),
  items: Joi.array().items(itemSchema).min(1).required(),
});

export const updateSkillSchema = Joi.object({
  profileId: Joi.string().length(24),
  category: localizedStringSchema,
  items: Joi.array().items(itemSchema).min(1),
}).min(1);
