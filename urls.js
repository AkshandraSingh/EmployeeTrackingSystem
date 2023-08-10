const express = require('express');

let empRoute = require('./employee_app/routes/employeeRoute')
let timeSheetRoute = require('./employee_app/routes/empTimeSheetRoute')
let empLeaveRoute = require('./employee_app/routes/empLeaveRoute')
let adminRoute = require('./admin_app/routes/adminroute')

let commonRouter = express.Router();

commonRouter.use('/employee', empRoute)
commonRouter.use('/timeSheet', timeSheetRoute)
commonRouter.use('/empLeave', empLeaveRoute)
commonRouter.use('/admin', adminRoute)

module.exports = commonRouter