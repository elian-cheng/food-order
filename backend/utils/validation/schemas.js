const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const { MIN_PASSWORD_LENGTH } = require("../../common/config");

const schemas = {
  id: Joi.object({ id: Joi.objectId() }),
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      email: Joi.string().email({ tlds: { allow: false } }),
      password: Joi.string().min(MIN_PASSWORD_LENGTH)
    }),

  orders: Joi.object()
    .options({ abortEarly: false, allowUnknown: false })
    .keys({
      shop: Joi.string(),
      userId: Joi.string(),
      userData: Joi.object({
        name: Joi.string(),
        phone: Joi.string(),
        address: Joi.string()
      }),
      products: Joi.array().min(1),
      totalAmount: Joi.number().min(1),
      date: Joi.string()
    })
};

module.exports = schemas;

