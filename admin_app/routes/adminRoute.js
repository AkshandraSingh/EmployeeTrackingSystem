const express = require('express')

const admin = require('../controller/adminController')
const authService = require('../../middleware/authService')
const authToken = require('../../middleware/authToken')
const { logIn } = require('../../employee_app/controller/empController')
const validator = require('../../authValidations/employee/empValidator')
const adminNotiValidator = require('../../authValidations/adminNotification/adminNotificationValidator')

const router = express.Router();

router.post('/adminLogin', validator.loginEmpValidation ,authService.isAdmin,logIn)
router.get('/empDashBoard',admin.empDashBoard)
router.post('/createNotification/:id', adminNotiValidator.createNotification, admin.createNotification)
router.get('/showEmpLeaves/:id',admin.showEmpLeaves)
router.post('/empLeavePermit/:id', admin.empLeavePermit)

module.exports = router
