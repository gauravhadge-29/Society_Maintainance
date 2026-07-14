import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import complaintRouter from "./routes/complaint.routes.js";
import adminRouter from "./routes/admin.routes.js";
import noticeRouter from "./routes/notice.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/complaints", complaintRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/notices", noticeRouter);

export default app;

