import { Router } from "express";
import { checkUserDetails, deleteUser, getAllUsers, getUserProfile, loginRegister, registerUser } from "../controllers/userController";

import { verifyToken } from "../middleware/verifyToken";

const user_router = Router()

user_router.post('/register', registerUser)
user_router.post('/login', loginRegister)
user_router.get('/allUsers',verifyToken, getAllUsers)
user_router.delete('/:user_id',verifyToken, deleteUser);
user_router.get('/:user_id', getUserProfile);

user_router.get('/check_user_details',verifyToken, checkUserDetails)
user_router.get('/',verifyToken, getAllUsers)

export default user_router;