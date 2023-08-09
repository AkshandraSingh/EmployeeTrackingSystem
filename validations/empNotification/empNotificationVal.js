const Joi = require('joi');

const empNotificationSchema = {
    registerNotification: Joi.object({
        title: Joi.string()
            .max(12)
            .min(3)
            .message({
                'string.min': '{#label} should be at least {#limit} characters',
                'string.max': '{#label} should not exceed {#limit} characters',
            })
            .required(),
        message: Joi.string()
            .max(50)
            .min(5)
            .message({
                'string.min': '{#label} should be at least {#limit} characters',
                'string.max': '{#label} should not exceed {#limit} characters',
            })
            .required(),
    }).unknown(true),
};

module.exports = empNotificationSchema;

