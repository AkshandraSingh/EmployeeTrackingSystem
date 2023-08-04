const express = require('express')

const { singupEmployee, empLogIn,empSendEmailForResetPassword,empResetPassword} = require('../controller/empController')  // ? Importing all API .
const { registerEmployee, loginEmpValidation, resetPasswordValidation } = require('../validations/employee/empValidator') // ? Importing all Vatidatiors.

const router = express.Router()

// ! Sinup Employee API .
router.post('/create', registerEmployee , singupEmployee)
// ! Login Employee API .
router.post('/empLogin', loginEmpValidation, empLogIn)
// ! Sending Email For Rest Password API .
router.post('/emailForReset', empSendEmailForResetPassword)
// ! Reset Password For Employee API .
router.post('/empResetPassword/:id/:token', resetPasswordValidation ,empResetPassword)

module.exports = router
