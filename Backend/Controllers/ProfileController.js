//note here we do not need to have create contoller of profile as already profile created at the time of sign up

const ProfileModel=require('../Models/ProfileModel')
const UserModel=require('../Models/UserModel')

//update Profile

const updateProfile=async(req,res)=>{
    try {
        //get data
    const {gender,contactNumber,dateOfBirth="",about=""}=req.body
    //get userId from req.user of token

    const userId=req.user.userId

    if(!contactNumber || !userId || !gender)
    {
        return res.json({
            success:false,
            message:"All fileds required except dob and about!"
        })
    }

    //find profile doc by id
    const userDetails=await UserModel.findById(userId)

    const profileId=userDetails.additionalDetails

    const profileDetails=await ProfileModel.findById(profileId)
    //update profile
    profileDetails.dateOfBirth=dateOfBirth
    profileDetails.about=about
    profileDetails.gender=gender
    profileDetails.contactNumber=contactNumber

    await profileDetails.save()
    //resturn res

    return res.json({
        success:false,
        message:"Profile updated Successfully!"
    })
    } catch (error) {
       return res.json({
        success:false,
        message:"Something went wrong while updating profile!"
       }) 
    }
}


//delete Profile
//how can we schedule a deletion operation of account

const deleteAccount= async (req,res)=>{
  try {

    //get id
    const userId=req.user.id
    //validation
    const userDetails=await UserModel.findById(userId);

    if(!userDetails)
    {
        return res.json({
            success:false,
            message:"Could not find user to delete user"
        })
    }
    //delete profile   -->//here if user has to be deleted then additional details of him should be also be deleted right?
    await ProfileModel.findByIdAndDelete({_id:userDetails.additionalDetails})
    //delete user
    await UserModel.findByIdAndDelete({_id:userId})
  
    //delete stusent from enrolledStudent if the user want to dlete is student

    return res.json({
        success:false,
        message:"User deleted Successfully!"
    })
  } catch (error) {
    return res.json({
        success:false,
        message:"Error while deleting user!"
    })
  } 
}


//getAllDetailsOfUser
//later do it


module.exports={updateProfile,deleteAccount}