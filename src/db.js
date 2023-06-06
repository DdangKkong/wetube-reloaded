import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1/wetube");

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connect to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError); 
db.once("open", handleOpen);




