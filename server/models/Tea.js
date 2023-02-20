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
    imageURL: String,
})

module.exports = mongoose.model("Tea", teaSchema)