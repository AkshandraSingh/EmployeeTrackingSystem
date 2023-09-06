const express = require('express')

const empLeaveController = require('../controller/empLeaveController')
const { authentication } = require('../../middleware/authToken')

const router = express.Router('express')

router.post('/empLeave/:id', authentication, empLeaveController.empLeave)

module.exports = router
