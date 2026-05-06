const { getDB } = require("../config/db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

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

 const isMatch = await bcrypt.compare(password, user.password);

if(!isMatch){
  return res.status(401).json({message:"Wrong password"});
}

 req.session.admin = null;

req.session.user = {
  id: user._id,
  email: user.email,
  fullName: user.fullName,
  role: user.role

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
 

 const hashedPassword = await bcrypt.hash(password, 10);

await db.collection("users").insertOne({
  fullName,
  phone,
  email,
  location,
  password: hashedPassword,
  role:"user",
  createdAt: new Date()
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



// mail system 
 transporter.sendMail({
  from: "civiaidofficial@gmail.com",
  to: email,
  subject: "Join CiviAid - Segregate Today for a Cleaner Future",
  html: `
<div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
  <div style="max-width:500px; margin:auto; background:#ffffff; padding:25px; border-radius:10px; text-align:center;">

    <h2 style="color:#2c7be5;">CiviAid Password Reset 🔐</h2>

    <p>Dear User,</p>

    <p>We received a request to reset your password.</p>
   
     <br/>

    <p> then Your One-Time Password (OTP) is:</p>

    <h1 style="color:#2c7be5; letter-spacing:2px;">${otp}</h1>

    <p>This OTP is valid for 5 minutes.</p>

    <br/>

    <p style="color:#777;">Do not share this code with anyone.</p>

    <hr style="margin:20px 0;"/>

    <p style="font-size:12px; color:#aaa;">
      If you did not request this, you can ignore this email.
    </p>

    <p style="margin-top:20px;">
      🌱 <b>Team CiviAid</b><br/>
          Smart Waste Management
    </p>

  </div>
</div>
`
});


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

  
  await db.collection("users").updateOne(
    { email },
    { 
      $set: { otpVerified: true },   
      $unset: { otp: "", otpExpiry: "" }
    }
  );
  res.json({ success: true, message: "OTP verified" }); 


};
exports.resetPassword = async (req, res) => {

  const { email, newPassword } = req.body;

  const db = getDB();

  const user = await db.collection("users").findOne({ email });

  if (!user || !user.otpVerified) {
    return res.status(400).json({ success: false, message: "Unauthorized request" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

await db.collection("users").updateOne(
  { email },
  {
    $set: { password: hashedPassword },
    $unset: { otpVerified: "" }
  }
);
  res.json({ success: true, message: "Password updated successfully" });
};
// user complaints logic backend 
exports.UserComplaints=async(req,res)=>{
  const db=getDB();
  if (!req.session.user) {
    return res.status(401).json({ message: "Please login first" });
  }
    console.log("SESSION:", req.session);
  console.log("BODY:", req.body);
  const { issueType, description, location, counsellor } = req.body
  try{
    await db.collection("userComplaints").insertOne({
  issueType: req.body.issueType,
  description: req.body.description,
  location: req.body.location,
  counsellor: counsellor, // EMAIL stored here
  name: req.session.user.fullName, // from login session
  userId: req.session.user.id,
  status: "Pending",
  createdAt: new Date()
});
  res.status(200).json({Message:"Your Complaint Submitted "})
  }
  catch(err){
    console.log("ERROR:", err); 
    res.status(500).json({Message:"Something Went wrong"})
  }
}

exports.mycomplaints=async(req,res)=>{
  const db=getDB();
  if (!req.session.user) {
  return res.status(401).json({ message: "Please login first" });
}
const complaints = await db.collection("userComplaints")
    .find({ userId: req.session.user.id })
    .toArray();

  res.json(complaints);


}

exports.getUserProfile = async (req, res) => {

  try {

    if (!req.session.user) {

      return res.status(401).json({
        message: "Please login first",
      });
    }

    const db = getDB();

    const user = await db
      .collection("users")
      .findOne({
        email: req.session.user.email
      });

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({

      fullName: user.fullName,

      email: user.email,

      phone: user.phone,
      location: user.location,
      joined: user.createdAt

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};