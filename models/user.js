const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const userschema = new Schema({
    isAdmin : Boolean,
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    Email : {
        type : String,
        required : [true, 'please enter an email'],
        unique : true,
        lowercase : true,
        validate : [isEmail , 'Please enter a valid email']
    },
    Password : {
        type : String,
        //required : true,
        minlength : [6, 'Password minimum 6 characters']
    },
    Type :{
        type: String
    },
    image : {
        path:{
            type : String,
        },       
    },
    info : {
        fname : {
            type : String
        },
        lname : {
            type : String
        },
        job :{
            type : String
        },
        Wilaya :{
            type : String
        },
        phone:{
            type : String
        },
        fulladress:{
            type : String
        },          
    },
    description:{
        type : String,
    },  
    portfolio:{
        path:[String],
        title:[String]
    }
});
userschema.plugin(uniqueValidator);

userschema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
});

// log in function
userschema.statics.login = async function(Email, Password){
    const user = await this.findOne({Email});
    if (user){
        console.log(user.Type);

       const pass = await bcrypt.compare(Password, user.Password);
       if(pass){
            return user;
       }
       throw Error('Password incorrect')
    }
    throw Error ('Email incorrect')
}
const User = mongoose.model('User', userschema);
module.exports = User;