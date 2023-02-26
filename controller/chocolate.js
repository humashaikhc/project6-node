//import { readFileSync, writeFileSync } from "fs";
import { Chocolates } from "../models/chocolate.js";
import {Op} from "sequelize";

//let chocolate = JSON.parse(readFileSync("./data/data.json"));

export const getChocolate = async (req, res) => {
  const { name, location } = req.query;

  const query = { where: {} };

  if (name) {
    query.where.name = {
      [Op.like]: `%${name}%`,
    };
  }

  if (location) {
    query.where.location = {
      [Op.eq]: location,
    };
  }

  try {
    const chocolate = await Chocolates.findAll(query);
    res.send(chocolate);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const addChocolate = async (req, res) => {
  try {
    const chocolates = await Chocolates.create(req.body);
    res.status(201).send({ data: `Data ID: ${chocolates.id} created` });
  } catch (error) {
    res.status(403).send(error.message);
  }
};

export const getChocolateById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const chocolates = await Chocolates.findByPk(id);

    if (!chocolates) {
      throw new Error("Data not found");
    }

    res.send(chocolates);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deleteChocolate = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const chocolates = await Chocolates.destroy({ where: { id } });

    if (chocolates[0] === 0) {
      throw new Error("Data not found");
    }

    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const updateChocolateById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const chocolates = await Chocolates.update(req.body, {
      where: {
        id,
      },
    });

    if (chocolates[0] === 0) {
      throw new Error("Data not found");
    }

    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
};