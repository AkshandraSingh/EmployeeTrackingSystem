const empLeaveSchema = require("../model/empLeaveSchema");
const empLeaveLogger = require('../utils/empLeaveLogger')

module.exports = {
    empLeave: async (req, res) => {
        const empId = req.params.id;
        const leaveData = new empLeaveSchema(req.body);
        try {
            leaveData.empId = empId;
            await leaveData.save();
            if (leaveData.leaveType === "casual") {
                empLeaveLogger.log('info',"Applied for casual leave")
                res.status(201).json({
                    success: true,
                    message: "Applied for casual leave",
                    leaveInfo: leaveData,
                });
            } else if (leaveData.leaveType === "sick") {
                empLeaveLogger.log('info', "Applied for sick leave")
                res.status(201).json({
                    success: true,
                    message: "Applied for sick leave",
                    leaveInfo: leaveData,
                });
            } else {
                empLeaveLogger.log('info', "Applied for other leave")
                res.status(201).json({
                    success: true,
                    message: "Applied for other leave",
                    leaveInfo: leaveData,
                });
            }
        } catch (error) {
            empLeaveLogger.log('error',"Error Occor")
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message,
            });
        }
    },
};