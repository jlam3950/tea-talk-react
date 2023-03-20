const router = require("express").Router();
const User = require("../models/User.js");
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
        const checkUsername = await User.findOne({username: username})
        if (checkUsername != null){
            return res.status(409).json({message: `Username "${username}" has already been taken.`})
        }
        const addUser = await newUser.save()
        res.status(201).json(addUser)
        console.log({newUser})

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
            {returnDocument: "after"},
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

    try {
        switch (action){
            // Add a New List
            case "new list":
                if (payload.tea == null){payload.tea = []}
                res.user.teaLists.set(payload.listName, payload.tea)
                res.user.save()
                return res.status(201).json({message: `Added New List - ${payload.listName}`})

            // Delete a List
            case "delete list":
                res.user.teaLists.delete(payload.listName)
                res.user.save()
                return res.status(200).json({message: `Deleted List - ${payload.listName}`})

            
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
                res.user.save()
                return res.status(200).json({message: `Added ${payload.tea} to ${payload.listName}`})

            
            // Delete One Tea from a list
            case "remove tea":
                const oldList = [...res.user.teaLists.get(payload.listName)]
                const newList = oldList.filter(tea => tea != payload.tea)
                res.user.teaLists.set(payload.listName, newList)
                res.user.save()
                return res.status(200).json({message: `Removed ${payload.tea} from ${payload.listName}`})
            
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