const empNotificationSchema = require("../model/empNotificationSchema");
const empNotificationLogger = require('../utils/empNotificationLogger')

module.exports = {
    createNotification: async (req, res) => {
        const empId = req.params.id;
        const notificationData = new empNotificationSchema(req.body);
        try {
            empNotificationLogger.log('info',"Notification created .")
            notificationData.empId = empId;
            await notificationData.save();
            res.status(201).json({
                success: true,
                message: "Notification created .",
                notification: notificationData,
            });
        } catch (error) {
            empNotificationLogger.log('error',"Error Occor")
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
