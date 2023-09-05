const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const empSchema = {
    registerEmployee: joi.object({
        empName: joi
            .string()
            .max(20)
            .min(3)
            .message({
                "string.min": "{#label} should be at least {#limit} characters",
                "string.max": "{#label} should be at most {#limit} characters",
            })
            .required(),
        empEmail: joi
            .string()
            .email()
            .min(11)
            .message({
                "string.min": "{#label} should be at least {#limit} characters",
                "string.email": "{#label} should be a valid email address",
            })
            .required(),
        empPassword: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(3)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .onlyLatinCharacters()
            .messages({
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces',
                'password.onlyLatinCharacters': '{#label} should contain only Latin characters',
            })
            .required(),
        empPhone: joi
            .number()
            .integer()
            .min(1000000000)
            .max(9999999999)
            .message({
                "number.min": "{#label} should be at least {#limit}",
                "number.max": "{#label} should be at most {#limit}",
            })
            .required(),
        empCity: joi
            .string()
            .required(),
        empState: joi
            .string()
            .required(),
        empRole: joi
            .string()
            .required(),
        empTechnology: joi
            .string()
            .required(),
    }).unknown(true),

    loginEmployee: joi.object({
        empEmail: joi
            .string()
            .email()
            .required(),
        empPassword: joi
            .string()
    }).unknown(true),

    resetPassword: joi.object({
        newPassword: joiPassword
            .string()
            .required(),
        confirmPassword: joiPassword
            .string()
            .required(),
    }),
    setNewPassword: joi.object({
        oldPassword: joiPassword
            .string()
            .required(),
        newPassword: joiPassword
            .string()
            .required(),
        confirmPassword: joiPassword
            .string()
            .required(),
    }),
}

module.exports = empSchema;
