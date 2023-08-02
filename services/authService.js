const empSchema = require('../model/empSchema')

module.exports = {
    isEmployeeExist: async (email) => {
        let value = false
        const isEmpExits = await empSchema.findOne({
            empEmail: email,
        });
        if (isEmpExits) {
            value = true;
        }
        return value
    }
}