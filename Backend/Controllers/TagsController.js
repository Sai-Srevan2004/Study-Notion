const TagModel =require('../Models/TagModel')

//createtag controller
const createTag=async(req,res)=>{
    try {
        //fecthing data from frontend
        const {name,description}=req.body


        //validation of the fields
        if(!name || !description)
        {
            return res.json({
                success:false,
                message:"All fields required!"
            })
        }


        //create entry in db

        const tagDetails=await TagModel.create({
            name,
            description
        })

        res.json({
            success:true,
            message:"Tag created successfully!"
        })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


//getalltags function 

const getAllTags=async(req,res)=>{
    try {
        const allTags=await TagModel.find({},{name:true,description:true})
        
        res.json({
            success:true,
            message:"All tags returned Succesfully!",
            allTags
        })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


module.exports={getAllTags,createTag}