const mongoose=require('mongoose')

const connectDB=async()=>{
    mongoose.connect("mongodb+srv://jintops:hE2AGS5NX4dO7eo3@cluster0.i39mhfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

module.exports=connectDB