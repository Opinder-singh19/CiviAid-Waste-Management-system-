const express=require("express")// download just import for use its functionalites 
const cors=require("cors");   // download just import for use its functionalites 
const app=express();     //import express functionality in app variable
const session = require("express-session"); // to create session 
const authRoutes = require("./Routes/authRoutes");
const { mongoConnect } = require("./config/db");

app.use(express.json()); // read JSON data from frontend
app.use(cors({         //this line helps  do react and backend server to talk with each and   allow cookie session to be sent between react and backend 
  origin: "http://localhost:5173",
  credentials: true
}));



app.use(session({        //. create session key 
  secret: "secretkey",
  resave: false,
  saveUninitialized: false
}));


app.get("/",(req,res)=>{
  res.send("backend is working")//res send to verify backend working or not 
})
app.use("/", authRoutes);
mongoConnect(()=>{
  const PORT=8000;      // create a server on port no 8000 
app.listen(PORT,()=>{
  console.log(`your server running at http://localhost:${PORT}`)
})

})
