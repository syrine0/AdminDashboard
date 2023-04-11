import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
    {
        Name: String,
        Description: String,
        Date: Date,
        Priority: String,
        image: String,
        ProjectName: String,
        userName: String,

    },
    { timestamps: true }
  
);

const Ticket = mongoose.model("Ticket", TicketSchema);
export default Ticket;