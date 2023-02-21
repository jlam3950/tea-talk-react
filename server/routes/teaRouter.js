const router = require("express").Router();
const Tea = require("../models/Tea.js");

// Get all Teas in Database
router.get("/", async (req, res) => {
    try {

        const allTeas = await Tea.find()
        res.status(200).json(allTeas)

    } catch (err){
        res.status(500).json({ message: err.message})
    }
})


// Add Tea to Database
router.post("/", async (req, res) =>{
    const newTea = new Tea(req.body);

    try {

        const addTea = await newTea.save()
        res.status(201).json(addTea)
        console.log({newTea})

    } catch (err) {
        res.status(400).json({ message: err.message})
        console.error({err})
    }
});

module.exports = router;