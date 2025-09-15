const express=require('express');
const { adminAuth } = require('../middleware/admin');
const Task = require('../model/task');
const User = require('../model/user');
const adminRouter=express.Router();

adminRouter.post('/taskCreate',adminAuth,async(req,res)=>{
    try{
       const {title,description,dueDate,status,priority,assignedTo}=req.body
       
       const user=await User.findById(adminRouter)
       if(!user){
        return res.status(404).json({success:false,message:"no user"})
       }
    const newTask=new Task({
        title,
        description,
        dueDate,
        status,
        priority,
        assignedTo:user
    })

    const saveTask=await newTask.save();
    res.status(200).json({success:true,data:saveTask})

    }catch(err){
        res.status(500).send("ERROR"+err.message)
    }
})

adminRouter.get('/getAllUser',adminAuth,async(req,res)=>{
    try{
        
        const users=await User.find();
         if(!users || users.length === 0){
        return res.status(404).json({success:false,message:"no users found"})
       }
       
       res.status(200).json({success:true,data:users})
    }catch(err){
        res.status(500).send("ERROR"+err.message)
    }
})

adminRouter.delete('/removeUser/:id',adminAuth,async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findByIdAndDelete(id);
         if(!user){
        return res.status(404).json({success:false,message:"no user found"})
       }
       
       res.status(200).json({success:true,data:user})
    }catch(err){
        res.status(500).send("ERROR"+err.message)
    }
});


adminRouter.delete('/deleteTask/:id',adminAuth,async(req,res)=>{
    try{
        const {id}=req.params;
        const task=await Task.findByIdAndDelete(id);
         if(!task){
        return res.status(404).json({success:false,message:"Task not found"})
       }
       
       res.status(200).json({success:true,message:"Task deleted"})
    }catch(err){
        res.status(500).send("ERROR"+err.message)
    }
});

adminRouter.get('/getAllTask',adminAuth,async(req,res)=>{
    try{
        let { page, limit } = req.query;

        page = parseInt(page) || 1; 
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;

        const totalTasks = await Task.countDocuments();


        const task=await Task.find().skip(skip).limit(limit).sort({ createdAt: -1 });;
         if(!task || tasks.length === 0){
        return res.status(404).json({success:false,message:"no task found "})
       }
       
       res.status(200).json({success:true,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks,
            data:task})
    }catch(err){
        res.status(500).send("ERROR"+err.message)
    }
});

adminRouter.put('/editTask/:id', adminAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, status, priority, assignedTo } = req.body;

       
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
     
            const user = await User.findById(assignedTo);
            if (!user) {
                return res.status(404).json({ success: false, message: "Assigned user not found" });
            }


        if (title) task.title = title;
        if (description) task.description = description;
        if (dueDate) task.dueDate = dueDate;
        if (status) task.status = status;
        if (priority) task.priority = priority;

        const updatedTask = await task.save();

        res.status(200).json({ success: true, data: updatedTask });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});






module.exports=adminRouter