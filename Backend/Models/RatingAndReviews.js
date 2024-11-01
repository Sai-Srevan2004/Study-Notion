const mongoose = require('mongoose')

const ratingAndReviewsSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    rating: {
        type: Number,
    },
    review:
    {
        type: String

    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index: true,
    },

})


module.exports = mongoose.model('RatingAndReviews', ratingAndReviewsSchema)