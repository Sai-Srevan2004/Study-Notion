const SectionModel=require('../Models/SectionsModel')
const courseModel=require('../Models/CourseModel');
const SectionsModel = require('../Models/SectionsModel');


//creating section
const createSection=async(req,res)=>{
    try {
        //data fetch
    const {sectionName,courseId}=req.body;
    //data validation
    if(!sectionName || !courseId)
    {
        return res.json({
            success:false,
            message:"Sectionname is required!"
        })
    }
    //create section
    const sectionDetails=await SectionModel.create({
        sectionName
    })

    //update section array in course model
    const courseArrayUpdation=await courseModel.findByIdAndUpdate(courseId,{
        
            $push:{
                courseContent:sectionDetails._id
            }
    },{new:true})

    res.json({
        success:true,
        message:"Section created successfully!",
        courseArrayUpdation
    })

    } catch (error) {
       return res.json({
        success:false,
        message:"Something went wrong while creating section"
       }) 
    }
}

//updating section
const updateSection=async(req,res)=>{
    try {
        //data fecth
        const {newSectionName,sectionId}=req.body;
        //data validation
        if(!newSectionName || !sectionId)
        {
            return res.json({
                success:false,
                message:"All fields required!"
            })
        }
        //update data

        const section=await SectionsModel.findByIdAndUpdate(sectionId,{
            newSectionName
        },{new:true})

        res.json({
            success:true,
            message:"Section updated Successfully!",
            section
        })


//Note:Here when section name is updated then we do not need to update course array section in course model coz it contains section id not name!
         
    } catch (error) {
        res.json({
            success:false,
            message:"Something wrong while updating Section"
        })
    }
}


//deleting the section

const deleteSection=async(req,res)=>{
    try {
        //get id from params
        const {sectionId}=req.params
     
        await SectionModel.findByIdAndDelete(sectionId)

        return res.json({
            success:false,
            message:"Section deleted Successfully!"
        })
    
        //need to delete section from an array in course

        



    } catch (error) {
        return res.json({
            success:false,
            message:"Could not delete Section!"
        })
    }
}



module.exports={createSection,updateSection,deleteSection}