const empSchema = require('../../model/empSchema')

module.exports = {
    isAdmin: async (req,res,next) => {
        const empEmail = await empSchema.findOne({
            empEmail: req.body.empEmail
        })
        if (empEmail.empRole == "admin") {
            next()
        }
        else {
            res.status(401).send("Not Auth")
        }
    }
}