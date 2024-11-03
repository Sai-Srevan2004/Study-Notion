const Category = require("../Models/Category");

const createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.json({
			success: true,
			message: "Categorys Created Successfully",
		});
	} catch (error) {
		return res.json({
			success: true,
			message: error.message,
		});
	}
};

const showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find(
			{},
			{ name: true, description: true }
		);
		res.json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.json({
			success: false,
			message: error.message,
		});
	}
};

//categoryPageDetails 

const categoryPageDetails = async (req, res) => {
    try {
            //get categoryId
            const {categoryId} = req.body;
            //get courses for specified categoryId
            const selectedCategory = await Category.findById(categoryId)
                                            .populate("courses")
                                            .exec();
            //validation
            if(!selectedCategory) {
                return res.json({
                    success:false,
                    message:'Data Not Found',
                });
            }
            //get coursesfor different categories
            const differentCategories = await Category.find({
                                         _id: {$ne: categoryId},
                                         })
                                         .populate("courses")
                                         .exec();

            //get top 10 selling courses
            //HW - write it on your own

            //return response
            return res.json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategories,
                },
            });

    }
    catch(error ) {
        console.log(error);
        return res.json({
            success:false,
            message:error.message,
        });
    }
}


module.exports={createCategory,categoryPageDetails,showAllCategories}