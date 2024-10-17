const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
    },
    courseDescription: {
        type: String
    },
    Instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserModel"
    },
    whatYouWillLearn: {
        type: String
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "SectionModel"
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "RatingAndReviewModel"
        }
    ],
    price: {
        type: Number
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TagModel",
        required: true
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
            required: true
        }
    ]

})


module.exports = mongoose.model("CourseModel", CourseSchema)