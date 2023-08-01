const express = require('express')

const {singupEmployee,employeeLogin,empSendEmailForResetPassword,empResetPassword} = require('../controller/empController') 
const { registerEmployee, loginEmpValidation, resetPasswordValidation } = require('../validations/employee/empValidator')

const router = express.Router()

router.post('/create', registerEmployee , singupEmployee)
router.post('/empLogin', loginEmpValidation ,employeeLogin)
router.post('/emailForReset', resetPasswordValidation , empSendEmailForResetPassword)
router.post('/empResetPassword/:id/:token', empResetPassword)

module.exports = router
