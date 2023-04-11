import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        Name: String,
        image: String,
        tickets: Array,
        ticketsByUser: Array
    },
    { timestamps: true }
  
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;