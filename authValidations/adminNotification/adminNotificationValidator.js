const empNotification = require('./adminNotificationVal');

module.exports = {
    createNotification: async (req, res, next) => {
        const value = await empNotification.registerNotification.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    }
}
