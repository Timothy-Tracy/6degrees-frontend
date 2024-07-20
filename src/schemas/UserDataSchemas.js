import joi from 'joi'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emailSchema = joi.string().pattern(emailRegex).messages({
    'string.pattern.base': 'Please enter a valid email address',
  })
  // other fields...

const nameSchema =
    joi.string()
        .trim()  // This removes leading and trailing whitespace
        .pattern(/^[A-Za-zÀ-ÿ''-]+(?:\s[A-Za-zÀ-ÿ''-]+)*$/)
        .min(2)
        .max(50)
        .messages({
            'string.pattern.base': 'First/Last name contains invalid characters',
            'string.min': 'First/Last name must be at least 2 characters long',
            'string.max': 'First/Last name must not exceed 50 characters',
            'string.empty': 'First/Last name cannot be empty'
        })
    ;

const usernameSchema = joi.string()
    .trim()
    .pattern(/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/)
    .min(3)
    .max(20)
    .messages({
        'string.pattern.base': 'username must start with a letter and can only contain letters, numbers, underscores, and hyphens',
        'string.min': 'username must be at least 3 characters long',
        'string.max': 'username cannot be longer than 20 characters',
        'any.required': 'username is required'
    });

const phoneSchema = joi.string()
    .replace(/[\(\)\s-]/g, '')  // Remove (, ), spaces, and -
    .pattern(/^\+?[0-9]{10,14}$/)  // Validate the cleaned number
    

const passwordSchema = joi.string()
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  .messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
  });

  export default {nameSchema, usernameSchema, phoneSchema, passwordSchema, emailSchema}