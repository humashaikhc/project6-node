import {config} from "dotenv";
import { Sequelize } from "sequelize";

config();

export const sequelize = new Sequelize("chocolate_db", process.env.DB_USER, process.env.DB_PW, {
    dialect: "mysql",
    host: process.env.DB_HOST,
  });