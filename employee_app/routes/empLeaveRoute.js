const express = require('express')

const empLeaveController = require('../controller/empLeaveController')

const router = express.Router('express')

router.post('/empLeave/:id',empLeaveController.empLeave)

module.exports = router
