// import Joi from "joi";

// export const registerSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

// export const loginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });

// export const requestPasswordResetSchema = Joi.object({
//   email: Joi.string().email().required(),
// });

// export const resetPasswordSchema = Joi.object({
//   token: Joi.string().required(),
//   password: Joi.string().required(),
// });

import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

export const requestPasswordResetSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email",
  }),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Token is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});
