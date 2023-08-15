const express = require('express');

let empRoute = require('./employee_app/routes/employeeRoute')
let timeSheetRoute = require('./employee_app/routes/empTimeSheetRoute')
let empLeaveRoute = require('./employee_app/routes/empLeaveRoute')
let adminRoute = require('./admin_app/routes/adminRoute')
let benchRoute = require('./admin_app/routes/benchRoute')
let notifiRoute = require('./admin_app/routes/notificationRoute')

let commonRouter = express.Router();

commonRouter.use('/employee', empRoute);
commonRouter.use('/timeSheet', timeSheetRoute);
commonRouter.use('/empLeave', empLeaveRoute);
commonRouter.use('/admin', adminRoute);
commonRouter.use('/bench', benchRoute);
commonRouter.use('/notification', notifiRoute);

module.exports = commonRouter
