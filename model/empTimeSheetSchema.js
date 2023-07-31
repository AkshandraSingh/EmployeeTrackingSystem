const mongoose = require('mongoose')

const empTimeSheetSchema = new mongoose.Schema({
    clockIn: {
        type: String,
        requied: true
    },
    clockOut: {
        type: String,
        requied: true
    },
    clockinIP: {
        type: String,
        requied: true
    },
    hoursLoggedIn: {
        type: Number,
        requied: true
    },
    workingFrom: {
        type: String,
        requied: true
    },
    totalWrokingDays: {
        type: String,
        requied: true
    },
    dayPresent: {
        type: String,
        requied: true
    },
    halfDay: {
        type: Number,
        requied: true
    },
    dayAbsent: {
        type: String,
        requied: true
    },
    holidays: {
        type: String,
        requied: true
    },
    dayLate: {
        type: String,
        requied: true
    },
    status: {
        type: Number,
        requied: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
})

empTimeSheetSchema.set('timestamps', true) 

module.exports = mongoose.model('timeSheet', empTimeSheetSchema)