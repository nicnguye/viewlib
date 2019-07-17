const Joi = require('Joi')

const nameRegex = /^[a-zA-Z\s]+$/

const validate = (schema) => {
  return function (req, res, next) {
    const result = Joi.validate(req.body, schema)
    if (result.error) {
      return res.status(400).json( { error: result.error } )
    }
    else
      return next()
  }
}
module.exports.validate = validate;

const Schema = {
  create: Joi.object().keys({
    name: Joi.string().regex(nameRegex).min(3).max(30).required(),
    position: Joi.string().regex(nameRegex).min(2).max(30).required(),
    number: Joi.number().min(1).max(99).required()
  }),
  update: Joi.object().keys({
    name: Joi.string().regex(nameRegex).min(3).max(30).required(),
    position: Joi.string().regex(nameRegex).min(2).max(30).required(),
    number: Joi.number().min(1).max(99).required()
  }),
  delete: Joi.object().keys({}),
  getAll: Joi.object().keys({}),
  getOne: Joi.object().keys({}),
};
module.exports.Schema = Schema