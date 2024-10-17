const mongoose = require('mongoose')
const mailSender = require('../Utils/mailSender')

const OtpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60    //this doc gets deleted after 5 min
    }
})


//a function -> to send emails

async function sendVerificationEmail(email,otp)
{
    try {
        const mailResponse=await mailSender(email,"Email verification from StudyNotion",otp)
        console.log("Email sent Successfully!",mailResponse)
    } catch (error) {
        console.log("Error while sending email",error)
        throw error
    }
}


OtpSchema.pre("save",async function(next){
   await sendVerificationEmail(this.email,this.otp)
   next()
})

module.exports = mongoose.model("OtpModel", OtpSchema)