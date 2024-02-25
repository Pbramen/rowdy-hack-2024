const express = require("express");
const mongoose = require("mongoose");
const { Events, Certs_user, Certifs, GeoJson } = require('../mongoose/schema.js');
require("dotenv").config();

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

async function createNewUser(req, res) {

    try {
        var json = req.body;
        //check if object -> reject else
        var uri = encodeURIComponent(json.address);
        const coordinates = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${uri}&key=
        ${process.env.GOOKEY}`)
        const results = await coordinates.json();
        const lat = results.results[0]["geometry"]["location"]["lat"]
        const long = results.results[0]["geometry"]["location"]["lng"]
        console.log(lat, long);
        const geoJson = new GeoJson({
            type: 'Point',
            coordinates: [long, lat]
        });
        const queryRes = await Certs_user.create({
            name: json.name,
            coordinates: geoJson,
             current_state: json.state
        })
        res.status(200).json(queryRes)
    } catch (e) { 
        res.status(400).json({ "error": e });
    }
}

async function getClosestUser(req, res) { 
    console.log("running...")
    const source = [req.params.lat, req.params.long]
    console.log(source);

    const queryResult = await Certs_user.find({
        coordinates: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: [source[0], source[1]]
                }
            }
        }
    })
    res.status(200).json(queryResult)
    
}


module.exports = {
    createNewCertificate,
    getClosestUser, 
    createNewUser, 
}