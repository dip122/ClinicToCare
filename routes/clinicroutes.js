const express = require('express');
const {cliniccontroller,testcontroller, getallclinics, 
    deletecliniccontroller, addreivewcontroller,
    getreviewcontroller} = require('../controller/cliniccontroller');
const { requireSignIn } = require('../Middlewares/authmiddleware');
const { addDocumentcontroller, deleteDocumentcontroller, getdoccontrollerbyid } = require('../controller/documentcontroller');

const router = express.Router();

//add clinic
router.post('/addclinic',requireSignIn,cliniccontroller);
router.get('/allclinic',requireSignIn,getallclinics);
router.delete('/deleteclinic/:id',requireSignIn,deletecliniccontroller);

//add document 
router.post('/adddoc',requireSignIn,addDocumentcontroller);
router.get('/getdoc',requireSignIn,getdoccontrollerbyid);
router.delete('/deletedoc/:id',requireSignIn,deleteDocumentcontroller);



//test controller of clinicrouter
router.get('/addclinic',requireSignIn,testcontroller)


module.exports = router;