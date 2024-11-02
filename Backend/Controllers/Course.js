const Course=require('../Models/Courses')
const Tag=require('../Models/Tag')
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
        const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body
        //get file from req.files
        const thumbnail=req.files.thumbnailFile
       //check validation
       if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail)
       {
             return res.json({
                success:false,
                message:"All fileds required!"
             })
       }

       //validation of tag whether it is actually created by admin or not
       const tagDetails=await Tag.findById(tag);

       if(!tagDetails)
       {
        return res.json({
            success:false,
            message:"Tag is not valid!"
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
        thumbnail:thumbnailImage.secure_url

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
       await Tag.findByIdAndUpdate({_id:tag0},{
           $push:{
               course:newCourse._id
           }
       })

       return res.json({
        success:true,
        message:"Course Created Successfully!"
       })

    } catch (error) {
        return res.json({
            success:false,
            message:"Something wrong while creating course!"
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


module.exports={createCourse,getAllCourses}