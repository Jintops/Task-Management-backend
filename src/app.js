const express=require('express')
const connectDB=require('./config/database');
const userRouter = require('./routes/user');
const cookieParser = require('cookie-parser');
const adminRouter = require('./routes/admin');
const cors=require('cors')
const app=express();


app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())
app.use('/',userRouter)
app.use('/',adminRouter)



connectDB().then(()=>{
    console.log("Database connected success")
    app.listen(3000,()=>{
    console.log("Server successfully connected hE2AGS5NX4dO7eo3")
})
}).catch((err)=>{
     console.error("database connection failed");
})
