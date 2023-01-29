import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true, // this will make sure that the name is unique
    trim: true, // removes whitespace from both ends of a string
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    trim: true,
    maxlength: [500, "Description can not be more than 500 characters"],
  },
  status: {
    type: String,
    required: [true, "Please add a status"],
    enum: ["TO_DO", "IN_PROGRESS", "DONE"],
  },
  clientId: {
    type: mongoose.Schema.ObjectId,
    ref: "clients",
    required: true,
  },
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
