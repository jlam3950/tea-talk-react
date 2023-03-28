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
    teaLists: {
        type: Map,
        of: [{type: mongoose.Schema.Types.ObjectId, ref: "Tea"}],
        default: {
            "Favorites":[],
        }
    },
    ratedTeas: { 
        type: Map,
        of: [{
            teaID: {type: mongoose.Schema.Types.ObjectId, ref: "Tea"},
            userRating: {type: Number},
            rated: {type: Boolean, default: false}
        }]
    },
    userImageURL: String
})

const User = mongoose.model("User", userSchema)
module.exports = User



 // teas: [{
    //     tea: {
    //         type: mongoose.SchemaTypes.ObjectId,
    //         ref: "Tea",
    //     },
    //     userRating: Number
    // }],