import { Router } from "express";
import { register, login , getMyProfile , logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = Router();

router.post("/login",login)

router.get("/logout" ,isAuthenticated, logout)

router.post("/register",register)

router.get("/me",isAuthenticated,getMyProfile)

export const userRouter = router;