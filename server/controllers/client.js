import User from "../models/User.js";
import Project from "../models/Project.js";
import Ticket from "../models/Ticket.js";

export const addProjects = async (req, res) => {
  try {
    // validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // create new project
    const project = new Project({
      Name: req.body.Name,
      image: req.body.image,
    });

    // save project in the database
    const savedProject = await project.save();

    // return success response
    res.status(201).send(savedProject);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating a create operation",
    });
  }
};

export const getProjects = async(req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const updateProjects = async (req, res) => {
  const { id } = req.params;
  console.log('Updating project with ID:', id);
  const { Name, image } = req.body;

  try {
    const updatedProject = await Project.findOneAndUpdate
    (
      id,
      { Name, image },
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProjects = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
    }

    res.send({
      message: "Project was deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete project with id=" + id,
    });
  }
};



export const getTickets = async(req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({}).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
