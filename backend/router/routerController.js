const express = require("express");
const mongoose = require("mongoose");
const { Events, Certs_user, Certifs, GeoJson } = require('../mongoose/schema.js');
require("dotenv").config();

async function getAllEventDetail(req, res) { 
    try {
        const results = await Events.find();
        res.status(200).json(results);
    } catch (e) { 
        res.status(400).json({ "error": e });
    }
}

async function getSingleEventDetail(req, res) { 
    try { 
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new Error("Invalid type: Must be ObjectId");
        const results = await Events.find({ _id: id });
    
        res.status(200).json(results);
    } catch (e) { 
        res.status(400).json({ "error": e });
    }
}

// async function createNewEvent(req, res) { 
//     try {
//         const name = req.params.name;
//         const certifs = req.params.certif;
//         const result = await Events.create({ name, certifs });
//         res.status(200).json(result);
//     } catch (e) {
//         res.status(400).json({
//             "error": e
//         })
//     }
// }
//pass via json
async function createNewCertificate(req, res){
    try {
        const {name} = req.body;
        console.log(name);
        const a = await Certifs.create({ name });
        res.status(200).json({a});
    } catch (e) { 
        res.status(400).json({ "error": e });    
    }
}

async function grabAllUserCertificates(req, res) { 
    const { id } = req.params;
    try {
        const query = await Certs_user.findById(id, "certificates");
        const queryRest = await Certifs.find({_id: query.certificates})
        res.status(200).json({queryRest});
    } catch (e) {
        res.status(403).json({"error": "forbidden access"});
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
            current_state: json.state,
            certificates: json.certifs
        })
        res.status(200).json(queryRes)
    } catch (e) { 
        res.status(400).json({ "error": e });
    }
}

//json data format: [lat: "", long": "", certificate_id: ""]
async function getClosestUser(req, res) { 
    //console.log("running...")
    const source = [req.params.lat, req.params.long]
    const certif = req.params.certif;

    console.log(source, certif);
    if (!mongoose.Types.ObjectId.isValid(certif)) { 
        res.status(400).json({ "error": "Invalid data type" });
    }
    const queryResult = await Certs_user.find(
        {
            $and:
                [{
                    coordinates: {
                        $nearSphere: {
                            $geometry: {
                                type: "Point",
                                coordinates: [source[0], source[1]]
                            }
                        }
                    }
                },
                {
                    certificates: {
                        $elemMatch: {
                            $eq: certif
                        }
                    }
                }]
        }
    )
    res.status(200).json(queryResult);
}


module.exports = {
    getAllEventDetail,
    getSingleEventDetail,
    createNewCertificate,
    getClosestUser, 
    createNewUser,
    grabAllUserCertificates
}