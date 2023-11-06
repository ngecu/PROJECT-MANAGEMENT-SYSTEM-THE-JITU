import { Router } from "express";
import { checkUserDetails, deleteUser, getAllUsers, getUserProfile, getUsersWithoutProjects, loginRegister, registerUser } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

const user_router = Router();

user_router.post('/register', registerUser);
user_router.post('/login', loginRegister);
user_router.get('/allUsers', getAllUsers);
user_router.delete('/:user_id', verifyToken, deleteUser);
user_router.get('/check_user_details', verifyToken, checkUserDetails);
user_router.get('/user_profile/:user_id',  getUserProfile);
user_router.get('/users_without_projects', getUsersWithoutProjects);
user_router.get('/', verifyToken, getAllUsers);
export default user_router;
