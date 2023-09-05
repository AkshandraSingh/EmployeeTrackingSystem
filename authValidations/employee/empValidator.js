const empSchema = require('./empValidationSchema') // ? Employee Schema

module.exports = {
    // ! Register Employee Validator (Base on Schema) ✌ .
    registerEmployee: async (req, res, next) => {
        const value = await empSchema.registerEmployee.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
    // ! Login Employee Validator (Employee Email and Employee Password) 😁 .
    loginEmpValidation: async (req, res, next) => {
        const value = await empSchema.loginEmployee.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
    // ! Reset Password Validator (New Password and Confirm Password ) 😀 .
    resetPasswordValidation: async (req, res, next) => {
        const value = await empSchema.resetPassword.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
    // ! Set New Password Validator (newPassword,confirmPassword and oldPassword) .
    setPasswordValidation: async (req, res, next) => {
        const value = await empSchema.setNewPassword.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
}
