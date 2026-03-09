const { getDB } = require("../config/db");

// login user
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


// check login
exports.checkAuth = (req,res)=>{

 if(req.session.user){
   return res.json({
     loggedIn:true,
     role:req.session.user.role
   });
 }

 res.json({loggedIn:false});

};


// logout
exports.logoutUser = (req,res)=>{

 req.session.destroy(()=>{
   res.json({message:"Logged out"});
 });

};