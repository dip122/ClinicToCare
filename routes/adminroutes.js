const express = require('express');
const { getallusercontroller, contactusroutescontroller } = require('../controller/admincontroller');
const { requireSignIn, isAdmin } = require('../Middlewares/authmiddleware');
const router  = express.Router();


router.get('/getusers',requireSignIn,isAdmin,getallusercontroller);//get all registered users
router.get('/getcontactus',requireSignIn,isAdmin,contactusroutescontroller);

module.exports = router;