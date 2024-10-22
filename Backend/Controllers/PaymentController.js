// const instance = require('../Config/razorpay')
// const CourseModel = require('../Models/CourseModel')
// const UserModel = require('../Models/UserModel')
// const mailSender = require('../Utils/mailSender')
// const crypto = require('crypto')

// const mongoose = require('mongoose')


// //capture the payment

// const capturePayment = async (req, res) => {
//     try {
//         //get courseid and userid
//         const { courseId } = req.body

//         const userId = req.user.id;
//         //validation

//         if (!courseId) {
//             return res.json({
//                 success: false,
//                 message: "CourseId not found!"
//             })
//         }
//         //valid courseDetail
//         let course;
//         course = await CourseModel.findById(courseId);

//         if (!course) {
//             return res.json({
//                 success: false,
//                 message: "Course not found! ith provided id!"
//             })
//         }
//         //user already paid for the same course
//         const uid = new mongoose.Types.ObjectId(userId)
//         if (!CourseModel.studentsEnrolled.includes(uid)) {
//             return res.json({
//                 success: false,
//                 message: "Student is already enrolled with this course"
//             })
//         }


//         //order create
//         const price = CourseModel.price
//         const currency = "INR"

//         const options = {
//             amount: price * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes: { //here we are passing courseId and userid so that when verification of payment happens we return from razor pay then to uodate usermodel and coursemodel we need ids then here frontend cannot send them so there razorpay is able to send then as we sent them through notes ok?

//                 courseId: courseId,
//                 userId
//             }
//         }

//         //return response
//         try {
//             //initiate payment using razorpay
//             const paymentResponse = await instance.orders.create(options)
//             console.log(paymentResponse)

//             //return res
//             return res.json({
//                 success: false,
//                 courseName: CourseModel.courseName,
//                 courseDescription: CourseModel.courseDescription,
//                 thumbnail: CourseModel.thumbnail,
//                 orderId: paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount
//             })

//         } catch (error) {
//             return res.json({
//                 success: false,
//                 message: "could not initiate payment!"
//             })
//         }


//     } catch (error) {
//         return res.json({
//             success: false,
//             message: error.message
//         })
//     }
// }


// const verfiySignature = async (req, res) => {
//     try {
//         const webHookSecret = "12345"

//         const sign = req.headers["x-razorpay-signature"]

//         //hashing of webHookSecret
//         const shasum = crypto.createHmac("sha256", webHookSecret)
//         shasum.update(JSON.stringify(req.body))
//         const digest = shasum.digest("hex")


//         if (digest !== sign) {
//             return res.json("Sign is not valid!")
//         }

//         const { courseId, userId } = req.body.payload.payment.entity.notes

//         try {
//             //update course and usermodel
//             const enrolledCourse = await CourseModel.findOneAndUpdate(
//                 { _id: courseId },
//                 { $push: { studentsEnrolled: userId } },
//                 { new: true }
//             )

//             if (!enrolledCourse) {
//                 return res.json({
//                     success: false,
//                     message: "course Not found!"
//                 })
//             }

//             //find student and add them in the enrolled courses array
//             const enrolledStudent = await UserModel.findOneAndUpdate({ _id: userId },
//                 { $push: { courses: courseId } },
//                 { new: true }

//             )

//             if (!enrolledStudent) {
//                 return res.json({
//                     success: false,
//                     message: "student Not found!"
//                 })
//             }

//             //mail
//             const emailResponse = await mailSender(enrolledStudent.emailResponse, "congratulations", "You got your course!")
//             console.log(emailResponse)
//             return res.json({
//                 success: true,
//                 message: "Sign in verified and course added"

//             })

//         } catch (error) {
//             res.json({
//                 success: false,
//                 message: "sign in not verified and course could not added!"
//             })
//         }

//     } catch (error) {
//         return res.json({
//             success: false,
//             message: "Verification of signature could not done!"
//         })
//     }
// }


// module.exports={verfiySignature,capturePayment}





const instance = require('../Config/razorpay');
const CourseModel = require('../Models/CourseModel');
const UserModel = require('../Models/UserModel');
const mailSender = require('../Utils/mailSender');
const crypto = require('crypto');
const mongoose = require('mongoose');

// Capture the payment
const capturePayment = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        // Validation
        if (!courseId) {
            return res.json({ success: false, message: "CourseId not found!" });
        }

        // Valid course detail
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return res.json({ success: false, message: "Course not found with provided ID!" });
        }

        // User already paid for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.json({ success: false, message: "Student is already enrolled in this course" });
        }

        // Order creation
        const price = course.price;
        const currency = "INR";
        const options = {
            amount: price * 100,
            currency,
            receipt: crypto.randomBytes(16).toString('hex'),
            notes: { courseId, userId }
        };

        // Initiate payment using Razorpay
        try {
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            return res.json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            });
        } catch (error) {
            return res.json({ success: false, message: "Could not initiate payment!" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Verify signature
const verifySignature = async (req, res) => {
    try {
        const webHookSecret = "12345";
        const sign = req.headers["x-razorpay-signature"];

        // Hashing of webHookSecret
        const shasum = crypto.createHmac("sha256", webHookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if (digest !== sign) {
            return res.json("Sign is not valid!");
        }

        const { courseId, userId } = req.body.payload.payment.entity.notes;

        try {
            // Update course and user model
            const enrolledCourse = await CourseModel.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );
            if (!enrolledCourse) {
                return res.json({ success: false, message: "Course not found!" });
            }

            const enrolledStudent = await UserModel.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            );
            if (!enrolledStudent) {
                return res.json({ success: false, message: "Student not found!" });
            }

            // Send email
            const emailResponse = await mailSender(enrolledStudent.email, "Congratulations", "You got your course!");
            console.log(emailResponse);

            return res.json({ success: true, message: "Signature verified and course added" });
        } catch (error) {
            return res.json({ success: false, message: "Signature verified but course could not be added!" });
        }
    } catch (error) {
        return res.json({ success: false, message: `Signature verification failed: ${error.message}` });
    }
};

module.exports = { verifySignature, capturePayment };
