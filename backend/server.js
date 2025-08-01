import express from "express";
import cors from "cors";
import { sequelize } from "./sequelize.js"; 
import { User } from "./models/User.js";    
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { authMiddleware } from "./middleware/auth.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/auth", authRoutes);


(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();
  } catch (err) {
    console.error("DB error:", err);
  }
})();

app.listen(4000, () => console.log("Server running on port 4000"));