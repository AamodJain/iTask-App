import mongoose from "mongoose";

export const connectDB = async() => {
  let con = mongoose.connect(process.env.MONGO_CONNECTION_STRING,{dbName : "ToDo"})
  con.then(()=> console.log("Database Connected")).catch(()=> console.log("ERROR while connecting to DB"))
}
