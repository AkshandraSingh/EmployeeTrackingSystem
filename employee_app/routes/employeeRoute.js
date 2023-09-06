const express = require('express')

const employee = require('../controller/empController')
const authValidation = require('../../authValidations/employee/empValidator')
const authService = require('../../middleware/authService')
const { upload } = require('../../middleware/empImageStorage')
const { authentication } = require('../../middleware/authToken')

const router = express.Router()

router.post('/create', authValidation.registerEmployee, employee.signupEmployee)
router.post('/empLogin', authService.isEmployee, authValidation.loginEmpValidation, employee.logIn)
router.post('/emailForReset', employee.emailForgetPassword)
router.patch('/empResetPassword/:id/:token', authValidation.resetPasswordValidation, employee.resetPassword)
router.patch('/setNewPassword/:id', authentication, authValidation.setPasswordValidation, employee.setNewPassword)
router.patch('/editProfile/:id', authentication, upload.single("empProfile"), employee.editProfile)
router.get('/showNotification', authentication, employee.showNotification)

module.exports = router
