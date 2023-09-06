const express = require('express')

const admin = require('../controller/adminController')
const authService = require('../../middleware/authService')
const { authentication } = require('../../middleware/authToken')
const { logIn } = require('../../employee_app/controller/empController')
const validator = require('../../authValidations/employee/empValidator')

const router = express.Router();

router.post('/adminLogin', authentication, validator.loginEmpValidation, authService.isAdmin, logIn)
router.get('/empDashBoard', authentication, admin.empDashBoard)
router.get('/showEmpLeaves/:id', authentication, admin.showEmpLeaves)
router.patch('/empLeavePermit/:id', authentication, admin.empLeavePermit)

module.exports = router
