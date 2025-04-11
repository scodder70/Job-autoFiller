import mongoose from "mongoose";

const dbconnect = () => {
  return mongoose
    .connect("mongodb://127.0.0.1:27017/jobautofiller", {
      // Ensure correct connection string
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit the process if the connection fails
    });
};

export default dbconnect;
