const express = require('express');

let empRoute = require('../routes/employeeRoute')
let timeSheetRoute = require('./empTimeSheetRoute')
let empLeaveRoute = require('./empLeaveRoute')
let empNotificationRoute = require('./empNotificationRoute')

let commanRouter = express.Router();

commanRouter.use('/employee', empRoute)
commanRouter.use('/timeSheet', timeSheetRoute)
commanRouter.use('/empLeave', empLeaveRoute)
commanRouter.use('/empNotification', empNotificationRoute)

module.exports = commanRouter
