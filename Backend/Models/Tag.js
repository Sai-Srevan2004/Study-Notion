const mongoose=require('mongoose')

const tagSchema=new mongoose.Schema({
   tagName:{
        type:String,
    },
    Description:
        {
           type:String,
        },
        course:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"Course"
        }
    
})


module.exports=mongoose.model('Tag',tagSchema)