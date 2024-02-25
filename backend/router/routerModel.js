const express = require("express");
const { createNewCertificate, getClosestUser,createNewUser } = require("./routerController.js");
const router = express.Router();

function err (req, res) {
    res.status(403).json({ "error": "forbidden access" });
}
// getAll
router.get('/', err);
// return users with certificates and their location!
router.get('/getClosestUser/:long/:lat', getClosestUser);
// record a new certificate
router.post('/createNewCert', createNewCertificate);
// create new user:
router.post('/createUser', createNewUser);
// update a certified user with new information.
router.put('/updateUser/:id', err);

module.exports = router