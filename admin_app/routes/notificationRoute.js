const express = require('express')

const notification = require('../controller/notificationController')
const notificationValidator = require('../../authValidations/notification/notificationValidator')
const { authentication } = require('../../middleware/authToken')

const router = express.Router();

router.post('/createNotification/:id', authentication, notificationValidator.createNotification, notification.createNotification)
router.patch('/updateNotification/:id', authentication, notification.updateNotification)
router.delete('/deleteNotification/:id', authentication, notification.deleteNotification)

module.exports = router
