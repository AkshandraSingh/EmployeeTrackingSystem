const mongoose = require('mongoose')

const empNotificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    empId: {
        type: mongoose.Types.ObjectId,
        ref: 'employee',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

empNotificationSchema.set('timestamps', true) 

module.exports = mongoose.model('notification',empNotificationSchema)
