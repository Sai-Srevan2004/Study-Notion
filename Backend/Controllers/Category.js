const Category=require('../Models/Category')

//create Tag only admin can create tags 

const createCategory=async(req,res)=>{
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
    const categoryDetails=await Category.create({
        name,
        description
    })

    console.log(categoryDetails)

    return res.json({
        success:true,
        message:"category created Successfully!",
    })
    
   } catch (error) {
    return res.json({
        success:false,
        message:"Something wrong while creating tags"
    })
   }
}


//getAllTags for instructor to choose a tag and create a course based on tags available

const getAllCategorys=async(req,res)=>{
    try {
        //get all tags
        const allCategorys=await Category.find({});

        return res.json({
            success:true,
            message:"All tags are got!",
            allTags:allCategorys
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Something wrong while getting all tags"
        })
    }
}

module.exports={createCategory,getAllCategorys}