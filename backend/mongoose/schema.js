const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certif_model = new Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    }
})

const geoJson = new Schema({
    type: {
        type: String, 
        enum: ['Point'],
        default: 'Point',
        required: true,
        immuatble: true
    },
    coordinates: {
        type: [Number], 
        default: [0, 0],
        required: true,
        index: "2dsphere"
    }
})

const events_model = new Schema({
    name: {
        type: String,
        required: true
    },
    certificates: {
        type: [mongoose.Types.ObjectId],
        ref: 'certif_model',
        required: true
    }
}, {timestamps: true});


const certif_users = new Schema({
    name: {
        type: String,
        required: true
    },
    coordinates: {
        type: geoJson, 
        required: false,
        index: '2dsphere'
    },
    current_state: {
        type: String,
        index: {sparse: true},
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    }
}, {timestamps: true})

events_model.index("");
const Events = mongoose.model("Events", events_model);
const Certs_user = mongoose.model("Cert_users", certif_users);
const Certifs = mongoose.model("certif_model", certif_model)
const GeoJson = mongoose.model("GeoJson", geoJson);
module.exports = {
    Events, Certs_user, Certifs, GeoJson
}