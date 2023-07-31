const mongoose = require('mongoose')

const empLeaves = mongoose.Schema({
    cusalLeaves: {
        type: String,
        required: true
    },
    sickLeave: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

empLeaves.set('timestamps', true) 

module.exports = mongoose.model('notification',empLeaves)