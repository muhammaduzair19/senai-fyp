import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

// app configs
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

export { app };
