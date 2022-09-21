const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')

const Joi = BaseJoi.extend(Extension)

const filter = {
  validation: Joi.object().keys({
    name: Joi.string()
      .optional(),
  }),
  error: 'instance_snake_case_filter_invalid',
}

const create = {
  validation: Joi.object().keys({
    name: Joi.string()
      .required(),
  }),
  error: 'instance_snake_case_create_invalid',
}

const update = {
  validation: Joi.object().keys({
    name: Joi.string()
      .required(),
  }),
  error: 'instance_snake_case_update_invalid',
}

module.exports = {
  create,
  update,
  filter,
}
