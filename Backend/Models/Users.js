const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    approved:{
        type:Boolean,
        default:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    
    }],
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }]
})


module.exports=mongoose.model('User',userSchema)