const express = require('express');
const { requireSignIn } = require('../Middlewares/authmiddleware');
const { addmedcontroller, deletemedcontroller, getmedcontroller } = require('../controller/medicinecontroller');
const router = express.Router();

router.post('/addmed',requireSignIn,addmedcontroller);
router.delete('/deletemed/:id',requireSignIn,deletemedcontroller);
router.get('/getmed',requireSignIn,getmedcontroller);


module.exports = router;