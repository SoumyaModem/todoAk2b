const { model } = require('mongoose')
const ToDoModel=require('../models/ToDoModel')

module.exports.getToDo=async(req,res)=>{
    const toDo=await ToDoModel.find()
    res.send(toDo)
}

module.exports.saveToDo=async(req,res)=>{
    const {title, dueDate, description}=req.body 

    ToDoModel
    .create({title, dueDate, description})
    .then((data)=>{
        console.log("Added Successfully");
        console.log(data)
        res.send(data)
    })

    .catch(err => {
        console.error("Error adding ToDo:", err);
        res.status(500).send("Error adding ToDo");
    });
}

module.exports.updateToDo=async(req,res)=>{
    const {_id,title, dueDate, description}=req.body
    ToDoModel
    .findByIdAndUpdate(_id,{title, dueDate, description})
    .then(()=>res.send("Updated Successfully...."))
    .catch((err)=>console.log(err))
}

module.exports.deleteToDo=async(req,res)=>{
    const {_id}=req.body
    ToDoModel
    .findByIdAndDelete(_id)
    .then(()=>res.send("Deleted Successfully...."))
    .catch((err)=>console.log(err))
}