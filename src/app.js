const express=require('express')
const connectDB=require('./config/database');
const userRouter = require('./routes/user');
const app=express();


app.use('/',userRouter)

connectDB().then(()=>{
    console.log("Database connected success")
    app.listen(7777,()=>{
    console.log("Server successfully connected hE2AGS5NX4dO7eo3")
})
}).catch((err)=>{
     console.error("database connection failed");
})
