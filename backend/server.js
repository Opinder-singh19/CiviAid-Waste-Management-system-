const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");
const authRoutes = require("./Routes/authRoutes");
const { mongoConnect } = require("./config/db");

app.use(express.json());
app.use(express.static(__dirname));

app.use(cors({
  origin: "http://192.168.1.101:5173",
  credentials: true
}));

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: false
}));

// Backend test route
app.get("/", (req, res) => {
  res.send("backend is working");
});

app.use("/api/auth", authRoutes);

// ----------------------------
// 📍 PHONE GPS STORAGE
// ----------------------------
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

// ----------------------------
// Start Server
// ----------------------------
mongoConnect(() => {

  const PORT=8000;
// const https = require("https");
// const fs = require("fs");

  app.listen(PORT, "0.0.0.0", () => {
  console.log(`your server running at http://localhost:${PORT}`);
});

});