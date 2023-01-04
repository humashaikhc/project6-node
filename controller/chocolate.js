import { readFileSync, writeFileSync } from "fs";

let chocolate = JSON.parse(readFileSync("./data/data.json"));

export const getData = (req, res) => {
  const { name, location } = req.query;
  let results = chocolate;
  if (name) {
    const lowerName = name.toLowerCase();
    results = results.filter(student => {
      return student.name.toLowerCase().includes(lowerName);
    });
  }

  if (location) {
    const lowerLocation = location.toLowerCase();
    results = results.filter(chocolate => {
      return chocolate.location.toLowerCase() === lowerLocation;
    });
  }

  res.send({
    data: results,
  });
};

export const addData = (req, res) => {
  const chocolateExists = chocolate.find(
    chocolates => chocolates.name === req.body.name && chocolates.location === req.body.location
  );

  if (chocolateExists) {
    return res.status(403).send("Chocolate already exists");
  }

  chocolate.push(req.body);
  writeFileSync("./data/data.json", JSON.stringify(chocolate, null, 2));
  res.status(201).send({
    message: `Chocolate added, ${JSON.stringify(req.body)}`,
  });
};

export const getId = (req, res) => {
  const id = parseInt(req.params.id);
  const chocolates = chocolate.find(chocolates => chocolates.id === id);

  if (chocolates) {
    res.send({ data: chocolates });
  } else {
    res.status(404).send("Chocolate not found!");
  }
};

export const deleteData = (req, res) => {
  const id = parseInt(req.params.id);
  const hasId = chocolate.some(chocolates => chocolates.id === id);

  if (hasId) {
    const filteredChocolate = chocolate.filter(chocolates => chocolates.id !== id);
    chocolate = filteredChocolate;
    writeFileSync("./data/data.json", JSON.stringify(filteredChocolate, null, 2));
    res.send({ data: filteredChocolate });
  } else {
    res.status(404).send("Chocolate not found!");
  }
};

export const updateChocolateById = (req, res) => {
  const id = parseInt(req.params.id);
  const chocolates = chocolate.find(chocolates => chocolates.id === id);

  if (chocolates) {
    chocolates.name = req.body.name;
    chocolates.location = req.body.location;
    chocolates.speciality = req.body.speciality;

    writeFileSync("./data/data.json", JSON.stringify(chocolate, null, 2));

    res.send({ data: chocolates });
  } else {
    res.status(404).send("Chocolate not found!");
  }
};