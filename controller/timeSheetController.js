const moment = require('moment');

const timeSheetSchema = require('../model/empTimeSheetSchema');
const timeSheetLogger = require('../utils/timeSheetLogger')
const ipService = require('../services/ipService')

module.exports = {
    clockIn: async (req, res) => {
        try {
            const empId = req.params.id
            const empData = timeSheetSchema(req.body);
            const currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            const empIp = await ipService.addIp()
            empData.clockIn = currentTime;
            empData.empId = empId
            empData.clockinIP = empIp
            empData.save()
            timeSheetLogger.info('info',"ClockIn successfully!")
            res.status(201).send({
                success: true,
                message: "ClockIn successfully!"
            })
        }
        catch (error) {
            timeSheetLogger.info('error',"Error!")
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    },

    clockOut: async (req,res) => {
        try {
            const empId = req.params.id
            const empData = timeSheetSchema(req.body);
            const currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            const empIp = await ipService.addIp()
            empData.clockOut = currentTime;
            empData.empId = empId
            empData.clockinIP = empIp
            empData.save()
            timeSheetLogger.info('info', "ClockOut successfully!")
            res.status(201).send({
                success: true,
                message: "ClockOut successfully!"
            })
        }
        catch {
            timeSheetLogger.info('error', "Error!")
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            })
        }
    }
}
