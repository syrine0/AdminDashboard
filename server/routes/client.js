import express from "express";
import {
 
  getCustomers , getProjects , getTickets, addProjects, updateProjects, deleteProjects
  
} from "../controllers/client.js";

const router = express.Router();

router.get("/projects", getProjects);
router.post("/projects", addProjects);
router.put("/projects/:id", updateProjects);
router.delete("/projects/:id", deleteProjects);
router.get("/customers", getCustomers);
router.get("/tickets", getTickets);


export default router;