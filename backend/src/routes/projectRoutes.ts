import { Router } from "express";
import { deleteProject, getAllProjects, getMyProjects, getProject, updateProject } from "../controllers/projectControlles";

const project_router = Router();

project_router.get("/allProjects", getAllProjects);
project_router.get('/:project_id', getProject);
// project_router.get("/my_projects/:id", getMyProjects);
project_router.delete('/:project_id', deleteProject);
project_router.put('/:project_id', updateProject);

export default project_router;
