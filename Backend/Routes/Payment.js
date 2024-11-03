// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature } = require("../Controllers/Payment")
const { auth, isInstructor, isStudent, isAdmin } = require("../Middlewares/AuthMiddleware")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)

module.exports = router