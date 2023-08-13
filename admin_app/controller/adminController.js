const empTimeSheet = require('../../model/empTimeSheetSchema')
const empNotificationSchema = require("../../model/empNotificationSchema");
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

    createNotification: async (req, res) => {
        const empId = req.params.id;
        const notificationData = new empNotificationSchema(req.body);
        try {
            notificationData.empId = empId;
            await notificationData.save();
            adminLogger.log('info', "Notification created .")
            res.status(201).json({
                success: true,
                message: "Notification created .",
                notification: notificationData,
            });
        } catch (error) {
            adminLogger.log('error', "Error occurs .")
            res.status(500).json({
                success: false,
                message: error.message,
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
                if (status === "approve") {
                    subject = "Leave approved"
                }
                else {
                    subject = "Leave rejected"
                }
                await mailOptions(empEmail, subject , status);
                if (req.body.status === "approve") {
                    leaveData.cusalLeaves = leaveData.cusalLeaves - 1;
                    adminLogger.log('info',"Leave approved")
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
            adminLogger.log('error',"error Occour")
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
