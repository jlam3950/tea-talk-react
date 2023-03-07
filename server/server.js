const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.port || 5000; 
const cors = require('cors');
const connection_string = process.env.mongo_key; 
const mongoose = require('mongoose');
const router = require('express').Router();
const session = require("express-session");

mongoose.connect(
    connection_string,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
)
.then(()=>console.log('connected to mongoDB'))
.catch(e=>console.error(e))

const sessionConfig = {
    name:"camellia",
    secret: process.env.cookie_secret,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        // maxAge: milliseconds * seconds * minutes * hours * days,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false
}

app.use(express.json())
app.use(session(sessionConfig))

const userRouter = require("./routes/userRouter.js");
app.use("/users", userRouter);

const teaRouter = require("./routes/teaRouter.js");
app.use("/teas", teaRouter);

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})


