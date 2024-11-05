const Course=require('../Models/Courses')
const Category=require('../Models/Category')
const User=require('../Models/Users')
const {uploadImageToCloudinary}=require("../Utils/cloudinary")


//create courses

const createCourse=async(req,res)=>{
    try {
        //instructor id
        const instructorId=req.user.id 

        if(!instructorId)
        {
            return res.json({
                success:false,
                message:"Could not found instructor id to create  acourse"
            })
        }

        //data fetch from req.body
        let {courseName,courseDescription,whatYouWillLearn,price,tag,category,status}=req.body
        //get file from req.files
        const thumbnail=req.files.thumbnailFile
       //check validation
       if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail)
       {   console.log("----------",courseName,courseDescription,whatYouWillLearn,tag,price,category,thumbnail)
             return res.json({
                success:false,
                message:"All fileds required please!"
             })
       }

       if (!status || status === undefined) {
        status = "Draft";
      }

       //validation of tag whether it is actually created by admin or not
       const categoryDetails=await Category.findById(category);

       if(!categoryDetails)
       {
        return res.json({
            success:false,
            message:"Category is not valid!"
        })
       }
       //upload image to cloudinary // here image is thumbnail
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.CLOUDINARY_FOLDER_NAME)
       //entry in db
       const newCourse=await Course.create({
        courseName,
        courseDescription,
        instructor:instructorId,
        whatYouWillLearn,
        price,
        tag,
        category,
        thumbnail:thumbnailImage.secure_url,
         status
       })

       //update array in instructor
       await User.findByIdAndUpdate({_id:instructorId},
        {
            $push:{
                courses:newCourse._id
            }
        },{new :true}
       )

       //tag array updation
       await Category.findByIdAndUpdate({_id:category},{
           $push:{
               course:newCourse._id
           }
       })

       return res.json({
        success:true,
        data:newCourse,
        message:"Course Created Successfully!"
       })

    } catch (error) {
    
        return res.json({
            success:false,
            message:error.message
        })
    }
}





//get all courses

const getAllCourses=async(req,res)=>{
    try {
        const allCourses = await Course.find({});

        return res.json({
            success:true,
            message:'Data for all courses fetched successfully',
            data:allCourses,
        })

}
catch(error) {
    console.log(error);
    return res.json({
        success:false,
        message:'Cannot Fetch course data',
        error:error.message,
    })
}

}

//getCourseDetails
const getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.body;
            //find course details
            const courseDetails = await Course.find(
                                        {_id:courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        .populate("ratingAndreviews")
                                        .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        })
                                        .exec();

                //validation
                if(!courseDetails) {
                    return res.json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
                }
                //return response
                return res.json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                })

    }
    catch(error) {
        console.log(error);
        return res.json({
            success:false,
            message:error.message,
        });
    }
}


module.exports={createCourse,getAllCourses,getCourseDetails}