import { Router } from "express";
import { getAllComplaints, updateComplaintStatus, getDashboardStats } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.use(verifyJWT, verifyAdmin);

router.route("/dashboard").get(getDashboardStats);
router.route("/complaints").get(getAllComplaints);
router.route("/complaints/:id").patch(updateComplaintStatus);

export default router;
