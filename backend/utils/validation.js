const Joi = require('joi');

const validateSeller = (req, res, next) => {
  const schema = Joi.object({
    usernameOremail: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

const validateBuyerLogin = (req, res, next) => {
  const schema = Joi.object({
    usernameOremail: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

const orderItemSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const orderSchema = Joi.object({
  buyerId: Joi.string().required(),
  orderItems: Joi.array().required(),
  subtotal: Joi.number().required(),
  total: Joi.number().required(),
  orderStatus: Joi.string().required(),
});

const validateOrderItems = (orderItems) => {
  if (!Array.isArray(orderItems)) {
    throw new Error('orderItems must be an array');
  }

  const validationErrors = [];

  for (const item of orderItems) {
    const { error } = orderItemSchema.validate(item);

    if (error) {
      validationErrors.push({
        message: error.details[0].message,
        field: error.details[0].path[0],
      });
    }
  }

  return validationErrors;
};

const validateOrder = (req, res, next) => {
  const { error } = orderSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const validationErrors = validateOrderItems(req.body.orderItems);

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  next();
};

module.exports = { validateOrderItems, validateOrder, validateSeller, validateBuyerLogin };