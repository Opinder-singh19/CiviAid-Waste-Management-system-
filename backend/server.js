const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const authRoutes = require("./Routes/authRoutes");
const { mongoConnect } = require("./config/db");
const adminRoutes=require("./Routes/adminRoutes")
const activityRoutes =require("./Routes/activityRoutes");
app.use(cors({
  origin: ["http://civiaid-waste-management-system.onrender.com:5173"],
  credentials: true
}));


app.use(express.json());
app.use(express.static(__dirname));


app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false
}));


app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes)
app.use("/api/activity",activityRoutes);

app.get("/", (req, res) => {
  res.send("backend is working");
});
let phoneLocation = { lat: null, lng: null };

app.post("/phone-location", (req, res) => {
  const { lat, lng } = req.body;

  phoneLocation = { lat, lng };

  console.log("Phone Location:", phoneLocation);

  res.json({ status: "ok" });
});

app.get("/phone-location", (req, res) => {
  res.json(phoneLocation);
});

mongoConnect(() => {

  const PORT=8000;

  app.listen(PORT, "0.0.0.0", () => {
  console.log(`your server running at http://civiaid-waste-management-system.onrender.com:${PORT}`);
});

});