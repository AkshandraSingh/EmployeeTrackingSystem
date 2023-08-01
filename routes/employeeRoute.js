const express = require('express')

const {
    singupEmployee,
    employeeLogin,
    empSendEmailForResetPassword,
    empResetPassword
} = require('../controller/empController')

const router = express.Router()

router.post('/create', singupEmployee)
router.post('/empLogin', employeeLogin)
router.post('/emailForReset', empSendEmailForResetPassword)
router.post('/empResetPassword/:id/:token', empResetPassword)

module.exports = router
