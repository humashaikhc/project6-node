import { Sequelize } from "sequelize";
import { sequelize } from "../db/index.js";

export const Chocolates = sequelize.define(
  "chocolates",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    speciality: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { updatedAt: "updated_at", createdAt: "created_at" }
);
