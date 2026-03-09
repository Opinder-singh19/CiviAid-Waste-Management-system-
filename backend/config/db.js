const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb://127.0.0.1:27017";

let _db;

const mongoConnect = (callback)=>{

 MongoClient.connect(MONGO_URL)
 .then(client=>{

   console.log("MongoDB connected");

   _db = client.db("civicaid");

   callback();

 })
 .catch(err=>{
   console.log("Mongo connection error:",err);
 });

};

const getDB = ()=>{

 if(!_db){
   throw new Error("Database not connected");
 }

 return _db;

};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;