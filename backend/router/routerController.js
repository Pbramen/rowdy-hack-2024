const express = require("express");
const mongoose = require("mongoose");
const { Events, Certs_user, Certifs } = require('../mongoose/schema.js');

//pass via paramaters
async function createNewCertificate(req, res){
    try {
        const name = req.query;   
        const a = await Certifs.create({ name });
        res.status(200).json({a});
    } catch (e) { 
        res.status(400).json({ "error": e });    
    }
}

function getClosestUser(req, res) { 
    const { id } = req.params
    console.log(id);
    res.status(200).json({"oka": "yep"})
}

module.exports = {
    createNewCertificate,
    getClosestUser
}