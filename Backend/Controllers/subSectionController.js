const subSectionModel=require('../Models/SubSectionsModel')
const sectionModel=require('../Models/SectionsModel')
const {uploadToCloudinary}=require('../Utils/imageUploader')


//create subSection

const createSubSection=async(req,res)=>{
  try {
    //fecth data
    const {sectionId,title,timeDuration,description}=req.body
    //fetch files of video
    const video=req.files.videoFile

    //data validation

    if(!sectionId || !title || !timeDuration || !description)
    {
        return res.json({
            success:false,
            message:"All fields required!"
        })
    }
     //upload video in cloudinary and get secure url
     const uploadVideo=await uploadToCloudinary(video,process.env.FOLDER_NAME_CLOUDINARY)


     //create entry in db

     const subSectionDetails =await subSectionModel.create({
        title,
        timeDuration,
        description,
        videoUrl:uploadVideo.secure_url
     })
     //update section array by pushing subsection id into it

     const updateSection=await sectionModel.findByIdAndUpdate(sectionId,{
        $push:{
            subSection:subSectionDetails._id
        }
     },{new:true})  //can write populate

     return res.json({
        success:true,
        message:"Sub section created Succesfully!",
        updateSection
     })

  } catch (error) {
    return res.json({
        succes:false,
        message:"Could not create subsection!"
    })
  }
}


//updateSubSection

//deleteSubSection



module.exports={createSubSection}