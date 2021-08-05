const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const offerschema = new Schema({
    image:{   
            type: String, 
    },
    User : {
        type : String,
        required : true
    },
    Wilaya : {
        type : String,
        required : true
    },
    Job : {
        type : String,
    },
    Type : String,
    id : String,
    Extra_info : {
        type : String,
    },
    Available : {
        type : Boolean,
     
    }
},{ timestamps : true });

const Offer = mongoose.model('Offer', offerschema);
module.exports = Offer ;
