const express = require('express')

const { singupEmployee, logIn, empSendEmailForResetPassword, empResetPassword, editProfile, setNewPassword } = require('../controller/empController')
const authValidation = require('../../authValidations/employee/empValidator')
const authService = require('../../middleware/authService')
const { upload } = require('../../middleware/empImageStroge')

const router = express.Router()

router.post('/create', authValidation.registerEmployee, singupEmployee)
router.post('/empLogin', authService.isEmployee, authValidation.loginEmpValidation, logIn)
router.post('/emailForReset', empSendEmailForResetPassword)
router.patch('/empResetPassword/:id/:token', authValidation.resetPasswordValidation, empResetPassword)
router.patch('/setNewPassword/:id', authValidation.setPasswordValidation, setNewPassword)
router.patch('/editProfile/:id', upload.single("empProfile"), editProfile)

module.exports = router
