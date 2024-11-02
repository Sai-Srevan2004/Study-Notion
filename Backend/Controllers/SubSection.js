const SubSection = require("../Models/SubSection");
const Section = require("../Models/Section");
const { uploadImageToCloudinary } = require("../Utils/cloudinary");

//create SubSection

const createSubSection = async (req, res) => {
    try{
            //fecth data from Req body
            const {sectionId, title, timeDuration, description} = req.body;
            //extract file/video
            const video  = req.files.videoFile;
            //validation
            if(!sectionId || !title || !timeDuration || !description || !video) {
                return res.status(400).json({
                    success:false,
                    message:'All fields are required',
                });
            }
            //upload video to cloudinary
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            //create a sub-section
            const subSectionDetails = await SubSection.create({
                title:title,
                timeDuration:timeDuration,
                description:description,
                videoUrl:uploadDetails.secure_url,
            })
            //update section with this sub section ObjectId
            const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                        {$push:{
                                                            subSection:subSectionDetails._id,
                                                        }},
                                                        {new:true});
            //HW: log updated section here, after adding populate query
            //return response
            return res.status(200).json({
                succcess:true,
                message:'Sub Section Created Successfully',
                updatedSection,
            });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
};

// updateSubSection
const updateSubSection=async(req,res)=>
{
  try {
    //get data from req.body
    const {subSectionId, title, timeDuration, description} = req.body;
    //find the section by id
    const updateSubSection=await SubSection.findByIdAndUpdate({_id:subSectionId},{
         title,
         timeDuration,
         description, 
    })

    return res.json({
        success:true,
        message:"SubSection updated Successfully!",
        updateSubSection
    })
    
  } catch (error) {
    return res.json({
        success:false,
        message:"Something wrong while updating subsections of courses"
    })
  }
}

//HW:deleteSubSection
const deleteSubSection=async(req,res)=>{
    try {
        //get subSectionId
        const {subSectionId,sectionId}=req.body

        //find the subsection using the id

        const deleteSubSection=await SubSection.findByIdAndDelete({_id:subSectionId})

        //now remove subsection from the array in Section model
        await Section.findByIdAndUpdate({_id:sectionId},{
            $pull:{
                subSection:deleteSubSection
            }
        })

        return res.json({
            success:true,
            message:"Subsection deleted Successfully!",
            deleteSubSection
        })


    } catch (error) {
        return res.json({
            success:false,
            message:"Something wrong while deleting subsections of courses"
        })
    }
}


module.exports={createSubSection,updateSubSection,deleteSubSection}