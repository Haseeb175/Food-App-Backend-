const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Controller 
const registerController = async (req, res) => {
    try {
        const { username, email, password, address, phone, answer, usertype } = req.body;
        if (!username || !email || !password || !address || !phone || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please provide All Fields"
            })
        };
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: "Email is Already registered"
            })
        };

        // Password Hashing
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({ username, email, password: hashPassword, address, phone, answer, usertype });
        res.status(201).send({
            success: true,
            message: "User is Registered",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register ",
            error
        })
    }

}

// Login Controller 
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields"
            })
        }
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not Found "
            })
        }
        // Hashing Password Compare
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).send({
                success: false,
                message: "Password is not Correct"
            })
        }
        // Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        // Password not show in Console
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).sen({
            success: false,
            message: "Error in Login"
        })
    }
}

// Exports
module.exports = { registerController, loginController };