const { getDB } = require("../config/db");

// Middleware
const checkAdmin = (req, res, next) => {
  if (!req.session.admin || req.session.admin.role !== "admin") {
    return res.status(403).json({ message: "Access denied (admin only)" });
  }
  next();
};

const { ObjectId } = require("mongodb");

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { Counselloremail, password } = req.body;

    const db = getDB();
    const admin = await db.collection("admin").findOne({
  Counselloremail
});


    if (!admin) {
      return res.status(401).json({ message: "User not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    req.session.user = null;
   

    
    req.session.admin = {
  id: admin._id,
  role: admin.role,
  Counsellorname:
  admin.Counsellorname
};

    res.json({
      message: "Login success",
      role: admin.role
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCounsellorComplaints = async (req, res) => {
  try {
    const db = getDB();

    if (!req.session.admin) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const counsellorName =
  req.session.admin.Counsellorname;

const complaints = await db
  .collection("userComplaints")
  .find({counsellor: counsellorName})
      .sort({ createdAt: -1 })
      .toArray();


    res.json(complaints);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const db = getDB();

    const id = req.params.id;
    const { status } = req.body;


    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid complaint ID" });
    }

    const complaint =
  await db.collection(
    "userComplaints"
  ).findOne({

    _id:
    new ObjectId(id)

  });

const result =
  await db.collection(
    "userComplaints"
  ).updateOne(

    {
      _id:
      new ObjectId(id)
    },

    {
      $set: {
        status
      }
    }
  );

if (
  status === "Resolved"
) {

  await db.collection("users")
  .updateOne(

    {
      _id:
      new ObjectId(
        complaint.userId
      )
    },

    {

      $inc: {
        coins: 6
      },

      $push: {

        pendingRewards:
        "resolved"

      }

    }
  );
}


    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ message: "Status updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};