const employeeSchema = require('../../model/empSchema')
const benchLogger = require('../../utils/benchLogger')

module.exports = {
    empWorkingList: async (req, res) => {
        try {
            const empData = await employeeSchema.find()
                .select('empName empEmail workingStatus updatedAt');
            benchLogger.log('info',"Current employee")
            res.status(200).send({
                success: true,
                message: "Current employee",
                empData: empData
            });
        } catch (error) {
            benchLogger.log('error',"Error!")
            adminLogger.log('error', "errors");
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    updateStatus: async (req, res) => {
        let { empEmail, workingStatus } = req.body;
        try {
            const empUpdate = await employeeSchema.findOneAndUpdate(
                { empEmail: empEmail },
                { workingStatus: workingStatus },
                { new: true }
            )
            benchLogger.log('info', "Status updated successfully")
            res.status(200).json({
                success: true,
                message: "Status updated successfully",
                empData: empUpdate
            })
        } catch (err) {
            benchLogger.log('error', "Error!")
            res.status(500).json({
                success: false,
                message: `Error : ${err.message}`
            })
        }
    },

    searchEmployee: async (req, res) => {
        try {
            const { letter } = req.params;
            const empData = await employeeSchema.find({
                empRole: "employee",
                $or: [
                    { empName: { $regex: `${letter}`, $options: "i" } }, // ! Case-insensitive search
                    { empEmail: { $regex: `${letter}`, $options: "i" } },
                ],
            }).select("empName empEmail workingStatus");
            benchLogger.log('info', "Searched employees")
            res.status(200).json({
                success: true,
                message: "Searched employees",
                empData: empData,
            });
        } catch (error) {
            benchLogger.log('error', "Error!")
            res.status(500).json({
                success: false,
                message: "Error!!",
                error: error
            });
        }
    }
}
