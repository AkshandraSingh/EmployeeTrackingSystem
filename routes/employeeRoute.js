const express = require('express')

const { singupEmployee, logIn, empSendEmailForResetPassword, empResetPassword, editProfile } = require('../controller/empController')
const { registerEmployee, loginEmpValidation, resetPasswordValidation } = require('../validations/employee/empValidator')
const authService = require('../middleware/authService')
const { upload } = require('../middleware/empImageStroge')

const router = express.Router()

router.post('/create', registerEmployee , singupEmployee)
router.post('/empLogin', authService.isEmployee, loginEmpValidation, logIn)
router.post('/emailForReset', empSendEmailForResetPassword)
router.patch('/empResetPassword/:id/:token', resetPasswordValidation ,empResetPassword)
router.patch('/editProfile/:id', upload.single("empProfile"), editProfile)

module.exports = router
