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
    validateEmployee: async (empEmail, empPassword) => {
        let value = false;
        let token = "";
        const empData = await empSchema.findOne({ // ? Checking is Email exist in DataBase or Not .
            empEmail: empEmail,
        });
        if (empData) {
            const hashPassword = await bcrypt.compare( // ! Compareing Password .
                empPassword,
                empData.empPassword
            )
            if (empData && hashPassword) {
                token = await jwt.sign({ empId: empData._id }, process.env.SECRET_KEY, { expiresIn: "1h" }) // ! Genrating Token
                value = true
            }
        }
        return { value, token }
    }
}