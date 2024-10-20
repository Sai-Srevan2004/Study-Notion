const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseModel"
    }]
})


module.exports = mongoose.model("categoryModel", categorySchema)