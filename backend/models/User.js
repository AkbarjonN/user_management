import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

export const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  blocked: { type: DataTypes.BOOLEAN, defaultValue: false },
});