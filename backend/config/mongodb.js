import e from "express";
import mongoose from "mongoose";

const connectDB = async () => {
   try {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}`)
   } catch (error) {
       console.log("Error connecting to MongoDB", error)
       process.exit(1);
   }
   
}

export default connectDB;
