const moment = require('moment');

const timeSheetSchema = require('../model/empTimeSheetSchema');
const timeSheetLogger = require('../utils/timeSheetLogger')
const ipService = require('../services/ipService')

module.exports = {
    clockIn: async (req, res) => {
        try {
            const empId = req.params.id;
            const empData = new timeSheetSchema();
            const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
            const empIp = await ipService.ipAddress();
            const attendanceTime = moment('10:15:00', 'HH:mm:ss');
            // ! Changeing Data .
            empData.empId = empId;
            empData.clockIn = currentTime;
            empData.clockinIP = empIp;
            empData.workingFrom = req.body.workingFrom;
            // ! Compare clockIn time with attendanceTime to determine if it's late .
            const empClockIn = moment(empData.clockIn, 'YYYY-MM-DD HH:mm:ss');
            if (empClockIn.isAfter(attendanceTime)) {
                empData.dayLate = "Late";
            }
            await empData.save(); 
            timeSheetLogger.log('info', "ClockIn successfully!");
            res.status(201).json({
                success: true,
                message: "ClockIn successfully!"
            });
        } catch (error) {
            timeSheetLogger.log('error', "Error!");
            res.status(500).json({
                success: false,
                message: "Error!",
                error: error.message
            });
        }
    },


    employeeAttendance: async (req, res) => {
        try {
            const timeSheetId = req.params.id;
            const clockOutTime = await timeSheetSchema.findByIdAndUpdate(
                timeSheetId,
                { clockOut: moment().format('YYYY-MM-DD HH:mm:ss') },
                { new: true }
            );
            const clockIn = moment(clockOutTime.clockIn, 'YYYY-MM-DD HH:mm:ss');
            const clockOut = moment(clockOutTime.clockOut, 'YYYY-MM-DD HH:mm:ss');
            const hoursWorked = clockOut.diff(clockIn, 'hours'); // ! Taking difference between clockIn and clockOut in hours .
            if (hoursWorked >= 8) {
                clockOutTime.status = "present";
            }
            else if (hoursWorked >= 5 && hoursWorked <= 8) {
                clockOutTime.status = "halfDay"
            }
            else {
                clockOutTime.status = "absent";
            }
            clockOutTime.hoursLoggedIn = hoursWorked
            timeSheetLogger.log('info', "Clock out successful")
            res.status(200).json({
                success: true,
                message: "Clock out successful",
                info: clockOutTime
            });
        } catch (error) {
            timeSheetLogger.log('error', "Error!");
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message
            });
        }
    },

    empAttendance: async (req, res) => {
        try {
            const dayPresent = 0;
            const employeeId = req.params.id;
            const dashBoardData = timeSheetSchema.findById(employeeId);
            console.log(dashBoardData)
            if (dashBoardData.status === "present") {
                dayPresent++
            }
            res.status(200).send({
                success: true,
                message: "Employee dash board .",
                dayPresent: dayPresent
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
