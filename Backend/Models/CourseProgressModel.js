const mongoose = require('mongoose')

const CourseProgressSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseModel"
    },
    completedVideos:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSectionModel"
    }
})


module.exports = mongoose.model("CourseProgressModel", CourseProgressSchema)