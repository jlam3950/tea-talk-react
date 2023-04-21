const router = require("express").Router();
const Tea = require("../models/Tea.js");
const User = require("../models/User.js")
const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: process.env.cloudinary_cloud_name, 
    api_key: process.env.cloudinary_api_key, 
    api_secret: process.env.cloudinary_secret,
    secure: true
  });

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
    const tea = await Tea.findById(req.params.id)
        .populate({
            path: "comments.user", 
            select: "username _id"
        })
    res.status(200).json(tea)
})


// Add Tea to Database
router.post("/", async (req, res) =>{
    const teaInfo = req.body
    
    try {
        if (req.body.image){
            const img = await cloudinary.uploader.upload(req.body.image)
            console.log({img})
            teaInfo.imageURL = img.secure_url
        }
        const newTea = new Tea(teaInfo);
        const addTea = await newTea.save()
        res.status(201).json(addTea)
        console.log({newTea})

    } catch (err) {
        res.status(400).json({ message: err.message})
        console.error({err})
    }
});


// Add comment for Tea
router.post("/:id/comments", findTeaByID, async (req, res) => {
    try {
        const user = await User.findById(req.body.userID)
        const newComment = {
            user: req.body.userID,
            content: req.body.content
        }
        res.tea.comments.push(newComment)
        await res.tea.save()
        const updatedTea = await Tea.findById(req.params.id)
            .populate({
                path: "comments.user", 
                select: "username _id"
            })
        res.status(201).json(updatedTea.comments)
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})


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


// Update a comment for a Tea
router.patch("/:teaID/comments/:commentID", async (req, res) => {
    const tea = await Tea.findById(req.params.teaID)

    try {
        tea.comments.forEach((item, index) => {
            if (item._id.toString() === req.params.commentID){
                tea.comments[index].content = req.body.content
            }
        })
        await tea.save()
        const updatedTea = await Tea.findById(req.params.teaID)
            .populate({
                path: "comments.user", 
                select: "username _id"
            })
        res.status(200).json(updatedTea.comments)
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
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})


// Delete a Comment from a Tea
router.delete("/:teaID/comments/:commentID", async (req, res) => {
    try {
        const tea = await Tea.findById(req.params.teaID)
        const newComments = tea.comments.filter(item => item._id.toString() !== req.params.commentID)
        tea.comments = newComments
        await tea.save()
        const updatedTea = await Tea.findById(req.params.teaID)
            .populate({
                path: "comments.user", 
                select: "username _id"
            })
        res.status(200).json(updatedTea.comments)
    } catch (err) {
        console.error(err)
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