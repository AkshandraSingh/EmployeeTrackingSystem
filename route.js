const express = require('express');

let empRoute = require('./routes/employeeRoute')
let timeSheetRoute = require('./routes/empTimeSheetRoute')
let empLeaveRoute = require('./routes/empLeaveRoute')
let empNotificationRoute = require('./routes/empNotificationRoute')
let adminRoute = require('./adminapp/routes/adminroute')

let commanRouter = express.Router();

commanRouter.use('/employee', empRoute)
commanRouter.use('/timeSheet', timeSheetRoute)
commanRouter.use('/empLeave', empLeaveRoute)
commanRouter.use('/empNotification', empNotificationRoute)
commanRouter.use('/admin', adminRoute)

module.exports = commanRouter
