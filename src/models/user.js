const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
       require:true
        
    },
    lastName:{
        type:String,
        require:true
    },
    emailId:{
        type:String,
        require:true,
        unique:true,
        towerCase:true,
    },
    password:{
        type:String,
    },
    age:{
       type:Number,
       minLength:18,
       maxLength:60,
    },
    skills:{
        type:[String],
        default:["cricket","batting","boling"]

    },
    gender:{
        type:String,
        //custom validation
        validate (value){
          if(!["male","female","others"].includes(value))
          {
                 throw new Error("Gender not Valid")
          }
        },
    },
    
},
{
    timestamp:true,
});

const User = mongoose.model("User", userSchema)

module.exports = User;