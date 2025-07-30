import express from "express";
import { User } from "../models/User.js";

const router = express.Router();
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/block", async (req, res) => {
  const { ids } = req.body;
  await User.update({ blocked: true }, { where: { id: ids } });
  res.json({ message: "Blocked successfully" });
});

router.post("/unblock", async (req, res) => {
  const { ids } = req.body;
  await User.update({ blocked: false }, { where: { id: ids } });
  res.json({ message: "Unblocked successfully" });
});
router.post("/delete", async (req, res) => {
  const { ids } = req.body;
  await User.destroy({ where: { id: ids } });
  res.json({ message: "Selected users deleted" });
});

export default router;