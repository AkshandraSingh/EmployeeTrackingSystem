const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const empSchema = require('../../model/empSchema')

module.exports = {
    // ! It is Only For Checking Email is Valid or Not .
    isEmployeeExist: async (email) => {
        let value = false
        const isEmpExits = await empSchema.findOne({
            empEmail: email,
        });
        if (isEmpExits) {
            value = true;
        }
        return value
    },
    // ! It is For Checking Email is Valid or Not and Compareing Password and also Genrating Token .
    validateEmployee: async (empEmail, hashType = 0) => {
        let value = false;
        const empData = await empSchema.findOne({ empEmail: empEmail });
        let generatedToken = await jwt.sign({ empId: empData._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        if (hashType === 0) {
            if (empData) {
                value = true;
            }
        } else {
            if (empData) {
                const hashPassword = await bcrypt.compare(hashType, empData.empPassword);
                if (hashPassword) {
                    value = true;
                }
            }
        }

        return { value, generatedToken, empData };
    }

}