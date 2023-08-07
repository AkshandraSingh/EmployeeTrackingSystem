const mongoose = require('mongoose')

const empTimeSheetSchema = new mongoose.Schema({
    clockIn: {
        type: String,
        default: ""
    },
    clockOut: {
        type: String,
        default: ""
    },
    clockinIP: {
        type: String,
        default: ""
    },
    hoursLoggedIn: {
        type: Number,
        default: 0
    },
    workingFrom: {
        type: String,
        default: "",
    },
    totalWrokingDays: {
        type: String,
        default: "0"
    },
    dayPresent: {
        type: String,
        default: "0"
    },
    halfDay: {
        type: Number,
        default: "0"
    },
    dayAbsent: {
        type: String,
        default: "0"

    },
    holidays: {
        type: String,
        default: "0"

    },
    dayLate: {
        type: String,
        default: "0"
    },
    status: { // ! Absent , Present and Leave
        type: String,
        default: "absent"
    },
    empId: {
        type: mongoose.Types.ObjectId,
        ref: 'employee',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

empTimeSheetSchema.set('timestamps', true) 

module.exports = mongoose.model('timeSheet', empTimeSheetSchema)