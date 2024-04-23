const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        lowercase : true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Welcome to our new platform");
            }
        }
    },
    phoneno : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    },
});

const contact = mongoose.model('contact',contactSchema);

module.exports = contact;