const router = require("express").Router();
const User = require("../models/User.js");

router.post("/", (req, res) =>{
    const newUser = new User(req.body);
    newUser.save();
});