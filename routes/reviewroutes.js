
const express = require('express');
const { addreviewcontroller, getreviewcontroller, getreviewcontrollerbyid, deletereviewcontroller } = require('../controller/reviewcontroller');
const { requireSignIn } = require('../Middlewares/authmiddleware');
const router = express.Router();

router.post('/addreview',requireSignIn,addreviewcontroller);
router.get('/getreview',getreviewcontroller);
router.get('/getreviewbyperson',requireSignIn,getreviewcontrollerbyid);
router.delete('/deletereview/:id',requireSignIn,deletereviewcontroller);

module.exports = router;