const express = require('express'); //
const { registercontroller, logincontroller, testcontroller, 
    testAdmincontroller, sendpasswordresetemailcontroller, 
    passwordresetcontroller} = require('../controller/authcontroller');
const {requireSignIn, isAdmin, signInMiddleware} = require('../Middlewares/authmiddleware');
const router = express.Router();

router.post('/register',registercontroller);

router.post('/login',logincontroller);

router.post('/sendresetpasswordemail',sendpasswordresetemailcontroller);

router.post('/resetpassword/:token',passwordresetcontroller);


router.get('/userauth',requireSignIn,(req,res)=>{
    res.status(200).send({ok : true});
});//user auth in frontend

router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    return res.status(200).send({ok : true});
})



//test controller purpose
router.get('/test',requireSignIn,testcontroller);
router.get('/testadmin',requireSignIn,isAdmin,testAdmincontroller);// to chcek isAdmin function i have to at first signed in user
router.get('/testadmin',signInMiddleware,isAdmin,testAdmincontroller);//own router is created



module.exports = router;