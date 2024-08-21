const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

//Get user Info
const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }
        //hide password 
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "User get Successfully",
            user
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in User Get API"
        })
    }
};

// Update User 
const updateUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }
        const { username, address, phone } = req.body;
        if (username) user.username = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        await user.save();

        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "User Update Successfully",
            user
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in User Update API"
        })
    }
}

// Update User Password
const updateUserPasswordController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Error is User Password Update API"
            })
        }
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Old or New Password"
            })
        };
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(404).send({
                success: false,
                message: "Old Password is not Correct"
            })
        };
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: "User Update Password Successfully"
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in User Password Update API",
            error
        })
    }

}

// Reset User Password
const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if (!email || !newPassword || !answer) {
            return res.status(404).send({
                success: false,
                message: "Please Provide All Fields"
            });
        }
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User not found or invalid answer"
            });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashPassword;
        await user.save();

        res.status(201).send({
            success: true,
            message: "Password Reset Successfully"
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in User Reset Password API",
            error
        })
    }

}

// Delete User Account 
const deleteUserController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "User Account Delete Successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Delete User Account API",
            error
        })
    }

}

module.exports = { getUserController, updateUserController, updateUserPasswordController, resetPasswordController, deleteUserController };