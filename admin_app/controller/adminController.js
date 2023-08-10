const empTimeSheet = require('../../model/empTimeSheetSchema')
const empNotificationSchema = require("../../model/empNotificationSchema");
const adminLogger = require('../../utils/adminLogger')

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
            adminLogger.log('info',"All employee data founded! .")
            res.status(200).send({
                success: true,
                message: "All employee data founded! .",
                empData: empData,
            });
        } catch (error) {
            adminLogger.log('error',"Error occurred .")
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
            adminLogger.log('info',"Notification created .")
            res.status(201).json({
                success: true,
                message: "Notification created .",
                notification: notificationData,
            });
        } catch (error) {
            adminLogger.log('error',"Error occurs .")
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
}
