import { Router } from "express";
import { addProject, deleteProject, editProject, getAllProjects,  getMyProjects } from "../controllers/projectControlles";

const project_router = Router();

project_router.get("/allProjects", getAllProjects);
project_router.get('/:project_id', getMyProjects);
project_router.post('/addProject',addProject );

// project_router.get("/my_projects/:id", getMyProjects);
project_router.delete('/:project_id', deleteProject);
project_router.put('/:project_id', editProject);

export default project_router;
