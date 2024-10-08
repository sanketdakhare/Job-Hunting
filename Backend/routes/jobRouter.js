import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/JobController.js";


const router  = express.Router();


router.post("/post",isAuthenticated,postJob)
router.get("/get",getAllJobs)


router.get("/getadminjobs",isAuthenticated,getAdminJobs)
router.get("/get/:id",getJobById)

export default router;