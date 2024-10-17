const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["student","instructor","admin"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"ProfileModel" //ref to Profile model which contains additional details about a user
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseModel"  //ref to courses model which contains all course details
    }],
    image:{
        type:String,
        // required:true
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgressModel"     //ref to CourseProgress model which contains progress of al coureses of a user
        }
    ]

})


module.exports=mongoose.model("UserModel",UserSchema)