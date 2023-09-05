const express = require('express')

const timeSheetController = require('../../employee_app/controller/empTimeSheetController')

const router = express.Router()

router.get('/clockIn/:id', timeSheetController.clockIn)
router.patch('/clockOut/:id', timeSheetController.employeeAttendance)

module.exports = router
