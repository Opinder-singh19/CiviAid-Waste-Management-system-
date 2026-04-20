const { getDB } = require("../config/db");
//Middle ware  
const checkAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied (admin only)" });
  }
  next();
};


//Admin login logic here 

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
     console.log("Body:", req.body);

    const db = getDB();

  const admin = await db.collection("admin").findOne({ email });
    console.log("Admin from DB:", admin);

    if (!admin) {
      return res.status(401).json({ message: "User not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    req.session.admin = {
      id: admin._id,
      role: admin.role
    };

    res.json({
      message: "Login success",
      role: admin.role
    });

  } catch (err) {
    console.log("Admin login error:", err);
    res.status(500).json({ message: "Server error" });

  }
  

};