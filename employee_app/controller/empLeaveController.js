const empLeaveSchema = require("../../model/empLeaveSchema");
const empLeaveLogger = require('../../utils/empLeaveLogger')

module.exports = {
    empLeave: async (req, res) => {
        const empId = req.params.id;
        const {startDate, endDate} = req.body
        const leaveData = new empLeaveSchema(req.body);
        try {
            leaveData.empId = empId;
            if (leaveData.leaveType === "casual") {
                if (leaveData.cusalLeaves > 0) {
                    await leaveData.save();
                    empLeaveLogger.log('info', "Applied for casual leave")
                    res.status(201).json({
                        success: true,
                        message: "Applied for casual leave",
                        leaveInfo: leaveData,
                    });
                }
                return res.status(401).send({
                    success: false,
                    message: "Your casual leaves are over , you can't apply"
                })
            } else if (leaveData.leaveType === "sick") {
                if (leaveData.sickLeave > 0) {
                    await leaveData.save();
                    empLeaveLogger.log('info', "Applied for sick leave")
                    res.status(201).json({
                        success: true,
                        message: "Applied for sick leave",
                        leaveInfo: leaveData,
                    });
                }
                return res.status(401).send({
                    success: false,
                    message: "Your sick leaves are over , you can't apply"
                })
            } else {
                await leaveData.save();
                empLeaveLogger.log('info', "Applied for other leave")
                res.status(201).json({
                    success: true,
                    message: "Applied for other leave",
                    leaveInfo: leaveData,
                });
            }
            leaveData.startDate = startDate;
            leaveData.endDate = endDate;
        } catch (error) {
            empLeaveLogger.log('error', "Error Occor")
            res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message,
            });
        }
    },
};
