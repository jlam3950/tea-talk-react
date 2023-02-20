const router = require("express").Router();
const Tea = require("../models/Tea.js");

router.post("/", (req, res) =>{
    const newTea = new Tea(req.body);
    newTea.save();
});