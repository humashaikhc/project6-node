//import { readFileSync, writeFileSync } from "fs";
import { Chocolates } from "../models/chocolate.js";
import { Op } from "sequelize";

//let chocolate = JSON.parse(readFileSync("./data/data.json"));

export const getChocolate = async (req, res) => {
  const { id, name, location, priority } = req.query;

  const query = {
    attributes: ["id", "name", "location", "speciality"],
    where: {},
    order: [],
  };

  if (id) {
    query.where.id = { [Op.like]: `%${id}%` };
  }
  if (name) {
    query.where.name = { [Op.like]: `%${name}%` };
  }

  if (location) {
    query.where.location = { [Op.like]: `%${location}%` };
  }

  if (priority == "asc") {
    query.order[0] = ["name", "ASC"];
  } else if (priority == "desc") {
    query.order[0] = ["name", "DESC"];
  } else if (name) {
    query.where.name = { [Op.eq]: name};
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
    const chocolates = await Chocolates.destroy({ where: { id: id } });

    if (!chocolates) {
      throw new Error("Data not found");
    }

    res.status(201).send({ data: `Successfully deleted` });
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

    res.send("This task has been updated");
    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
};
