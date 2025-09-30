const mongoose=require('mongoose')


const adminSchema=new mongoose.Schema({
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
        default:"admin"
    }
},{timestamps:true})

module.exports= mongoose.model("Admin",adminSchema)