const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema({
    person_id : {
        type : String,
    },
    name : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
    ratings : {
        type : Number,
        required : true,
        validate(value){
            if(value>5 || value<0){
                throw new Error("PLease enter the correct email address");
            }
        }
    },
});

const reviewmodel = mongoose.model('review',Schema);

module.exports = reviewmodel;