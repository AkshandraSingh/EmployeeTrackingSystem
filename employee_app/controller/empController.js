const bcrypt = require('bcrypt');

const empSchema = require("../../model/empSchema");
const employeeLogger = require('../../utils/empLogger/employeeLogger');
const authService = require('../services/authService');
const empNotificationSchema = require('../../model/empNotificationSchema');
const emailService = require('../../service/emailService')

module.exports = {
    signupEmployee: async (req, res) => {
        const empData = empSchema(req.body)
        const salt = await bcrypt.genSalt(10)
        try {
            let isEmailExist = await authService.isEmployeeExist(req.body.empEmail)
            if (isEmailExist) {
                employeeLogger.log("error", "Employee Already Exists With This Email")
                res.status(401).send({
                    success: false,
                    message: 'Employee Already Exists With This Email',
                });
            }
            else {
                empData.empProfile = (empData.empGender === 'male') ?
                    'C:/Users/workspace/Employee Attendance Tracking System/upload/maleAvatar.png' :
                    'C:/Users/workspace/Employee Attendance Tracking System/upload/femaleAvatar.png';
                empData.empPassword = await bcrypt.hash(req.body.empPassword, salt)
                empData.pastPassword.push(empData.empPassword)
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
            employeeLogger.log('error', `Error: ${error.message}`)
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
                await emailService(empEmail, "reset password", resetLink)
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
    resetPassword: async (req, res) => {
        const { id, token } = req.params;
        const { newPassword, confirmPassword } = req.body;
        let isPasswordExist = false;
        try {
            const checkEmployee = await empSchema.findById(id);
            if (!checkEmployee) {
                return res.status(403).json({
                    success: false,
                    message: "Your Email is Not Correct",
                });
            }
            if (newPassword !== confirmPassword) {
                employeeLogger.log('error', "Password and ConfirmPassword do not match")
                return res.status(403).json({
                    success: false,
                    message: "Password and ConfirmPassword do not match",
                });
            }
            for (const oldPassword of checkEmployee.pastPassword) {
                if (await bcrypt.compare(newPassword, oldPassword)) {
                    isPasswordExist = true;
                    break;
                }
            }
            if (isPasswordExist) {
                employeeLogger.log('error', "Don't use old passwords, try another password")
                return res.status(401).json({
                    success: false,
                    message: "Don't use old passwords, try another password",
                });
            }
            const bcryptPassword = await bcrypt.hash(newPassword, salt);
            checkEmployee.pastPassword.push(bcryptPassword);
            await checkEmployee.save();
            employeeLogger.log('info', "Password Updated");
            res.status(201).json({
                success: true,
                message: "Password Updated",
            });
        } catch (error) {
            employeeLogger.log('error', `Error: ${error}`)
            res.status(500).json({
                success: false,
                message: `Error occurred: ${error.message}`,
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
        } catch (error) {
            employeeLogger.log('error', `Error: ${error.message}`)
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
            let isPasswordExist = false
            const empData = await empSchema.findById(empId);
            const decryptPassword = await bcrypt.compare(oldPassword, empData.empPassword)
            if (newPassword === confirmPassword) {
                if (decryptPassword) {
                    for (const oldPassword of empData.pastPassword) {
                        if (await bcrypt.compare(newPassword, oldPassword)) {
                            isPasswordExist = true;
                            break;
                        }
                    }
                    if (isPasswordExist) {
                        employeeLogger.log('error', "This password you already use in past")
                        return res.status(401).json({
                            success: false,
                            message: "This password you already use in past",
                        });
                    }
                    const hashPassword = await bcrypt.hash(req.body.confirmPassword, salt)
                    empData.pastPassword.push(hashPassword);
                    await empData.save();
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
            employeeLogger.log('error', `Error: ${error.message}`)
            res.status(500).json({
                success: false,
                message: `Error occur : ${error.message}`,
            });
        }
    },
    // ! employee Notification
    showNotification: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            const notificationData = await empNotificationSchema.find({
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
            employeeLogger.log('error', `Error: ${error.message}`)
            res.status(500).send({
                success: false,
                message: "Error!!",
                error: error.message
            });
        }
    },
}
