const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String

    },
    emailId:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
},{timestamps:true})

module.exports= mongoose.model("User",userSchema)