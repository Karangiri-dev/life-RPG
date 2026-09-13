import express from "express";
import authRoutes from "../routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import questRoutes from "../routes/quest.routes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);  
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/quest", questRoutes);

export default app;
