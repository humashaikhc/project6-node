import express from "express";
import bodyParser from "body-parser";
import {sequelize} from "./db/index.js";
import router from "./routes/routes.js";

const app = express();
const port = process.env.PORT || 3001;

try {
  const result = await sequelize.sync();
  console.log(result);
} catch (error) {
  console.log(error);
}

app.use(bodyParser.json());
app.use("/chocolate", router);

app.get("/", (req, res) => {
  res.send("Hello Huma");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

