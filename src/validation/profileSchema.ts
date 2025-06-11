import Joi from "joi";

const objectId = Joi.string().length(24);

const localizedStringSchema = Joi.object({
  en: Joi.string().required(),
  de: Joi.string().required(),
  ua: Joi.string().required(),
});

const uploadSchema = Joi.object({
  data: Joi.string().base64().required(),
  contentType: Joi.string().required(),
  filename: Joi.string().required(),
});

export const profileSchema = Joi.object({
  email: Joi.string().email().required(),

  firstName: localizedStringSchema.required(),
  lastName: localizedStringSchema.required(),
  about: localizedStringSchema.required(),

  gitHub: Joi.string().uri().allow(null, ""),
  linkedin: Joi.string().uri().allow(null, ""),
  telegram: Joi.string().uri().allow(null, ""),

  avatarUrl: uploadSchema.optional(),
  viewCV: uploadSchema.optional(),

  skills: Joi.array().items(objectId).default([]),
  projects: Joi.array().items(objectId).default([]),
});
