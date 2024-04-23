const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    person_id : {
        type : String,
        required : true,
    },
    name:{
        type : String,
        required : true,
    },
    type : {
        type : String,
    },
    time :{
        type : String,
        required : true,
    }
});

const medmodel = mongoose.model('medmodel',Schema);

module.exports = medmodel;