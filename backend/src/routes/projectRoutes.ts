import { Router } from "express";
import { CreateProject } from "../controllers/projectControlles";

const project_router = Router();

project_router.post("/createProject", CreateProject);
import { addProject, editProject, getAllProjects, getMyProjects } from "../controllers/projectController";

// const project_router = Router();


project_router.post("/addProject", addProject);

project_router.put("/editProject/:id", editProject);

project_router.get("/allProjects", getAllProjects);
project_router.get("/my_projects/:id", getMyProjects);



export default project_router;
