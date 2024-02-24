const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = requrie("mongoose");

console.log(process.env.URL);

mongoose.connect(process.env.URL)
    .then(() => {
        app.listen(80, () => {
            console.log("listening to port 4000...")
        })
    })
    .catch((error) => { 
        //uh oh
        console.log("MongoDB connection failed", error)
    })

app.get("/", (req, res) => { 
    res.status(400).render("<h1>You shouldn't be here >:( </h1>");
})