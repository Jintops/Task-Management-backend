const mongoose=require('mongoose')

const taskSechma=new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    dueDate:{
        type:Date,
    },
    status: {
      type: String,
      enum: ["pending", "inprogress", "completed"],
      default: "pending",
    },
      priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
},{timestamps:true})


module.exports=mongoose.model("Task",taskSechma)