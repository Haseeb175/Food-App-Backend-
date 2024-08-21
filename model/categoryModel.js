const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Provide Title of Category"]
    },
    imageUrl: {
        type: String,
        default: "../Images/category.png"
    }
}, { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);