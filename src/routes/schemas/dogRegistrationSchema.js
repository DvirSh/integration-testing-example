const { Joi } = require('celebrate');

module.exports = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    employeeId: Joi.string().required()
  })
};
