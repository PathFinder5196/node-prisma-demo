import Joi from "joi"

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const signupSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  dob: Joi.date().less(tomorrow).required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().email().required()
});

export const activateAccountSchema = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.number().required()
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
});

export const signinSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});


