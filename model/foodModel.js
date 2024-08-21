const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Food title is Required']
    },
    description: {
        type: String,
        required: [true, 'Food description is Required']
    },
    price: {
        type: Number,
        required: [true, 'Food price is Required']
    },
    imageUrl: {
        type: String,
        default: "../images/food.png"
    },
    foodTags: {
        type: String,
    },
    category: {
        type: String,
    },
    code: {
        type: String,
    },
    isAvailable: {
        type: String
    },
    restaurent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurent'
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String,
    },

}, { timestamps: true }
);

module.exports = mongoose.model("Foods", foodSchema);