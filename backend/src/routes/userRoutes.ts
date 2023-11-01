import { Router } from "express";
import { checkUserDetails, getAllUsers, loginRegister, registerUser } from "../controllers/userController";

import { verifyToken } from "../middleware/verifyToken";

const user_router = Router()

user_router.post('/register', registerUser)
user_router.post('/login', loginRegister)
user_router.get('/',verifyToken, getAllUsers)
user_router.get('/check_user_details',verifyToken, checkUserDetails)

export default user_router;