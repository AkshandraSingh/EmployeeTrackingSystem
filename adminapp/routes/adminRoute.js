const express = require('express')

const admin = require('../controller/adminController')
const authService = require('../middleware/authService')
const authToken = require('../middleware/authToken')
const { logIn } = require('../../controller/empController')
const validator = require('../../validations/employee/empValidator')

const router = express.Router();

router.post('/adminLogin', validator.loginEmpValidation ,authService.isAdmin,logIn)
router.get('/empDashBoard',authToken.adminAuthetication,admin.empDashBoard)

module.exports = router
