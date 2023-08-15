const express = require('express')

const notification = require('../controller/notificationController')
const notificationValidator = require('../../authValidations/notification/notificationValidator')

const router = express.Router();

router.post('/createNotification/:id', notificationValidator.createNotification ,notification.createNotification)
router.patch('/updateNotification/:id', notification.updateNotification)
router.delete('/deleteNotification/:id', notification.deleteNotification)

module.exports = router
