const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    empName: {
        type: String,
        requied: true
    },
    empEmail: {
        type: String,
        requied: true
    },
    empPhone: {
        type: String,
        requied: true
    },
    empPassword: {
        type: String,
        requied: true
    },
    empCity: {
        type: String,
        requied: true
    },
    empRole: {
        type: String,
        requied: true
    },
    empTechnology: {
        type: String,
        requied: true
    },
    empProfile: {
        type: String,
        requied: true
    },
    empState: {
        type: String,
        requied: true
    },
    empGender: {
        type: String,
        requied: true
    },
    workingStatus: {
        type: String,
        requied: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

empSchema.set('timestamps', true) 

module.exports = mongoose.model('employee',empSchema)