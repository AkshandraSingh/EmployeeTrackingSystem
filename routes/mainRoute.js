const express = require('express');

let empRoute = require('../routes/employeeRoute')
let timeSheetRoute = require('./timeSheetRoute')

let commanRouter = express.Router();

commanRouter.use('/employee', empRoute)
commanRouter.use('/timeSheet', timeSheetRoute)

module.exports = commanRouter
