const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.port || 5000; 
const cors = require('cors');
const connection_string = process.env.mongo_key; 
const mongoose = require('mongoose');
const router = require('express').Router();

mongoose.connect(
    connection_string,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log('connected to mongoDB');
    }
)

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})


