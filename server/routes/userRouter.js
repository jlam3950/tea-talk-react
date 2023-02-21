const router = require("express").Router();
const User = require("../models/User.js");

router.post("/", async (req, res) =>{
    const newUser = new User(req.body);

    try {

        const addUser = await newUser.save()
        res.status(201).json(addUser)
        console.log({newUser})

    } catch (err) {
        res.status(400).json({ message: err.message})
        console.error({err})
    }
});

module.exports = router;