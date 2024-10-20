const UserModel = require('../Models/UserModel')
const mailSender = require('../Utils/mailSender')
const crypto=require('crypto')
const bcrypt=require('bcrypt')


const resetPasswordToken = async (req, res) => {
    try {
        //get email from body

        const { email } = req.body

        //check existence of email in db
        const exist = await UserModel.find({ email })

        if (!exist) {
            return res.json({
                success: false,
                message: "Email does not found!"
            })
        }
        
        //generate token using crypto and add token and expiration time of that token in user model and update the user model
        const token = crypto.randomInt(1000000000, 9999999999); // 10-digit secure random number

        const userUpdated=await UserModel.findOneAndUpdate({email:email},{
            token:token,
             resetPasswordExpires:Date.now()+5*60*1000

        },{new:true})

        //generate link of UI using token
        const url = `http://localhost:5173/update-password/${token}`


        //email sending of that link to reset password
        await mailSender(email,"Password reset link",
            `Click here ${url}`
        )

        return res.json({
            success:true,
            message:"Link sent to your email"
        })

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Something wrong in resetting password!"
        })
    }
}


//update password


const updatePassword=async (req,res)=>{
    try {

        //get token password and cpassword
        //here we got tokem from url to get user entry using token and update password
         const {token,password,cpassword}=req.body
          
         //validation 

         if(password!=cpassword)
         {
            return res.json({
                success:false,
                message:"passwords do not match!"
            })
         }

         //get userdetails using token

         const userDetails=await UserModel.findOne({token:token})

         if(!userDetails)
         {
            return res.json({
                success:false,
                message:"user could not found with this token"
            })
         }

         if(userDetails.resetPasswordExpires<Date.now())
         {
            return res.json({
                success:false,
                message:"Token is expired!"
            })
         }

         //hashing password

         const hashedPassword=await bcrypt.hash(password,10)

         //update password

         await UserModel.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
         )

    
    //res

    return res.json({
        success:true,
        message:"Password reset Successfull!"
    })

    } catch (error) {
        res.json({
            success:false,
            message:"Something wrong in updating password reset"
        })
    }
}


module.exports={resetPasswordToken,updatePassword}