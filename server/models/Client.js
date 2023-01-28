import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true, // this will make sure that the name is unique
    trim: true, // removes whitespace from both ends of a string
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    maxlength: [50, "Email can not be more than 50 characters"],
  },
  phone: {
    type: String,
    required: [true, "Please add a phone number"],
    unique: true,
    trim: true,
    maxlength: [50, "Phone number can not be more than 50 characters"],
  },
});

export default mongoose.models.Client || mongoose.model("Client", clientSchema);
