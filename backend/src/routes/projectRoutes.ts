import { Router } from "express";
import { getAllProjects, getMyProjects } from "../controllers/projectControlles";

const project_router = Router();

project_router.get("/allProjects", getAllProjects);
project_router.get("/my_projects/:id", getMyProjects);



export default project_router;
