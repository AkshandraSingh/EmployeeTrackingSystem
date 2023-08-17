const mongoose = require('mongoose')

const empLeaves = new mongoose.Schema({
    casualLeaves: {
        type: Number,
        default: 10
    },
    sickLeave: {
        type: Number,
        default: 10
    },
    otherLeaves: {
        type: Number,
        default: 10
    },
    totalLeave: {
        type: Number,
        default: 0
    },
    leaveType: { // ! Casual , SickLeave and Other .
        type: String,
        default: "casual"
    },
    status: { // ! Pending , approve and reject .
        type: String,
        default: "pending"
    },
    message: {
        type: String,
        default: ""
    },
    startDate: {
        type: Date,
        default: "",
    },
    endDate: {
        type: Date,
        default:"",
    },
    empId: {
        type: mongoose.Types.ObjectId,
        ref: 'employee',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

empLeaves.set('timestamps', true) 

module.exports = mongoose.model('empLeave',empLeaves)
