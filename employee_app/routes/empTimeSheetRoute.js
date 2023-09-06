const express = require('express')

const timeSheetController = require('../../employee_app/controller/empTimeSheetController')
const { authentication } = require('../../middleware/authToken')

const router = express.Router()

router.get('/clockIn/:id', authentication, timeSheetController.clockIn)
router.patch('/clockOut/:id', authentication, timeSheetController.employeeAttendance)

module.exports = router
