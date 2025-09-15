const express=require('express')
const User = require('../model/user')

const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    try{

        const {name,emailId,password}=req.body
         
        const user=await User.findOne({emailId})
        if(user){
            return res.status(400).json({success:false,message:"EmailId already registered"})
        }
       
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            name,
            emailId,
            password:hashPassword,
            role
        })
       const savedUser=await newUser.save();

    const token=await jwt.sign({_id:savedUser._id},"JINTASK",{expiresIn:"7d"})
    
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
    
       res.status(200).json({success:true,data:savedUser})

    }catch(err){
        res.status(500).send("ERROR"+err.message)
    }
})


module.exports=userRouter;