import { Router } from "express";
import { createComplaint, getUserComplaints } from "../controllers/complaint.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";

const router = Router();

router.use(verifyJWT); // Protect all routes in this file

router.route("/")
    .post(upload.array("photo", 5), createComplaint) // Accept up to 5 photos
    .get(getUserComplaints);

export default router;
