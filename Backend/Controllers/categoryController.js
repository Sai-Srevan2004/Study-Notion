const categoryModel =require('../Models/categoryModel')

//createcategory controller
const createCategory=async(req,res)=>{
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

        const categoryDetails=await categoryModel.create({
            name,
            description
        })

        res.json({
            success:true,
            message:"category created successfully!",
            categoryDetails
        })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


//getallcategorys function 

const getAllCategorys=async(req,res)=>{
    try {
        const allCategorys=await categoryModel.find({},{name:true,description:true})
        
        res.json({
            success:true,
            message:"All categorys returned Succesfully!",
            allCategorys
        })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

//


module.exports={getAllCategorys,createCategory}