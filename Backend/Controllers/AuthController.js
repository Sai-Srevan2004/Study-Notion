//sign up
//login
//otp
//change password

const UserModel = require('../Models/UserModel')
const OtpModel = require('../Models/OtpModel')
const ProfileModel = require('../Models/ProfileModel')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto = require('crypto')
require('dotenv').config()

//sendOTp

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body

        //checking if email exists already
        const checkUserpresent = await UserModel.findOne({ email })

        if (checkUserpresent) {
            return res.json({
                success: false,
                message: "user already exists!"
            })
        }

        // Generate OTP
        const otp = otpGenerator.generate(3, { upperCaseAlphabets: false, specialChars: false });

        // Add secure random number instead of timestamp
        const secureRandom = crypto.randomInt(100, 999); // 3-digit secure random number

        const uniqueOtp = `${otp}${secureRandom}`;

        console.log(uniqueOtp); // Example: 593827


        const otpPayload = { email, uniqueOtp }

        //create an entry for otp in db

        const otpBody = await OtpModel.create(otpPayload)

        console.log(otpBody)


        res.json({
            success: true,
            message: "OTP sent Successfully!",
            otp: uniqueOtp
        })



    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Could not send Otp!"
        })
    }
}


//sign up

const signUp = async (req, res) => {
    try {
        //data fetching from frontend
        const {
            firstName,
            lastName,
            email,
            password,
            cpassword,
            accountType,

            otp
        } = req.body



        //validate them

        if (!firstName || !lastName || !email || !password || !cpassword || !otp) {
            return res.json(
                {
                    success: false,
                    message: "All fields are required!"
                }
            )
        }

        if (password != cpassword) {
            return res.json(
                {
                    success: false,
                    message: "password and confirm password do not match!"
                }
            )
        }

        //check user already exsists

        const existUser = await UserModel.findOne({ email })

        if (existUser) {
            res.json({
                success: false,
                message: "user already registered!"
            })
        }


        //find most recent otp

        const recentOtp = await OtpModel.find({ email }).sort({ createdAt: -1 }).limit(1)
        console.log(" recent OTP", recentOtp)


        //otp validation

        if (!recentOtp) {
            return res.json({
                success: false,
                message: "Otp is not valid!"
            })
        }

        if (otp != recentOtp) {
            res.json({
                success: false,
                message: "OTP is Invalid!"
            })
        }


        //hash password
        let hashedPassword
        try {
            hashedPassword = await bcrypt.hash(password, 10)

        }
        catch (error) {
            console.log("Could not hash Password")
        }



        //Profile details
        const profileDetails = await ProfileModel.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })

        //create entry in db
        const userCreated = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            otp,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        //return res
        res.json({
            success: true,
            data: userCreated,
            message: "User registration Successfull!"
        })

    } catch (error) {
        console.log(error)
        res.json({

            success: false,
            message: "User could not be registered!"
        })
    }

}



//login

const login = async (req, res) => {
    try {
        //get data from frontend

        const { email, password } = req.body

        //validation

        if(!email || !password)
        {
            res.json({
                success:false,
                message:"All fileds Required!"
            })
        }


        //check user existence 
        const exist = await UserModel.findOne({ email })

        if(!exist)
        {
            return res.json({
                success:false,
                message:"Email does not exists!"
            })
        }

        //check password match and generate jwt token

        if(await bcrypt.compare(password,exist.password))
        {    
            const payload={
                email:exist.email,
                id:exist._id,
                role:exist.accountType
            }

             const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h'
             })

             //create cookie and send response

            const options={
                 expires:new Date(Date.now()+3*24*60*60*1000),
                 httpOnly:true
             }

             res.cookie("token",token,options).json({
                success:true,
                token:token,
                message:"UserLoggedIn Successfully!"
             })
        }
        else{
            res.json({
                success:false,
                message:"Password is incorrect!"
            })
        }       

        

        
    } catch (error) {
       res.json({
        success:false,
        message:"Login failed!"
       })
    }

}


//change Password




module.exports = { sendOtp, signUp,login }