import { Router } from "express";
import { createNotice, getAllNotices } from "../controllers/notice.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import upload from "../config/multer.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .get(getAllNotices)
    .post(verifyAdmin, upload.single("photo"), createNotice);

export default router;
