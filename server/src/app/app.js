import express from "express";
import authRoutes from "../routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import questRoutes from "../routes/quest.routes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://life-ik87d39wo-ptamitkumarojha-9919.vercel.app",
    credentials: true,
  }),
);  
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/quest", questRoutes);

export default app;
