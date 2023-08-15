const employeeSchema = require('../../model/empSchema')

module.exports = {
    empWorkingList: async (req, res) => {
        try {
            const empData = await employeeSchema.find()
                .select('empName empEmail workingStatus updatedAt');
            res.status(200).send({
                success: true,
                message: "Current Employee",
                empData: empData
            });
        } catch (error) {
            adminLogger.log('error', "error Occour");
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
            res.status(200).json({
                success: true,
                message: "Status updated successfully",
                empData: empUpdate
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error : ${err.message}`
            })
        }
    },
}
