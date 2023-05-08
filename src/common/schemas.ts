import joi from "joi";

export const loginSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email")
    .messages({
      "string.empty": "The email shouldn`t be empty",
    }),
  password: joi
    .string()
    .min(6)
    .message("The password should be more than 6 symbols")
    .max(20)
    .message("The password should be less than 20 symbols")
    .required(),
});

export const registerSchema = joi.object({
  firstName: joi
    .string()
    .min(3)
    .message("The first name should be more than 3 symbols")
    .max(30)
    .message("The first name should be less than 30 symbols")
    .required()
    .messages({
      "string.empty": "The first name shouldn`t be empty",
    }),
  lastName: joi
    .string()
    .min(5)
    .message("The Last Name name should be more than 5 symbols")
    .max(30)
    .message("The Last Name name should be less than 30 symbols")
    .required()
    .messages({
      "string.empty": "The first name shouldn`t be empty",
    }),
  age: joi
    .number()
    .integer()
    .message("The age must be integer")
    .positive()
    .message("The age must be positive number")
    .min(0)
    .message("The age should be more than 0")
    .max(100)
    .message("The age should be less than 100")
    .required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email")
    .messages({
      "string.empty": "The email shouldn`t be empty",
    }),
  password: joi
    .string()
    .min(6)
    .message("The password should be more than 6 symbols")
    .max(20)
    .message("The password should be less than 20 symbols")
    .required(),
});

export const addTripSchema = joi.object({
  to: joi
    .string()
    .min(4)
    .message("The Begin Point should be more than 4 symbols")
    .max(20)
    .message("The Begin Point should be less than 20 symbols")
    .required(),
  from: joi
    .string()
    .min(4)
    .message("The From Point should be more than 4 symbols")
    .max(20)
    .message("The From Point should be less than 20 symbols")
    .required(),
  countOfPassengers: joi
    .number()
    .integer()
    .message("The count of passengers must be integer")
    .positive()
    .message("The count of passengers must be positive number")
    .min(1)
    .message("The count of passengers should be more than or equal 1")
    .required(),
  tripID: joi
    .string()
    .required()
    .min(5)
    .message("The trip ID should be more than 5 symbols"),
});
