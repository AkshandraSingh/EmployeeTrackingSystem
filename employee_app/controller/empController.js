const bcrypt = require('bcrypt');

const empSchema = require("../../model/empSchema");
const { transporter } = require('../services/emailService');
const employeeLogger = require('../../utils/employeeLogger');
const authService = require('../services/authService');
const empNotiSchema = require('../../model/empNotificationSchema')

module.exports = {
    // ! Create Employee 
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
                empData.empProfile = (empData.empGender === 'male') ?
                    'C:/Users/workspace/Employee Attendence Traking System/upload/maleAvatar.png' :
                    'C:/Users/workspace/Employee Attendence Traking System/upload/femaleAvatar.png';
                empData.empPassword = await bcrypt.hash(req.body.empPassword, salt) // ! It Incrupt the Password .
                const employee = await empData.save() 
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
    // ! LoginEmployee
    logIn: async (req, res) => {
        const { empEmail, empPassword } = req.body
        try {
            // ? Genrating the token and check the Password is incorrect or not .
            let { value, generatedToken } = await authService.validateEmployee(empEmail, empPassword)
            if (value) {
                employeeLogger.log("info", "Employee logged in successfully");
                res.status(200).json({
                    success: true,
                    message: "Employee logged in successfully",
                    accessToken: generatedToken
                });
            } else { // * It Show When Password is Incorrect .
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
    // ! Sending email for reset the password 
    emailForgetPassword: async (req, res) => {
        const { empEmail } = req.body; 
        try {
            let { generatedToken, empData } = await authService.validateEmployee(empEmail);
            if (empData) {
                const resetLink = `http://127.0.0.1:3000/employee/resetPassword/${empData._id}/${generatedToken}`;
                await transporter.sendMail({ 
                    from: '"Employee Tracking System" <nameste380@gmail.com>',
                    to: empEmail,
                    subject: "email for employee to reset password",
                    html: `<a href=${resetLink}>click Here For Rest Password`
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
    // ! Forget password API .
    forgetPassword: async (req, res) => {
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
    },
    // ! Employee edit profile .
    editProfile: async (req, res) => {
        try {
            const employeeId = req.params.id;
            const employeeAddress = req.body.empAddress;
            const empTechnology = req.body.empTechnology ? `${req.body.empTechnology}` : undefined;
            const empPhone = req.body.empPhone ? `${req.body.empPhone}` : undefined;
            const empCity = req.body.empCity ? `${req.body.empCity}` : undefined;
            const empState = req.body.empState ? `${req.body.empState}` : undefined;
            const empProfile = req.file ? `/upload/empProfile${req.file.filename}` : undefined;
            const updatedEmployee = await empSchema.findByIdAndUpdate(
                employeeId,
                {
                    empProfile: empProfile,
                    empAddress: employeeAddress,
                    empTechnology: empTechnology,
                    empPhone: empPhone,
                    empCity: empCity,
                    empState: empState
                },
                { new: true }
            );

            if (!updatedEmployee) {
                employeeLogger.log("error", "Employee not found");
                return res.status(404).json({
                    success: false,
                    message: "Employee not found",
                });
            } else {
                employeeLogger.log("info", "Employee profile edit successfully");
                res.status(200).json({
                    success: true,
                    message: "Employee profile updated successfully ✔",
                    user: updatedEmployee
                });
            }
        } catch (err) {
            employeeLogger.log("error", err.message);
            res.status(500).json({
                success: false,
                error: err.message,
            });
        }
    },
    // ! employee reset password .
    setNewPassword: async (req, res) => {
        try {
            const empId = req.params.id;
            const salt = await bcrypt.genSalt(10)
            const { oldPassword, newPassword, confirmPassword } = req.body;
            const empData = await empSchema.findById(empId);
            const decryptPassword = await bcrypt.compare(oldPassword, empData.empPassword)
            if (newPassword === confirmPassword) {
                if (decryptPassword) {
                    const hashPassword = await bcrypt.hash(req.body.confirmPassword, salt)
                    await empSchema.findByIdAndUpdate(empData._id, {
                        $set: { empPassword: hashPassword },
                    });
                    employeeLogger.log('info', 'Employee password updated')
                    res.status(200).send({
                        success: true,
                        message: "Your Password Updated"
                    })
                }
                else {
                    employeeLogger.log('error', "old password is incorrect")
                    res.status(401).send({
                        success: false,
                        message: "Old password is incorrect . you can try forget password"
                    })
                }
            }
            else {
                employeeLogger.log('error', "New password not match with confirm password ")
                res.status(401).send({
                    success: false,
                    message: "New password not match with confirm password ."
                })
            }
        }
        catch (error) {
            employeeLogger.log('error', "Error Occurs ")
            res.status(500).json({
                success: false,
                message: `Error occur : ${error.message}`,
            });
        }
    },
    // ! employee Notification
    showNotification: async (req, res) => {
        try {
            const empId = req.params.id;
            const { startDate, endDate } = req.query; // ! to use query we use ? it stands for giving query
            const notificationData = await empNotiSchema.find({
                empId,
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
            }).select('title message createdAt');
            if (notificationData.length === 0) {
                employeeLogger.log('error', "Notifications not found.");
                res.status(404).send({
                    success: false,
                    message: "Notifications not found."
                });
            } else {
                employeeLogger.log('info', "Notifications found.");
                res.status(200).send({
                    success: true,
                    message: "Notifications for you.",
                    data: notificationData
                });
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error!!",
                error: error.message
            });
        }
    }
}
