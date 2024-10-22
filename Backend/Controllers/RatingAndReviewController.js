const RatingAndReviewModel=require('../Models/RatingAndReviewModel')
const CourseModel=require('../Models/CourseModel')
const { default: mongoose } = require('mongoose')

//createrating

const createRating=async(req,res)=>{
    try {
        //get details
        const {courseId,rating,review}=req.body

        //userid from req.user.id

        const userId=req.user.id
        //checking user enrolled
        const courseDetails=await CourseModel.find({_id:courseId},{studentsEnrolled:{$elemMatch:{$eq:userId}}})

        if(!courseDetails)
        {
            return res.json({
                success:false,
                message:"User not enrolled into the course"
            })
        }
        //already rating done by a user

        const alreadyRated=await RatingAndReviewModel.findOne({
            user:userId,
            course:courseId
        })
        //create rating
        const ratingAndReview=await RatingAndReviewModel.create({
            rating,review,
            course:courseId,
            user:userId
        })
        //attach rating in the course model that means update course model
        await CourseModel.findByIdAndUpdate(courseId,{
            $push:{
                ratingAndReviews:ratingAndReview._id
            }
        },{new:true})
        return res.json({
            success:true,
            message:"Rating and review created Successfully!"
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"could not create ratings"
        })
    }
}

//getAveragerating

const getAveragerating=async (req,res)=>{
    try {
        //get course Id

    const {courseId}=req.body

    //calculate average

    const result=await RatingAndReviewModel.aggregate([
        {
            $match:{
                course:new mongoose.Types.ObjectId(courseId)
            }
        },
            {
                $group:{
                    _id:null,
                    averageRating:{
                    $avg:"$rating"
                    }
                }
            }
        
    ])

    //return res
    if(result.length>0)
    {
        return res.json({
            success:true,
            averageRating:result[0].averageRating
        })
    }


    return res.json({
        success:false,
        message:"no ratings till now",
        averageRating:0
    })
    } catch (error) {
        return res.json({
            success:false,
            message:"Something wrong while getting average rating!"
        })
    }
}



//getallratings

const getAllRatings=async(req,res)=>{
    try {
        const allReviews=await RatingAndReviewModel.find({}).sort({rating:"desc"}).populate({
            path:"user",
            select:"firstName lastName email image"
        })
        .populate({
            path:"course",
            select:"courseName"
        })
        .exec()


        return res.json({
            success:true,
            message:"All reviews got!",
            data:allReviews
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Somethinhg wrong while getting All reviews!"
        })
    }
}



module.exports={createRating,getAllRatings,getAveragerating}