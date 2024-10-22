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

//categoryPageDetails
const categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
  
      // Get courses for the specified category
      const selectedCategory = await categoryModel.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await categoryModel.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await categoryModel.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      console.log()
      // Get top-selling courses across all categories
      const allCategories = await categoryModel.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
  
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  


module.exports={getAllCategorys,createCategory,categoryPageDetails}