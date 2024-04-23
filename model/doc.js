const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    person_id : {
        type : String,
    },
    name : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
    },
    visitdate : {
        type : Date,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    file : {
        public_id : {
            type : String,
        },
        url : {
            type : String,
        }
    }
});

const Document  = mongoose.model('document',Schema);

module.exports = Document;