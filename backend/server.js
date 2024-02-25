const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => { 
        //uh oh
        console.log("MongoDB connection failed", error)
    })

app.get("/", (req, res) => { 
    res.status(400).render("<h1>You shouldn't be here >:( </h1>");
})