const express = require('express')

const admin = require('../controller/adminController')
const authService = require('../../middleware/authService')
const authToken = require('../../middleware/authToken')
const { logIn } = require('../../employee_app/controller/empController')
const validator = require('../../authValidations/employee/empValidator')

const router = express.Router();

router.post('/adminLogin', validator.loginEmpValidation ,authService.isAdmin,logIn)
router.get('/empDashBoard',admin.empDashBoard)
router.get('/showEmpLeaves/:id',admin.showEmpLeaves)
router.patch('/empLeavePermit/:id', admin.empLeavePermit)

module.exports = router
