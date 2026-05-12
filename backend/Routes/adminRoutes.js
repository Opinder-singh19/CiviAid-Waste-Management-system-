const express = require("express");
const router = express.Router();

const { 
  loginAdmin,
  getCounsellorComplaints,
  updateComplaintStatus
} = require("../Controllers/adminController");
// Admin login
router.post("/login", loginAdmin);

// ✅ ADD THIS (fetch complaints)
router.get("/complaints", getCounsellorComplaints);

// ✅ ADD THIS (update status)
router.patch("/complaint/:id/status", updateComplaintStatus);

router.get("/check-auth", (req, res) => {
  if (req.session.admin && req.session.admin.role === "admin") {
    res.json({
      loggedIn: true,
      role: "admin"
    });
  } else {
    res.json({
      loggedIn: false
    });
  }
});

router.post("/logout", (req, res) => {
  req.session.admin = null;
  req.session.destroy(() => {
    res.json({ message: "Admin logged out" });
  });
});

module.exports = router;