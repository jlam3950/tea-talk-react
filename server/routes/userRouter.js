const router = require("express").Router();
const User = require("../models/User.js");
const Tea = require("../models/Tea.js");
const bcrypt = require("bcryptjs");


// Get User with given ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id, {password: false}).populate("teaLists.$*");
        if (user == null) {
            res.status(404).json({ message: `Cannot find User with ID ${req.params.id}` });
        }
        res.status(200).json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    };

})


// Add User to the Database
router.post("/", async (req, res) =>{
    const userInfo = req.body;
    const username = req.body.username
    const hash = bcrypt.hashSync(req.body.password, Number(process.env.salt));
    userInfo.password = hash
    const newUser = new User(userInfo);

    try {
        // === CHECK IF USERNAME EXITS USING REGEX (ignore uppercase/lowercase)===
        // const regex = new RegExp(username, "i")
        // const checkUsername = await User.findOne({username: regex})
        const checkUsername = await User.findOne({username: username})
        if (checkUsername != null){
            return res.status(409).json({message: `Username "${username}" has already been taken.`})
        }
        const addUser = await newUser.save()
        const addUserInfo = await User.findById(addUser._id, {password: false})
        res.status(201).json(addUserInfo)

    } catch (err) {
        res.status(400).json({ message: err.message})
        console.error({err})
    }
});


// Login an Existing User
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        const checkPassword = bcrypt.compareSync(req.body.password, user.password)
        if (user == null) {
            res.status(404).json({ message: `Cannot find User with Username "${req.body.username}"` });
        } else if (user && checkPassword) {
            const userInfo = await User.findById(user.id, {password: false}).populate("teaLists.$*");
            req.session.user = userInfo;
            res.status(200).json(userInfo)
        } else {
            res.status(401).json({message: "Invalid Credentials"})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.error(err)
    };
})


// Update a User in the Database
router.patch("/:id", findUserByID, async (req, res) => {
    const userInfo = req.body
    
    try {

        if (req.body.password != null) {
            const hash = bcrypt.hashSync(req.body.password, Number(process.env.salt));
            userInfo.password = hash
        }
        const checkUsername = await User.findOne({username: req.body.username})
        if (checkUsername != null){
            return res.status(409).json({message: `Username '${username}' has already been taken.`})
        }
        // DOS NOT VALIDATE!! Find Alternative
        const updatedUser = await User.findByIdAndUpdate(
            `${req.params.id}`,
            userInfo,
            {returnDocument: "after", select: {password: false}},
        )
        // const updatedUser = await res.user.save()
        res.status(200).json(updatedUser)
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})


// Update a User's Tea Lists
router.patch("/:id/tealists", findUserByID, async (req, res) => {
    const action = req.body.action;
    const payload = req.body.payload;
    const user = res.user
    let updatedUser = null

    try {
        switch (action){
            // Add a New List
            case "new list":
                if (payload.tea == null){payload.tea = []}
                res.user.teaLists.set(payload.listName, payload.tea)
                await res.user.save()
                updatedUser = await User.findById(req.params.id, {password: false}).populate("teaLists.$*");
                return res.status(201).json({message: `Added New List - ${payload.listName}`, teaLists: updatedUser.teaLists})

            // Delete a List
            case "delete list":
                res.user.teaLists.delete(payload.listName)
                await res.user.save()
                updatedUser = await User.findById(req.params.id, {password: false}).populate("teaLists.$*");
                return res.status(200).json({message: `Deleted List - ${payload.listName}`, teaLists: updatedUser.teaLists})

            
            // Add One Tea to a list
            case "add tea":
                const list = await res.user.teaLists.get(payload.listName)
                let included = false
                list.forEach(item=> {
                    if (item.toString().includes(payload.tea)) {included = true}
                })
                if (included){
                    return res.status(409).json({message: `Tea is already in selected list`})
                }
                list.push(payload.tea)
                res.user.teaLists.set(payload.listName, list)
                await res.user.save()
                updatedUser = await User.findById(req.params.id, {password: false}).populate("teaLists.$*");
                return res.status(200).json({message: `Added ${payload.tea} to ${payload.listName}`, teaLists: updatedUser.teaLists})

            
            // Delete One Tea from a list
            case "remove tea":
                const oldList = [...res.user.teaLists.get(payload.listName)]
                const newList = oldList.filter(tea => tea != payload.tea)
                res.user.teaLists.set(payload.listName, newList)
                await res.user.save()
                updatedUser = await User.findById(req.params.id, {password: false}).populate("teaLists.$*");
                return res.status(200).json({message: `Removed ${payload.tea} from ${payload.listName}`, teaLists: updatedUser.teaLists})
            
            // Update a Tea in a list
            // case "update tea":
            
            
            default:
                return res.status(401).json({message: `Action '${action}' is not an option`})
        }

    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})


// Update a User's Tea Ratings
router.patch("/:id/ratings", findUserByID, async (req, res) => {
    const tea = await Tea.findById(req.body.tea)
    try {
        if (res.user.ratedTeas.has(req.body.tea) === false){
            tea.numberOfRatings += 1
            tea.ratingsTotal += req.body.rating
        } else {
            const oldRating = res.user.ratedTeas.get(req.body.tea)
            tea.ratingsTotal += (req.body.rating - oldRating)
        }
        res.user.ratedTeas.set(req.body.tea, req.body.rating)
        const updatedTea = await tea.save()
        res.user.save()
        return res.status(200).json(updatedTea)
    } catch (err) {
        console.error(err)
        return res.status(500).json({user: res.user, message: "Something went wrong"})
    }
})


// Delete User from Database
router.delete("/:id", findUserByID, async (req, res) => {
    try {
        await res.user.remove() 
        // await Tea.deleteOne({_id: req.params.id}) ???
        res.status(200).json({ message: `Deleted User with ID ${req.params.id}` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})




// ===== MIDDLEWARE =====
async function findUserByID(req, res, next){
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: `Cannot find User with ID ${req.params.id}` });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    };

    res.user = user;
    next()
};

module.exports = router;