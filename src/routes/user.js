const express=require('express')
const User = require('../model/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { userAuth } = require('../middleware/auth')
const Task = require('../model/task')
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

userRouter.post('/login',async(req,res)=>{
    try{
    const {emailId,password}=req.body

    const user=await User.findOne({emailId})
    if(!user){
        return res.status(404).json({success:false,message:"not found"})
    }
    const pass=await bcrypt.compare(password,user.password)
    if(!pass){
        return res.status(404).json({success:false,message:"password not correct"})
    }

    const token=await jwt.sign({_id:user._id},"JINTASK",{expiresIn:"7d"})
     res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })

    res.status(200).json({success:true,data:user})
    }catch(err){
        res.status(500).send("ERROR"+err.message)
    }
})


userRouter.get("/getTask",userAuth,async(req,res)=>{
    try{
        const user=req.user
        const task=await Task.find({assignedTo:user._id})
        if(!task || task.length===0){
            return res.status(404).json({success:false,message:"no task assigned to you"})
        }
        res.status(200).json({success:true,data:task})
    }catch(err){
        res.status(500).send("ERROR"+err.message)
    }
})

userRouter.get("/getOneTask/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const user=req.user
        const task=await Task.findById(id).populate("assignedTo", "name emailId")
        if(!task){
            return res.status(404).json({success:false,message:"no task found"})
        }
        res.status(200).json({success:true,data:task})
    }catch(err){
        res.status(500).send("ERROR"+err.message)
    }
})

userRouter.patch("/updateTaskStatus/:id",userAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ success: false, message: "Task not found" });

        task.status = status; 
        const updatedTask = await task.save();

        res.status(200).json({ success: true, data: updatedTask });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


module.exports=userRouter;