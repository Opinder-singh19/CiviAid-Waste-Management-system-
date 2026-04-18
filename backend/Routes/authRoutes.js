const express = require("express");
const router = express.Router();



const { loginUser, checkAuth, logoutUser ,signupUser,forgotPassword, verifyOtp,resetPassword ,UserComplaints,mycomplaints} = require("../Controllers/authController");

router.post("/login", loginUser);

router.get("/check-auth", checkAuth);

router.get("/logout", logoutUser);
router.post("/signup", signupUser);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/User-Complaint",UserComplaints)
router.get("/my-complaints",mycomplaints)

module.exports = router;