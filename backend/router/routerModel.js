const express = require("express");
const { createNewCertificate,
    getClosestUser,
    createNewUser,
    getAllEventDetail,
    grabAllUserCertificates,
    getSingleEventDetail
} = require("./routerController.js");
const router = express.Router();

function err (req, res) {
    res.status(403).json({ "error": "forbidden access" });
}
// getAll
router.get('/getALLEvents', getAllEventDetail);
//getSingleEvents
router.get('/getSingleEvent/:id', getSingleEventDetail);

//get certifications per user
router.get('/grabAllUserCertificates/:id', grabAllUserCertificates)
// return users with certificates and their location!
router.get('/getClosestUser/:long/:lat/:certif', getClosestUser);
// record a new certificate
router.post('/createNewCert', createNewCertificate);
// create new user:
router.post('/createUser', createNewUser);

module.exports = router