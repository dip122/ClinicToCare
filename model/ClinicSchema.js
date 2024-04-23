const mongoose = require('mongoose');

const clinicschema = new mongoose.Schema({
    person_id : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    doctor_name : {
        type : String,
        required : true,
    },
    phoneno : {
        type : String,
        required : true,
    },
    address : {
        type :String,
        required : true,
    },
    days : [
        {
            type : String,
        }
    ]
});

const clinicdatabase = mongoose.model('clinic',clinicschema);
module.exports = clinicdatabase;