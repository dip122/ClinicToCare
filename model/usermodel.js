const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        lowercase : true,
        required : true,
        min : 3,
    },
    email : {
        type : String,
        lowercase : true,
        min : 3,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("This is wrong Email format..Please give use the correct existing email");
            }
        },
        required : [true,"PLease enter Your Password"],
    },
    password : {
        type : String,
        required : true,
    },
    phoneno : {
        type : String,
        required : true,
        min : [10,"minimum 10 chareter is needed"],
        max : [12,"maximum 12 charecter is needed"],
    },
    favsports : {
        type : String,
    },
    role : {
        type : Number,
        default : 0,
    }
});

const usermodel = mongoose.model('User',UserSchema);

module.exports = usermodel;