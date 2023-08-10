const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    empName: {
        type: String,
        requied: true
    },
    empEmail: {
        type: String,
        requied: true,
        unique: true,
    },
    empPhone: {
        type: Number,
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
    empAddress: {
        type: String,
        default: "",
    },
    empRole: {
        type: String,
        default: "employee"
    },
    empTechnology: {
        type: String,
        requied: true
    },
    empProfile: {
        type: String,
    },
    empState: {
        type: String,
        requied: true
    },
    empGender: {
        type: String,
        requied: true
    },
    workingStatus: { // ! bench and working
        type: String,
        default: "bench"
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

empSchema.set('timestamps', true) 

module.exports = mongoose.model('employee',empSchema)