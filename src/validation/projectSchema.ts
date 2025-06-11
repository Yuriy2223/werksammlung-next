import Joi from "joi";

const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

const localizedStringSchema = Joi.object({
  en: Joi.string().required(),
  de: Joi.string().required(),
  ua: Joi.string().required(),
});

export const projectSchema = Joi.object({
  imgUrl: Joi.string().uri().required(),
  title: localizedStringSchema.required(),
  description: localizedStringSchema.required(),
  role: localizedStringSchema.required(),
  technologies: Joi.array().items(Joi.string()).min(1).required(),
  codeUrl: Joi.string().uri().allow(null),
  webUrl: Joi.string().uri().allow(null),
  date: Joi.string()
    .pattern(dateRegex)
    .message('"date" must be in format DD-MM-YYYY')
    .required(),
  profileId: Joi.string().length(24).required(),
});

export const updateProjectSchema = Joi.object({
  imgUrl: Joi.string().uri().optional(),
  title: localizedStringSchema.optional(),
  description: localizedStringSchema.optional(),
  role: localizedStringSchema.optional(),
  technologies: Joi.array().items(Joi.string()).optional(),
  codeUrl: Joi.string().uri().allow(null).optional(),
  webUrl: Joi.string().uri().allow(null).optional(),
  date: Joi.string()
    .pattern(dateRegex)
    .message('"date" must be in format DD-MM-YYYY')
    .optional(),
  profileId: Joi.string().length(24).required(),
});
