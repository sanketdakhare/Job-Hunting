import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/CompanyController.js";
import { singleUpload } from "../middleware/multer.js";

const router  = express.Router();


router.post("/register",isAuthenticated,singleUpload,registerCompany)
router.get("/get",isAuthenticated,getCompany)


router.put("/update/:id",isAuthenticated,singleUpload,updateCompany)
router.get("/get/:id",isAuthenticated,getCompanyById)

export default router;
