const { getDB } = require("../config/db");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "civiaidofficial@gmail.com",
    pass: "vkbfrckhrzixhpny"
  }
});
exports.loginUser = async (req,res)=>{

 const {email,password} = req.body;

 const db = getDB();
 

 const user = await db.collection("users").findOne({email});

 if(!user){
   return res.status(401).json({message:"User not found"});
 }

 if(user.password !== password){
   return res.status(401).json({message:"Wrong password"});
 }

 req.session.user = {
   id:user._id,
   role:user.role
 };

 res.json({
   message:"Login success",
   role:user.role
 });

};



exports.signupUser = async (req,res)=>{

 const {fullName, phone, email, location, password, confirmPassword} = req.body;

 const db = getDB();


 if(password !== confirmPassword){
   return res.status(400).json({message:"Passwords do not match"});
 }

 const existingUser = await db.collection("users").findOne({email});

 if(existingUser){
   return res.status(400).json({message:"User already exists"});
 }
 

 await db.collection("users").insertOne({
   fullName,
   phone,
   email,
   location,
   password,
   role:"user"
 });

 res.json({message:"Signup successful"});
};



exports.checkAuth = (req,res)=>{

 if(req.session.user){
   return res.json({
     loggedIn:true,
     role:req.session.user.role
   });
 }

 res.json({loggedIn:false});

};



exports.logoutUser = (req,res)=>{

 req.session.destroy(()=>{
   res.json({message:"Logged out"});
 });

};

exports.forgotPassword = async (req, res) => {

  const email = req.body.email.toLowerCase(); 

  const db = getDB();

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" }); 
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpExpiry = Date.now() + 5 * 60 * 1000;

  await db.collection("users").updateOne(
    { email },
    { $set: { otp, otpExpiry } }
  );

  console.log("OTP:", otp);


 transporter.sendMail({
  from: "your_email@gmail.com",
  to: email,
  subject: "Password Reset OTP",
  text: `Your OTP is ${otp}`
});
console.log("API HIT");

res.json({ success: true, message: "OTP sent to email" });
};
exports.verifyOtp = async (req, res) => {

  const email = req.body.email.toLowerCase(); 
const otp = req.body.otp.trim(); 

  const db = getDB();

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (user.otpExpiry < Date.now()) {
    return res.status(400).json({ success: false, message: "OTP expired" });
  }
  if (user.otp !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" }); 
  }

  res.json({ success: true, message: "OTP verified" }); 

  await db.collection("users").updateOne(
  { email },
  { $unset: { otp: "", otpExpiry: "" } }
);
};