const express = require('express');
const router = express.Router();

//import middlewares and callback functions
const { contactcontroller, getcontactcontroller, deletecontactcontroller } = require('../controller/contactcontroller');
const { requireSignIn, isAdmin } = require('../Middlewares/authmiddleware');


//routes
router.post('/addcontact',contactcontroller);
router.get('/getcontact',requireSignIn,isAdmin,getcontactcontroller);
router.delete('/deletecontact/:id',requireSignIn,isAdmin,deletecontactcontroller);

module.exports = router;