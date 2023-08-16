const empSchema = require('../model/empSchema')

module.exports = {
    isEmployee: async (req, res, next) => {
        try {
            const empEmail = await empSchema.findOne({
                empEmail: req.body.empEmail
            });
            if (!empEmail) {
                return res.status(404).send({
                    success: false,
                    message: "Employee not found"
                })
            }
            if (empEmail.empRole === "employee") {
                next(); 
            } else {
                res.status(401).send("Not authorized");
            }
        } catch (error) {
            console.error("Error in isEmployee middleware:", error);
            res.status(500).send("Internal server error");
        }
    },

    isAdmin: async (req, res, next) => {
        const empEmail = await empSchema.findOne({
            empEmail: req.body.empEmail
        })
        if (!empEmail) {
            return res.status(404).send({
                success: false,
                message: "Employee not found"
            })
        }
        if (empEmail.empRole == "admin") {
            next()
        }
        else {
            res.status(401).send("Not Auth")
        }
    }
}
