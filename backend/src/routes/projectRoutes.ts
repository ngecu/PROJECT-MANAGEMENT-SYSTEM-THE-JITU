import { Router } from "express";
import { CreateProject } from "../controllers/projectControlles";

const project_router = Router();

project_router.post("/createProject", CreateProject);

export default project_router;
