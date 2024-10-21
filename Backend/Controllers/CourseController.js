const CourseModel =require('../Models/CourseModel')
const categoryModel=require('../Models/categoryModel')
const UserModel=require('../Models/UserModel')
const {uploadToCloudinary}=require('../Utils/imageUploader')


const createCourse=async(req,res)=>{
    try {
        //fecth data from req,body
        const {courseName,courseDescription,whatYouWillLearn,price,category}=req.body
        //get file
const thumbnail=req.files.thumbnailImage
        //validation
   if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail)
   {
    return res.json(
        {
            success:false,
        message:"All fields required!"
        }
    )
   }

   //adding instructor id to the course doc 
   const instructorId=req.user.id

   const instructorDetails=await UserModel.findById(instructorId)

   if(!instructorDetails)
   {
    return res.json({
        success:false,
        message:"Instructor details not found to create course!"
    })
   }

   //tag validation

   const categoryDetails=await categoryModel.findById(tag)

   if(!categoryDetails)
   {
    return res.json({
        success:false,
        message:"category not valid!"
    })
   }

   //upload image of thumbnail to clodinary

   const thumbnailImage=await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME_CLOUDINARY)

 //store in db 
  
    const courseCreated=await CourseModel.create({
        courseName,
        courseDescription,
        instructor:instructorDetails._id,
        whatYouWillLearn,
        price,
        category:categoryDetails._id,
        thumbnail:thumbnailImage.secure_url

    })

//update instructor user courses array
    await UserModel.findByIdAndUpdate(
        {_id:instructorDetails._id},
        {
            $push:{
                courses:courseCreated._id
            }
        },
        {new:true}
       
    )
//update tag document also 
  
await categoryModel.findByIdAndUpdate(
    {_id:categoryDetails.$clone_id},
    {
        $push:{
           courses:courseCreated._id 
        }
    }
)

    return res.json({
        success:true,
        message:"Course created successfully!",
        courseCreated
    })

    } catch (error) {
       res.json({
        success:false,
        message:"Something went wrong while creating course!"
       }) 
    }
}


//get all courses

const getAllCourses=async(req,res)=>{
    try {
        const allCourses=await CourseModel.find({}).populate("instructor").exec()

        if(!allCourses)
        {
            return res.json({
                success:false,
                message:"No courses found!"
            })
        }

        return res.json({
            success:true,
            message:"Fetched all courses Succesfully!",
            allCourses
        })
    } catch (error) {
       return res.json({
        success:false,
        message:"Could not getall courses data"
       }) 
    }
}


module.exports={createCourse,getAllCourses}