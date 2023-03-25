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
    imageURL: {
        type: String,
        default: "cloudinary.com/"
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

module.exports = mongoose.model("Tea", teaSchema)

// Average Rating = ratingsTotal / numberOfRatings

// ratingsTotal += 1