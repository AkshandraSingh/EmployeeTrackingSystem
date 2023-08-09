const express = require('express')

const empNotification = require('../controller/empNotificationController')
const empValidator = require('../validations/empNotification/empNotificationValidator')

const router = express.Router('express')

router.post('/createNotification/:id',empValidator.createNotification,empNotification.createNotification)

module.exports = router
