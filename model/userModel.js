const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "user name is required"]
    },
    email: {
        type: String,
        required: [true, "user email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    address: {
        type: String
    },
    phone: {
        type: String,
        required: [true, "phone no is required"]
    },
    usertype: {
        type: String,
        required: [true, "user type is required"],
        default: "client",
        enum: ["client", "admin", "vendor", "driver"]
    },
    profile: {
        type: String,
        default: '../images/userClient.png'
    },
    answer: {
        type: String,
        required: [true, "Answer is Required"]
    }
}, { timestamps: true }
)

module.exports = mongoose.model("User", userSchema);