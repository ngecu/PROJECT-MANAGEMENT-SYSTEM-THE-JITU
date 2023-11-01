import { Router } from "express";
import { getAllProjects } from "../controllers/projectControlles";

const project_router = Router();

project_router.get("/allProjects", getAllProjects);

export default project_router;
