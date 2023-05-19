const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

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
    description: {
        type: String,
        default: "An aromatic beverage prepared by pouring hot water over cured or fresh leaves of Camellia sinensis, an evergreen shrub native to East Asia."
    },
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
    comments:{
        type: [commentSchema],
        default: []
    }
})

const Tea = mongoose.model("Tea", teaSchema)
module.exports = Tea

// Average Rating = ratingsTotal / numberOfRatings

// ratingsTotal += 1