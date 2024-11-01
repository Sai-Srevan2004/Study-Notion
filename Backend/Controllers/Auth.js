const User = require("../Models/Users")
const Otp = require("../Models/Otp")
const otpGenerator = require("otp-generator")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const mailSender=require('../Utils/mailSender')

//otp send function

const sendOtp = async (req, res) => {
    try {
        //fetch email from req.body
        const { email } = req.body

        //check if email is not empty
        if (!email) {
            return res.json({
                success: false,
                message: "Email is required!"
            })
        }

        //check if user already exists
        const checkUserPresent = await User.findOne({ email })

        //if user already exists then return res
        if (!checkUserPresent) {
            return res.json({
                success: false,
                message: "User already exists!"
            })
        }

        //generate Otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        //const unique otp or not
        var result = await Otp.findOne({ otp: otp })

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            }
            )
            result = await Otp.findOne({ otp: otp })
        }


        const otpPayload = {
            otp: otp,
            email: email
        }

        //create entry in db of otp

        const OtpBody = await Otp.create(otpPayload)

        console.log(OtpBody)


        //send response

        return res.json({
            success: true,
            message: "Otp sent Successfully!"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "somethng wrong while sending Otp!"
        })
    }
}


//sign up
const signUp = async (req, res) => {
    try {
        //fetch data from req.body
        const { firstName,lastName, email, password, cpassword, accountType, otp } = req.body

        //validate data
        if (!firstName || !lastName || !email || !password || !cpassword || !otp) {
            return res.json({
                success: false,
                message: "All fileds required!"
            })
        }


        //2 passwords match
        if (password !== cpassword) {
            return res.josn({
                success: false,
                message: "password and confirm password do not match"
            })
        }

        //check user already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists!"
            })
        }

        //find most recent otp from db
        const recentOtp=await Otp.findOne({email}).sort({createdAt:-1}).limit(1)
        
        //validate otp
        if(!recentOtp)
        {
            return res.json({
                success:false,
                message:"Otp not Found! "
            })
        }

        if(otp!==recentOtp)
        {
            return res.json({
                success:false,
                message:"Invalid Otp!"
            })
        }
       
        //hash password

        const hashedPassword =await bcrypt.hash(password,10)

        //entry in db of user
               //create empty profile in db for additional detals
               const profileDetails=await Profile.create({
                gender:null,
                dob:null,
                about:null,
                contactNumber:null
               })


        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
           additionalDetails:profileDetails._id,
           image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        //return res
      return res.json({
        success:true,
        message:"User Registration Successfull!",
        data:user
      })

    } catch (error) {
     return res.json({
        success:false,
        message:"User Registration Failed! please try again later"
     })
    }
}

//login

const login = async (req, res) => {
     try {
        //get data from req.body
        const {email,password}=req.body

        //validate
        if(!email || !password)
        {
            return res.json({
                success:false,
                message:"User not exists!"
            })
        }

        //check if user not actually exists but trying to login
        const isExist=await User.findOne({email})

        if(!isExist)
        {
            return res.json({
                success:false,
                message:"User do not exist!"
            })
        }

        //password check
        if(!await bcrypt.compare(password,isExist.password))
            {
                return res.json({
                    success:false,
                    message:"Password do not match!"
                })
            }


        const payLoad={
            email:isExist.email,
            id:isExist._id,
            role:isExist.accountType
        }

        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'2h'
        })
       
        //create cookie
        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true
        }

        //if all correct generate jwt token
        return res.cookie("token",token,options).json({
            success:true,
            message:"User Logged In successfully!",
            data:isExist,
            token:token
        })


     } catch (error) {
        return res.json({
            success:false,
            message:"Login failed! please try Again later!"
        })
     }
}

//change password
const changePassword=async(req,res)=>{
     try {
        // Get user data from req.user
        const userDetails = await User.findById(req.user.id)
    
        // Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword } = req.body
    
        // Validate old password
        const isPasswordMatch = await bcrypt.compare(
          oldPassword,
          userDetails.password
        )
        if (!isPasswordMatch) {
          // If old password does not match, return a 401 (Unauthorized) error
          return res.json({ success: false, message: "The password is incorrect" })
        }
    
        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
          req.user.id,
          { password: encryptedPassword },
          { new: true }
        )
    
        // Send notification email
        try {
          const emailResponse = await mailSender(
            updatedUserDetails.email,
            "Password for your account has been updated",
              `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
          )
          console.log("Email sent successfully:", emailResponse.response)
        } catch (error) {
          // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
          console.error("Error occurred while sending email:", error)
          return res.json({
            success: false,
            message: "Error occurred while sending email",
            error: error.message,
          })
        }
    
        // Return success response
        return res
          .status(200)
          .json({ success: true, message: "Password updated successfully" })
      } catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while updating password",
          error: error.message,
        })
      }
    
}



module.exports = { sendOtp, signUp, login ,changePassword}