const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    teas: [{
        tea: mongoose.SchemaTypes.ObjectId,
        ref: "Tea",
        userRating: Number
    }]
})

const User = mongoose.model("User", userSchema)
module.exports = User