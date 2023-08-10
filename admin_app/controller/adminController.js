const empTimeSheet = require('../../model/empTimeSheetSchema')
const empNotificationSchema = require("../../model/empNotificationSchema");

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
            res.status(200).send({
                success: true,
                message: "All data founded!",
                empData: empData,
            });
        } catch (error) {
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
            res.status(201).json({
                success: true,
                message: "Notification created .",
                notification: notificationData,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
}
