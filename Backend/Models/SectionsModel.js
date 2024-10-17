const mongoose = require('mongoose')

const SectionSchema = new mongoose.Schema({
   sectionName:{
    type:String
   },
   subSection:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSectionModel",
        required:true
    }
   ]
})


module.exports = mongoose.model("SectionModel", SectionSchema)