import { Sequelize } from "sequelize";
export const sequelize = new Sequelize("chocolate_db", "root", "password", {
    dialect: "mysql",
    host: "localhost",
  });