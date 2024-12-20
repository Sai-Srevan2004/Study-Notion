const Section = require("../Models/Section");
const Course = require("../Models/Courses");

const createSection = async (req, res) => {
    try{
        //data fetch
        const {sectionName, courseId} = req.body;
        //data validation
        if(!sectionName || !courseId) {
            return res.json({
                success:false,
                message:'Missing Properties',
            });
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update course with section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push:{
                                                    courseContent:newSection._id,
                                                }
                                            },
                                            {new:true},
                                        ).populate({
                                            path: "courseContent",
                                            populate: {
                                                path: "subSection",
                                            },
                                        })
                                        .exec();
        //return response
        return res.json({
            success:true,
            message:'Section created successfully',
            updatedCourseDetails,
        })
    }
    catch(error) {
        return res.json({
            success:false,
            message:"Unable to create Section, please try again",
            error:error.message,
        });
    }
}

const updateSection = async (req,res) => {
    try {

        //data input
        const {sectionName, sectionId} = req.body;
        //data validation
        if(!sectionName || !sectionId) {
            return res.json({
                success:false,
                message:'Missing Properties',
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        //return res
        return res.json({
            success:true,
            message:'Section Updated Successfully',
            section
        });

    }
    catch(error) {
        return res.json({
            success:false,
            message:"Unable to update Section, please try again",
            error:error.message,
        });
    }
};


const deleteSection = async (req,res) => {
    try {
        //get ID - assuming that we are sending ID in params
        console.log(req.params.sectionId)
        const {sectionId} = req.params
        
        //use findByIdandDelete
        await Section.findByIdAndDelete(sectionId);
        //TODO[Testing]: do we need to delete the entry from the course schema ??
        //return response
        return res.json({
            success:true,
            message:"Section Deleted Successfully",
        })

    }
    catch(error) {
        return res.json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:error.message,
        });
    }
}

module.exports={updateSection,createSection,deleteSection}