const mongoose = require("mongoose");

const teaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: String,
    imageURL: {
        type: String,
        default: "https://res.cloudinary.com/dl3ncuzpg/image/upload/v1679962610/default_tea_yj99v2.png"
    },
    ratingsTotal: {
        type: Number,
        default: 0,
    },
    numberOfRatings: {
        type: Number,
        default: 0,
    },
})

const Tea = mongoose.model("Tea", teaSchema)
module.exports = Tea

// Average Rating = ratingsTotal / numberOfRatings

// ratingsTotal += 1