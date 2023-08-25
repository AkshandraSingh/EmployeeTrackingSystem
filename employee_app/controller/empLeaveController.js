const empLeaveSchema = require("../../model/empLeaveSchema");
const empLeaveLogger = require('../../utils/empLeaveLogger')

module.exports = {
    empLeave: async (req, res) => {
        const empId = req.params.id;
        const { startDate, endDate } = req.body;

        try {
            const leaveData = new empLeaveSchema(req.body);
            leaveData.empId = empId;
            leaveData.startDate = startDate;
            leaveData.endDate = endDate;

            if (leaveData.leaveType === "casual") {
                if (leaveData.casualLeaves > 0) {
                    await leaveData.save();
                    empLeaveLogger.log('info', "Applied for casual leave");
                    return res.status(201).json({
                        success: true,
                        message: "Applied for casual leave",
                        leaveInfo: leaveData,
                    });
                }
                return res.status(401).send({
                    success: false,
                    message: "Your casual leaves are over, you can't apply"
                });
            } else if (leaveData.leaveType === "sick") {
                if (leaveData.sickLeave > 0) {
                    await leaveData.save();
                    empLeaveLogger.log('info', "Applied for sick leave");
                    return res.status(201).json({
                        success: true,
                        message: "Applied for sick leave",
                        leaveInfo: leaveData,
                    });
                }
                return res.status(401).send({
                    success: false,
                    message: "Your sick leaves are over, you can't apply"
                });
            } else {
                await leaveData.save();
                empLeaveLogger.log('info', "Applied for other leave");
                return res.status(201).json({
                    success: true,
                    message: "Applied for other leave",
                    leaveInfo: leaveData,
                });
            }
        } catch (error) {
            empLeaveLogger.log('error', "Error!");
            return res.status(500).send({
                success: false,
                message: "Error!",
                error: error.message,
            });
        }
    }
};
