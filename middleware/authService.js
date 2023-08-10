const empSchema = require('../model/empSchema')

module.exports = {
    isEmployee: async (req, res, next) => {
        const empEmail = await empSchema.findOne({
            empRole: req.body.empRole
        })
        if (empEmail.empRole == "employee") {
            next()
        }
        else {
            res.status(401).send("Not auth")
        }
    },

    isAdmin: async (req, res, next) => {
        const empEmail = await empSchema.findOne({
            empRole: req.body.empRole
        })
        if (empEmail.empRole == "admin") {
            next()
        }
        else {
            res.status(401).send("Not Auth")
        }
    }
}