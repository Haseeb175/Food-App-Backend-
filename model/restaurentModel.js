const mongoose = require("mongoose");

const restaurentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Provide title of restaurent"]
    },
    imageUrl: {
        type: String
    },
    foods: {
        type: Array
    },
    time: {
        type: String
    },
    pickups: {
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    logoUrl: {
        type: String
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5,
    },
    ratingCount: {
        type: String
    },
    code: {
        type: String
    },
    coords: {
        id: { type: String },
        latitude: { type: String },
        latitudeDelta: { type: String },
        longitude: { type: String },
        longitudeDelta: { type: String },
        title: { type: String },
        address: { type: String },
    }
}, { timestamps: true }
);

module.exports = mongoose.model("Restaurent", restaurentSchema)