const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(5).max(16).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/, { name: "numbers" })
    .required(),
  favorite: Joi.boolean(),
});
const putSchema = Joi.object({
  name: Joi.string().alphanum().min(5).max(16),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }),
  favorite: Joi.boolean(),
});
const changeFavSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const getRequestValidate = Joi.object({
  page: Joi.string().pattern(/[0-9]/, { name: "numbers" }).min(1),
  limit: Joi.string().pattern(/[0-9]/, { name: "numbers" }).min(1),
  favorite: Joi.boolean(),
});

module.exports = { postSchema, putSchema, changeFavSchema, getRequestValidate };
