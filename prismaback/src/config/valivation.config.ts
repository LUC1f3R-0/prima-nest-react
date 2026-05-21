import Joi from 'joi';

const validationSchema = Joi.object({
  PORT: Joi.number().port().default(3000),

  HOST: Joi.string(),
  DB_PORT: Joi.number().port().default(5432),
  DB_USERNAME: Joi.string().trim().required(),
  DB_PASSWORD: Joi.string().trim().required(),
  DB_NAME: Joi.string().trim().required(),
  DB_SSL: Joi.boolean().truthy('true').falsy('false').default(true),
  DB_LOGG: Joi.boolean().truthy('true').falsy('false').default(false),
});

export default validationSchema;
