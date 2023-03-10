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


// Get One Tea from the Database
router.get("/:id", findTeaByID, async (req, res) => {
    res.status(200).json(res.tea)
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


// Update a Tea in the Database
router.patch("/:id", findTeaByID, async (req, res) => {
    const teaInfo = req.body
    
    try {
        // DOS NOT VALIDATE!! Find Alternative
        const updatedTea = await Tea.findByIdAndUpdate(
            `${req.params.id}`,
            teaInfo,
            {returnDocument: "after"},
        )
        // const updatedTea = await res.tea.save()
        res.status(200).json(updatedTea)
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})


// Delete a Tea from the Database
router.delete("/:id", findTeaByID, async (req, res) => {
    try {
        await res.tea.remove() 
        // await Tea.deleteOne({_id: req.params.id}) ???
        res.status(200).json({ message: `Deleted Tea with ID ${req.params.id}` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})




// ===== MIDDLEWARE =====
async function findTeaByID(req, res, next){
    let tea;
    try {
        tea = await Tea.findById(req.params.id);
        if (tea == null) {
            return res.status(404).json({ message: `Cannot find Tea with ID ${req.params.id}` });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    };

    res.tea = tea;
    next()
};


module.exports = router;