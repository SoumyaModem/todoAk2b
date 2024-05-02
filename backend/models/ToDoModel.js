const mongoose=require('mongoose')

const todoSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:false
    },
    title: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
})

module.exports=mongoose.model('ToDo',todoSchema)