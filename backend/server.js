const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./router/routerModel.js");

app.use(express.json());
app.use('/', (req, res, next) => { 
    //res.setHeader("Access-Control-Allow-Origin", "<placeholder url>");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-METHODS", "POST GET PUT");
    console.log(req.method, req.url, req.body)
    next();
})


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

app.use('/api/', router);
