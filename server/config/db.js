import mongoose from "mongoose";

mongoose.set("strictQuery", true); // this will be set to false by default in the next major release of Mongoose

const connedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connedDB;
