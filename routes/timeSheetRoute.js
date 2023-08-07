const express = require('express')
const timeSheetController = require('../controller/timeSheetController')

const router = express.Router('express')

router.get('/clockIn/:id',timeSheetController.clockIn)
router.get('/clockOut/:id', timeSheetController.clockOut)

module.exports = router