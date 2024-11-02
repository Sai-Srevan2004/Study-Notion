const Tag=require('../Models/Tag')

//create Tag only admin can create tags 

const createTag=async(req,res)=>{
   try {
    //get data from req.body
    const {name,description}=req.body
    //validate them
    if(!name || !description)
    {
        return res.json({
            success:false,
            message:"All fileds required!"
        })
    }
    //create tag in model
    const tagDetails=await Tag.create({
        name,
        description
    })

    console.log(tagDetails)

    return res.json({
        success:true,
        message:"Tag created Successfully!",
    })
    
   } catch (error) {
    return res.json({
        success:false,
        message:"Something wrong while creating tags"
    })
   }
}


//getAllTags for instructor to choose a tag and create a course based on tags available

const getAllTags=async(req,res)=>{
    try {
        //get all tags
        const allTags=await Tag.find({});

        return res.json({
            success:true,
            message:"All tags are got!",
            allTags:allTags
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Something wrong while getting all tags"
        })
    }
}

module.exports={createTag,getAllTags}