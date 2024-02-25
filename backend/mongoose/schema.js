const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordinates = new Schema({
    long: String,
    lat: String
})

const certif_model = new Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
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
    current_coordinates: coordinates,
    current_state: {
        type: String,
        index: {sparse: true},
    },
    certifcates: {
        type: [certif_model],
        required: true
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    }
})

events_model.index("");
const Events = mongoose.model("Events", events_model);
const Certs_user = mongoose.model("Cert_users", certif_users);
const Certifs = mongoose.model("certif_model", certif_model)
const Coordinates = mongoose.model("coordinates", coordinates);
module.exports = {
    Events, Certs_user, Certifs, Coordinates
}