const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().pattern(/^[6-9]\d{9}$/).optional().messages({
    'string.pattern.base': 'Phone number must be 10 digits starting with 6-9'
  })
});

const subscriptionSchema = Joi.object({
  plan_name: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive', 'cancelled').default('active'),
  price: Joi.number().positive().required(),
  end_date: Joi.date().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { userSchema, subscriptionSchema, loginSchema };