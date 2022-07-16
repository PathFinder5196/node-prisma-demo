import Joi from "joi"

export const userPrefereneSchema = Joi.object({
    preferenceId: Joi.number().required(),
});


