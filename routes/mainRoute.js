const  express = require('express');

let empRoute = require('../routes/employeeRoute')

let commanRouter = express.Router();

commanRouter.use('/employee', empRoute)

module.exports = commanRouter
