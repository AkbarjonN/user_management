import express from "express";
import { User } from "../models/User.js";
import { authMiddleware } from "../middleware/auth.js"; 

const router = express.Router();
router.get("/", authMiddleware, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/block", authMiddleware, async (req, res) => {
  const { ids } = req.body;
  await User.update({ blocked: true }, { where: { id: ids } });
  res.json({ message: "Blocked successfully" });
});

router.post("/unblock", authMiddleware, async (req, res) => {
  const { ids } = req.body;
  await User.update({ blocked: false }, { where: { id: ids } });
  res.json({ message: "Unblocked successfully" });
});

router.post("/delete", authMiddleware, async (req, res) => {
  const { ids } = req.body;
  await User.destroy({ where: { id: ids } });
  res.json({ message: "Selected users deleted" });
});

export default router;