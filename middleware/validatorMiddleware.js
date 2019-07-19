const Joi = require('Joi')

/* Only letters and space */
const nameRegex = /^[a-zA-Z\s]+$/

/* Check body object */
const validateBody = (schema) => {
  return function (req, res, next) {
    const result = Joi.validate(req.body, schema, {abortEarly: false})
    if (result.error) {
      return res.status(400).json( result.error )
    }
    else
      return next()
  }
}
module.exports.validateBody = validateBody;

/* Check params object */
const validateParams = (schema) => {
  return function (req, res, next) {
    const result = Joi.validate(req.params, schema, {abortEarly: false})
    if (result.error) {
      return res.status(400).json( result.error )
    }
    else
      return next()
  }
}
module.exports.validateParams = validateParams;

/* Schema for each API request */
const Schema = {
  create: Joi.object().keys({
    name: Joi.string().regex(nameRegex).min(3).max(30).required(),
    position: Joi.string().regex(nameRegex).min(2).max(30).required(),
    number: Joi.number().min(1).max(99).required()
  }),
  updateBody: Joi.object().keys({
    name: Joi.string().regex(nameRegex).min(3).max(30).required(),
    position: Joi.string().regex(nameRegex).min(2).max(30).required(),
    number: Joi.number().min(1).max(99).required()
  }),
  updateParams: Joi.object().keys({
    uuid: Joi.string()
  }),
  delete: Joi.object().keys({
    uuid: Joi.string()
  }),
  getAll: Joi.object().keys({}),
  getOne: Joi.object().keys({
    uuid: Joi.string()
  }),
  register: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(4).max(30).required(),
    mail: Joi.string().email({ minDomainSegments: 2 })
  }),
  login: Joi.object().keys({
    mail: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().min(4).max(30).required(),
  }),
};
module.exports.Schema = Schema