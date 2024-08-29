
import express from "express"
import { login, logout, register, updateProfile, verify } from "../controllers/UserController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";


const router  = express.Router();


router.post("/register",singleUpload,register)
router.post("/login",login)

//Authenticated User only update Profile So we Create Auth middleware
router.post("/profile/update",isAuthenticated,singleUpload,updateProfile) 
router.get("/logout",logout)

router.get("/:id/verify/:token",verify)

export default router;
