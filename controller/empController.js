const bcrypt = require('bcrypt');

const empSchema = require("../model/empSchema");
const { transporter } = require('../services/emailService'); // * It is For Send Email .
const employeeLogger = require('../utils/employeeLogger'); // * Employee Logger for Save Information and Errors .
const authService = require('../services/authService'); // * Some Services .

module.exports = {
    // ? Create Employee
    singupEmployee: async (req, res) => {
        const empData = empSchema(req.body)
        const salt = await bcrypt.genSalt(10) // ! It is a Algorithm to Incrypt the Password .
        try {
            let isEmailExist = await authService.isEmployeeExist(req.body.empEmail) // ! Checking is Email Exist or Not .
            if (isEmailExist) {
                employeeLogger.log("error", "Employee Already Exists With This Email") // ? It Save Info in Employee log /
                res.status(401).send({
                    success: false,
                    message: 'Employee Already Exists With This Email',
                });
            }
            else {
                if (empData.empGender == 'male') { // ! It Check if Employee Gender is Male so It Give a Male Avtar .
                    empData.empProfile = 'C:/Users/workspace/Employee Attendence Traking System/upload/maleAvatar.png'
                } else { // ! It Check if Employee Gender is Female so It Give a Female Avtar .
                    empData.empProfile = 'C:/Users/workspace/Employee Attendence Traking System/upload/femaleAvatar.png'
                }
                empData.empPassword = await bcrypt.hash(req.body.empPassword, salt) // ! It Incrupt the Password .
                const employee = await empData.save() // ? Save in DataBase .
                employeeLogger.log('info', "Employee Created Successfully")
                res.status(201).json({
                    success: true,
                    message: 'Employee Created Successfully',
                    employee: employee,
                });
            }
        }
        catch (err) {
            employeeLogger.log("error", `Error: ${err.message}`)
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },
    // ? Login Employee
    empLogIn: async (req, res) => {
        const { empEmail, empPassword } = req.body // ! Taking these Parameter by Body .
        try {
            let { value, generatedToken } = await authService.validateEmployee(empEmail, empPassword) // ! Genrateing the Token and Ckeck is Email Exist or Not .
            if (value) {
                employeeLogger.log("info", "Employee logged in successfully");
                res.status(200).json({
                    success: true,
                    message: "Employee logged in successfully",
                    accessToken: generatedToken
                });
            } else { // ? It Show When Password is Incorrect .
                employeeLogger.log("error", "Email or password is not valid");
                res.status(401).json({
                    success: false,
                    message: "Email or password is not valid",
                });
            }
        } catch (error) {
            employeeLogger.log("error", error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    // ? Sending Email For Rest Password
    empSendEmailForResetPassword: async (req, res) => {
        const { empEmail } = req.body; // ? Taking Employee Email Form Body .
        try {
            let { generatedToken, empData } = await authService.validateEmployee(empEmail);
            if (empData) {
                const link = `http://127.0.0.1:3000/employee/resetPassword/${empData._id}/${generatedToken}`;
                let info = await transporter.sendMail({ // ! Sending the Email using Transpoter .
                    from: "nameste380@gmail.com",
                    to: empEmail,
                    subject: "email for employee reset password",
                    html: `<a href=${link}>click Here For Rest Password`
                });
                employeeLogger.log('info', "Email Sent Successfully ❤")
                res.status(201).json({
                    success: true,
                    message: "Email Sent Successfully ❤",
                    token: generatedToken,
                    userID: empData._id
                });
            } else {
                employeeLogger.log('error', "Invalid credentials")
                res.status(403).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
        } catch (error) {
            employeeLogger.log('error', `Error: ${error}`)
            res.status(500).json({
                success: false,
                message: `Error occur ${error.message}`,
            });
        }
    },

    // ? Employee Reset Paasword
    empResetPassword: async (req, res) => {
        const { id, token } = req.params;
        const { newPassword, confirmPassword } = req.body;
        try {
            const checkEmployee = await empSchema.findById(id);
            if (checkEmployee != null) {
                const secretKey = checkEmployee._id + process.env.SECRET_KEY;
                if (newPassword === confirmPassword) {
                    const salt = await bcrypt.genSalt(10);
                    const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
                    await empSchema.findByIdAndUpdate(checkEmployee._id, {
                        $set: { empPassword: bcryptPassword },
                    });
                    employeeLogger.log('info', "Password Updeted")
                    res.status(201).json({
                        success: true,
                        message: "Password Updeted",
                    });
                } else {
                    employeeLogger.log('error', "Password and ConfirmPassword is Not Correct")
                    res.status(403).json({
                        success: false,
                        message: "Password and ConfirmPassword is Not Correct",
                    });
                }
            } else {
                employeeLogger.log('error', "Your Email is Not Correct")
                res.status(403).json({
                    success: false,
                    message: "Your Email is Not Correct",
                });
            }
        } catch (error) {
            employeeLogger.log('error', `Error: ${error}`)
            res.status(500).json({
                success: false,
                message: `Error occur : ${error.message}`,
            });
        }
    }
}
