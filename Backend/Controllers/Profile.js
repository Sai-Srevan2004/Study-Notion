const Profile = require("../Models/Profile");
const User = require("../Models/Users");


const updateProfile = async (req, res) => {
    try{
            //get data
            const {dateOfBirth="", about="", contactNumber, gender} = req.body;
            //get userId
            const id = req.user.id;
            //validation
            if(!contactNumber || !gender || !id) {
                return res.json({
                    success:false,
                    message:'All fields are required',
                });
            } 
            //find profile
            const userDetails = await User.findById(id);
            const profileId = userDetails.additionalDetails;
            const profileDetails = await Profile.findById(profileId);

            //update profile
            profileDetails.dateOfBirth = dateOfBirth;
            profileDetails.about = about;
            profileDetails.gender = gender;
            profileDetails.contactNumber = contactNumber;
            await profileDetails.save();
            //return response
            return res.json({
                success:true,
                message:'Profile Updated Successfully',
                profileDetails,
            });

    }
    catch(error) {
        return res.json({
            success:false,
            error:error.message,
        });
    }
};  


//deleteAccount
//Explore -> how can we schedule this deletion operation
const deleteAccount = async (req, res) => {
    try{
        //get id 
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails) {
            return res.json({
                success:false,
                message:'User not found',
            });
        } 
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //TOOD: HW unenroll user form all enrolled courses
        //delete user
        await User.findByIdAndDelete({_id:id});
       
        //return response
        return res.json({
            success:true,
            message:'User Deleted Successfully',
        })

    }
    catch(error) {
        return res.json({
            success:false,
            message:'User cannot be deleted successfully',
        });
    }
};


const getAllUserDetails = async (req, res) => {

    try {
        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.json({
            success:true,
            message:'User Data Fetched Successfully',
            userDetails
        });
       
    }
    catch(error) {
        return res.json({
            success:false,
            message:error.message,
        });
    }
}


module.exports={updateProfile,deleteAccount,getAllUserDetails}