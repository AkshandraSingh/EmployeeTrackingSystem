const empTimeSheet = require('../../model/empTimeSheetSchema')
const leaveSchema = require('../../model/empLeaveSchema')
const adminLogger = require('../../utils/adminLogger')
const employeeSchema = require('../../model/empSchema')
const mailOptions = require('../../service/emailService');

module.exports = {
    empDashBoard: async (req, res) => {
        try {
            const today = new Date();
            const startOfDay = new Date(today);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(today);
            endOfDay.setHours(23, 59, 59, 999);
            const empData = await empTimeSheet.find({
                createdAt: {
                    $gte: startOfDay,
                    $lte: endOfDay,
                },
            })
                .populate({
                    path: "empId",
                    select: "empName",
                })
                .select("clockIn clockOut empId");
            adminLogger.log('info', "All employee data founded! .")
            res.status(200).send({
                success: true,
                message: "All employee data founded! .",
                empData: empData,
            });
        } catch (error) {
            adminLogger.log('error', "Error occurred .")
            res.status(500).json({
                success: false,
                message: `Error occurred: ${error.message}`,
            });
        }
    },

    showEmpLeaves: async (req, res) => {
        try {
            const leaveData = await leaveSchema.find().select('leaveType status message startDate endDate')
                .populate({
                    path: "empId",
                    select: "empName",
                })
            res.status(200).send({
                success: true,
                message: "Employee leave details .",
                data: leaveData
            })
        }
        catch (error) {
            adminLogger.log('error', "Error occurs .")
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    empLeavePermit: async (req, res) => {
        try {
            const leaveSheetId = req.params.id;
            const { status, message } = req.body;
            const leaveData = await leaveSchema.findById(leaveSheetId);
            if (leaveData.leaveType === "casual" || leaveData.leaveType === "sick") {
                const empData = await employeeSchema.findById(leaveData.empId);
                let subject = "";
                const empEmail = empData.empEmail;
                subject = status === "approve" ? "Leave approved" : "Leave rejected";
                await mailOptions(empEmail, subject, status, message);
                if (status === "approve") {
                    if (leaveData.leaveType === 'casual') {
                        leaveData.cusalLeaves = leaveData.cusalLeaves - 1
                        leaveData.save()
                    }
                    else {
                        leaveData.sickLeave = leaveData.sickLeave - 1
                        leaveData.save()
                    }
                    adminLogger.log('info', "Leave approved")
                    return res.status(200).json({
                        success: true,
                        message: "Leave approved."
                    });
                } else {
                    adminLogger.log('info', "Leave rejected")
                    res.status(200).json({
                        success: true,
                        message: "Leave rejected."
                    });
                }
            }
            leaveData.status = status;
            leaveData.message = message;
            await leaveData.save();
        } catch (error) {
            adminLogger.log('error', "error Occour")
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    searchEmployee: async (req, res) => {
        try {
            const { letter } = req.params;
            const empData = await employeeSchema.find({
                empRole: "employee",
                $or: [
                    { empName: { $regex: `${letter}`, $options: "i" } }, // ! Case-insensitive search
                    { empEmail: { $regex: `${letter}`, $options: "i" } },
                ],
            }).select("empName empEmail workingStatus");
            adminLogger.log('info', "Serched employees")
            res.status(200).json({
                success: true,
                message: "Searched employees",
                empData: empData,
            });
        } catch (error) {
            adminLogger.log('error', "error Occour")
            res.status(500).json({
                success: false,
                message: "Error!!",
                error: error
            });
        }
    }
}
