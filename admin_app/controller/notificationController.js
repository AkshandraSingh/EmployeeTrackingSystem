const empNotificationSchema = require('../../model/empNotificationSchema')
const notificationLogger = require('../../utils/notificationLogger')

module.exports = {
    createNotification: async (req, res) => {
        const empId = req.params.id;
        const notificationData = new empNotificationSchema(req.body);
        try {
            notificationData.empId = empId;
            await notificationData.save();
            notificationLogger.log('info',"Notification created .")
            res.status(201).json({
                success: true,
                message: "Notification created .",
                notification: notificationData,
            });
        } catch (error) {
            notificationLogger.log('error',"Error!")
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    updateNotification: async (req, res) => {
        const notificationId = req.params.id;
        const notificationData = await empNotificationSchema.findByIdAndUpdate(notificationId,req.body,{new:true})
        try {
            notificationLogger.log('info',"Notification updated .")
            res.status(201).json({
                success: true,
                message: "Notification updated .",
                notification: notificationData,
            });
        } catch (error) {
            notificationLogger.log('error', "Error!")
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    deleteNotification: async (req, res) => {
        const notificationId = req.params.id;
        const notificationData = await empNotificationSchema.findByIdAndDelete(notificationId,{new:true});
        try {
            notificationLogger.log('info',"Notification deleted")
            res.status(200).json({
                success: true,
                message: "Notification deleted",
                notification: notificationData,
            });
        } catch (error) {
            notificationLogger.log('error', "Error!")
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
}
