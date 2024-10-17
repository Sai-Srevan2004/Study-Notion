const mongoose = require('mongoose')

const RatingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model("RatingAndReviewModel", RatingAndReviewSchema)