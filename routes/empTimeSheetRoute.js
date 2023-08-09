const express = require('express')
const timeSheetController = require('../controller/empTimeSheetController')

const router = express.Router('express')

router.get('/clockIn/:id',timeSheetController.clockIn)
router.patch('/clockOut/:id', timeSheetController.employeeAttendance)
router.get('/empAttendance/:id', timeSheetController.empAttendance)

module.exports = router