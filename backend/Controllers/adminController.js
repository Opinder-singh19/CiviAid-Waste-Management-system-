const { getDB } = require("../config/db");
//Middle ware  
const checkAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied (admin only)" });
  }
  next();
};


//Admin login logic here 

exports.loginAdmin= async (req,res)=>{
  const[email,password]=req.body
  const db=getDB();
  
}