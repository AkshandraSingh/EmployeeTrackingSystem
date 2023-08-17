const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    empName: {
        type: String,
        required: true
    },
    empEmail: {
        type: String,
        required: true,
        unique: true,
    },
    empPhone: {
        type: Number,
        required: true
    },
    empPassword: {
        type: String,
        required: true
    },
    pastPassword: {
        type: [],
        default: []
    },
    empCity: {
        type: String,
        required: true
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
        required: true
    },
    empProfile: {
        type: String,
        default: ""
    },
    empState: {
        type: String,
        required: true
    },
    empGender: {
        type: String,
        required: true
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