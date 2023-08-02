const empSchema = require('./empValidationSchema')

module.exports = {
    registerEmployee: async (req, res, next) => {
        const value = await empSchema.registerEmployee.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
    
    loginEmpValidation: async (req, res, next) => {
        const value = await empSchema.loginEmployee.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },

    resetPasswordValidation: async (req, res, next) => {
        const value = await empSchema.resetPassword.validate(req.body, { abortEarly: false })
        if (value.error && value2.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
}
