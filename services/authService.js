const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const empSchema = require('../model/empSchema')

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
    validateEmployee: async (empEmail, empPassword, hashType = 0) => {
        let value = false;
        let generatedToken = "";
        const empData = await empSchema.findOne({ empEmail: empEmail });

        if (hashType === 0) {
            if (empData) {
                generatedToken = await jwt.sign({ empId: empData._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
                value = true;
            }
        } else {
            if (empData) {
                const hashPassword = await bcrypt.compare(empPassword, empData.empPassword);
                if (hashPassword) {
                    generatedToken = await jwt.sign({ empId: empData._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
                    value = true;
                }
            }
        }

        return { value, generatedToken, empData };
    }

}